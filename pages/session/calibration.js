import React, { useState, useEffect, useRef } from "react";
import OnboardingLayout from " components/OnboardingLayout";
import { firestore } from "lib/firebase";
import { useAuth } from "lib/auth";
import Router from "next/router";
import calibration from "../../data/calibration.json";
import ReactAudioPlayer from "react-audio-player";
import Countdown from "react-countdown";
import clsx from "clsx";

const FR_TIME = 381;
const S_TIME = 222;

const Calibration = () => {
  const auth = useAuth();
  const [program, setProgram] = useState("");
  const [currentAudio, setCurrentAudio] = useState(null);

  const [thetaIndex, setThetaIndex] = useState(0);

  const audioRef = useRef();

  useEffect(() => {
    if (!auth.user) return;

    const setDesiredProgram = async () => {
      const docRef = firestore.collection("users").doc(auth?.user?.uid);
      const documentSnapshot = await docRef.get();
      const data = documentSnapshot.data();

      setProgram(data?.program);
    };

    setDesiredProgram();
  }, [auth.user]);

  useEffect(() => {
    if (!program) return;

    setCurrentAudio(`/audio/${program}.wav`);
  }, [program]);

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
            onClick={() => "sleep" === program && setProgram("sleep")}
            className={clsx(
              "cursor-pointer rounded-full px-6 py-3 bg-gray-900 text-gray-200 text-lg",
              "sleep" === program
                ? "bg-primary text-dg"
                : "opacity-50 cursor-not-allowed"
            )}
          >
            Sleep
          </div>
          <div
            onClick={() => "relax" === program && setProgram("relax")}
            className={clsx(
              "cursor-pointer rounded-full px-6 py-3 bg-gray-900 text-gray-200 text-lg",
              "relax" === program
                ? "bg-primary text-dg"
                : "opacity-50 cursor-not-allowed"
            )}
          >
            Relaxation
          </div>
          <div
            onClick={() => "focus" === program && setProgram("focus")}
            className={clsx(
              "cursor-pointer rounded-full px-6 py-3 bg-gray-900 text-gray-200 text-lg",
              "focus" === program
                ? "bg-primary text-dg"
                : "opacity-50 cursor-not-allowed"
            )}
          >
            Focus
          </div>
        </div>
      </div>
      <ReactAudioPlayer ref={audioRef} src={currentAudio} autoPlay />
      <div className="max-w-screen-xl mx-auto text-center pt-48">
        {program && (
          <Countdown
            date={
              program === "sleep"
                ? Date.now() + S_TIME * 1000
                : Date.now() + FR_TIME * 1000
            }
            className="text-7xl font-extrabold text-white"
          ></Countdown>
        )}
      </div>
    </OnboardingLayout>
  );
};

export default Calibration;
