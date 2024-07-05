/* eslint-disable no-unused-vars */
import React from 'react'
import "./darkmood.css";

// FontAwesome Icon............
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb
} from "@fortawesome/free-solid-svg-icons";

export default function DarkMood() {

    const DarkHandler = () => {
        document.querySelector("body").classList.toggle("darkmood");
    }

  return (
    <div className='dark-mood-icon'>
        <FontAwesomeIcon icon={faLightbulb} onClick={DarkHandler} />
    </div>
  )
}
