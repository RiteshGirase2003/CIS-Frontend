// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>CIS</h1>
      </div>
      <nav className={styles.nav}>
        <ul>
          {/* <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/profile">Profile</Link></li> */}
        </ul>
      </nav>
      <div className={styles.userActions}>
        <Link to="/create"><button>Create </button></Link>

        <Link to="/scan"><button>Scan </button></Link>

      </div>
    </header>
  );
};

export default Header;
