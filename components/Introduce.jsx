import React, { useContext, useRef } from "react";
import classes from "./Contact.module.scss";
import emailjs from "@emailjs/browser";
// import { ThemeContext } from "../../context";

const Introduce = () => {
  return (
    <div className={classes.root}>
      <div className={classes.c}>
        {/* <div className={classes.c_bg}></div> */}
        <div className={classes.c_wrapper}>
          <div className={classes.c_right}>
            <div className={classes.p}>
           
              <div className={classes.profile}>
              <p >
                <b>Profile</b>
                <br />
                <br />
              </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Temporibus assumenda sunt vel aperiam animi minus aliquam
                  labore perspiciatis. Debitis doloremque fugit eligendi
                  asperiores. Debitis, corporis omnis quo quasi quas atque!
                  <br />
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Facilis mollitia, molestiae odit ullam repellendus minima eum
                  provident vitae eos, delectus esse. Delectus explicabo fuga ex
                  suscipit culpa quas quia fugiat!
                  <br />
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Velit ea, harum unde neque atque adipisci cupiditate eum
                  mollitia, natus voluptate, sequi culpa magnam voluptas
                  officia. Deserunt reprehenderit alias possimus inventore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
