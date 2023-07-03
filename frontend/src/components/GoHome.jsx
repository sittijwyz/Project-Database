import React from 'react'
import "./Css/GoHome.css"
import { NavLink } from 'react-router-dom'

function GoHome() {
  return (
    <div className='gohome'>
        <p><NavLink end to = "/"><button><i className="fa-solid fa-house"></i></button></NavLink></p>
    </div>
  )
}

export default GoHome