"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Plus,
  Download,
  Eye,
  Pencil,
  Trash2,
  Users,
  GraduationCap,
  UserPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

import type {
  StudentStats,
  AdmitCardSummary,
} from "@/interfaces/interface";
import { EditStudentDialog } from "@/components/admin/Editstudentdialog";
import { GenerateAdmintCard } from "@/components/admin/GenerateAdmintCard";
import { ViewStudentDialog } from "@/components/admin/Viewstudentdialog";
import api from "@/api/api";

const PAGE_SIZE = 10;

const Students = () => {
  const [rows, setRows] = useState<AdmitCardSummary[]>([]);
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [viewId, setViewId] = useState<string | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // debounce search input
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
      const res = await api.get(`/api/v1/admin/admit-cards?${params.toString()}`);
      if (res.status === 200) {
        setRows(res.data?.results);
        setTotalPages(res.data?.totalPages);
      } else {
        throw new Error("Somthing went wrong");
      }
    } catch {
      toast.error("Couldn't load students");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page]);

  const loadStats = useCallback(async () => {
    try {
      const res = await api.get(`/api/v1/admin/student/stats`);
      setStats(res.data);
    } catch {
      toast.error("Something went wrong! try again");
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
  }, [debouncedSearch]);

  const refreshAfterChange = () => {
    load();
    loadStats();
  };

  const openDetails = (id: string) => {
    setViewId(id);
    setViewOpen(true);
  };

  const openEdit = (id: string) => {
    setEditId(id);
    setEditOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      !window.confirm(
        `Remove "${name}"? This deletes their login and all records.`,
      )
    )
      return;
    setDeletingId(id);
    try {
      // await deleteStudent(id);
      toast.success("Student removed");
      refreshAfterChange();
    } catch {
      toast.error("Couldn't remove the student");
    } finally {
      setDeletingId(null);
    }
  };

  const exportAs = (format: "excel" | "pdf") => {
    // const url = getStudentExportUrl(format, { search: debouncedSearch, status: statusFilter });
    // window.open(url, "_blank");
  };

  return (
    <section>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Badge variant="secondary">Students</Badge>
          <h1 className="mt-2 text-3xl font-bold">Admit Card Management</h1>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search student..."
              className="pl-9 w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button
            className="gradient-accent border-0"
            onClick={() => setNewOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Generate Admit Card
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-6">
        {[
          {
            label: "Total Students",
            value: stats?.total,
            color: "text-primary",
          },
          {
            label: "Active Students",
            value: stats?.active,
            color: "text-green-600",
          },
          {
            label: "Completed",
            value: stats?.completed,
            color: "text-blue-600",
          },
          { label: "Inactive", value: stats?.inactive, color: "text-red-500" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-5">
              <div className="text-xs text-muted-foreground">{item.label}</div>
              {stats ? (
                <div className={`mt-2 text-3xl font-bold ${item.color}`}>
                  {item.value}
                </div>
              ) : (
                <Skeleton className="h-8 w-16 mt-2" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student Table */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Student List</h2>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportAs("excel")}
              >
                <Download className="mr-2 h-4 w-4" />
                Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportAs("pdf")}
              >
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto mt-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Exam Place</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Exam Time</TableHead>
                  <TableHead>Exam Date</TableHead>
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
                      No students match this search/filter.
                    </TableCell>
                  </TableRow>
                )}

                {!loading &&
                  rows.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        {student.admitCardNumber}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {student.studentName}
                      </TableCell>
                      <TableCell className="font-medium">
                        {student.examPlace}
                      </TableCell>
                      <TableCell>
                        {"1234567890"}
                      </TableCell>
                      <TableCell>{student.examTime}</TableCell>
                      <TableCell>
                       {student.examDate}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => openDetails(student.studentId)}
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            onClick={() => openEdit(student.id)}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            disabled={deletingId === student.id}
                            onClick={() =>
                              handleDelete(student.id, student.studentName)
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
      <div className="grid gap-4 mt-6 md:grid-cols-3">
        {/* <Card>
          <CardContent className="p-6 text-center">
            <UserPlus className="mx-auto h-10 w-10 text-primary" />
            <h3 className="mt-4 font-semibold">Add Student</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Register a new student.
            </p>
            <Button className="mt-5 w-full" onClick={() => setNewOpen(true)}>
              Add Student
            </Button>
          </CardContent>
        </Card> */}

        <Card>
          <CardContent className="p-6 text-center">
            <Users className="mx-auto h-10 w-10 text-primary" />
            <h3 className="mt-4 font-semibold">Student Report</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Export all student information.
            </p>
            <Button
              variant="outline"
              className="mt-5 w-full"
              onClick={() => exportAs("excel")}
            >
              Export
            </Button>
          </CardContent>
        </Card>
      </div>

      <ViewStudentDialog
        studentId={viewId}
        open={viewOpen}
        onOpenChange={setViewOpen}
      />
      <EditStudentDialog
        studentId={editId}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSaved={refreshAfterChange}
      />
      <GenerateAdmintCard
        open={newOpen}
        onOpenChange={setNewOpen}
        onCreated={refreshAfterChange}
      />
    </section>
  );
};

export default Students;
