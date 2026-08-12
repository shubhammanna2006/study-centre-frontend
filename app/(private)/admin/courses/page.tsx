"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Search,
  Plus,
  Download,
  Eye,
  Pencil,
  Trash2,
  BookOpen,
  Clock,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

import type { CourseSummary, CourseStats } from "@/interfaces/interface";
import { CourseFormDialog } from "@/components/admin/CourseFormDialog";
import { ViewCourseDialog } from "@/components/admin/ViewCourseDialog";
import api from "@/api/api";

const PAGE_SIZE = 10;

export default function CoursesPage() {
  const [rows, setRows] = useState<CourseSummary[]>([]);
  const [stats, setStats] = useState<CourseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "ALL" | "ACTIVE" | "INACTIVE"
  >("ALL");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null); // null = add mode
  const [viewId, setViewId] = useState<string | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

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

      if (activeFilter !== "ALL") {
        params.append("active", activeFilter === "ACTIVE" ? "true" : "false");
      }
      const res = await api.get(
        `/api/v1/admin/courses/added-course-summery?${params.toString()}`,
      );
      if (res.status === 200) {
        setRows(res.data?.results);
        setTotalPages(res.data?.totalPages);
      } else {
        throw new Error("Somthing went wrong");
      }
    } catch {
      toast.error("Couldn't load admissions");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, activeFilter, page]);

  const loadStats = useCallback(async () => {
    try {
      const response = await api.get("/api/v1/admin/courses/stats");
      if (response.status===200) {
        setStats(response.data)
      }else{
        throw new Error("Something went wrong")
      }
    } catch {
      toast.error("Something went wrong!")
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    loadStats();
  }, [loadStats]);
  useEffect(() => {
    setPage(0);
  }, [debouncedSearch, activeFilter]);

  const refreshAfterChange = () => {
    load();
    loadStats();
  };

  const openAdd = () => {
    setEditId(null);
    setFormOpen(true);
  };
  const openEdit = (id: string) => {
    setEditId(id);
    setFormOpen(true);
  };
  const openView = (id: string) => {
    setViewId(id);
    setViewOpen(true);
  };

  const removeCourse = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    setDeletingId(id);
    try {
      await api.delete(`/api/v1/admin/courses/${id}`);
      toast.success("Course deleted");
     refreshAfterChange();
    } catch {
      toast.error("Couldn't delete — it may have active enrollments");
    } finally {
      setDeletingId(null);
    }
  };

  const exportAs = (format: "excel" | "pdf") => {
    // const url = getCourseExportUrl(format, {
    //   search: debouncedSearch,
    //   active: activeFilter === "ALL" ? undefined : activeFilter === "ACTIVE",
    // });
    // window.open(url, "_blank");
  };

  return (
    <section>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Badge variant="secondary">Courses</Badge>
          <h1 className="mt-2 text-3xl font-bold">Course Management</h1>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search course..."
              className="w-64 pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button className="gradient-accent border-0" onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mt-4">
        {(["ALL", "ACTIVE", "INACTIVE"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setActiveFilter(s)}
            className={`px-3 py-1.5 rounded-full text-sm border transition ${
              activeFilter === s
                ? "gradient-primary text-primary-foreground border-transparent"
                : "border-border hover:bg-secondary"
            }`}
          >
            {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          {
            label: "Total Courses",
            value: stats?.total,
            color: "text-primary",
          },
          {
            label: "Running Courses",
            value: stats?.active,
            color: "text-green-600",
          },
          // {
          //   label: "Total Students",
          //   value: stats?.totalStudents,
          //   color: "text-blue-600",
          // },
          {
            label: "Inactive Courses",
            value: stats?.inactive,
            color: "text-red-500",
          },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              {stats ? (
                <h2 className={`mt-2 text-3xl font-bold ${item.color}`}>
                  {item.value}
                </h2>
              ) : (
                <Skeleton className="h-8 w-16 mt-2" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Course List</h2>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => exportAs("excel")}
              >
                <Download className="mr-2 h-4 w-4" />
                Excel
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => exportAs("pdf")}
              >
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Fee</TableHead>
                  {/* <TableHead>Students</TableHead> */}
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 7 }).map((__, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-5 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}

                {!loading && rows.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground py-10"
                    >
                      No courses match this search/filter.
                    </TableCell>
                  </TableRow>
                )}

                {!loading &&
                  rows.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-mono text-xs">
                        {course.id.slice(0, 8).toUpperCase()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {course.title}
                      </TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>
                        ₹{course.fees}
                      </TableCell>
                      {/* <TableCell>{course.enrolledStudents}</TableCell> */}
                      <TableCell>
                        <Badge
                          variant={course.active ? "default" : "destructive"}
                        >
                          {course.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => openView(course.id)}
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            onClick={() => openEdit(course.id)}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            disabled={deletingId === course.id}
                            onClick={() =>
                              removeCourse(course.id, course.title)
                            }
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

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
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-primary" />
            <h3 className="mt-4 font-semibold">Add New Course</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Create a new course for students.
            </p>
            <Button className="mt-5 w-full" onClick={openAdd}>
              Add Course
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="mx-auto h-10 w-10 text-primary" />
            <h3 className="mt-4 font-semibold">Course Duration</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Update course duration and schedule.
            </p>
            <Button
              variant="outline"
              className="mt-5 w-full"
              onClick={() => setActiveFilter("ALL")}
            >
              Manage
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <IndianRupee className="mx-auto h-10 w-10 text-green-600" />
            <h3 className="mt-4 font-semibold">Course Fees</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Update fee structure for all courses.
            </p>
            <Button
              className="mt-5 w-full"
              onClick={() => setActiveFilter("ALL")}
            >
              Manage Fees
            </Button>
          </CardContent>
        </Card>
      </div>

      <CourseFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        onSaved={refreshAfterChange}
        courseId={editId}
      />
      <ViewCourseDialog
        courseId={viewId}
        open={viewOpen}
        onOpenChange={setViewOpen}
      />
    </section>
  );
}
