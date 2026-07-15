import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Courses — Study Centre",
  description: "Explore all computer courses at Study Centre: DCA, ADCA, Tally, MS Office, Excel, Photoshop, Programming, Web Development and more.",
};

export default function CoursesLayout({ children }: { children: ReactNode }) {
  return children;
}
