"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

const SidebarComponent = () => {
  const pathname = usePathname();

  return (
    <section className="sticky bg-[#131619] top-0 left-0 flex h-screen w-fit flex-col justify-between p-6 pt-28 text-white max-sm:hidden lg:w-[264px] border-r border-[#313235]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start transition-colors duration-200",
                {
                  "bg-blue-400 text-white": isActive,
                },
                !isActive && "hover:bg-[#313335] hover:text-white"
              )}
            >
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={24}
                height={24}
                className="w-6 h-6"
                style={{ filter: "brightness(0) invert(1)" }}
                suppressHydrationWarning
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SidebarComponent;
