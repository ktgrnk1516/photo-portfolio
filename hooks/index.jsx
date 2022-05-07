// カスタムフック（useRef）
//https://lab.syncer.jp/Web/JavaScript/Snippet/10/

import React, { useCallback, useEffect, useRef } from "react";

export const useScroll = (state, setIsVisible) => {
  const ref = useRef(null);

  //機能①TimeSlider
  const bgScroll = useCallback(() => {
    //いま参照している要素を取得
    const element = ref.current;
    const a_element = element.outerHTML.substr(5);
    const b_element = a_element.slice(0, -9);

    // console.log(a_element);
    // console.log(b_element);
    // console.log(state);

    //clickした時間と同じ要素へ飛ばすための条件
    if (state !== b_element) {
      return;
    }

    //処理:
    //【JavaScript】scrollIntoView()で指定した要素の位置までスクロールする
    //blockプロパティ:centerで要素が中央にくるまでスクロール
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);


  useEffect(() => {
    bgScroll();
  }, [state]);






  ////機能②背景色の変更
  const bgGround = useCallback(() => {
    //いま参照している要素を取得
    const element = ref.current;
    const a_element = element.outerHTML.substr(5);
    const b_element = a_element.slice(0, -9);

    //処理:
    //受け取った画面内の要素と、b_elementを比較し、このフック内部で作成する状態を変化させる。このフック内部で他した状態によって、背景色のclassをtoggleする
    let options = {
      threshold: 1, //完全にviewした時
      rootMargin: "-45% 0%", //画面の中央のみ有効
    };

    let observer = new IntersectionObserver(callback, options);

    const target = observer.observe(element);
    // console.log(target);

    function callback(entries) {
      // console.log(entries[0].target);
      // console.log(entries[0].isIntersecting);

      //entries[0].targetをstringに整形
      const c_element = entries[0].target.outerHTML.substr(5);
      const d_element = c_element.slice(0, -9);

      //パフォーマンスの向上
      if (d_element !== "PM 6" && d_element !== "AM 8") {
        return;
      }

      if (d_element === "PM 6") {
        //スクロールで背景色を変える処理
        // console.log(entries[0].target);

        const clientRect = entries[0].target.getBoundingClientRect();
        const px = window.pageYOffset + clientRect.top - 300;
        //↑該当時間の要素等の最後になるから、2段くらいあげる（-600のとこ）
        // console.log(px);
        const toggleVisibility = () => {
          window.scrollY > px ? setIsVisible(true) : setIsVisible(false);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
      } else if (d_element === "AM 8") {
        //スクロールで背景色を変える処理
        // console.log(entries[0].target);

        const clientRect = entries[0].target.getBoundingClientRect();
        const px = window.pageYOffset + clientRect.top - 300;
        //↑該当時間の要素等の最後になるから、2段くらいあげる（-600のとこ）
        // console.log(px);
        const toggleVisibility = () => {
          window.scrollY > px ? setIsVisible(false) : setIsVisible(true);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
      }
    }
  }, []);

  useEffect(() => {
    bgGround();
  }, [setIsVisible]);

  return ref;
};
