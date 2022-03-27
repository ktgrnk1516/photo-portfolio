import Image from "next/image";
import React from "react";
import classes from "./PostCard.module.scss";
// import { useScroll } from "../hooks";

const PostCard = ({ post }) => {
  return (
    <div className={classes.root}>
      <figure className={classes.hover_parent}>
        <img src={post.image.url} alt="" />
        {/* <Image
          src={post.image}
          alt=""
          objectFit="cover"
          width={172}
          height={172}
        /> */}
        　
        <figcaption className={classes.hover_mask}>
          {/* <div>{idx}</div> */}
          <div>{post.time}</div>
          {/* <div>{post.desc}</div> */}
          {/* <div>{post.place.distance}</div> */}
        </figcaption>
      </figure>
    </div>
  );
};

export default PostCard;
