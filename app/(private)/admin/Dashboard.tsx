import React from 'react'
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Download, Check, X } from 'lucide-react';
const pendingStudents = [
    { id: "APP-1042", name: "Ankit Sharma", course: "DCA", date: "20 Nov 2025" },
    { id: "APP-1043", name: "Neha Gupta", course: "Tally Prime", date: "21 Nov 2025" },
    { id: "APP-1044", name: "Vikram Patel", course: "Web Development", date: "22 Nov 2025" },
    { id: "APP-1045", name: "Sneha Iyer", course: "Graphic Design", date: "22 Nov 2025" },
];
const Dashboard = () => {
    return (
        <section>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <Badge variant="secondary">Dashboard</Badge>
                    <h1 className="mt-2 font-display text-2xl md:text-3xl font-bold">Dashboard overview</h1>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Global search..." className="pl-9 w-64" />
                    </div>
                    <Button className="gradient-accent text-accent-foreground border-0 hover:opacity-90"><Plus className="mr-1 h-4 w-4" />New</Button>
                </div>
            </div>

            {/* Stat cards */}
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                    { label: "Total Students", value: "5,213", trend: "+124 this month", tone: "primary" },
                    { label: "Pending Registrations", value: "24", trend: "review needed", tone: "accent" },
                    { label: "Certificates Issued", value: "4,812", trend: "+18 this week", tone: "primary" },
                    { label: "Revenue (Nov)", value: "₹4.8 L", trend: "+12% vs Oct", tone: "accent" },
                ].map((s) => (
                    <Card key={s.label} className="hover:shadow-elegant transition">
                        <CardContent className="p-5">
                            <div className="text-xs text-muted-foreground">{s.label}</div>
                            <div className={`mt-1 text-2xl font-display font-extrabold ${s.tone === "accent" ? "text-accent" : "text-primary"}`}>{s.value}</div>
                            <div className="text-xs text-muted-foreground mt-1">{s.trend}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts placeholder */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display font-bold">Admissions — last 6 months</h2>
                            <Badge variant="outline">Mock</Badge>
                        </div>
                        <div className="mt-4 h-56 flex items-end gap-3">
                            {[42, 68, 55, 90, 78, 112].map((v, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <div className={`w-full rounded-t-lg ${i % 2 ? "gradient-accent" : "gradient-primary"}`} style={{ height: `${v * 1.6}px` }} />
                                    <div className="text-[10px] text-muted-foreground">M{i + 1}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <h2 className="font-display font-bold">Top courses</h2>
                        <ul className="mt-4 space-y-3 text-sm">
                            {[["Web Development", 42], ["DCA", 36], ["Tally Prime", 28], ["ADCA", 22]].map(([n, v]) => (
                                <li key={n as string}>
                                    <div className="flex justify-between mb-1"><span>{n}</span><span className="text-muted-foreground">{v}</span></div>
                                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                                        <div className="h-full gradient-primary" style={{ width: `${(v as number) * 2}%` }} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* Pending registrations table */}
            <Card className="mt-6">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <h2 className="font-display font-bold">Pending Registrations</h2>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm"><Download className="mr-1 h-4 w-4" />Excel</Button>
                            <Button variant="outline" size="sm"><Download className="mr-1 h-4 w-4" />PDF</Button>
                        </div>
                    </div>
                    <div className="mt-4 overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>App ID</TableHead><TableHead>Name</TableHead><TableHead>Course</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingStudents.map((s) => (
                                    <TableRow key={s.id}>
                                        <TableCell className="font-mono text-xs">{s.id}</TableCell>
                                        <TableCell className="font-medium">{s.name}</TableCell>
                                        <TableCell>{s.course}</TableCell>
                                        <TableCell className="text-muted-foreground">{s.date}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="inline-flex gap-1">
                                                <Button size="sm" className="gradient-primary text-primary-foreground border-0 hover:opacity-90"><Check className="h-3.5 w-3.5" /></Button>
                                                <Button size="sm" variant="outline"><X className="h-3.5 w-3.5" /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}

export default Dashboard