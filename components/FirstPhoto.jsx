import React, { useEffect } from "react";
import styles from "./FirstPhoto.module.scss";

const FirstPhoto = ({ posts }) => {
  //FirstPhotoを現在時刻によって切り替える
  //現在時刻の取得
  let time = new Date().getHours();
  // console.log(time);
  if (time > 12) {
    time = "PM " + (time - 12);
  } else {
    time = "AM " + time;
  }
  const threemojitime = time.toLocaleString().substr(0, 4);
  console.log(threemojitime);

  const filterPosts = posts.filter(
    (post) => post.node.time.toLocaleString().substr(0, 4) === threemojitime
  );

  const post = posts[9].node;

  if (filterPosts.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          width: "40%",
          height: "30%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
        // margin: "20px",>
      >
        <img
          src={post.image.url}
          alt=""
          className={styles.img}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            // margin: "20px",
          }}
        />
      </div>
    );
  } else {
    const filterPost = filterPosts[0].node;
    return (
      <div
        style={{
          display: "flex",
          width: "40%",
          height: "30%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
        // margin: "20px",>
      >
        <img
          src={filterPost.image.url}
          alt=""
          className={styles.img}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            // margin: "20px",
          }}
        />
      </div>
    );
  }

  // return (
  //   <div className={styles.root}>
  //     <div className={styles.img_wrapper}>
  //       <img
  //         // src={filterPost.image.url}
  //         src={filterPosts.length !== 0 ? filterPost.image.url : post.image.url}
  //         // src={ post.image.url}
  //         alt=""
  //         className={styles.img}
  //       />
  //     </div>
  //   </div>
  // );
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
