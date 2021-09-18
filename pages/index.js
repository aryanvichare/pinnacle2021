import { useState, useEffect } from "react";
import Head from "next/head";
import invariant from "invariant";

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
      return { type: "success", device };
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
      <h1 className="text-7xl text-green-500 font-extrabold">Hello World</h1>
      {bleCompat && (
        <button
          onClick={async () => {
            await requestDeviceAsync();
          }}
        >
          Find devices
        </button>
      )}
    </div>
  );
}
