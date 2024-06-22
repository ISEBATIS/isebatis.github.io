import React, { useState } from "react";

import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";
import { SlArrowDown } from "react-icons/sl";
import img from "../../assets/personal/linkedin.svg";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const connectWithMe = () => {
    window.open('https://be.linkedin.com/in/ilias-sebati'); // todo make env variables or const class with those values
  }

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="/">
        Ilias Sebati
      </a>
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageUrl("nav/closeIcon.png")
              : getImageUrl("nav/menuIcon.png")
          }
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a>About me</a>
          </li>
          <li>
            <a>Projects</a>
          </li>
          <li>
            <a>Blogs</a>
          </li>
          <li>
            <div className={styles.moreButtons}>
              <span className={styles.more}>More</span>
              <span>
                <SlArrowDown className={styles.arrowDownIcon} />
              </span>
            </div>
          </li>
        </ul>

        <div onClick={connectWithMe}  className={styles.joinMe} href="www.google.com">
          <span> Connect with me </span> <img width={"40px"} height={"40px"} src={img}/>
        </div>
        
        <div className={styles.contactMe}>
          Contact Me
        </div>

      </div>
    </nav>
  );
};
