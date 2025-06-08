import React from "react";
import Image from "next/image";
import { MeetingModalProps } from "@/interfaces/card-interface";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  handleClick,
  buttonText,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-[#222529] px-6 py-9 text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold leading-[42px]">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-white">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image
                src={image}
                alt="Meeting Image"
                width={72}
                height={72}
                className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
              />
            </div>
          )}
          {children}
          <Button
            className="bg-blue-500 hover:bg-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0 text-white cursor-pointer"
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="Button Icon"
                width={13}
                height={13}
                className="mr-2 inline-block h-6 w-6"
              />
            )}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
