import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { CircleLoader } from "react-spinners";
//
import Header from "@/components/header/Header";
import PostFeed from "@/components/posts/PostFeed";
import Project from "@/components/users/Project";
import Skill from "@/components/users/Skill";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
//
import usePosts from "@/hooks/usePosts";
import useUser from "@/hooks/useUser";

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

const User = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchUser, isLoading } = useUser(userId as string);

  const { isLoading: loading } = usePosts(userId as string);

  if (isLoading || !fetchUser)
    return (
      <div className="flex justify-center items-center h-full">
        <CircleLoader color={"#3B82F6"} loading={true} size={50} />
      </div>
    );

  return (
    <>
      <Head>
        <title>
          {fetchUser.name}({fetchUser.customTag})/
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header showBackArrow label={fetchUser.name as string} />
      <UserHero userId={userId as string} />

      <UserBio userId={userId as string} />
      <Skill />
      <Project />

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CircleLoader color="#3B82F6" size={50} />
        </div>
      ) : (
        <PostFeed userId={userId as string} />
      )}
    </>
  );
};

export default User;
