"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, GraduationCap, CalendarCheck2, Bell, FileBadge, Wallet, User } from "lucide-react";
import { toast } from "sonner";

export default function StudentDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge variant="secondary">Student</Badge>
          <h1 className="mt-2 font-display text-3xl font-bold">Welcome, Rohit 👋</h1>
          <p className="text-muted-foreground text-sm">Enrollment: SC-2025-10234 · Course: Web Development</p>
        </div>
        <Link href="/login"><Button variant="outline">Logout</Button></Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          { icon: GraduationCap, label: "Course Progress", value: "68%", tone: "primary" },
          { icon: CalendarCheck2, label: "Attendance", value: "92%", tone: "accent" },
          { icon: FileBadge, label: "Certificates", value: "1", tone: "primary" },
          { icon: Wallet, label: "Fees Due", value: "₹2,500", tone: "accent" },
        ].map((s) => (
          <Card key={s.label} className="hover:shadow-elegant transition">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`grid h-11 w-11 place-items-center rounded-xl text-white ${s.tone === "accent" ? "gradient-accent text-accent-foreground" : "gradient-primary text-primary-foreground"}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="text-xl font-display font-bold">{s.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Course Progress</h2>
              <Badge variant="outline">Web Development</Badge>
            </div>
            <div className="mt-4 space-y-4">
              {[
                ["HTML5 & CSS3", 100], ["JavaScript ES6+", 92], ["React.js", 65], ["Node & Express", 30], ["MongoDB & Deploy", 5],
              ].map(([n, v]) => (
                <div key={n as string}>
                  <div className="flex justify-between text-sm mb-1"><span>{n}</span><span className="text-muted-foreground">{v}%</span></div>
                  <Progress value={v as number} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-display text-lg font-bold flex items-center gap-2"><Bell className="h-4 w-4 text-accent" /> Notifications</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="p-3 rounded-lg bg-secondary/60">Mid-term test scheduled 5 Dec.</li>
              <li className="p-3 rounded-lg bg-secondary/60">New assignment: React state management.</li>
              <li className="p-3 rounded-lg bg-secondary/60">Fees reminder: ₹2,500 due by 30 Nov.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Latest Marks</h2>
              <Button variant="outline" size="sm">View all</Button>
            </div>
            <Table className="mt-4">
              <TableHeader><TableRow><TableHead>Exam</TableHead><TableHead>Marks</TableHead><TableHead>Grade</TableHead></TableRow></TableHeader>
              <TableBody>
                {[["Unit Test 1", "42/50", "A"], ["JS Assignment", "18/20", "A+"], ["Mid Term", "76/100", "B+"]].map((r) => (
                  <TableRow key={r[0]}><TableCell className="font-medium">{r[0]}</TableCell><TableCell>{r[1]}</TableCell><TableCell><Badge variant="outline">{r[2]}</Badge></TableCell></TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-display text-lg font-bold flex items-center gap-2"><User className="h-4 w-4" /> Quick actions</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Button variant="outline" onClick={() => toast.success("Fee receipt downloaded (mock)")}><Download className="mr-2 h-4 w-4" />Fee Receipt</Button>
              <Button variant="outline" onClick={() => toast.success("Certificate downloaded (mock)")}><Download className="mr-2 h-4 w-4" />Certificate</Button>
              <Button variant="outline">Edit Profile</Button>
              <Link href="/verify"><Button variant="outline" className="w-full">Verify Certificate</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
