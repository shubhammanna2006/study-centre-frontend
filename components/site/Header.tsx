"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAppSelector } from "@/TypeTs/reduxHooks";

const nav = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faculty", label: "Faculty" },
  { to: "/achievements", label: "Achievements" },
  { to: "/verify", label: "Verify" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark((d) => !d);
  };

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          {/* <div className="grid h-10 w-10  rounded-xl gradient-primary shadow-elegant group-hover:scale-105 transition-transform"> */}
          <Image
            src={"/assets/logo/studycentrelogo.png"}
            alt="Study Centre Logo"
            width={48}
            height={48}
          />
          {/* </div> */}
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight">
              Study Centre
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Learn · Lead
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => {
            const active =
              pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                href={n.to}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  active
                    ? "text-primary"
                    : "text-foreground/75 hover:text-foreground"
                }`}
              >
                {n.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded gradient-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDark}
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          {isAuthenticated ? (
            <Link
              href={`${role === "ADMIN" ? "/admin/dashboard" : "/student"}`}
              className="hidden sm:inline-flex"
            >
              <Button
                size="sm"
                className="gradient-accent text-accent-foreground border-0 hover:opacity-90"
              >
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              {" "}
              <Link href="/login" className="hidden sm:inline-flex">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register" className="hidden sm:inline-flex">
                <Button
                  size="sm"
                  className="gradient-accent text-accent-foreground border-0 hover:opacity-90"
                >
                  Join Now
                </Button>
              </Link>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-in">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                href={n.to}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              {isAuthenticated ? (
                <Link
                  href={`${role === "ADMIN" ? "/admin/dashboard" : "/student"}`}
                  className="flex-1"
                >
                  <Button className="w-full gradient-accent text-accent-foreground border-0">
                     Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  {" "}
                  <Link href="/login" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" className="flex-1">
                    <Button className="w-full gradient-accent text-accent-foreground border-0">
                      Join Now
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
