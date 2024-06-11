// src/App.js

import { React, useEffect } from 'react';
import SidebarMenu from '../slideBar/SlideBar';
import './Home.css'
import logo from '../logo.svg';

function Home() {
  return (
    <div className="centered">
      <SidebarMenu />
      <div >
        <img src={logo} className="img" alt="logo" />
      </div>
    </div>
  );
}

export default Home;
