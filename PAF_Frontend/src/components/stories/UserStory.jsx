import React, { useEffect, useState } from 'react';
import './stories.css';
import PopupModal from './PopupModal'; // Import the PopupModal component
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

export default function UserStory() {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAllStories = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get('http://localhost:5454/api/story', {
          headers,
        });
        setStories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllStories();
  }, []); // Run once on component mount

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="story userStory" onClick={toggleModal}>
      {/* Map over stories array to render each story */}
      {stories.map((story) => (
        <div key={story.id}>
          <div className="user">
            <img src={story.user.profilePic} alt="" />
          </div>
          <img src={story.image} alt="" />
          <label htmlFor="storyFile">
            <FontAwesomeIcon icon={faAdd} />
            <input type="file" id="storyFiles" />
          </label>
          <h5>{story.caption}</h5>
        </div>
      ))}

      {/* Button to toggle the modal */}
      <button onClick={toggleModal}>Add Story</button>

      {/* Render the modal conditionally */}
      {showModal && <PopupModal onClose={toggleModal} />}
    </div>
  );
}
