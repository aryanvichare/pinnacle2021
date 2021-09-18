import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import invariant from "invariant";

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

const features = [
  {
    name: "Relax",
    description: "Alpha brainwaves to help you stay calm and relax",
    image: "/images/lotus.svg",
  },
  {
    name: "Focus",
    description: "Delta brainwaves to boost your productivity and focus",
    image: "/images/focus.svg",
  },
  {
    name: "Sleep",
    description:
      "Theta and delta brainwaves to help you go into sleep mode quickly",
    image: "/images/sleep.svg",
  },
];

export default function Home() {
  const [bleCompat, setBleCompat] = useState(false);

  const requestBluetooth = () => {
    const _navigator = navigator;
    invariant(
      _navigator.bluetooth,
      "This device is not capable of using Bluetooth"
    );

    return _navigator.bluetooth;
  };

  async function getAvailabilityAsync() {
    const bluetooth = requestBluetooth();
    if (bluetooth.getAvailability) {
      return await requestBluetooth().getAvailability();
    } else {
      return !!bluetooth;
    }
  }

  async function requestDeviceAsync(options = { acceptAllDevices: true }) {
    try {
      const device = await requestBluetooth().requestDevice(options);
      console.log("Device Connection", device);

      const connection = await device.gatt.connect();
      connection.console.log(connection);
    } catch (error) {
      if (error.code === 8) {
        // User Cancelled
        return { type: "cancel" };
      }
      throw error;
    }
  }

  useEffect(() => {
    getAvailabilityAsync().then(async (data) => {
      const bluetoothAvailability = data;

      if (bluetoothAvailability) {
        console.log("+ Bluetooth is available");
        setBleCompat(true);
      }
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Pinnacle Project</title>
        <meta name="description" content="Built at Pinnacle 2021" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-screen bg-gradient-to-r from-black via-gray-900 to-blue-900">
        <div className="max-w-screen-xl mx-auto px-8 xl:px-0">
          <nav className="flex flex-row items-center justify-between h-28">
            <Link href="/">
              <a className="flex flex-row items-center space-x-3">
                <img
                  className="h-8 w-8 object-contain"
                  src="/images/logo.svg"
                  alt="Hypnoband Logo"
                />
                <h1 className="text-primary font-bold tracking-wide text-xl">
                  HypnoBand
                </h1>
              </a>
            </Link>
            <div className="flex items-center space-x-12">
              {navLinks.map((l, idx) => (
                <Link key={idx} href={l.href}>
                  <a className="text-gray-100 text-md hover:opacity-95">
                    {l.name}
                  </a>
                </Link>
              ))}
            </div>
          </nav>
          <div className="pt-24 pb-12 md:pt-52">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="flex flex-col justify-start">
                <h1 className="text-left text-primary font-semibold text-4xl md:text-5xl leading-tight max-w-md md:max-w-lg">
                  Claim your desired state of mind
                </h1>
                <p className="mt-4 text-gray-100 leading-relaxed text-lg max-w-md">
                  Personalized binaural beats to help you improve sleep, focus
                  and deepens relaxation.
                </p>
                <div className="mt-6 flex flex-row space-x-4 items-center justify-start">
                  <button className="inline-flex px-6 py-3 text-lg justify-center rounded bg-primary bg-opacity-90 hover:bg-green-500 transition-all text-gray-900 font-semibold focus:outline-none border-none ">
                    Try for free
                  </button>
                </div>
              </div>
              <img
                className="col-span-1 lg:absolute lg:top-36 lg:right-0 rounded-full im-hero"
                src="/images/hypnoband-hero.png"
                alt="Hypnoband Hero"
              />
            </div>
          </div>
        </div>
      </div>
      <main className="py-36 bg-gradient-to-br from-black to-gray-900">
        <div className="max-w-screen-lg mx-auto px-8 xl:px-0">
          <div className="flex flex-col md:flex-row md:items-center items-start">
            <div className="flex-shrink-0">
              <img
                className="w-12 mb-4 md:mb-0 md:w-48"
                src="/images/customer.svg"
                alt="Customers"
              />
            </div>
            <div className="flex flex-col md:ml-12 max-w-screen-md">
              <h2 className="text-primary font-semibold text-xl md:text-2xl lg:text-3xl leading-tight">
                2/3 of adults fail to meet the 8-hours of sleep recommended by
                the WHO
              </h2>
              <p className="mt-4 text-gray-100 leading-relaxed text-md">
                Anxiety and depression nationwide hits all-time high since start
                of pandemic. Our bodies and minds are not fit for the new world
                we live in. It’s hard to sleep during the night and hard to
                focus during the day.
              </p>
            </div>
          </div>
          <div className="py-36 max-w-screen-lg mx-auto xl:px-0">
            <div className="lg:grid items-center grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-primary font-semibold text-xl md:text-2xl lg:text-3xl leading-tight">
                  Our program works subconsciously
                </h2>
                <p className="mt-4 text-gray-100 leading-relaxed text-md md:text-lg">
                  Your breathing, heart rate, sleep, and several nervous system
                  reactions all happen and adapt to the situation without
                  consciousness. In a similar way, Hypnoband enhance your
                  ability to reach certain state of mind without you even
                  noticing it.
                </p>
              </div>
              <img
                className="overflow-hidden md:max-w-xl mt-8 lg:max-w-lg lg:mt-0"
                src="/images/waves.png"
                alt="Type of Waves"
              />
            </div>
          </div>
          <div className="py-24 max-w-screen-lg mx-auto xl:px-0">
            <h2 className="text-primary font-semibold text-center text-xl md:text-2xl lg:text-3xl leading-tight">
              Next-Generation of Neurostimulation Headbands
            </h2>
            <p className="mt-4 text-gray-100 text-center leading-relaxed text-md md:text-lg">
              Improve your wellbeing and feel the sensation now!
            </p>
            <div className="mt-12 md:grid grid-cols-3 gap-12 space-y-12 md:space-y-0">
              {features.map((f, idx) => (
                <div className="text-center" key={idx}>
                  <img
                    className="mx-auto text-primary w-16 h-16"
                    src={f.image}
                    alt={f.name}
                  />
                  <h3 className="mt-2 text-xl text-primary font-medium">
                    {f.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mt-2 max-w-16 mx-auto">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <footer className="relative py-16">
          <div className="grid gap-8 items-start justify-center">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-primary rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
              <button className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600">
                <span className="flex items-center space-x-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-600 -rotate-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  <span className="pr-6 text-gray-100">
                    Hypnoband Onboarding
                  </span>
                </span>
                <span className="pl-6 text-primary group-hover:text-gray-100 transition duration-200">
                  Get started now &rarr;
                </span>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <style jsx>{`
        .im-hero {
          width: 700px;
          height: 700px;
        }

        @media only screen and (max-width: 1200px) {
          .im-hero {
            width: 500px;
            height: 500px;
            top: 13rem;
          }
        }

        @media only screen and (max-width: 1000px) {
          .im-hero {
            width: 400px;
            height: 400px;
            top: 15rem;
          }
        }
      `}</style>
    </div>
  );
}
