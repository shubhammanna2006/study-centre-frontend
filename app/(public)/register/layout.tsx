import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Student Registration — Study Centre",
  description: "Register online for admission at Study Centre. Fill the form and our counsellor will contact you.",
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return children;
}
