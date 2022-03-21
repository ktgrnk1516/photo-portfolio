import "../styles/globals.css";

// import tailwindcss from 'tailwindcss'
import React, { useState, useEffect } from "react";
import { Layout } from "../components";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
