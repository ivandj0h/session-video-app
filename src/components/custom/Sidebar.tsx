"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const SidebarComponent = () => {
  const pathname = usePathname();

  return (
    <section className="sticky bg-blue-900 top-0 left-0 flex h-screen w-fit flex-col justify-between p-6 pt-28 text-white max-sm:hidden lg:w-p[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(link.route);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start",
                {
                  "bg-blue-400 text-white": isActive,
                }
              )}
            >
              {/* You can add link.icon or link.label here if needed */}
              {link.label}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SidebarComponent;
