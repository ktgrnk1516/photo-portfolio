import React from "react";
import Contact from "../../components/Contact";
import classes from "./contact.module.scss";

const contact = () => {
  return (
    <div className={classes.root}>
      <div className={classes.body_root}>
        <div className={classes.img_wrapper}>
          <img src="https://64.media.tumblr.com/66d3f6f67c89169c0e35459fcadfeec3/tumblr_osprqkZYtz1v61m19o3_1280.jpg" />
        </div>
        <Contact />
      </div>
    </div>
  );
};

export default contact;
