"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/data";
import { CourseCard } from "@/components/site/CourseCard";
import { Search } from "lucide-react";

export default function CoursesPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return courses;
    return courses.filter((c) => c.title.toLowerCase().includes(t) || c.short.toLowerCase().includes(t));
  }, [q]);

  return (
    <div>
      <section className="gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20">
          <Badge className="bg-white/15 text-white border-white/25">Courses</Badge>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold">All Courses</h1>
          <p className="mt-3 text-white/85 max-w-2xl">Browse every program we offer. Search by name or skill to find the right course for you.</p>
          <div className="mt-6 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search courses (e.g. Tally, Web, Python)"
              className="pl-10 bg-white/10 border-white/25 text-white placeholder:text-white/60"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        {filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">No courses match your search.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((c) => <CourseCard key={c.slug} course={c} />)}
          </div>
        )}
      </section>
    </div>
  );
}
