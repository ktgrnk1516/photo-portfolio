import Image from "next/image";
import React, { useEffect } from "react";
import classes from "./PostCard.module.scss";

//カスタムフックのインポート
import { useScroll } from "../hooks"; //TimeSlider
import { useOnScreen } from "../hooks/useOnScreen"; //背景色を変える

const PostCard = ({ post, timeClick, isVisible }) => {
  // useEffect(() => {
  //   const elem = document.getElementById("photo");

  //   let observer = new IntersectionObserver(callback, options);

  //   const target = observer.observe(elem);
  //   // console.log(target);

  //   function callback(entries) {
  //     console.log(entries[0].isIntersecting);
  //     console.log(entries[0].target);
  //   }

  //   let options = {
  //     rootMargin:"30%"
  //   };
  // }, []);

  //①カスタムhookのuseScroll
  //ここのindex.jsでpostCardRefというref名を定義
  //useScrollの引数として、stateを想定。=>_app.jsで定義したstate、timeClickを渡す。（clickすると変わるstate）
  //②timeClickの状態は、_app.js=>index.js(Home)=>postCard.jsxの順で渡している
  // console.log(timeClick);
  const postCardRef = useScroll(timeClick);

  //現在画面内に写っているPostCardの要素を取得して、stateに保存し、背景色のカスタムフックに渡す

  //背景色のカスタムフック
  // const targetViewPosition = useOnScreen(isVisible);

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
          <div
            ref={postCardRef}
            // ref={targetViewPosition}
          >
            {post.time}
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default PostCard;
