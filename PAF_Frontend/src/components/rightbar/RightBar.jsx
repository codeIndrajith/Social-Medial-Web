/* eslint-disable no-unused-vars */
import React from 'react'
import './rightBar.css'

// Components..................

import Message from '../message/Message'
import FriendReq from '../friendReq/FriendReq'

export default function RightBar() {
  return (
    <div className='rightBar'>
      <div className="rightbar-container">
        <Message />
        <FriendReq />
      </div>
    </div>
  )
}
