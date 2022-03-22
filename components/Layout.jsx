import React, { useState, useEffect } from "react";
import { Header } from "./";
import styles from "./Layout.module.scss";

const Layout = ({ isVisible, children }) => {
  return (
    <div className={isVisible ? styles.black_visible : styles.white_visible}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
