import React, { useState } from "react";
import OnboardingLayout from " components/OnboardingLayout";
import ReactPlayer from "react-player";
import ads from "../../data/ads.json";
import { firestore } from "lib/firebase";
import { useAuth } from "lib/auth";
import Router from "next/router";

const Calibration = () => {
  const auth = useAuth();
  const [enableNext, setEnableNext] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(ads?.videos?.[currentIndex]);

  const handleNext = async () => {
    const uid = auth?.user?.uid;
    if (!uid) return;

    try {
      await firestore.collection("users").doc(uid).update({ watchedAds: true });
      Router.push(`/session/calibration`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <OnboardingLayout>
      <h1 className="text-primary text-center font-bold text-4xl">
        Calibration
      </h1>
      <div className="pt-16 max-w-screen-xl mx-auto px-4 md:px-8 xl:px-0">
        <div className="flex flex-row items-center justify-between">
          <div className="cursor-pointer rounded-full px-6 py-3 bg-gray-900 text-gray-200 text-lg">
            Sleep
          </div>
          <div className="cursor-pointer rounded-full px-6 py-3 bg-gray-900 text-gray-200 text-lg">
            Relaxation
          </div>
          <div className="cursor-pointer rounded-full px-6 py-3 bg-gray-900 text-gray-200 text-lg">
            Awareness
          </div>
          <div className="cursor-pointer rounded-full px-6 py-3 bg-gray-900 text-gray-200 text-lg">
            Alertness
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Calibration;
