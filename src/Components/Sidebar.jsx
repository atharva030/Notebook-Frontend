import React from 'react'
import '../Styles/sidebar.css'
import {  Link,useLocation, useNavigate } from "react-router-dom";
const Sidebar = (props) => {
  let location = useLocation();
  let navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
    props.showAlert("Will Meet Soon!!","success")
  }
  return (
    <>
    <div class="header">
      <ul className='head-list'>
      {!localStorage.getItem('token')?<div className="d-flex">
        <Link className="btn btn-primary mx-2" to="/signup"  role="button">Sign Up</Link>
        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
      </div>:<button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
      </ul>
    </div>
    <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu"/>
    <label for="openSidebarMenu" class="sidebarIconToggle">
      <div class="spinner diagonal part-1"></div>
      <div class="spinner horizontal"></div>
      <div class="spinner diagonal part-2"></div>
    </label>
    <div id="sidebarMenu">
      <ul class="sidebarMenuInner">
        <li>Jelena Jovanovic <span>Web Developer</span></li>
        <li><a href="https://vanila.io" target="_blank">Company</a></li>
        <Link className={`nav-link ${location.pathname==="/" ? "active":""}`} aria-current="page" to="/">Home</Link>
        <Link className={`nav-link ${location.pathname==="/about " ? "active":""}`} to="/about">About</Link>
        
        <li><a href="https://twitter.com/plavookac" target="_blank">Twitter</a></li>
        <li><a href="https://www.youtube.com/channel/UCDfZM0IK6RBgud8HYGFXAJg" target="_blank">YouTube</a></li>
        <li><a href="https://www.linkedin.com/in/plavookac/" target="_blank">Linkedin</a></li>
      </ul>
    </div>
   
    </>
  );
}

export default Sidebar