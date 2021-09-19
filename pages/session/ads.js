import React, { useState } from "react";
import OnboardingLayout from " components/OnboardingLayout";
import ReactPlayer from "react-player";
import ads from "../../data/ads.json";
import { firestore } from "lib/firebase";
import { useAuth } from "lib/auth";
import Router from "next/router";

const Ads = () => {
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
        Watch Ads for 15 minutes
      </h1>
      <div className="pt-16 max-w-screen-xl mx-auto px-4 md:px-8 xl:px-0">
        <div className="w-full flex justify-center text-center mx-auto relative shadow-xl rounded-xl">
          {!enableNext && (
            <ReactPlayer
              controls
              playing
              light={false}
              volume={1}
              playbackRate={1}
              onEnded={() => {
                if (currentIndex + 1 >= ads?.videos?.length) {
                  setEnableNext(true);
                }
                setCurrentVideo(ads?.videos?.[currentIndex + 1]);
                setCurrentIndex((bci) => bci + 1);
              }}
              className="text-center mx-auto overflow-hidden shadow-xl rounded-2xl"
              url={currentVideo.link}
            ></ReactPlayer>
          )}
        </div>
        <div className="block mt-12 max-w-screen-xl mx-auto text-center">
          {!enableNext && (
            <button
              onClick={() => Router.push("/payment")}
              className="inline-flex px-6 py-3 text-md justify-center rounded text-gray-200 font-semibold focus:outline-none border-none mr-8"
            >
              Skip Ads
            </button>
          )}

          {enableNext && (
            <button
              disabled={!enableNext}
              onClick={handleNext}
              className="inline-flex px-6 py-3 text-lg justify-center rounded bg-primary bg-opacity-90 hover:bg-green-500 transition-all text-gray-900 font-semibold focus:outline-none border-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calibration Session &rarr;
            </button>
          )}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Ads;

/*
{
      "link": "https://www.youtube.com/watch?v=S2nBBMbjS8w",
      "keywords": ["soda", "coke"]
    },
    {
      "link": "https://www.youtube.com/watch?v=eOMhOjgNd7Q",
      "keywords": ["soda", "coca-cola"]
    },
    {
      "link": "https://www.youtube.com/watch?v=yg4Mq5EAEzw",
      "keywords": ["soda", "coca-cola"]
    },
    {
      "link": "https://www.youtube.com/watch?v=a3SXHrMOFzA",
      "keywords": ["soda", "pepsi"]
    },
    {
      "link": "https://www.youtube.com/watch?v=po0jY4WvCIc",
      "keywords": ["soda", "pepsi"]
    },
    {
      "link": "https://www.youtube.com/watch?v=1PA4uUDkeNc",
      "keywords": ["candy", "snickers"]
    },
    {
      "link": "https://www.youtube.com/watch?v=ifpMFCWklDA",
      "keywords": ["candy", "snickers"]
    },
    {
      "link": "https://www.youtube.com/watch?v=iw95LmGHTWM",
      "keywords": ["candy", "snickers"]
    },
    {
      "link": "https://www.youtube.com/watch?v=xHYI3NQtC2A",
      "keywords": ["candy", "snickers"]
    },
    {
      "link": "https://www.youtube.com/watch?v=ji7VmldBE_A",
      "keywords": ["candy", "snickers"]
    },
    {
      "link": "https://www.youtube.com/watch?v=j3QeC81VFGg",
      "keywords": ["candy", "snickers"]
    },
    {
      "link": "https://www.youtube.com/watch?v=4yuouH4U_6c",
      "keywords": ["candy", "snickers"]
    },
    {
      "link": "https://www.youtube.com/watch?v=yYBrFBWCzbU",
      "keywords": ["candy", "snickers"]
    },
    {
      "link": "https://www.youtube.com/watch?v=QO2qHuEs80Q",
      "keywords": ["candy", "snickers"]
    },
    {
      "link": "https://www.youtube.com/watch?v=HRtgZCDmwkY",
      "keywords": ["candy", "snickers"]
    }
*/
