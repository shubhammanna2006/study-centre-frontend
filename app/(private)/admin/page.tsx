"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  LayoutDashboard, Users, GraduationCap, Image as ImageIcon, FileBadge, Bell, Wallet,
  CalendarCheck2, BookOpen, Settings, LogOut, Search, Download, Plus, Check, X,
} from "lucide-react";
import Dashboard from "./Dashboard";
import Students from "./Students";
import Faculty from "./Faculty";
import Admissions from "./Admissions";
import Courses from "./Courses";
import { Gallery } from "./Gallery";
import { Certificates } from "./Certificates";
import { Fees } from "./Fees";
import { Notifications } from "./Notifications";

const nav = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Students" },
  { icon: GraduationCap, label: "Admissions" },
  { icon: BookOpen, label: "Courses" },
  { icon: Users, label: "Faculty" },
  { icon: ImageIcon, label: "Gallery" },
  { icon: FileBadge, label: "Certificates" },
  { icon: Wallet, label: "Fees" },
  { icon: Bell, label: "Notifications" },
];



export default function AdminDashboard() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid gap-6 lg:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <aside className="lg:sticky lg:top-24 h-max">
        <Card>
          <CardContent className="p-3">
            <div className="px-3 py-2 mb-2">
              <div className="font-display font-bold">Admin Panel</div>
              <div className="text-xs text-muted-foreground">Study Centre</div>
            </div>
            <nav className="grid gap-1">
              {nav.map((n) => (
                <button
                  key={n.label}
                  onClick={() => setActive(n.label)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-left transition ${
                    active === n.label ? "gradient-primary text-primary-foreground shadow-card" : "hover:bg-secondary"
                  }`}
                >
                  <n.icon className="h-4 w-4" /> {n.label}
                </button>
              ))}
              <Link href="/login" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-destructive/10 text-destructive">
                <LogOut className="h-4 w-4" /> Logout
              </Link>
            </nav>
          </CardContent>
        </Card>
      </aside>

      {active === "Dashboard" && <Dashboard />}
      {active === "Students" && <Students />}
      {active === "Faculty" && <Faculty />}
      {active === "Admissions" && <Admissions />}
      {active === "Courses" && <Courses />}
      {active === "Gallery" && <Gallery />}
      {active === "Certificates" && <Certificates />}
      {active === "Fees" && <Fees />}
      {active === "Notifications" && <Notifications />}
    </div>
  );
}
