import React, { useEffect, useRef, useState } from 'react';

import styles from "./App.module.css";
import { Navbar } from './components/Navbar/Navbar';
import { Banner } from './components/Banner/Banner';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';



const App = () => {
  return (
    <div className={styles.App}>
      <Navbar /> 
      <Banner />
    </div>
  );
};

export default App;