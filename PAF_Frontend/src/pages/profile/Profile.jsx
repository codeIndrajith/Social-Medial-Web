/* eslint-disable no-unused-vars */
import React from 'react';

// Components..............
import AddPost from '../../components/addPost/AddPost';
import UserProfile from '../../components/userProfile/UserProfile';
import Feeds from '../../components/feeds/Feeds';

export default function Profile() {
  return (
    <>
      <UserProfile />
      <AddPost />
      <Feeds />
    </>
  );
}
