import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import programs from "../../data/programs.json";
import OnboardingLayout from " components/OnboardingLayout";
import clsx from "clsx";
import { useAuth } from "lib/auth";
import { firestore } from "lib/firebase";

const ProgramDetails = () => {
  const auth = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const [programId, setProgramId] = useState(id);
  const [duration, setDuration] = useState(30);

  useEffect(() => {
    setProgramId(id);
  }, [id]);

  const handleNext = async () => {
    const uid = auth?.user?.uid;
    if (!uid) return;
    try {
      await firestore
        .collection("users")
        .doc(uid)
        .update({ programDuration: duration });
      Router.push(`/session/ads`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <OnboardingLayout>
      {programId && (
        <div className="pt-16 max-w-screen-xl mx-auto px-4 md:px-8 xl:px-0">
          <h1 className="text-primary text-3xl font-semibold">
            {programs[id]?.title}
          </h1>
          <div className="mt-1 h-0.5 w-full bg-primary" />
          <div className="mt-8">
            <p className="mt-4 text-gray-300 leading-relaxed text-sm md:text-md">
              {programs[id]?.waveDetails}
            </p>
            <p className="mt-4 text-gray-300 leading-relaxed text-sm md:text-md max-w-screen-lg">
              {programs[id]?.description}
            </p>
          </div>
          <h1 className="mt-12 text-primary text-3xl font-semibold">
            Program Duration
          </h1>
          <div className="mt-1 h-0.5 w-full bg-primary" />
          <div className="mt-8">
            <div className="flex flex-row items-center space-x-6">
              {[30, 60, 120].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setDuration(item)}
                  className={clsx(
                    "rounded-md cursor-pointer border border-primary text-white font-medium py-2 px-4",
                    item === duration && "bg-primary text-gray-900"
                  )}
                >
                  {item} mins
                </div>
              ))}
            </div>
            <div className="text-center mx-auto mt-12">
              <button
                onClick={() => Router.push("/onboarding/program")}
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
      )}
    </OnboardingLayout>
  );
};

export default ProgramDetails;
