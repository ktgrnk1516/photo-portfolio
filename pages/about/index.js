import React from "react";
import Introduce from "../../components/Introduce";
import classes from "./about.module.scss";

const about = () => {
  return (
    <div className={classes.root}>
      <div className={classes.body_root}>
        <div className={classes.img_wrapper}>
          <img src="https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/24831238/picture_pc_fe3bdf5853ce0d761d3cfee040d55c47.jpg" />
        </div>
        <Introduce />
      </div>
    </div>
  );
};

export default about;
