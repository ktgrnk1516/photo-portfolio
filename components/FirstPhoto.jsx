import React, { useEffect, useMemo, useRef } from "react";
import styles from "./FirstPhoto.module.scss";

const FirstPhoto = ({ posts, count, setCount }) => {
  //firstPhotoをクリックした時の処理（あとで最適化する？）
  const handleFirstPhotoClicked = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // useEffect(() => {
  //   console.log(count);
  // }, [count]);

  //再度レンダリングを防ぐためにuseMemo！！！
  const randomFirstPhoto = useMemo(() => {
    const post = posts[0].node;
    return (
      <div className={styles.img_root} onClick={handleFirstPhotoClicked}>
        <img src={post.image.url} alt="" className={styles.img} />
        <div className={styles.post_time}>{post.time}</div>
      </div>
    );
  }, [count]);

  //上のアロー関数で、jsxをreturnしているのを下記で表示！！
  return <>{randomFirstPhoto}</>;
};

export default FirstPhoto;
