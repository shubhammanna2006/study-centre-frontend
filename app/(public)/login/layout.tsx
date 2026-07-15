import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login — Study Centre",
  description: "Login to your Study Centre student or admin account.",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
