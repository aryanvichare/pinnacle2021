import React from "react";
import OnboardingLayout from "../../ components/OnboardingLayout";
import Router from "next/router";

const Connect = () => {
  return (
    <OnboardingLayout>
      <div className="pt-16 pb-12 text-white">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 xl:px-0">
          <h1 className="text-center text-primary font-semibold text-3xl md:text-4xl leading-tight">
            Start Calibrating now!
          </h1>
          <div className="mt-24 max-w-screen-md mx-auto grid grid-cols-2 gap-16">
            <div className="flex flex-col justify-center items-center">
              <div className="cursor-pointer w-48 h-48 bg-primary rounded-full text-gray-900 flex font-semibold justify-center items-center text-xl">
                Connect
              </div>
              <p className="mt-6 text-gray-100 leading-relaxed text-lg">
                Connect your EEG Device
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="cursor-pointer w-48 h-48 bg-primary rounded-full text-gray-900 flex font-semibold justify-center items-center text-xl">
                Connect
              </div>
              <p className="mt-6 text-gray-100 leading-relaxed text-lg">
                Connect NeuroWay
              </p>
            </div>
          </div>
          <div
            onClick={() => Router.push("/onboarding/program")}
            className="text-center mx-auto mt-12"
          >
            <button className="inline-flex px-6 py-3 text-lg justify-center rounded bg-primary bg-opacity-90 hover:bg-green-500 transition-all text-gray-900 font-semibold focus:outline-none border-none">
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Connect;

// {"status": "generated", "secret": "SBPSCI536ER6XXAD3E32OE7GHG3H555JMFWD2DSNUERUZU4EWHI7BDZP", "public":
// "GDWWEFGIIUBZHUIYDV57G6VEJAFVWVKI4VACD3CY5BM67Z25K5MYWXBT"}
