/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './addPost.css';

// Fake Api...................
import CurrentUserData from '../../FackApis/CurrentUserData';

// Font Awesome Icon..........
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faSmile,
  faTags,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddPost() {
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState('');
  const [token, setToken] = useState(null);
  const [currentUserData, setCurrentUserData] = useState({});

  const preset_key = 'd1qunvml';
  const cloud_name = 'dn8ypojvn';

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);

    const fetchUser = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const currentUser = await axios.get(
          'http://localhost:5454/api/users/profile',
          { headers }
        );
        setCurrentUserData(currentUser.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const handlePhoto = async (e) => {
    e.preventDefault();
    setPhoto(e.target.files[0]);
  };

  const handleVideo = async (e) => {
    e.preventDefault();
    setVideo(e.target.files[0]);
  };

  const handleCaption = (e) => {
    setCaption(e.target.value);
  };

  const postHandler = async (e) => {
    e.preventDefault();

    if (!photo && !video) {
      toast.error('Add both');
      return;
    }
    const formData = new FormData();
    formData.append('file', photo);
    // formData.append('file', video);
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
      console.log(token);

      const postData = {
        caption: caption,
        image: url,
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const postResponse = await axios.post(
        'http://localhost:5454/api/posts',
        postData,
        { headers }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form action="" className="postForm">
      <div className="user form-top">
        <img src={currentUserData.profilePic} alt="" />
        <input
          type="text"
          placeholder="What is on your mind?"
          onChange={handleCaption}
        />
        <button type="submit" onClick={postHandler} className="btn btn-primary">
          Post
        </button>
      </div>
      <div className="post-categories">
        <label htmlFor="file">
          <input type="file" id="file" onChange={handlePhoto} />

          <span>
            <FontAwesomeIcon icon={faImage} /> Photos
          </span>
        </label>

        <label htmlFor="file">
          <input type="file" onChange={handleVideo} />
          <span>
            <FontAwesomeIcon icon={faVideo} /> Videos
          </span>
        </label>
        <span>
          <FontAwesomeIcon icon={faTags} /> Tag
        </span>
        <span>
          <FontAwesomeIcon icon={faSmile} /> Feelings
        </span>
      </div>
    </form>
  );
}
