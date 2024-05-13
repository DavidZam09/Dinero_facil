// src/App.js

import React from 'react';
import SidebarMenu from '../slideBar/SlideBar';

function Home() {
  return (
    <div className="App">
    <header className="App-header">
      <h1>Home</h1>
    </header>
    <SidebarMenu />
  </div>
  );
}

export default Home;
