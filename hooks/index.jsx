import React, { useEffect, useRef } from "react";

export const useScroll = (state) => {
  const ref = useRef(null);
  useEffect(() => {
    //いま参照している要素を取得
    const element = ref.current;

    if (!state) {
      return;
    }

    //処理:
    element.scrollIntoView({
      behavior: "smooth",
    });
  }, [state]);
  return ref;
};
