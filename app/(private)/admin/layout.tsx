import AdminSidebar from "@/components/site/AdminSidebar";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard — Study Centre",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid gap-6 lg:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <AdminSidebar />
      {children}
    </div>
  );
}
