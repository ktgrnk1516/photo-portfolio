import Image from "next/image";
import React from "react";
import classes from "./PostCard.module.scss";
import { useScroll } from "../hooks";




const PostCard = ({ post,timeClick }) => {



 //①カスタムhookのuseScroll
  //ここのindex.jsでpostCardRefというref名を定義
  //useScrollの引数として、stateを想定。=>_app.jsで定義したstate、timeClickを渡す。（clickすると変わるstate）
  //②timeClickの状態は、_app.js=>index.js(Home)=>postCard.jsxの順で渡している
  // console.log(timeClick);
  const postCardRef = useScroll(timeClick);
  //PostCard.jsでpostCardRefを定義するべき？？？？？


  return (
    <div className={classes.root}
    >
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
          <div
             ref={postCardRef}
          >{post.time}</div>
          {/* <div>{post.desc}</div> */}
          {/* <div>{post.place.distance}</div> */}
        </figcaption>
      </figure>
    </div>
  );
};

export default PostCard;
