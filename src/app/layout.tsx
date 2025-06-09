import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Session Video App",
  description: "Video Call App maintained by Delta Team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "/icons/logo.svg",
            socialButtonsVariant: "iconButton",
          },
          variables: {
            colorPrimary: "#0070f3",
            colorText: "#ffffff",
            colorBackground: "#000000",
            colorDanger: "#ff0000",
            colorInputBackground: "#1f2125",
            colorInputText: "#ffffff",
          },
        }}
        // Add your Clerk frontend API key here
        // frontendApi="your-clerk-frontend-api"
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-[#141619] text-[--foreground]`}
        >
          {children}
          {/* <Toaster /> */}
        </body>
      </ClerkProvider>
    </html>
  );
}
