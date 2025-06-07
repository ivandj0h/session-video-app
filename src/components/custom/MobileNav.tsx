"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            alt="Menu"
            width={36}
            height={36}
            className="cursor-pointer sm:hidden lg:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold text-white">Soom!</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((link) => {
                  const isActive =
                    pathname === link.route ||
                    pathname.startsWith(`${link.route}/`);
                  return (
                    <Link
                      href={link.route}
                      key={link.label}
                      className={cn(
                        "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                        {
                          "bg-blue-400 text-blue-900": isActive,
                        }
                      )}
                    >
                      <Image
                        src={link.imgUrl}
                        alt={link.label}
                        width={20}
                        height={20}
                        className={cn("w-6 h-6", {
                          "filter-none": !isActive,
                          "filter invert": isActive,
                        })}
                      />
                      <p className="font-semibold">{link.label}</p>
                    </Link>
                  );
                })}
              </section>
            </SheetClose>
          </div>
          <DialogTitle className="sr-only">Navigation Menu</DialogTitle>{" "}
          {/* Tambahan ini */}
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
