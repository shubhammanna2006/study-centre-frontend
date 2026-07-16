"use client";

import React from "react";
import Link from "next/link";
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
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const courses = [
  {
    id: "CRS-101",
    title: "DCA",
    duration: "6 Months",
    fee: "₹8,000",
    students: 120,
    status: "Active",
  },
  {
    id: "CRS-102",
    title: "ADCA",
    duration: "12 Months",
    fee: "₹15,000",
    students: 85,
    status: "Active",
  },
  {
    id: "CRS-103",
    title: "Tally Prime",
    duration: "3 Months",
    fee: "₹6,000",
    students: 42,
    status: "Active",
  },
  {
    id: "CRS-104",
    title: "Web Development",
    duration: "6 Months",
    fee: "₹20,000",
    students: 35,
    status: "Inactive",
  },
];

export default function CoursesPage() {
  return (
    <section>
      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Badge variant="secondary">Courses</Badge>

          <h1 className="mt-2 text-3xl font-bold">
            Course Management
          </h1>
        </div>

        <div className="flex gap-2">

          <div className="relative">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search course..."
              className="w-64 pl-9"
            />

          </div>

          <Button asChild className="gradient-accent border-0">
            <Link href="/admin/courses/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Link>
          </Button>

        </div>
      </div>

      {/* Stats */}

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        {[
          {
            label: "Total Courses",
            value: "18",
            color: "text-primary",
          },
          {
            label: "Running Courses",
            value: "15",
            color: "text-green-600",
          },
          {
            label: "Total Students",
            value: "842",
            color: "text-blue-600",
          },
          {
            label: "Inactive Courses",
            value: "3",
            color: "text-red-500",
          },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground">
                {item.label}
              </p>

              <h2 className={`mt-2 text-3xl font-bold ${item.color}`}>
                {item.value}
              </h2>
            </CardContent>
          </Card>
        ))}

      </div>

      {/* Table */}

      <Card className="mt-6">

        <CardContent className="p-6">

          <div className="flex flex-wrap items-center justify-between gap-3">

            <h2 className="text-xl font-bold">
              Course List
            </h2>

            <div className="flex gap-2">

              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Excel
              </Button>

              <Button size="sm" variant="outline">
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
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">
                    Actions
                  </TableHead>

                </TableRow>

              </TableHeader>

              <TableBody>

                {courses.map((course) => (

                  <TableRow key={course.id}>

                    <TableCell className="font-mono">
                      {course.id}
                    </TableCell>

                    <TableCell className="font-medium">
                      {course.title}
                    </TableCell>

                    <TableCell>
                      {course.duration}
                    </TableCell>

                    <TableCell>
                      {course.fee}
                    </TableCell>

                    <TableCell>
                      {course.students}
                    </TableCell>

                    <TableCell>

                      <Badge
                        variant={
                          course.status === "Active"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {course.status}
                      </Badge>

                    </TableCell>

                    <TableCell className="text-right">

                      <div className="inline-flex gap-2">

                        <Button
                          size="icon"
                          variant="outline"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          size="icon"
                          variant="destructive"
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

        </CardContent>

      </Card>

      {/* Quick Actions */}

      <div className="mt-6 grid gap-4 md:grid-cols-3">

        <Card>
          <CardContent className="p-6 text-center">

            <BookOpen className="mx-auto h-10 w-10 text-primary" />

            <h3 className="mt-4 font-semibold">
              Add New Course
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Create a new course for students.
            </p>

            <Button className="mt-5 w-full">
              Add Course
            </Button>

          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">

            <Clock className="mx-auto h-10 w-10 text-primary" />

            <h3 className="mt-4 font-semibold">
              Course Duration
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Update course duration and schedule.
            </p>

            <Button
              variant="outline"
              className="mt-5 w-full"
            >
              Manage
            </Button>

          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">

            <IndianRupee className="mx-auto h-10 w-10 text-green-600" />

            <h3 className="mt-4 font-semibold">
              Course Fees
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Update fee structure for all courses.
            </p>

            <Button className="mt-5 w-full">
              Manage Fees
            </Button>

          </CardContent>
        </Card>

      </div>
    </section>
  );
} 