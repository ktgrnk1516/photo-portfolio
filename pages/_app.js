import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { Layout } from "../components";

//useRefでスクロール
//https://qiita.com/ryo0_heyhey/items/d7ae4c58ee4d4c6b82ab

function MyApp({ Component, pageProps }) {
  //スクロールによって背景色を変える
  const [isVisible, setIsVisible] = useState(false);

  //firstPhotoをクリックした時の状態
  const [count, setCount] = useState(1);

  //スクロールで背景色を変える処理
  // const toggleVisibility = (state) => {
  //   window.scrollY > 200 ? setIsVisible(true) : setIsVisible(false);
  // };

  // //スクロールによって背景色を変える
  // useEffect(() => {
  //   window.addEventListener("scroll", toggleVisibility);
  //   return () => window.removeEventListener("scroll", toggleVisibility);
  // }, []);

  //時間帯を押すとスクロールする機能（ここでは別で定義するカスタムhookに渡す引数であるstateを定義）
  //カスタムhookでもらうの状態と状態を変更する関数（関数：Layout=>TimeSliderの順番に渡す。状態：PostCard.jsに渡す。）
  const [timeClick, setTimeClick] = useState("");
  const handleTimeClick = (e) => {
    setTimeClick(e);
    // setTimeClick(!timeClick);
    // console.log(e);
  };

  return (
    <>
      <Layout
        isVisible={isVisible}
        handleTimeClick={handleTimeClick}
        count={count}
        setCount={setCount}
      >
        <Component
          {...pageProps}
          timeClick={timeClick}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          count={count}
          setCount={setCount}
        />
      </Layout>
    </>
  );
}

export default MyApp;
