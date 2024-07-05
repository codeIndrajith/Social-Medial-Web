/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

// Components.................
import Stories from '../../components/stories/Stories';
import AddPost from '../../components/addPost/AddPost';
import Feeds from '../../components/feeds/Feeds';

export default function Home() {
  const [token, setToken] = useState();
  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);
  return (
    <>
      <Stories />
      {token !== null && <AddPost />}
      <Feeds />
    </>
  );
}
