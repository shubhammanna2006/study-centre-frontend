import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { courses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, IndianRupee, GraduationCap, CheckCircle2, ArrowLeft } from "lucide-react";
import { DownloadBrochureButton } from "@/components/site/DownloadBrochureButton";

type Params = { slug: string };

function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: `${course.title} — Study Centre`,
    description: course.short,
  };
}

export default async function CourseDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const Icon = course.icon;

  return (
    <div>
      <section className={`${course.color === "orange" ? "gradient-accent" : "gradient-hero"} text-white`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <Link href="/courses" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All courses
          </Link>
          <div className="mt-4 grid gap-8 md:grid-cols-[auto_1fr] items-center">
            <div className="grid h-24 w-24 place-items-center rounded-3xl bg-white/15 backdrop-blur">
              <Icon className="h-10 w-10" />
            </div>
            <div>
              <Badge className="bg-white/15 text-white border-white/25">Course</Badge>
              <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold">{course.title}</h1>
              <p className="mt-2 text-white/85 max-w-2xl">{course.short}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</span>
                <span className="inline-flex items-center gap-1"><IndianRupee className="h-4 w-4" />{course.fees.toLocaleString("en-IN")}</span>
                <span className="inline-flex items-center gap-1"><GraduationCap className="h-4 w-4" />{course.eligibility}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-display text-xl font-bold">Syllabus</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.syllabus.map((s: string) => (
                  <li key={s} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="font-display text-xl font-bold">Benefits</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.benefits.map((b: string) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-accent shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="shadow-elegant border-primary/20">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground">Course Fees</div>
              <div className="text-3xl font-display font-extrabold text-gradient">₹{course.fees.toLocaleString("en-IN")}</div>
              <div className="text-xs text-muted-foreground">Installments available</div>
              <div className="mt-5 space-y-2">
                <Link href="/register"><Button className="w-full gradient-primary text-primary-foreground border-0 hover:opacity-90">Register Now</Button></Link>
                <DownloadBrochureButton />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="font-display font-semibold">Need help choosing?</div>
              <p className="text-sm text-muted-foreground mt-1">Talk to our counsellor for free career guidance.</p>
              <Link href="/contact"><Button variant="outline" className="mt-3 w-full">Contact Counsellor</Button></Link>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  );
}
