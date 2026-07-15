import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { faculty } from "@/lib/data";
import { Mail, GraduationCap, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Faculty — Study Centre",
  description: "Meet our experienced teachers at Study Centre. Industry-trained faculty with 6–15 years of practical experience.",
};

export default function FacultyPage() {
  return (
    <div>
      <section className="gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <Badge className="bg-white/15 text-white border-white/25">Faculty</Badge>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold">Meet Our Teachers</h1>
          <p className="mt-3 text-white/85 max-w-2xl">Experienced, patient and passionate — our teachers make the difference.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {faculty.map((f, i) => (
          <Card key={f.name} className="hover:shadow-elegant transition hover:-translate-y-1 overflow-hidden">
            <div className={`h-24 ${i % 2 ? "gradient-accent" : "gradient-primary"}`} />
            <CardContent className="p-6 -mt-12">
              <div className="grid h-20 w-20 place-items-center rounded-2xl bg-card border-4 border-card shadow-elegant font-display text-2xl font-extrabold text-gradient">
                {f.initials}
              </div>
              <div className="mt-4 font-display text-lg font-bold">{f.name}</div>
              <div className="text-sm text-primary font-medium">{f.subject}</div>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> {f.qualification}</div>
                <div className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> {f.experience}</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> {f.contact}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
