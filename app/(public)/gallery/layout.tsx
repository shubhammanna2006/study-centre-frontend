import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Gallery — Study Centre",
  description: "Photos from our classrooms, labs, events, workshops and student celebrations at Study Centre.",
};

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return children;
}
