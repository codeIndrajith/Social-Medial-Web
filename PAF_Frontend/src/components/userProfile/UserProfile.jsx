import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLink, faMessage } from '@fortawesome/free-solid-svg-icons';
import './userProfile.css';
import { toast } from 'react-toastify';

export default function UserProfile() {
  const [token, setToken] = useState('');
  const [currentUserData, setCurrentUserData] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const preset_key = 'd1qunvml';
  const cloud_name = 'dn8ypojvn';

  useEffect(() => {
    const getToken = localStorage.getItem('token');
    setToken(getToken);

    const fetchUser = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${getToken}`,
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
  }, [token, editing]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setCurrentUserData({ ...currentUserData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      if (profilePic) {
        const formData = new FormData();
        formData.append('file', profilePic);
        formData.append('upload_preset', preset_key);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );

        setCurrentUserData({
          ...currentUserData,
        });
        setProfilePicUrl(response.data.secure_url);

        var userUpdateData = {
          profilePic: response.data.secure_url,
          firstName: currentUserData.firstName,
          lastName: currentUserData.lastName,
          email: currentUserData.email,
        };
      }

      await axios.put(
        'http://localhost:5454/api/users/updateUser',
        userUpdateData,
        {
          headers,
        }
      );
      setEditing(false);
      console.log(profilePicUrl);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  return (
    <div className="userProfile">
      {editing ? (
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <input type="file" onChange={handleFileChange} />
          <input
            type="text"
            name="firstName"
            value={currentUserData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            value={currentUserData.lastName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            value={currentUserData.email}
            onChange={handleChange}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="profile-info">
          <img src={currentUserData.profilePic} alt="" />
          <div className="user-name">
            <h3>{currentUserData.firstName}</h3>
            <h5>{currentUserData.lastName}</h5>
          </div>
          <div className="profile-button">
            <Link to="/chatbox/id">
              <button className="btn btn-primary">
                <FontAwesomeIcon icon={faMessage} />
              </button>
            </Link>
            <button className="btn btn-primary" onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} /> Edit Profile
            </button>
            <button className="btn">
              <FontAwesomeIcon icon={faLink} />
            </button>
          </div>
          <p className="bio">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            sapiente necessitatibus alias iure deleniti. Eos blanditiis fugit
            quos quam ad!
          </p>
        </div>
      )}
    </div>
  );
}
