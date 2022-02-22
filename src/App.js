import React from 'react';
import Navbar from './stripeMenu/components/Navbar';
import Hero from './stripeMenu//components/Hero';
import Sidebar from './stripeMenu//components/Sidebar';
import Submenu from './stripeMenu//components/Submenu';
import "./index.css";
function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Hero />
      <Submenu />
    </>
  );
}

export default App;