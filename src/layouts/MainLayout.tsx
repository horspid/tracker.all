import Sidebar from "@components/layout/Sidebar";
import Header from "@components/layout/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex gap-40 bg-dark p-40 h-screen font-sans">
      <Sidebar />
      <div className="w-full">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
