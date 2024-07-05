/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react'
import './comments.css'

// Fake Apis..................
import CommentData from "../../FackApis/CommetData"
import CurrentUserData from '../../FackApis/CurrentUserData'
import { Link } from 'react-router-dom'

export default function Comments() {
  return (
    <div className='comments'>
      <div className="writebox">
        <form action="#">
          <div className='user'>
            <img src={CurrentUserData.map(user=>(user.ProfieImage))} alt="" />
            <input type="text" placeholder='Write a comment' />
            <button type='submit' className='btn btn-primary'>Send</button>
          </div>
        </form>
      </div>
      {
        CommentData.map(comment=>(
          <Link to='/profile/id'>
            <div className="user" key={comment.id}>
              <img src={comment.commentProfile} alt="" />
              <div>
              <h5>{comment.name}</h5>
              <p>{comment.CommeText}</p>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  )
}
