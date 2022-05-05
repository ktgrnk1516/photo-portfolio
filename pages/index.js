import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { PostCard, FirstPhoto, TimeSlider } from "../components";
import { getPosts } from "../services";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
// import { useScroll } from "../hooks";

export default function Home({ posts, timeClick, isVisible, setIsVisible }) {
  // console.log(posts);

  // //①カスタムhookのuseScroll
  // //ここのindex.jsでpostCardRefというref名を定義
  // //useScrollの引数として、stateを想定。=>_app.jsで定義したstate、timeClickを渡す。（clickすると変わるstate）
  // //②timeClickの状態は、_app.js=>index.js(Home)=>postCard.jsxの順で渡している
  // // console.log(timeClick);
  // const postCardRef = useScroll(timeClick);
  // //PostCard.jsでpostCardRefを定義するべき？？？？？

  const [firstSlider, setFirstSlider] = useState(false);

  //少しでもスクロールしたらfirstSliderを表示する
  const handleFirstSlider = () => {
    
    // window.scrollY > 200 ? setFirstSlider(true) : setFirstSlider(false);
    
    
    const targetElement = document.getElementById("flag");
    const clientRect = targetElement.getBoundingClientRect();
    const px =
      // window.pageYOffset +
      clientRect.top -300;

    window.scrollY > px ? setFirstSlider(true) : setFirstSlider(false);
  };

  //少しでもスクロールしたらfirstSliderを表示する
  useEffect(() => {
    window.addEventListener("scroll", handleFirstSlider);
    return () => window.removeEventListener("scroll", handleFirstSlider);
  }, []);

  return (
    <div className={styles.root}>
      <Head>
        <title>ktgrnk</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.body_root}>
        <div
          // className={
          //   `${styles.first_photo} ` +
          //   (firstSlider ? `${styles.show}` : "") +
          //   +(firstSlider2 ? `${styles.show2}` : "")
          // }
          className={
            firstSlider
              ? `${styles.first_photo}   ${styles.show}`
              : `${styles.first_photo} `
          }
        >
          <FirstPhoto
            // post={posts[0].node}
            posts={posts}
          />
        </div>

        <div
          id="flag"
          className={styles.body_wrapper}
          // ref={postCardRef}
        >
          {posts.map((post, index) => (
            <PostCard
              post={post.node}
              key={index}
              idx={post.idx}
              timeClick={timeClick}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
            />
          ))}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

//graphCMSからfetchしてくる関数
export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  //配列postsをソート/オブジェクトの昇順ソート
  //https://keizokuma.com/js-array-object-sort/
  //post.node.timeを時間のみの形にしたい（mapで？）
  let posttimes1 = posts.map((post) => {
    return post.node.time; //整形したい
  });
  //mapでUTC時間をAM/PMの形に整形
  const sorttimes = posttimes1.map((time) => {
    const a = Date.parse(time);
    // const b = new Date(a);
    //↑これだとvercelでUTC時間になってしまう、、、
    //vercelのタイムゾーンは日本対応していない？
    //LINE APIの動画みててたまたまみつけた
    const b = new Date(
      a + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
    );

    //https://qiita.com/Naoki_kkc/items/2a29287834c453d23ecf
    //JavaScriptで時刻の二桁目をゼロ埋めするQiita
    //.toString().padStart(2, '0')!!!!!!
    const hh = b.getHours().toString().toLocaleString("ja-JP").padStart(2, "0");
    const mm = b
      .getMinutes()
      .toString()
      .toLocaleString("ja-JP")
      .padStart(2, "0");
    const saisyutimes = `${hh}:${mm}`;

    return saisyutimes; //map=>returnの組み合わせで整形していっている。
  });

  //配列を書き換え
  posts.map((post, index) => {
    post.node.time = sorttimes[index];
  });
  //配列posts：オブジェクトの時間の昇順ソート
  let result = posts.sort(function (a, b) {
    return a.node.time < b.node.time ? -1 : 1;
  });
  console.log(result);
  // console.log([result]);

  //-----//-----//-----//-----//-----//-----
  //配列postsにidというkeyを新しく追加する "AM 8"とか
  //新しく追加する時はforEachを使うっぽい
  posts.forEach((e) => {
    e.idx = e.node.time.substr(0, 5);
  });
  //-----//-----//-----//-----//-----//-----

  //AM/PMの形に整形
  let times = result.map((post) => {
    return post.node.time; //整形できるようにpostsからtimeを抽出
  });
  //mapでUTC時間をAM/PMの形に整形
  const posttimes2 = times.map((time) => {
    // console.log(time.substr(0, 2));
    const HH = time.substr(0, 2);
    const MM = time.substr(3, 2);

    const saisyutimes =
      HH < 12 ? `AM ${parseInt(HH)}:${MM}` : `PM ${HH - 12}:${MM}`;

    return saisyutimes; //map=>returnの組み合わせで整形していっている。
  });
  // console.log(posttimes2);

  //配列の書き換え
  posts.map((post, index) => {
    post.node.time = posttimes2[index];
  });
  //いらない？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？

  // //配列postsにidというkeyを新しく追加する "AM 8"とか
  // //新しく追加する時はforEachを使うっぽい
  // posts.forEach((e) => {
  //   e.idx = e.node.time.substr(0, 5);
  // });

  return {
    props: { posts },
  };
}
