import React from "react";
import Header from "../components/Header/Header.component";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={`${styles.layoutOptions}`}>
      <Header />
      <main className={`${styles.mainStyleOptions}`}>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
