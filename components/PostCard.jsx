import Image from "next/image";
import React from "react";
import classes from "./PostCard.module.scss";

const PostCard = ({ post }) => {
  console.log(post);
  return (
    <div className={classes.root}>
      <figure className={classes.hover_parent}>
        <img
          src={post.image.url}
          alt=""
          // style={{
          //   objectFit: "cover",
          //   width: "172.5px",
          //   height: "172.5px",
          //   // display: "flex",
          // }}
        />
        {/* <Image
          src={post.image}
          alt=""
          objectFit="cover"
          width={172}
          height={172}
        /> */}
        　
        <figcaption className={classes.hover_mask}>
          <div>{post.time}</div>
          <div>{post.desc}</div>
          <div>{post.place.distance}</div>
        </figcaption>
      </figure>
    </div>
  );
};

export default PostCard;
