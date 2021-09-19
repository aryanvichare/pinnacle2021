import React, { useState } from "react";
import OnboardingLayout from "../../ components/OnboardingLayout";
import clsx from "clsx";
import Router from "next/router";
import { useAuth } from "lib/auth";
import { firestore } from "lib/firebase";

const programs = [
  {
    id: "sleep",
    name: "Sleep",
    image: "/images/sleep.svg",
  },
  {
    id: "relax",
    name: "Deep Relaxation",
    image: "/images/lotus.svg",
  },
  { id: "focus", name: "Focus", image: "/images/focus.svg" },
];

const ChooseProgram = () => {
  const auth = useAuth();
  const [selected, setSelected] = useState("sleep");

  const handleNext = async () => {
    const uid = auth?.user?.uid;
    if (!uid) return;
    try {
      await firestore
        .collection("users")
        .doc(uid)
        .update({ program: selected });
      Router.push(`/onboarding/${selected}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <OnboardingLayout>
      <div className="pt-16 pb-12 text-white">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 xl:px-0">
          <h1 className="text-center text-primary font-semibold text-3xl md:text-4xl leading-tight">
            Select your desired program
          </h1>
          <p className="mx-auto mt-4 text-gray-100 leading-relaxed text-md max-w-2xl text-center">
            We personalized each of binaural beats based on your brainwave
            frequencies to help reach your maximal result.{" "}
          </p>
          <div className="mt-16 max-w-md mx-auto flex flex-col space-y-8">
            {programs.map((p, idx) => (
              <div
                className={clsx(
                  "cursor-pointer shadow-xl border border-primary py-3 rounded-md flex items-center justify-center space-x-4",
                  p.id === selected && "bg-primary"
                )}
                onClick={() => setSelected(p.id)}
                key={idx}
              >
                <img
                  className={clsx(
                    "w-8 h-8 bg-transparent",
                    selected === p.id &&
                      "bg-white p-1 rounded-full stroke-current"
                  )}
                  src={p.image}
                  alt={p.name}
                />
                <h3
                  className={clsx(
                    "text-white font-semibold text-md",
                    selected === p.id && "text-gray-900"
                  )}
                >
                  {p.name}
                </h3>
              </div>
            ))}
          </div>
          <div className="text-center mx-auto mt-12">
            <button
              onClick={() => Router.push("/onboarding/connect")}
              className="inline-flex px-6 py-3 text-md justify-center rounded text-gray-200 font-semibold focus:outline-none border-none mr-8"
            >
              &larr; Back
            </button>
            <button
              onClick={handleNext}
              className="inline-flex px-6 py-3 text-lg justify-center rounded bg-primary bg-opacity-90 hover:bg-green-500 transition-all text-gray-900 font-semibold focus:outline-none border-none"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ChooseProgram;
