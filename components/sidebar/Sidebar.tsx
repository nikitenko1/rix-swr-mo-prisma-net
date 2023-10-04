import React, { useState } from "react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { signOut } from "next-auth/react";
//
import SidebarFooter from "./SidebarFooter";
import SidebarItem from "./SidebarItem";
//
import useToggle from "@/hooks/useToggle";
import useCurrentUser from "@/hooks/useCurrentUser";

export type Tab = {
  title: string;
  icon: IconType;
  href: string;
  alert?: boolean;
  auth?: boolean;
};

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState<string>("");
  const { data: loginUser } = useCurrentUser();
  const router = useRouter();
  // Lets say your url is http://localhost:3000/service?serviceId=1
  // console.log(router.pathname); // returns /service
  const url = router.asPath;
  // console.log(router.asPath); //returns /service?serviceId=1

  const Tabs: Tab[] = [
    {
      title: "Home",
      icon: AiOutlineHome,
      href: "/",
    },
    {
      title: "Messages",
      icon: AiOutlineMessage,
      href: "/",
    },
    {
      title: "Notifications",
      icon: IoIosNotificationsOutline,
      href: "/notifications",
      alert: loginUser?.user?.hasNotifications,
      auth: true,
    },
    {
      title: "Search",
      icon: BsSearch,
      href: "/search",
    },
    {
      title: "Settings",
      icon: IoSettingsOutline,
      href: "/settings",
    },
  ];

  const { register } = useToggle();
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      <div className="col-span-1 xl:col-span-2 mr-5 mt-2  rounded-lg">
        <div className="flex flex-col justify-center items-center">
          <>
            {Tabs.map((tab, index) => (
              <div className="space-y-2 lg:w-[230px] mx-5" key={`${Math.random() / 2}+"tabs"`}>
                {currentUser && (
                  <SidebarItem
                    key={`${index}+"tab"`}
                    tab={tab}
                    selectedTab={tab.title === selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                )}
              </div>
            ))}
          </>
          {currentUser && url === "/" && (
            <div
              className="flex items-center self-start p-2 gap-4 cursor-pointer"
              onClick={() => signOut()}
            >
              <MdLogout className=" text-gray-500 text-xl" size={25} title="LogOut" />
              <p className="text-md font-semibold text-gray-500 hidden md:block">Logout</p>
            </div>
          )}

          <div className="self-start">
            <SidebarFooter key={"sidebarFooter+1"} />
          </div>
        </div>

        {!currentUser && url === "/" && (
          <div className="flex justify-center" key="new user">
            <div className="ml-5 w-auto hidden md:block" key={"follow user"}>
              <h1 className="text-center mt-2 text-2xl font-semibold">New To SkillMatch</h1>
              <div
                className="flex items-center mt-2 border-2 justify-center border-solid border-gray-400 
                mb-3 rounded-lg p-1 cursor-pointer"
                onClick={register}
              >
                <FiLogIn className=" text-gray-500 text-md mr-2" title="SignUp/Login" />
                <p className="text-md font-semibold text-gray-500">SignUp</p>
              </div>

              <p className="text-md text-gray-500 md:p-1 leading-6">
                By signing up, you agree to the{" "}
                <span className="underline text-blue-400 cursor-pointer">Terms of Service</span> and{" "}
                <span className="underline text-blue-400 cursor-pointer">Privacy Policy</span>,
                including <span className="underline text-blue-400 cursor-pointer">Cookie</span>{" "}
                Use.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
