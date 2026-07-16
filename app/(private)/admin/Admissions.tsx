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
  Check,
  X,
  Eye,
  UserPlus,
} from "lucide-react";

const admissions = [
  {
    id: "ADM-1001",
    name: "Rahul Kumar",
    course: "DCA",
    phone: "9876543210",
    status: "Pending",
    date: "20 Nov 2025",
  },
  {
    id: "ADM-1002",
    name: "Priya Sharma",
    course: "ADCA",
    phone: "9123456789",
    status: "Approved",
    date: "21 Nov 2025",
  },
  {
    id: "ADM-1003",
    name: "Ankit Singh",
    course: "Tally Prime",
    phone: "9988776655",
    status: "Pending",
    date: "22 Nov 2025",
  },
  {
    id: "ADM-1004",
    name: "Sneha Gupta",
    course: "Web Development",
    phone: "9871234567",
    status: "Rejected",
    date: "22 Nov 2025",
  },
];

const Admissions = () => {
  return (
    <section>
      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Badge variant="secondary">Admission</Badge>
          <h1 className="mt-2 text-3xl font-bold">
            Admission Management
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
            New Admission
          </Button>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-6">
        {[
          {
            label: "Total Applications",
            value: "542",
            color: "text-primary",
          },
          {
            label: "Pending",
            value: "26",
            color: "text-yellow-500",
          },
          {
            label: "Approved",
            value: "488",
            color: "text-green-600",
          },
          {
            label: "Rejected",
            value: "28",
            color: "text-red-500",
          },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-5">
              <div className="text-xs text-muted-foreground">
                {item.label}
              </div>

              <div className={`text-3xl font-bold mt-2 ${item.color}`}>
                {item.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admission Table */}

      <Card className="mt-6">
        <CardContent className="p-6">

          <div className="flex items-center justify-between flex-wrap gap-3">

            <h2 className="text-xl font-bold">
              Recent Admissions
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
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">
                    Actions
                  </TableHead>
                </TableRow>

              </TableHeader>

              <TableBody>

                {admissions.map((student) => (

                  <TableRow key={student.id}>

                    <TableCell className="font-mono">
                      {student.id}
                    </TableCell>

                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>

                    <TableCell>{student.course}</TableCell>

                    <TableCell>{student.phone}</TableCell>

                    <TableCell>

                      <Badge
                        variant={
                          student.status === "Approved"
                            ? "default"
                            : student.status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {student.status}
                      </Badge>

                    </TableCell>

                    <TableCell>
                      {student.date}
                    </TableCell>

                    <TableCell className="text-right">

                      <div className="inline-flex gap-2">

                        <Button
                          size="icon"
                          variant="outline"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                          size="icon"
                          className="gradient-primary border-0"
                        >
                          <Check className="h-4 w-4" />
                        </Button>

                        <Button
                          size="icon"
                          variant="destructive"
                        >
                          <X className="h-4 w-4" />
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

      <div className="grid md:grid-cols-3 gap-4 mt-6">

        <Card>

          <CardContent className="p-6 text-center">

            <UserPlus className="mx-auto h-10 w-10 text-primary" />

            <h3 className="font-semibold mt-4">
              New Admission
            </h3>

            <p className="text-sm text-muted-foreground mt-2">
              Register a new student admission.
            </p>

            <Button className="mt-5 w-full">
              Add Student
            </Button>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="p-6 text-center">

            <Download className="mx-auto h-10 w-10 text-primary" />

            <h3 className="font-semibold mt-4">
              Export Data
            </h3>

            <p className="text-sm text-muted-foreground mt-2">
              Download admission reports.
            </p>

            <Button className="mt-5 w-full" variant="outline">
              Export
            </Button>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="p-6 text-center">

            <Check className="mx-auto h-10 w-10 text-green-600" />

            <h3 className="font-semibold mt-4">
              Approvals
            </h3>

            <p className="text-sm text-muted-foreground mt-2">
              Review pending applications.
            </p>

            <Button className="mt-5 w-full">
              Review
            </Button>

          </CardContent>

        </Card>

      </div>

    </section>
  );
};

export default Admissions;