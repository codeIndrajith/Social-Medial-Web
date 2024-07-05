import React, { useEffect, useState } from 'react';
import './PopupModal.css'; // Style your modal with CSS
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios for HTTP requests

export default function PopupModal({ onClose }) {
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(null);
  const [caption, setCaption] = useState('');
  const preset_key = 'd1qunvml';
  const cloud_name = 'dn8ypojvn';

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', preset_key);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      toast.success('Upload successful');
      const url = response.data.secure_url;

      sendApi(url);
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Error uploading files');
    }
  };

  const sendApi = async (url) => {
    try {
      const postData = {
        caption: caption,
        image: url,
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const postResponse = await axios.post(
        'http://localhost:5454/api/story',
        postData,
        { headers }
      );
      console.log(postResponse.data.image);
    } catch (err) {
      console.log(err);
    }
    onClose(); // Close modal after API request is sent
  };

  const stopPropagation = (event) => {
    event.stopPropagation(); // Prevent event propagation to parent elements
  };

  const onCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  return (
    <div className="popup-modal">
      <div className="modal-content" onClick={stopPropagation}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add Story</h2>
        <form onSubmit={handleSubmit} className="storyForm">
          <input
            type="file"
            id="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <textarea
            id="storyContent"
            placeholder="What's on your mind?"
            value={caption}
            onChange={onCaptionChange}
            required
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
