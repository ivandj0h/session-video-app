import Image from "next/image";
import React from "react";

const LoaderComponent = () => {
  return (
    <div className="flex items-center h-screen w-full">
      <Image
        src="/icons/loading-circle.svg"
        alt="Loading..."
        width={50}
        height={50}
        className="animate-spin mx-auto"
      />
    </div>
  );
};

export default LoaderComponent;
