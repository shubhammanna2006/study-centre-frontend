import React from "react";
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
} from "lucide-react";

const students = [
  {
    id: "STU-1001",
    name: "Rahul Kumar",
    course: "DCA",
    phone: "9876543210",
    status: "Active",
    joined: "20 Nov 2025",
  },
  {
    id: "STU-1002",
    name: "Priya Sharma",
    course: "ADCA",
    phone: "9123456789",
    status: "Active",
    joined: "18 Nov 2025",
  },
  {
    id: "STU-1003",
    name: "Ankit Singh",
    course: "Web Development",
    phone: "9988776655",
    status: "Completed",
    joined: "12 Oct 2025",
  },
  {
    id: "STU-1004",
    name: "Sneha Gupta",
    course: "Tally Prime",
    phone: "9871234567",
    status: "Inactive",
    joined: "02 Sep 2025",
  },
];

const Students = () => {
  return (
    <section>
      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Badge variant="secondary">Students</Badge>
          <h1 className="mt-2 text-3xl font-bold">
            Student Management
          </h1>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              placeholder="Search student..."
              className="pl-9 w-64"
            />
          </div>

          <Button className="gradient-accent border-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-6">
        {[
          {
            label: "Total Students",
            value: "5,213",
            color: "text-primary",
          },
          {
            label: "Active Students",
            value: "4,965",
            color: "text-green-600",
          },
          {
            label: "Completed",
            value: "1,254",
            color: "text-blue-600",
          },
          {
            label: "Inactive",
            value: "248",
            color: "text-red-500",
          },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-5">
              <div className="text-xs text-muted-foreground">
                {item.label}
              </div>

              <div className={`mt-2 text-3xl font-bold ${item.color}`}>
                {item.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student Table */}

      <Card className="mt-6">
        <CardContent className="p-6">

          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">
              Student List
            </h2>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Excel
              </Button>

              <Button variant="outline" size="sm">
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
                  <TableHead>Course</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">
                    Actions
                  </TableHead>
                </TableRow>

              </TableHeader>

              <TableBody>

                {students.map((student) => (

                  <TableRow key={student.id}>

                    <TableCell className="font-mono">
                      {student.id}
                    </TableCell>

                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>

                    <TableCell>
                      {student.course}
                    </TableCell>

                    <TableCell>
                      {student.phone}
                    </TableCell>

                    <TableCell>

                      <Badge
                        variant={
                          student.status === "Active"
                            ? "default"
                            : student.status === "Completed"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {student.status}
                      </Badge>

                    </TableCell>

                    <TableCell>
                      {student.joined}
                    </TableCell>

                    <TableCell className="text-right">

                      <div className="inline-flex gap-2">

                        <Button size="icon" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button size="icon" variant="destructive">
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

      <div className="grid gap-4 mt-6 md:grid-cols-3">

        <Card>

          <CardContent className="p-6 text-center">

            <UserPlus className="mx-auto h-10 w-10 text-primary" />

            <h3 className="mt-4 font-semibold">
              Add Student
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Register a new student.
            </p>

            <Button className="mt-5 w-full">
              Add Student
            </Button>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="p-6 text-center">

            <Users className="mx-auto h-10 w-10 text-primary" />

            <h3 className="mt-4 font-semibold">
              Student Report
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Export all student information.
            </p>

            <Button
              variant="outline"
              className="mt-5 w-full"
            >
              Export
            </Button>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="p-6 text-center">

            <GraduationCap className="mx-auto h-10 w-10 text-green-600" />

            <h3 className="mt-4 font-semibold">
              Course Allocation
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage student course enrollments.
            </p>

            <Button className="mt-5 w-full">
              Manage
            </Button>

          </CardContent>

        </Card>

      </div>

    </section>
  );
};

export default Students; 