import React, { ReactNode } from "react";
import NavBar from "@/components/custom/Navbar";
import Sidebar from "@/components/custom/Sidebar";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      {/* Navbar */}
      <NavBar />
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
