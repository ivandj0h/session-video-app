import { ReactNode } from "react";

export interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  width: number;
  height: number;
  handleClick: () => void;
}

export interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}
