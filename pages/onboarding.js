import React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../lib/auth";
import Router from "next/router";

const Onboarding = () => {
  const auth = useAuth();
  console.log(auth);

  return (
    <div className="bg-black min-h-screen">
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <Link href="/">
          <a className="flex flex-row items-center space-x-3 mb-12">
            <img
              className="h-16 w-16 object-contain"
              src="/images/logo.svg"
              alt="Hypnoband Logo"
            />
            <h1 className="text-primary font-bold tracking-wide text-3xl">
              HypnoBand
            </h1>
          </a>
        </Link>
        <h1 className="text-white font-medium text-2xl text-center mb-2">
          Sign in to your account
        </h1>
        <div className="px-4 py-7 rounded-lg">
          <button
            onClick={() =>
              auth.signInWithGoogle().then(() => {
                Router.push("/onboarding/connect");
              })
            }
            className="bg-white border-2 w-96 flex flex-row justify-center items-center rounded shadow-sm transition duration-200 ease-in-out transform hover:-translate-y-1"
          >
            <div className="flex items-center translate-x-4">
              <div className="bg-white inline-block p-2 rounded m-1">
                <FcGoogle size={32} />
              </div>
              <span className="pr-8 text-lg text-black font-semibold">
                Google
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
