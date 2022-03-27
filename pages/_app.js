import "../styles/globals.css";
// import { useScroll } from "../hooks";

// import tailwindcss from 'tailwindcss'
import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useCallback,
  forwardRef,
} from "react";
import { Layout } from "../components";

//useRefでスクロール
//https://qiita.com/ryo0_heyhey/items/d7ae4c58ee4d4c6b82ab

function MyApp({ Component, pageProps }) {
  //スクロールによって背景色を変える
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    window.scrollY > 1400 ? setIsVisible(true) : setIsVisible(false);
  };

  //スクロールによって背景色を変える
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  //時間帯を押すとスクロールする機能
  // const ref = useRef();
  // const useScroll = useCallback(() => {
  //   refContents.current.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }, [ref]);

  //カスタムhookでもらうの状態と状態を変更する関数（最終的にLayout=>TimeSliderの順番に渡す）
  const [timeClick, setTimeClick] = useState(false);
  const handleTimeClick = () => {
    setTimeClick(!timeClick);
  };

  //refの定義！（本当はpostCardで使う？？）
  // const postCardRef = useScroll(timeClick);

  return (
    <>
      <Layout isVisible={isVisible} handleTimeClick={handleTimeClick}>
        <Component {...pageProps} timeClick={timeClick} isVisible={isVisible} />
        {/* <div 
        ref={postCardRef}
        >ここまで</div> */}
      </Layout>
    </>
  );
}

export default MyApp;
