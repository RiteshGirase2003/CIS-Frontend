// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Scan from './pages/Scan';
import './App.css'; 
import Create from './pages/Create';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Scan />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/create" element={<Create />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

const Home = () => <div><h2>Home Page</h2></div>;

export default App;
