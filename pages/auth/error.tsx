import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";

interface IProps {
  errorCode: string;
}

const ErrorPage = ({ errorCode }: IProps) => {
  const router = useRouter();

  return (
    <div className="w-full">
      <h1 className="text-xl font-bold text-center mt-5">An Error Occurred</h1>
      <p className="text text-xl font-medium text-center"> Email or Password is incorrect </p>
      <p className="text text-xl font-medium text-center text-rose-600 underline underline-offset-2">
        {" "}
        {errorCode}{" "}
      </p>
      <div className="flex justify-center mt-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push("/")}
        >
          Home
        </button>
      </div>
    </div>
  );
};

ErrorPage.getInitialProps = ({ query }: NextPageContext) => {
  const { error } = query;
  return { errorCode: error };
};

export default ErrorPage;
