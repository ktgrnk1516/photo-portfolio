import React from "react";
import Data from "./data.json";
import styles from "./TimeSlider.module.scss";

const TimeSlider = ({ handleTimeClick }) => {
  return (
    <div
      className={styles.root}
      // onClick={(e)=>handleTimeClick(e.target)}
    >
      <ul>
        {Data.map((data) => (
          <li key={data.id} onClick={(e) => handleTimeClick(e.target.id)}>
            <div className={styles.opa}>
              <span className={styles.ampm} id={data.idx}>
                {data.AMPM}{" "}
              </span>
              <span className={styles.time} id={data.idx}>
                {data.time}{" "}
              </span>
              <span className={styles.daynight} id={data.idx}>
                {data.DayNight}
              </span>
            </div>
            {/* <button onClick={scrollToContents}>scrollToContents！</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeSlider;
