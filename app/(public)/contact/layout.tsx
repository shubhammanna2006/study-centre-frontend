import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact — Study Centre",
  description: "Get in touch with Study Centre. Address, phone, email and enquiry form.",
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
