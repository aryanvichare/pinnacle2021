import React from "react";
import Link from "next/link";
import { useAuth } from "lib/auth";

const OnboardingLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black">
      <nav className="max-w-screen-xl mx-auto px-4 md:px-8 xl:px-0 flex flex-row items-center justify-between h-28">
        <Link href="/">
          <a className="flex flex-row items-center space-x-3">
            <img
              className="h-8 w-8 object-contain"
              src="/images/logo.svg"
              alt="Hypnoband Logo"
            />
            <h1 className="text-primary font-bold tracking-wide text-xl">
              HypnoBand
            </h1>
          </a>
        </Link>
        <div className="flex items-center space-x-12">
          <Link href="/how-it-works">
            <a className="text-gray-100 text-sm md:text-md hover:opacity-95">
              How it works
            </a>
          </Link>
          <img
            className="w-10 h-10 rounded-full"
            src={user?.photoUrl}
            alt={user?.name}
          />
        </div>
      </nav>
      {children}
    </div>
  );
};

export default OnboardingLayout;
