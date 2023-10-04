import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { GoVerified } from "react-icons/go";

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

// const session = await stripe.checkout.sessions.create({
//     line_items: req.body.line_items,

//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}/success`,
//     cancel_url: `${YOUR_DOMAIN}/cancel`,
//     // The list of payment method types that customers can use. Possible enum values [ card ... ]
//     payment_method_types: ["card"],
//   });

const Success = () => {
  return (
    <div className="flex flex-col justify-start items-center h-screen">
      <Head>
        <title>UA-You | Success</title>
        <meta name="description" content="This is success page" />
        <meta property="og:title" content="UA-You | Success" />
        <meta property="og:description" content="This is success page" />
        <meta property="og:type" content="website" />
      </Head>
      <GoVerified size={200} className="text-sky-500 mb-2" />
      <div className="flex p-2  flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold text-sky-500">Thank you for your registration</h1>
        <h1 className="text-3xl  text-black p-2">
          You have completed first step for verifiction our team will contact with you for other
          information.keep touch your mail
        </h1>
      </div>
    </div>
  );
};

export default Success;
