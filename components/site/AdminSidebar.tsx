"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Image as ImageIcon,
  FileBadge,
  Bell,
  Wallet,
  CalendarCheck2,
  BookOpen,
  Settings,
  LogOut,
  Search,
  Download,
  Plus,
  Check,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { logoutApi } from "@/api/apilist";
import { clearAuth } from "@/store/authSlice";
import { useAppDispatch } from "@/TypeTs/reduxHooks";
import { Button } from "../ui/button";
const nav = [
  { icon: LayoutDashboard, label: "Dashboard", link: "/admin/dashboard" },
  { icon: Users, label: "Students", link: "/admin/students" },
  { icon: GraduationCap, label: "Admissions", link: "/admin/admissions" },
  { icon: BookOpen, label: "Courses", link: "/admin/courses" },
  { icon: Users, label: "Faculty", link: "/admin/faculity" },
  { icon: ImageIcon, label: "Gallery", link: "/admin/gallery" },
  { icon: FileBadge, label: "Certificates", link: "/admin/certificates" },
  { icon: Wallet, label: "Fees", link: "/admin/fees" },
  { icon: Bell, label: "Notifications", link: "/admin/notifications" },
];
const AdminSidebar = () => {
  const [active, setActive] = useState("Dashboard");
  //   Last path
  const path = usePathname().split("/")[2];

  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(clearAuth());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <aside className="lg:sticky lg:top-24 h-max">
      <Card>
        <CardContent className="p-3">
          <div className="px-3 py-2 mb-2">
            <div className="font-display font-bold">Admin Panel</div>
            <div className="text-xs text-muted-foreground">Study Centre</div>
          </div>
          <nav className="grid gap-1">
            {nav.map((n) => (
              <Link
                key={n.label}
                href={n.link}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-left transition ${
                  path === n.label.toLocaleLowerCase()
                    ? "gradient-primary text-primary-foreground shadow-card"
                    : "hover:bg-secondary"
                }`}
              >
                <n.icon className="h-4 w-4" /> {n.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-destructive/10 text-destructive"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </nav>
        </CardContent>
      </Card>
    </aside>
  );
};

export default AdminSidebar;
