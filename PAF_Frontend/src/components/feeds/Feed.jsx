import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from '../comments/Comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faComment,
  faHeart,
  faListDots,
  faShare,
} from '@fortawesome/free-solid-svg-icons';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [openComment, setOpenComment] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchPosts(token);
  }, []);

  const fetchPosts = async (token) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      var response = await axios.get('http://localhost:5454/api/posts', {
        headers,
      });

      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const toggleComments = () => {
    setOpenComment(!openComment);
  };

  function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust this format according to your requirements
  }

  return (
    <>
      {posts.map((post) => (
        <div className="feed" key={post.id}>
          <div className="top-content">
            <Link to={`/profile/${post.user.id}`}>
              <div className="user">
                <img src={post.user.profilePic} alt="" />
                <div>
                  <h5>
                    {post.user.firstName} {post.user.lastName}
                  </h5>
                  <small>{formatTime(post.createdAt)}</small>
                </div>
              </div>
            </Link>
            <span>
              <FontAwesomeIcon icon={faListDots} />
            </span>
          </div>
          <div className="mid-content">
            {post.caption && <p>{post.caption}</p>}
            {post.image && <img src={post.image} alt="Your Image" />}
          </div>
          <div className="bottom-content">
            <div className="action-item">
              <span>
                <FontAwesomeIcon icon={faHeart} /> {post.liked.length} Likes
              </span>
            </div>
            <div className="action-item" onClick={toggleComments}>
              <span>
                <FontAwesomeIcon icon={faComment} /> {post.comments.length}{' '}
                Comment
              </span>
            </div>
            <div className="action-item">
              <span>
                <FontAwesomeIcon icon={faShare} /> 11 Shares
              </span>
            </div>
          </div>
          {openComment && <Comments />}
        </div>
      ))}
    </>
  );
}
