import React from "react";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-[#141619]">
      <SignIn />
    </main>
  );
};

export default SignInPage;
