import React from "react";

const Payment = () => {
  return (
    <div>
      <section className="w-full py-20 bg-gray-100">
        <div className="max-w-3xl px-10 mx-auto">
          <h2 className="mb-1 text-xl text-3xl font-bold text-center">
            Don&apos;t want to watch the ads?
          </h2>
          <p className="mb-10 text-center text-gray-500">
            Pay for one-time subscription using Stellar.
          </p>
          <div className="relative flex flex-col overflow-hidden bg-gray-900 rounded-xl">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-purple-500" />
            <div className="flex flex-col items-center p-10 md:flex-row">
              <div className="w-full text-white md:w-2/3">
                <div className="flex items-center">
                  <p className="flex items-start text-lg font-bold leading-none text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-500 to-primary">
                    150 <span className="mt-2 text-2xl">XML</span>
                  </p>
                  <div className="flex flex-col ml-3">
                    <p className="text-base font-medium leading-tight text-gray-200">
                      one time payment
                    </p>
                    <p className="flex-shrink-0 text-xs text-gray-400"></p>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full mt-8 md:w-1/3 md:justify-end md:mt-0">
                <a
                  href="#_"
                  className="w-full px-10 py-5 text-xl font-semibold text-center text-white rounded-lg bg-gradient-to-br from-purple-500 to-primary md:w-auto"
                >
                  Pay now
                </a>
              </div>
            </div>
            <div className="px-10 py-8 bg-gray-900 border-t border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900">
              <h3 className="text-xl font-medium leading-tight text-gray-200">
                Simple and Transparent Pricing.
              </h3>
              <p className="my-1 text-gray-400">
                Gain access to all your personalized binaural beats by buying
                this service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payment;
