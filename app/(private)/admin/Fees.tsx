"use client";

import React, { useState } from "react";
import { Search, Plus, Download, Wallet, Users, CircleDollarSign } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const feeData = [
  {
    id: "FEE-1001",
    student: "Rahul Kumar",
    course: "DCA",
    totalFee: 8000,
    paid: 6000,
    due: 2000,
    status: "Partial",
    lastPayment: "20 Jul 2026",
  },
  {
    id: "FEE-1002",
    student: "Priya Sharma",
    course: "ADCA",
    totalFee: 12000,
    paid: 12000,
    due: 0,
    status: "Paid",
    lastPayment: "18 Jul 2026",
  },
  {
    id: "FEE-1003",
    student: "Ankit Singh",
    course: "Tally Prime",
    totalFee: 5000,
    paid: 0,
    due: 5000,
    status: "Due",
    lastPayment: "-",
  },
  {
    id: "FEE-1004",
    student: "Sneha Gupta",
    course: "Web Development",
    totalFee: 15000,
    paid: 9000,
    due: 6000,
    status: "Partial",
    lastPayment: "15 Jul 2026",
  },
];

export default function FeesDashboard() {
  const [search, setSearch] = useState("");

  const filteredStudents = feeData.filter(
    (item) =>
      item.student.toLowerCase().includes(search.toLowerCase()) ||
      item.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="space-y-6">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <Badge variant="secondary">
            Fees
          </Badge>

          <h1 className="mt-2 text-3xl font-bold">
            Fees Management
          </h1>

          <p className="text-muted-foreground">
            Manage student fee collection and due payments.
          </p>
        </div>

        <div className="flex gap-2">

          <div className="relative">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Student..."
              className="w-64 pl-9"
            />

          </div>

          <Button className="gradient-primary border-0">
            <Plus className="mr-2 h-4 w-4" />
            Collect Fee
          </Button>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <Card>
          <CardContent className="p-5">

            <Wallet className="h-8 w-8 text-primary" />

            <p className="mt-4 text-sm text-muted-foreground">
              Total Collection
            </p>

            <h2 className="text-3xl font-bold mt-1">
              ₹8,45,000
            </h2>

          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">

            <CircleDollarSign className="h-8 w-8 text-green-600" />

            <p className="mt-4 text-sm text-muted-foreground">
              Today's Collection
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-1">
              ₹24,500
            </h2>

          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">

            <Wallet className="h-8 w-8 text-red-500" />

            <p className="mt-4 text-sm text-muted-foreground">
              Outstanding Due
            </p>

            <h2 className="text-3xl font-bold text-red-500 mt-1">
              ₹1,82,000
            </h2>

          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">

            <Users className="h-8 w-8 text-blue-600" />

            <p className="mt-4 text-sm text-muted-foreground">
              Students
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-1">
              {feeData.length}
            </h2>

          </CardContent>
        </Card>

      </div>

      {/* Fee Table */}

      <Card>

        <CardContent className="p-6">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xl font-bold">
              Student Fee Records
            </h2>

            <div className="flex gap-2">

              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Excel
              </Button>

              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>

            </div>

          </div>

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>ID</TableHead>

                <TableHead>Student</TableHead>

                <TableHead>Course</TableHead>

                <TableHead>Total Fee</TableHead>

                <TableHead>Paid</TableHead>

                <TableHead>Due</TableHead>

                <TableHead>Status</TableHead>

                <TableHead>Last Payment</TableHead>

                <TableHead className="text-right">
                  Actions
                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {filteredStudents.map((item) => (

                <TableRow key={item.id}>

                  <TableCell>{item.id}</TableCell>

                  <TableCell className="font-medium">
                    {item.student}
                  </TableCell>

                  <TableCell>{item.course}</TableCell>

                  <TableCell>₹{item.totalFee}</TableCell>

                  <TableCell className="text-green-600 font-semibold">
                    ₹{item.paid}
                  </TableCell>

                  <TableCell className="text-red-500 font-semibold">
                    ₹{item.due}
                  </TableCell>

                  <TableCell>

                    <Badge
                      variant={
                        item.status === "Paid"
                          ? "default"
                          : item.status === "Partial"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>

                  </TableCell>

                  <TableCell>
                    {item.lastPayment}
                  </TableCell>

                  <TableCell className="text-right">

                    {/* Actions added in Part 2 */}

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </CardContent>

      </Card>

    </section>
  );
}