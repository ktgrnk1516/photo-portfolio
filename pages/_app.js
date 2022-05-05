import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { Layout } from "../components";

//useRefでスクロール
//https://qiita.com/ryo0_heyhey/items/d7ae4c58ee4d4c6b82ab

function MyApp({ Component, pageProps }) {
  //スクロールによって背景色を変える
  const [isVisible, setIsVisible] = useState(false);

  // const toggleVisibility = () => {
  //   window.scrollY > 890 ? setIsVisible(true) : setIsVisible(false);
  // };
  const toggleVisibility = () => {
    window.scrollY > 200 ? setIsVisible(true) : setIsVisible(false);
  };

  //スクロールによって背景色を変える
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  //時間帯を押すとスクロールする機能（ここでは別で定義するカスタムhookに渡す引数であるstateを定義）
  //カスタムhookでもらうの状態と状態を変更する関数（最終的にLayout=>TimeSliderの順番に渡す）
  // const [timeClick, setTimeClick] = useState("false");
  const [timeClick, setTimeClick] = useState("");
  const handleTimeClick = (e) => {
    setTimeClick(e);
    // setTimeClick(!timeClick);
    console.log(e);
  };

  return (
    <>
      <Layout isVisible={isVisible} handleTimeClick={handleTimeClick}>
        <Component
          {...pageProps}
          timeClick={timeClick}
          isVisible={isVisible}
          toggleVisibility={toggleVisibility}
        />
        {/* <div 
        ref={postCardRef}
        >ここまで</div> */}
      </Layout>
    </>
  );
}

export default MyApp;
