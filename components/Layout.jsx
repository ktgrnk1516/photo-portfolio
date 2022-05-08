import React, { useState, useEffect } from "react";
import { Header } from "./";
import { TimeSlider } from "./";
import styles from "./Layout.module.scss";

const Layout = ({ isVisible, children, handleTimeClick, count }) => {
  const [timeSlider, setTimeSlider] = useState(false);

  //少しでもスクロールしたらTimeSliderを表示する
  const handleTimeSlider = () => {
    window.scrollY > 1 ? setTimeSlider(true) : setTimeSlider(false);
  };

  //少しでもスクロールしたらTimeSliderを表示する
  useEffect(() => {
    window.addEventListener("scroll", handleTimeSlider);
    return () => window.removeEventListener("scroll", handleTimeSlider);
  }, []);

  return (
    <div className={isVisible ? styles.black_visible : styles.white_visible}>
      <Header />
      <div className={styles.test}>
        <div className={styles.left_or_right}>
          <div
            className={
              timeSlider ? `${styles.left}   ${styles.show}` : `${styles.left} `
            }
          >
            <TimeSlider handleTimeClick={handleTimeClick} count={count} />
          </div>
          <div className={styles.right}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
