/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react'
import './friendReq.css'
import { Link } from 'react-router-dom'

// FackApis..................
import FriendReqData from '../../FackApis/FirendReqData'

export default function FriendReq() {
  return (
    <div className='Friend_Requests'>
        <h4>Friend Requests</h4>

        {
            FriendReqData.map(friend => (
                <div className="request">
                    <Link to='/profile/id'>
                        <div className="info" key={friend.id}>
                            <div className="user">
                                <img src={friend.img} alt="" />
                                <h5>{friend.name}</h5>
                            </div>
                            <div className='info-name'>
                                
                                <p>{friend.info}</p>
                            </div>
                        </div>
                    </Link>

                    <div className="action">
                        <button className='btn btn-primary'>Accept</button>
                        <button className='btn btn-red'>Delete</button>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
