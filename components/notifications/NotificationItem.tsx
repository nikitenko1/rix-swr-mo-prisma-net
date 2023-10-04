import React, { useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import Head from "next/head";
import Link from "next/link";
//
import Avatar from "../Avatar";
import { Notification } from "@prisma/client";

type NotificationItemProps = {
  notification: Notification;
};

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const createdAt = useMemo(() => {
    // const distance = formatDistanceToNowStrict(new Date('2022-02-28T12:00:00'));
    // Output: "in 1 year"
    return formatDistanceToNowStrict(new Date(notification.createdAt), { addSuffix: true });
    // addSuffix option to true, which will add the words "ago" or "in" to the output
  }, [notification.createdAt]);

  return (
    <div className="w-full p-2">
      <Head>
        <title>UA-You ... Notifications</title>
        <meta name="description" content={notification?.body} />
        <meta property="og:title" content={notification?.body!} />
        <meta property="og:description" content={notification?.body!} />

        <meta property="og:type" content="website" />
      </Head>
      <div className="flex gap-2 items-center ">
        <Avatar userId={notification?.fromId as string} />

        <Link href={notification.link}>
          <p className="text-blue-500 hover:underline">{notification?.body}</p>
          <p className="text-md text-gray-700 ">{createdAt}</p>
        </Link>
      </div>
    </div>
  );
};

export default NotificationItem;
