/* eslint-disable no-unused-vars */
import React from 'react';
import './feeds.css'

// Components..................
import Feed from './Feed';

//Fake Apis.................
import HomeFeedData from '../../FackApis/HomeFeedData';

export default function Feeds() {
  return (
    <div className='feeds'>
      {
        HomeFeedData.map((fed) => (
          <Feed fed={fed} key={fed.id} />
          
        ))
      }
    </div>
  );
}