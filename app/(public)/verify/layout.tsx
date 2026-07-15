import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Certificate Verification — Study Centre",
  description: "Verify the authenticity of a Study Centre certificate by entering the certificate number.",
};

export default function VerifyLayout({ children }: { children: ReactNode }) {
  return children;
}
