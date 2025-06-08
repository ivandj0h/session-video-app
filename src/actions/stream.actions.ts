"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const apiSecret = process.env.STREAM_SECRET_KEY as string;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User unAuthenticated");
  if (!apiKey) throw new Error("Stream API key is not defined");
  if (!apiSecret) throw new Error("Stream API secret is not defined");

  const client = new StreamClient(apiKey, apiSecret);

  // Use generateUserToken instead of createToken
  const token = client.generateUserToken({ user_id: user.id });
  return token;
};
