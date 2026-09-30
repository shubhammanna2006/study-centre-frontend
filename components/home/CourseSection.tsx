"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { CourseCard } from "../site/CourseCard";
import api from "@/api/api";
import { toast } from "sonner";
import { CourseShortInfo } from "@/interfaces/interface";

const CourseSection = () => {
  const [courseData, setCourseData] = useState<CourseShortInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: "0",
        size: "8",
      });

      const res = await api.get(`/api/v1/courses?${params.toString()}`);
      console.log(res);
      if (res.status === 200) {
        setCourseData(res.data?.results);
      } else {
        throw new Error("Somthing went wrong");
      }
    } catch {
      toast.error("Couldn't load admissions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <Badge variant="secondary">Courses</Badge>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">
            Popular Courses
          </h2>
          <p className="mt-2 text-muted-foreground">
            Choose from career-focused programs with practical labs and
            certification.
          </p>
        </div>
        <Link href="/courses">
          <Button variant="outline">
            View all courses <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      {!loading && courseData.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            No courses match your search.
          </div>
        ) : (
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {courseData.map((c) => (
          <CourseCard key={c.slug} course={c} />
        ))}
      </div>)}
    </section>
  );
};

export default CourseSection;
