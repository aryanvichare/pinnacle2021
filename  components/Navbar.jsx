import React from "react";
import Link from "next/link";

const navLinks = [
  {
    name: "How it works",
    href: "how-it-works",
  },
  {
    name: "Get Started",
    href: "get-started",
  },
];

const Navbar = () => {
  return (
    <nav className="max-w-screen-xl mx-auto px-4 md:px-8 xl:px-0 flex flex-row items-center justify-between h-28">
      <Link href="/">
        <a className="flex flex-row items-center space-x-3">
          <img
            className="h-8 w-8 object-contain"
            src="/images/logo.svg"
            alt="Hypnoband Logo"
          />
          <h1 className="text-primary font-bold tracking-wide text-xl">
            NeuroWay
          </h1>
        </a>
      </Link>
      <div className="flex items-center space-x-12">
        {navLinks.map((l, idx) => (
          <Link key={idx} href={l.href}>
            <a className="text-gray-100 text-sm md:text-md hover:opacity-95">
              {l.name}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
