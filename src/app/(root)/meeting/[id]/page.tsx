import React from "react";

const MeetingPage = ({ params }: { params: { id: string } }) => {
  return <div>Meeting Room: #{params.id}</div>;
};

export default MeetingPage;
