import React, { useRef, createRef } from "react";
import Data from "./data.json";
import styles from "./TimeSlider.module.scss";

const TimeSlider = ({ handleTimeClick }) => {
  return (
    <div className={styles.root} onClick={handleTimeClick}>
      <ul>
        {Data.map((data) => (
          <li key={data.id}>
            <div className={styles.opa}>
              <span className={styles.ampm}>{data.AMPM} </span>
              <span className={styles.time}>{data.time}</span>
              <span className={styles.daynight}>{data.DayNight}</span>
            </div>
            {/* <button onClick={scrollToContents}>scrollToContents！</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeSlider;
