import React from "react";
import { Header } from "./";

const Layout = ({isVisible,children}) => {
  return (
    <>
      <Header isVisible={isVisible}/>
      {children}
    </>
  );
};

export default Layout;
