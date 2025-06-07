import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "@/components/custom/MobileNav";

const NavbarComponent = () => {
  return (
    <nav className="fixed flex-between z-50 w-full bg-[#323538] px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          alt="Logo"
          width={32}
          height={32}
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Soom!
        </p>
      </Link>
      <div className="flex-between gap-5">
        {/* adding Clerk User Management here! */}
        {/* Make sure MobileNav is imported or defined */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default NavbarComponent;
