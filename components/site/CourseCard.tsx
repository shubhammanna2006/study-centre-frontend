import Link from "next/link";
import type { Course } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Clock, IndianRupee, ArrowRight } from "lucide-react";

export function CourseCard({ course }: { course: Course }) {
  const Icon = course.icon;
  const accent = course.color === "orange";
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      <div className={`h-32 relative overflow-hidden ${accent ? "gradient-accent" : "gradient-primary"}`}>
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:14px_14px]" />
        <Icon className={`absolute right-4 bottom-4 h-16 w-16 ${accent ? "text-accent-foreground" : "text-primary-foreground"} opacity-90 group-hover:scale-110 transition-transform`} />
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg leading-snug">{course.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{course.short}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-foreground"><IndianRupee className="h-3.5 w-3.5" />{course.fees.toLocaleString("en-IN")}</span>
        </div>
        <div className="mt-5 flex gap-2">
          <Link href={`/courses/${course.slug}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">Details <ArrowRight className="ml-1 h-3.5 w-3.5" /></Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="gradient-primary text-primary-foreground border-0 hover:opacity-90">Enroll</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
