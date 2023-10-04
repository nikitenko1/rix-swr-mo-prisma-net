import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CircleLoader } from "react-spinners";
//
import Header from "@/components/header/Header";
import FollowingItem from "@/components/users/FollowingItem";
//
import useGetFollowing from "@/hooks/useGetFollowing";
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

const Following = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: following, isLoading: followingDataLoading } = useGetFollowing(userId as string);
  const { data: user } = useUser(userId as string);

  if (followingDataLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <CircleLoader color={"#3B82F6"} loading={true} size={50} />
      </div>
    );

  return (
    <div className="flex flex-col sm:w-auto lg:w-full mx-5">
      {user && (
        <Header showBackArrow label={user?.name as string} sublabel={user?.customTag as string} />
      )}
      <div
        className="flex flex-col sm:w-full lg:w-auto items-start"
        key={`following+${Math.random() / 2}`}
      >
        {following?.map((following, index) => (
          <>
            <FollowingItem key={index} following={following} />
          </>
        ))}
        {following && following?.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl font-bold text-gray-500">No following</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Following;
