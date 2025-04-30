import { Cairo, Amiri_Quran, Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cairo",
});

export const amiri = Amiri_Quran({
  weight: ["400"],
  subsets: ["arabic"],
  variable: "--font-amiri",
});
