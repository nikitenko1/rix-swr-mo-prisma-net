import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { AiOutlineMobile } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { MdHeartBroken } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbMathGreater } from "react-icons/tb";
//
import Header from "@/components/header/Header";
//
import useNumberVerify from "@/hooks/useNumberVerifyModal";
import useVerifyModal from "@/hooks/useVerifyModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

const Settings = () => {
  const router = useRouter();
  const verifyModal = useVerifyModal();
  const verify = useNumberVerify();

  return (
    <>
      <Head>
        <title>Your Account / UA-You</title>
        <meta name="description" content="User setting page" />
        <meta property="og:title" content="Your Account | UA-You" />
        <meta property="og:description" content="User can change there setting from this page" />

        <meta property="og:url" content="https://example.com/my-page" />
        <meta property="og:type" content="website" />
      </Head>
      <Header label={"Settings"} showBackArrow />
      <div
        className="hidden md:grid grid-cols-2 gap-4 mt-2
      divide-x divide-sky-500"
      >
        <div className="col-span-1 gap-5 items-center p-2">
          <div className="flex justify-between items-center hover:cursor-pointer">
            <h1 className="ml-2 text-md text-gray-600 font-semibold">Your Account</h1>
            <TbMathGreater />
          </div>
          <div
            className="flex justify-between items-center hover:cursor-pointer"
            onClick={verifyModal.onOpen}
          >
            <h1 className="ml-2 text-md text-gray-600 font-semibold">Verification</h1>
            <TbMathGreater className="text-sky-500" />
          </div>
        </div>

        <div className="col-span-1 hover:cursor-pointer p-2">
          <div className="flex gap-3 items-center">
            <CgProfile className="hidden md:block text-md text-gray-400 ml-1" size={20} />

            <h1 className="hidden md:block text-md text-black font-medium">Account Information</h1>
          </div>
          <p className="text-sm text-gray-500">
            See your account information like your phone number email address
          </p>
          <div className="flex gap-3 items-center">
            <AiOutlineMobile className="hidden md:block  text-md text-black ml-1 mt-5" size={20} />
            <h1
              className="hidden md:block text-md text-black font-medium mt-5 hover:underline"
              onClick={verify.onOpen}
            >
              Verify number
            </h1>
          </div>
          <p className="text-sm text-gray-500">
            Verify your phone number to get more features like verification
          </p>
          <div className="p-2">
            <div className="flex gap-3 items-center">
              <BsKey className="hidden md:block text-md text-gray-400" size={20} />

              <h1 className="text-md text-black font-medium">Change Password</h1>
            </div>
            <p className="text-sm text-gray-500">Change your Password at anytime </p>
          </div>
          <div className="p-2">
            <div className="flex gap-3 items-center">
              <MdHeartBroken className="hidden md:block  text-md text-gray-400" size={20} />

              <h1
                className="text-md text-black font-medium hover:underline"
                onClick={() => router.push("/settings/deactive")}
              >
                Deactive your Account
              </h1>
            </div>
            <p className="text-sm text-gray-500">Find out how you can deactive your account </p>
          </div>
        </div>
      </div>
      <>
        <div className="sm:grid md:hidden  gap-4 mt-2 ">
          <div className="col-span-1  hover:cursor-pointer p-2 ">
            <div className="flex gap-3 items-center ">
              <CgProfile className="block text-md text-gray-400 ml-1" size={20} />

              <h1 className="block text-md text-black font-medium">Account Information</h1>
            </div>
            <p className="text-sm text-gray-500">
              See your account information like your phone number email address{" "}
            </p>
            <div className="flex gap-3 items-center">
              <AiOutlineMobile className="  text-md text-black ml-1 mt-5" size={20} />

              <h1
                className="text-md text-black font-medium mt-5 hover:underline"
                onClick={verify.onOpen}
              >
                Verify number
              </h1>
            </div>
            <p className="text-sm text-gray-500">
              Verify your phone number to get more features like verification{" "}
            </p>
            <div className="p-2">
              <div className="flex gap-3 items-center">
                <BsKey className="  text-md text-gray-400" size={20} />

                <h1 className="text-md text-black font-medium">Change Password</h1>
              </div>
              <p className="text-sm text-gray-500">Change your Password at anytime </p>
            </div>
            <div className="p-2">
              <div className="flex gap-3 items-center">
                <MdHeartBroken className=" text-md text-gray-400" size={20} />

                <h1
                  className="text-md text-black font-medium hover:underline"
                  onClick={() => router.push("/settings/deactive")}
                >
                  Deactive your Account
                </h1>
              </div>
              <p className="text-sm text-gray-500">Find out how you can deactive your account</p>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Settings;
