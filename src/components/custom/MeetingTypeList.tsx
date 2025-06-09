"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import ReactDatePicker from "react-datepicker";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const user = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call | null>(null);
  toast("Event has been created.");

  const createMeeting = async () => {
    if (!client || !user) {
      console.error("Client or user is not available");
      return;
    }

    try {
      if (!values.dateTime) {
        toast.error("Please select a date and time for the meeting.", {
          duration: 3000,
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast.success("Meeting created successfully!", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast.error("Failed to create meeting. Please try again.", {
        duration: 3000,
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <HomeCard
          img="/icons/add-meeting.svg"
          title="New Meeting"
          description="Start an instant Meeting"
          width={27}
          height={27}
          handleClick={() => setMeetingState("isInstantMeeting")}
          className="bg-orange-400 hover:bg-orange-500 text-white"
        />
        <HomeCard
          img="/icons/schedule.svg"
          title="Schedule Meeting"
          description="Plan your meeting"
          width={27}
          height={27}
          handleClick={() => setMeetingState("isScheduleMeeting")}
          className="bg-blue-400 hover:bg-blue-500 text-white"
        />
        <HomeCard
          img="/icons/recordings.svg"
          title="View Recordings"
          description="Checkout your recorded"
          width={27}
          height={27}
          handleClick={() => router.push("/recordings")}
          className="bg-green-400 hover:bg-green-500 text-white"
        />
        <HomeCard
          img="/icons/join-meeting.svg"
          title="Join Meeting"
          description="Join Meeting via Invitation"
          width={27}
          height={27}
          handleClick={() => setMeetingState("isJoiningMeeting")}
          className="bg-purple-400 hover:bg-purple-500 text-white"
        />
      </section>

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Schedule Meeting"
          description=""
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-200">
              Add Description
            </label>
            <textarea
              className="border-none bg-[#363a40] text-white focus:outline-none focus-visible:ring-0 focus-visible-ring-offset-0 p-3 rounded"
              placeholder=""
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-200">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              className="w-full rounded bg-[#363a40] p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          description="Start an instant meeting now"
          className="bg-orange-400 hover:bg-orange-500 text-white text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link copied to clipboard");
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Instant Meeting"
        description="Start an instant meeting now"
        className="bg-orange-400 hover:bg-orange-500 text-white text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </>
  );
};

export default MeetingTypeList;
