import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
//
import Header from "@/components/header/Header";
import NotificationFeed from "@/components/notifications/NotificationFeed";

const Notifications = () => {
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationFeed />
    </>
  );
};
export default Notifications;

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
