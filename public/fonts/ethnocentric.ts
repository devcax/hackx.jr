import localFont from "next/font/local";

export const ethnocentric = localFont({
  src: [
    {
      path: "./Ethnocentric/Ethnocentric-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ethnocentric",
  display: "swap",
});
