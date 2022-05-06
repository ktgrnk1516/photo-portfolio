import React, { useEffect, useMemo } from "react";
import styles from "./FirstPhoto.module.scss";

const FirstPhoto = ({ posts }) => {
  //FirstPhotoを現在時刻によって切り替える
  //現在時刻の取得
  let time = new Date();
  let hh = time.getHours().toLocaleString("ja-JP");
  let mm = time.getMinutes().toLocaleString("ja-JP");
  let AMPM = hh + ":" + mm;
  // console.log(AMPM);

  //現在時刻と、posts配列のidx（時間）の頭2文字の時間が一致する配列を取得
  const filterPosts = posts.filter(
    (post) => post.idx.substr(0, 2) === AMPM.substr(0, 2)
  );
  // console.log(filterPosts);

  //再度レンダリングを防ぐためにuseMemo！！！
  const randomFirstPhoto = useMemo(() => {
    if (filterPosts.length === 0) {
      const post = posts[Math.floor(Math.random() * posts.length)].node;
      return (
        <div className={styles.img_root}>
          <img
            src={post.image.url}
            alt=""
            className={styles.img}
            // style={{
            //   objectFit: "cover",
            //   width: "100%",
            //   height: "100%",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   textAlign: "center",
            // }}
          />
        </div>
      );
    } else {
      const filterPost =
        filterPosts[Math.floor(Math.random() * filterPosts.length)].node;
      return (
        // <div className="firstRoot">
        <div className={styles.img_root}>
          <img
            src={filterPost.image.url}
            alt=""
            className={styles.img}
            // style={{
            //   objectFit: "cover",
            //   width: "100%",
            //   height: "100%",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   textAlign: "center",
            //   // margin: "20px",
            // }}
          />
        </div>
        // </div>
      );
    }
  }, []);

  //上のアロー関数で、jsxをreturnしているのを下記で表示！！
  return <>{randomFirstPhoto}</>;
};

export default FirstPhoto;

// export async function getFilterPosts() {
//   const filterPosts = await posts.filter(
//     (post) => post.node.time.toLocaleString().substr(0, 4) === threemojitime
//   );

//   const filterPost = await filterPosts[0].node;
//   console.log(filterPost);
//   console.log(filterPosts);
//   return {
//     props: { filterPosts, filterPost },
//   };
// }
