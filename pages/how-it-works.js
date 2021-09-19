import Navbar from " components/Navbar";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <img
        className="mx-auto h-72 md:h-96 object-cover"
        src="/images/frequency.png"
        alt="How it works"
      />
      <main className="max-w-screen-xl mx-auto text-center py-24">
        <div>
          <h2 className="text-primary font-semibold text-3xl text-center leading-tight">
            What are Binaural beats?
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed text-sm max-w-screen-lg mx-auto">
            When you play a tone with a slightly different frequency into your
            left and right ear, your brain processes a beat at the difference of
            the frequencies. It considered auditory illusion, and that’s the
            technique that we used to manipulate your brainwaves to reach your
            desired states of mind.
          </p>
        </div>
        <div className="mt-24">
          <h2 className="text-primary font-semibold text-3xl text-center leading-tight">
            What is NeuroWay?
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed text-sm max-w-screen-lg mx-auto">
            Hypnoband uses EEG monitoring device to detect your brainwaves, and
            used that to personalize and enhance your ability to reach certain
            state of frequencies by generating binaural beats.
          </p>
        </div>
        <div className="mt-24">
          <h2 className="text-primary font-semibold text-3xl text-center leading-tight">
            Certain state of frequencies
          </h2>
          <img
            className="mt-8 mx-auto max-w-lg"
            src="/images/waves.png"
            alt="Waves"
          />
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;
