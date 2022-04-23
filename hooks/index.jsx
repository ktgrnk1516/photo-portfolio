import React, { useEffect, useRef } from "react";

export const useScroll = (state) => {
  const ref = useRef(null);
  useEffect(() => {
    //いま参照している要素を取得
    const element = ref.current;
    const a_element = element.outerHTML.substr(5);
    const b_element = a_element.slice( 0, -9 );
    
    // console.log(a_element);
    // console.log(b_element);
    // console.log(state);

    if (state !== b_element) {
      return;
    }

    //処理:
    element.scrollIntoView({
      behavior: "smooth",
    });
  }, [state]);
  return ref;
};
