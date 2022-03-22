import "../styles/globals.css";

// import tailwindcss from 'tailwindcss'
import React, { useState, useEffect } from "react";
import { Layout } from "../components";

function MyApp({ Component, pageProps }) {


  //スクロールによって背景色を変える
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    window.scrollY > 200 ? setIsVisible(true) : setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);



  return (
    <Layout isVisible={isVisible}>
      <Component {...pageProps} isVisible={isVisible}/>
    </Layout>
  );
}

export default MyApp;
