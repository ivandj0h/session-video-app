"use client";

import React, { useEffect, useState } from "react";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { Button } from "../ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);

  const call = useCall();

  useEffect(() => {
    if (call) {
      if (isMicCamToggleOn) {
        call.camera?.disable();
        call.microphone?.disable();
      } else {
        call.camera?.enable();
        call.microphone?.enable();
      }
    }
  }, [isMicCamToggleOn, call]);

  if (!call) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">MeetingSetup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggleOn}
            onChange={() => setIsMicCamToggleOn(!isMicCamToggleOn)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Enable/Disable Mic and Camera</span>
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-600 px-4 py-2.5 text-white hover:bg-green-800 hover:text-white cursor-pointer"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
