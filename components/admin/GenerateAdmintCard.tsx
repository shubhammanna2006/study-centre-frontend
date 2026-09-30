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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

import type {
  StudentSummary,
  StudentStats,
  StudentStatus,
} from "@/interfaces/interface";
import api from "@/api/api";
import { Label } from "../ui/label";
import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

const PAGE_SIZE = 10;

export function GenerateAdmintCard({ open, onOpenChange, onCreated }: Props) {
  const [rows, setRows] = useState<StudentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  const [examDate, setExamDate] = useState("");
  const [examTime, setExamTime] = useState("");
  const [examPlace, setExamPlace] = useState("");

  const [generating, setGenerating] = useState(false);
  const toggleStudent = (studentId: string) => {
    setSelectedStudentIds((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      }

      return [...prev, studentId];
    });
  };
  const generateAdmitCards = async () => {
    if (selectedStudentIds.length === 0) {
      toast.error("Please select at least one student");
      return;
    }

    if (!examDate || !examTime || !examPlace.trim()) {
      toast.error("Please provide exam date, time and place");
      return;
    }

    setGenerating(true);

    try {
      const payload = {
        studentIds: selectedStudentIds,
        examDate,
        examTime,
        examPlace: examPlace.trim(),
      };

      const res = await api.post("/api/v1/admin/admit-cards/generate", payload);

      console.log("Generated admit cards:", res.data);

      toast.success(
        `${selectedStudentIds.length} admit card${
          selectedStudentIds.length > 1 ? "s" : ""
        } generated successfully`,
      );

      onCreated();

      // Clear selection
      setSelectedStudentIds([]);
      setExamDate("");
      setExamTime("");
      setExamPlace("");

      onOpenChange(false);
    } catch (error) {
      console.error("Admit card generation failed:", error);

      toast.error("Failed to generate admit cards");
    } finally {
      setGenerating(false);
    }
  };
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
      const res = await api.get(`/api/v1/admin/student?${params.toString()}`);
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

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate Admit Cards</DialogTitle>{" "}
        </DialogHeader>{" "}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search student..."
            className="pl-9 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Student List</h2>

              <div className="flex gap-2">
                {/* <Button
                variant="outline"
                size="sm"
                onClick={() => exportAs("excel")}
              >
                <Download className="mr-2 h-4 w-4" />
                Excel
              </Button> */}
                {/* <Button
                variant="outline"
                size="sm"
                onClick={() => exportAs("pdf")}
              >
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button> */}
              </div>
            </div>

            <div className="overflow-x-auto mt-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
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
                        <TableCell className="font-mono text-xs">
                          {student.enrollmentId}
                        </TableCell>
                        <TableCell className="font-medium">
                          {student.fullName}
                        </TableCell>
                        <TableCell>
                          {student.courses.join(", ") || "—"}
                        </TableCell>
                        <TableCell>{student.mobileNumber}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              student.status === "ACTIVE"
                                ? "default"
                                : student.status === "COMPLETED"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(student.admissionDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="flex justify-end items-center">
                          <input
                            type="checkbox"
                            checked={selectedStudentIds.includes(student.id)}
                            onChange={() => toggleStudent(student.id)}
                            className="h-4 w-4"
                          />
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
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <F label="Exam Date">
                <Input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                />
              </F>

              <F label="Exam Time">
                <Input
                  type="time"
                  value={examTime}
                  onChange={(e) => setExamTime(e.target.value)}
                />
              </F>

              <F label="Exam Place">
                <Input
                  placeholder="e.g. Study Centre, Jamshedpur"
                  value={examPlace}
                  onChange={(e) => setExamPlace(e.target.value)}
                />
              </F>
            </div>
          </CardContent>
        </Card>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button
            disabled={
              generating ||
              selectedStudentIds.length === 0 ||
              !examDate ||
              !examTime ||
              !examPlace.trim()
            }
            onClick={generateAdmitCards}
          >
            {generating
              ? "Generating..."
              : `Generate Admit Card${selectedStudentIds.length > 1 ? "s" : ""}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
