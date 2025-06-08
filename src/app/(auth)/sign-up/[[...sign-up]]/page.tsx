import React from "react";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-[#141619]">
      <SignUp />
    </main>
  );
};

export default SignUpPage;
