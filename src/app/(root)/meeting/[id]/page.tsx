"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingSetup from "@/components/custom/MeetingSetup";
import MeetingRoom from "@/components/custom/MeetingRoom";
import { useGetCallById } from "@/hooks/useGetCallById";
import LoaderComponent from "@/components/custom/Loader";

const MeetingPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <LoaderComponent />;

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-white">
        <h1 className="text-2xl font-bold">
          Please log in to join the meeting
        </h1>
      </div>
    );
  }

  return (
    <main className="h-screen w-full">
      <StreamCall call={call ?? undefined}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
