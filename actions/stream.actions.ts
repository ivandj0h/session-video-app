"use server";

import { currentUser } from "@clerk/nextjs/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const apiSecret = process.env.STREAM_SECRET_KEY as string;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User unAuthenticated");
  if (!apiKey) throw new Error("Stream API key is not defined");
  if (!apiSecret) throw new Error("Stream API secret is not defined");
};
