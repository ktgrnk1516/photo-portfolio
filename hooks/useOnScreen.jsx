//背景色をどのPostCardの要素画面に表示されているかによって変えたい。
//https://fuuno.net/ani/ani66/ani66.html
//https://fuuno.net/ani/ani54/ani54.html

import { useEffect, useRef, useState } from "react";

export const useOnScreen = (state) => {
  //いま参照している要素を取得するためのref
  const ref = useRef(null);
  useEffect(() => {
    //いま参照している要素を取得
    const element = ref.current;
    // const a_element = element.outerHTML.substr(5);
    // const b_element = a_element.slice(0, -9);

    // console.log(a_element);
    // console.log(b_element);
    // console.log(state);

    // if (state !== b_element) {
    //   return;
    // }

    // console.log(b_element);

    //処理:
    //受け取った画面内の要素と、b_elementを比較し、このフック内部で作成する状態を変化させる。このフック内部で他した状態によって、背景色のclassをtoggleする

    let observer = new IntersectionObserver(callback, options);

    const target = observer.observe(element);
    // console.log(target);

    function callback(entries) {
      // console.log(entries[0].target);
      // console.log(entries[0].isIntersecting);

      //entries[0].targetをstringに整形
      const a_element = entries[0].target.outerHTML.substr(5);
      const b_element = a_element.slice(0, -9);
      // console.log(b_element);

      // 時間によって処理を分ける=>処理じっくり考える
      if (b_element === "PM 8") {
        console.log("PM 8");
      }
    }

    let options = {
      rootMargin: "30%",
    };
  }, [state]);
  return ref;
};
