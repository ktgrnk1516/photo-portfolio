import Image from "next/image";
import React, { useEffect } from "react";
import classes from "./PostCard.module.scss";

//カスタムフックのインポート
import { useScroll } from "../hooks"; //TimeSlider

const PostCard = ({ post, timeClick, setIsVisible }) => {
  //カスタムhookのuseScroll
  const postCardRef = useScroll(timeClick, setIsVisible);
  //機能①
  //ここのindex.jsでpostCardRefというref名を定義
  //useScrollの引数として、stateを想定。=>_app.jsで定義したstate、timeClickを渡す。（clickすると変わるstate）
  //②timeClickの状態は、_app.js=>index.js(Home)=>postCard.jsxの順で渡している
  // console.log(timeClick);

  //機能②
  //背景色のカスタムフック
  //現在画面内に写っているPostCardの要素を取得して、stateに保存し、背景色のカスタムフックに渡す

  return (
    <div className={classes.root}>
      <figure className={classes.hover_parent}>
        <img src={post.image.url} alt="" />　
        <figcaption className={classes.hover_mask}>
          <div ref={postCardRef}>{post.time}</div>
        </figcaption>
      </figure>
    </div>
  );
};

export default PostCard;
