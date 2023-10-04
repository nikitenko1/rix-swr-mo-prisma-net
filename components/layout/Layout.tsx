import { ReactNode } from "react";
import RightBar from "../rightbar/RightBar";
import Sidebar from "../sidebar/Sidebar";

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <div className="h-screen bg-gray-100">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        {/* By default, Tailwind provides a column count scale from 1-12 */}
        <div className="grid grid-cols-4 h-full xl:grid-cols-9">
          <Sidebar />

          <div className="col-span-3 xl:col-span-4 mt-2 overflow-y-scroll">{children}</div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
