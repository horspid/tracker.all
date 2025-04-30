import Sidebar from "@components/layout/Sidebar";
import Header from "@components/layout/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex bg-dark pl-40 py-40 h-screen font-sans">
      <Sidebar />
      <div className="w-full overflow-y-scroll">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
