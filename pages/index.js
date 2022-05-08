import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { PostCard, FirstPhoto, TimeSlider } from "../components";
import { getPosts } from "../services";
import { useEffect, useState, useCallback } from "react";
import Footer from "../components/Footer";
// import { useScroll } from "../hooks";

export default function Home({
  b2,
  timeClick,
  isVisible,
  setIsVisible,
  count,
  setCount,
}) {
  const [a2, setA2] = useState(b2);
  console.log(a2);

  const [firstSlider, setFirstSlider] = useState(false);

  // //firstPhotoをクリックした時の状態
  // const [count, setCount] = useState(0);

  //graphCMSからfetchしてくる関数
  // useEffect(() => {
  const getProps = useCallback(async () => {
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
      const hh = b
        .getHours()
        .toString()
        .toLocaleString("ja-JP")
        .padStart(2, "0");
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

    //配列posts：オブジェクトの時間の昇順ソート（すでに〇〇：〇〇も形式になっている？）
    let result = posts.sort(function (a, b) {
      return a.node.time < b.node.time ? -1 : 1;
    });

    // console.log(result);

    // { node: { image: [Object], time: '15:32', place: null, desc: null } },

    //--------------------//--------------------//--------------------//--------------------//--------------------

    //現在の時間を起点に並び替え
    let time = new Date(
      Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
    );
    let hh = time.getHours().toLocaleString("ja-JP").padStart(2, "0");
    let mm = time.getMinutes().toLocaleString("ja-JP");
    let AMPM = hh + ":" + mm;
    const result3 = AMPM.substr(0, 2);
    // const result3 = "10"; //★★★★★★★★★
    // console.log(result3);

    //現在時刻に一致するindexを調べる
    const result1 = result.map((r) => r.node.time.substr(0, 2));
    // console.log(result1);

    // let lind = count;
    let ind = result1.indexOf(result3) + count;
    // console.log(lind);
    console.log(ind);

    ////ind番目の要素から最後までの要素を取り出す
    let a2 = result.slice(ind);
    // console.log(a2);

    ////最初からind番目-1までの要素を取り出す
    let a3 = result.slice(0, ind);
    // console.log(a3);

    //★★★★★★★★★★★★★★★★★★★★★★結合★★★★★★★★★★★★★★★★★★★★★★
    //★★★★★★★★★★★★★★★★★★★★★★結合★★★★★★★★★★★★★★★★★★★★★★
    //★★★★★★★★★★★★★★★★★★★★★★結合★★★★★★★★★★★★★★★★★★★★★★
    //★★★★★★★★★★★★★★★★★★★★★★結合★★★★★★★★★★★★★★★★★★★★★★
    //★★★★★★★★★★★★★★★★★★★★★★結合★★★★★★★★★★★★★★★★★★★★★★
    a2.push(...a3);
    // console.log(a2);

    //-----//-----//-----//-----//-----//-----
    //配列postsにidというkeyを新しく追加する "AM 8"とか
    //新しく追加する時はforEachを使うっぽい
    a2.forEach((e) => {
      e.idx = e.node.time.substr(0, 5);
    });
    //-----//-----//-----//-----//-----//-----

    //--------------------//--------------------//--------------------//--------------------

    //AM/PMの形に整形
    let times = a2.map((post) => {
      // let times = a3.map((post) => {
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
    a2.map((post, index) => {
      post.node.time = posttimes2[index];
    });

    if (!a2) {
      return;
    } else {
      setA2(a2);
    }
  }, [count]);

  useEffect(() => {
    getProps();
  }, [count]);

  //少しでもスクロールしたらfirstSliderを表示する
  const handleFirstSlider = () => {
    // window.scrollY > 200 ? setFirstSlider(true) : setFirstSlider(false);

    const targetElement = document.getElementById("flag");
    const clientRect = targetElement.getBoundingClientRect();
    const px =
      // window.pageYOffset +
      clientRect.top - 350;

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
          className={
            firstSlider
              ? `${styles.first_photo}   ${styles.show}`
              : `${styles.first_photo} `
          }
        >
          <FirstPhoto posts={a2} count={count} setCount={setCount} />
        </div>

        <div
          id="flag"
          className={styles.body_wrapper}
          // ref={postCardRef}
        >
          {a2.map((post, index) => (
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

  //配列posts：オブジェクトの時間の昇順ソート（すでに〇〇：〇〇も形式になっている？）
  let result = posts.sort(function (a, b) {
    return a.node.time < b.node.time ? -1 : 1;
  });

  // console.log(result);

  // { node: { image: [Object], time: '15:32', place: null, desc: null } },

  //--------------------//--------------------//--------------------//--------------------//--------------------

  //現在の時間を起点に並び替え
  let time = new Date(
    Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
  );
  let hh = time.getHours().toLocaleString("ja-JP").padStart(2, "0");
  let mm = time.getMinutes().toLocaleString("ja-JP");
  let AMPM = hh + ":" + mm;
  const result3 = AMPM.substr(0, 2);
  // const result3 = "10"; //★★★★★★★★★
  // console.log(result3);

  //現在時刻に一致するindexを調べる
  const result1 = result.map((r) => r.node.time.substr(0, 2));
  console.log(result1);

  // let lind = count;
  let ind = result1.indexOf(result3);
  // console.log(lind);
  console.log(ind);

  ////ind番目の要素から最後までの要素を取り出す
  let b2 = result.slice(ind);
  // console.log(b2);

  ////最初からind番目-1までの要素を取り出す
  let a3 = result.slice(0, ind);
  // console.log(a3);

  //★★★★★★★★★★★★★★★★★★★★★★結合★★★★★★★★★★★★★★★★★★★★★★
  //★★★★★★★★★★★★★★★★★★★★★★結合★★★★★★★★★★★★★★★★★★★★★★
  //★★★★★★★★★★★★★★★★★★★★★★結合★★★★★★★★★★★★★★★★★★★★★★
  //★★★★★★★★★★★★★★★★★★★★★★結合★★★★★★★★★★★★★★★★★★★★★★
  //★★★★★★★★★★★★★★★★★★★★★★結合★★★★★★★★★★★★★★★★★★★★★★
  b2.push(...a3);
  // console.log(b2);

  //-----//-----//-----//-----//-----//-----
  //配列postsにidというkeyを新しく追加する "AM 8"とか
  //新しく追加する時はforEachを使うっぽい
  b2.forEach((e) => {
    e.idx = e.node.time.substr(0, 5);
  });
  //-----//-----//-----//-----//-----//-----

  //--------------------//--------------------//--------------------//--------------------

  //AM/PMの形に整形
  let times = b2.map((post) => {
    // let times = a3.map((post) => {
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
  b2.map((post, index) => {
    post.node.time = posttimes2[index];
  });

  return {
    props: { b2 },
  };
}

//postsをa2に変換（現在時刻によって並び替える！（オブジェクトの並び替えslice）
