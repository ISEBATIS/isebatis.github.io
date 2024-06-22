import React from "react";

import styles from "./Banner.module.css";
import { getImageUrl } from "../../utils";
import CopyEmail from "./CopyEmail";


const calculateExperience = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();
  const diff = now - start;
  const diffInYears = diff / (1000 * 60 * 60 * 24 * 365.25); // Calculate difference in years
  return diffInYears.toFixed(1); // Format to one decimal place
};

const startDate = "2023-09-01";



export const Banner = () => {

  const experienceDuration = calculateExperience(startDate);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>DevOps engineer. Building the future of technology.</h1>
        <p className={styles.description}>
          Passionate about DevOps and Cloud technologies. Join me on this journey to explore more.
        </p>

        <div className={styles.heroButtons}>
          <CopyEmail /> <spanan className={styles.downloadCV}>Download CV</spanan>
        </div>
      </div>
      <img
        src={getImageUrl("personal/ship_image.png")}
        alt="Image of a ship"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
