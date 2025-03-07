import { Outlet } from "react-router";
import styles from "./Sidebar.module.scss";

import Sidebar from "@components/layout/Sidebar";
import Header from "@components/layout/Header";

const SidebarLayout = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Header />
      {/* <Outlet /> */}
    </div>
  );
};

export default SidebarLayout;
