import React, { useState, useEffect, useRef } from "react";
import OnboardingLayout from " components/OnboardingLayout";
import { firestore } from "lib/firebase";
import { useAuth } from "lib/auth";
import Router from "next/router";
import calibration from "../../data/calibration.json";
import ReactAudioPlayer from "react-audio-player";
import clsx from "clsx";

const Calibration = () => {
  const auth = useAuth();
  const [program, setProgram] = useState("sleep");
  const [currentAudio, setCurrentAudio] = useState(null);

  const [thetaIndex, setThetaIndex] = useState(0);

  const audioRef = useRef();

  useEffect(() => {
    if (program === "sleep") {
      // theta + delta
      const item = calibration["theta"][thetaIndex];
      setCurrentAudio(`/binaural/${item.name}.wav`);
      audioRef.current.onEnded = () => {
        console.log("here");
        if (thetaIndex + 1 >= calibration["theta"].length) return;

        const item = calibration["theta"][thetaIndex + 1];
        setCurrentAudio(`/binaural/${item.name}.wav`);

        setThetaIndex(thetaIndex + 1);
      };
    }
  }, [program, thetaIndex]);

  return (
    <OnboardingLayout>
      <h1 className="text-primary text-center font-bold text-4xl">
        Calibration
      </h1>
      <div className="pt-16 max-w-screen-xl mx-auto px-4 md:px-8 xl:px-0">
        <div className="flex flex-row items-center justify-between">
          <div
            onClick={() => setProgram("sleep")}
            className={clsx(
              "cursor-pointer rounded-full px-6 py-3 bg-gray-900 text-gray-200 text-lg",
              "sleep" === program && "bg-primary text-dg"
            )}
          >
            Sleep
          </div>
          <div
            onClick={() => setProgram("relax")}
            className={clsx(
              "cursor-pointer rounded-full px-6 py-3 bg-gray-900 text-gray-200 text-lg",
              "relax" === program && "bg-primary text-dg"
            )}
          >
            Relaxation
          </div>
          <div
            onClick={() => setProgram("aware")}
            className={clsx(
              "cursor-pointer rounded-full px-6 py-3 bg-gray-900 text-gray-200 text-lg",
              "aware" === program && "bg-primary text-dg"
            )}
          >
            Awareness
          </div>
          <div
            onClick={() => setProgram("alert")}
            className={clsx(
              "cursor-pointer rounded-full px-6 py-3 bg-gray-900 text-gray-200 text-lg",
              "alert" === program && "bg-primary text-dg"
            )}
          >
            Alertness
          </div>
        </div>
      </div>
      <ReactAudioPlayer ref={audioRef} src={currentAudio} autoPlay />
    </OnboardingLayout>
  );
};

export default Calibration;
