import styles from "./MainLayout.module.scss";

import Sidebar from "@components/layout/Sidebar";
import Header from "@components/layout/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.container__content}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
