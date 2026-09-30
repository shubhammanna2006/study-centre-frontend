"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/data";
import { CourseCard } from "@/components/site/CourseCard";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { toast } from "sonner";
import api from "@/api/api";
import { Button } from "@/components/ui/button";
import { CourseShortInfo } from "@/interfaces/interface";

const PAGE_SIZE = 10;

export default function CoursesPage() {
  const [q, setQ] = useState("");
  const [courseData,setCourseData]= useState<CourseShortInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(q), 400);
    return () => clearTimeout(t);
  }, [q]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: PAGE_SIZE.toString(),
      });

      if (debouncedSearch.trim()) {
        params.append("search", debouncedSearch.trim());
      }
      const res = await api.get(
        `/api/v1/courses?${params.toString()}`,
      );
      console.log(res)
      if (res.status === 200) {
        setCourseData(res.data?.results)
        setTotalPages(res.data?.totalPages);
      } else {
        throw new Error("Somthing went wrong");
      }
    } catch {
      toast.error("Couldn't load admissions");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page]);

  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);


  return (
    <div>
      <section className="gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20">
          <Badge className="bg-white/15 text-white border-white/25">
            Courses
          </Badge>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold">
            All Courses
          </h1>
          <p className="mt-3 text-white/85 max-w-2xl">
            Browse every program we offer. Search by name or skill to find the
            right course for you.
          </p>
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
        {!loading && courseData.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            No courses match your search.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courseData.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
            
          </div>
        )}
        {totalPages > 1 && (
              <div className="flex items-center justify-end gap-2 mt-4">
                <Button
                  size="icon"
                  variant="outline"
                  disabled={page === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {page + 1} of {totalPages}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  disabled={page >= totalPages - 1}
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
      </section>
    </div>
  );
}
