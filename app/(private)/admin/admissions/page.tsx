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
  Check,
  X,
  Eye,
  UserPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import type {
  RegistrationSummary,
  RegistrationStats,
  RegistrationStatus,
} from "@/interfaces/interface";
import { ViewAdmissionDialog } from "@/components/admin/Viewadmissiondialog ";
import { NewAdmissionDialog } from "@/components/admin/Newadmissiondialog";
import api from "@/api/api";
import { error } from "console";
import { TimeFormeter } from "@/utility/TimeFormeter";

const PAGE_SIZE = 10;

const Admissions = () => {
  const [rows, setRows] = useState<RegistrationSummary[]>([]);
  const [stats, setStats] = useState<RegistrationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<RegistrationStatus | "ALL">(
    "ALL",
  );
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [viewId, setViewId] = useState<string | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [actingId, setActingId] = useState<string | null>(null);

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

      if (statusFilter !== "ALL") {
        params.append("status", statusFilter);
      }
      const res = await api.get(
        `/api/v1/admin/admission-details?${params.toString()}`,
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
  }, [debouncedSearch, statusFilter, page]);

  const loadStats = useCallback(async () => {
    try {
      // setStats(await fetchRegistrationStats());
      const res = await api.get(`/api/v1/admin/admission-details/stats`);
      console.log("first", res);
      if (res.status === 200) {
        setStats(res.data);
      }
      else {
        throw new Error("Somthing went wrong");
      }
    } catch {
      toast.error("Something went wrong! try again")
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
  }, [debouncedSearch, statusFilter]);

  const openDetails = (id: string) => {
    setViewId(id);
    setViewOpen(true);
  };

  const refreshAfterChange = () => {
    load();
    loadStats();
  };

  const quickAct = async (id: string, action: "approve" | "reject") => {
    setActingId(id);
    try {
      if (action === "approve") {
        const res = await api.put(`/api/v1/admin/admission/approve/${id}`);
        console.log("first11111",res)
        toast.success("Approved — login credentials emailed to the applicant");
      } //else {
      //   await rejectRegistration(id);
      //   toast.success("Application rejected");
      // }
      refreshAfterChange();
    } catch {
      toast.error("Action failed, please try again");
    } finally {
      setActingId(null);
    }
  };

  const exportAs = (format: "excel" | "pdf") => {
    // const url = getRegistrationExportUrl(format, { search: debouncedSearch, status: statusFilter });
    // window.open(url, "_blank");
  };

  return (
    <section>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Badge variant="secondary">Admission</Badge>
          <h1 className="mt-2 text-3xl font-bold">Admission Management</h1>
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
            New Admission
          </Button>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mt-4">
        {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-sm border transition ${
              statusFilter === s
                ? "gradient-primary text-primary-foreground border-transparent"
                : "border-border hover:bg-secondary"
            }`}
          >
            {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-6">
        {[
          {
            label: "Total Applications",
            value: stats?.total,
            color: "text-primary",
          },
          { label: "Pending", value: stats?.pending, color: "text-yellow-500" },
          {
            label: "Approved",
            value: stats?.approved,
            color: "text-green-600",
          },
          { label: "Rejected", value: stats?.rejected, color: "text-red-500" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-5">
              <div className="text-xs text-muted-foreground">{item.label}</div>
              {stats ? (
                <div className={`text-3xl font-bold mt-2 ${item.color}`}>
                  {item.value}
                </div>
              ) : (
                <Skeleton className="h-8 w-16 mt-2" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admission Table */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-bold">Recent Admissions</h2>
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
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
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
                      No admissions match this search/filter.
                    </TableCell>
                  </TableRow>
                )}

                {!loading &&
                  rows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-xs">
                        {r.id.slice(0, 8).toUpperCase()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {r.fullName}
                      </TableCell>
                      <TableCell>{r.course}</TableCell>
                      <TableCell>{r.mobileNumber}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            r.status === "APPROVED"
                              ? "default"
                              : r.status === "PENDING"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {r.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {TimeFormeter(r?.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => openDetails(r.id)}
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {r.status === "PENDING" && (
                            <>
                              <Button
                                size="icon"
                                className="gradient-primary border-0"
                                disabled={actingId === r.id}
                                onClick={() => quickAct(r.id, "approve")}
                                title="Approve"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="destructive"
                                disabled={actingId === r.id}
                                onClick={() => quickAct(r.id, "reject")}
                                title="Reject"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
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
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardContent className="p-6 text-center">
            <UserPlus className="mx-auto h-10 w-10 text-primary" />
            <h3 className="font-semibold mt-4">New Admission</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Register a new student admission.
            </p>
            <Button className="mt-5 w-full" onClick={() => setNewOpen(true)}>
              Add Student
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Download className="mx-auto h-10 w-10 text-primary" />
            <h3 className="font-semibold mt-4">Export Data</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Download admission reports.
            </p>
            <Button
              className="mt-5 w-full"
              variant="outline"
              onClick={() => exportAs("excel")}
            >
              Export
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Check className="mx-auto h-10 w-10 text-green-600" />
            <h3 className="font-semibold mt-4">Approvals</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Review pending applications.
            </p>
            <Button
              className="mt-5 w-full"
              onClick={() => setStatusFilter("PENDING")}
            >
              Review
            </Button>
          </CardContent>
        </Card>
      </div>

      <ViewAdmissionDialog
        registrationId={viewId}
        open={viewOpen}
        onOpenChange={setViewOpen}
        onStatusChanged={refreshAfterChange}
      />
      <NewAdmissionDialog
        open={newOpen}
        onOpenChange={setNewOpen}
        onCreated={refreshAfterChange}
      />
    </section>
  );
};

export default Admissions;
