"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant Meeting"
        width={27}
        height={27}
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
    </section>
  );
};

export default MeetingTypeList;
