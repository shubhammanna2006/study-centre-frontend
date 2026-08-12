"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { CourseDetail } from "@/interfaces/interface";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/api/api";

interface Props {
  courseId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewCourseDialog({ courseId, open, onOpenChange }: Props) {
  const [detail, setDetail] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
       if (!open || !courseId) {
      setDetail(null);
      return;
    }
      setLoading(true);
      try {
        const response = await api.get(`/api/v1/admin/courses/${courseId}`);
        const c = response.data;
        console.log("data----",response)
        setDetail(c)
      } catch (error) {
        toast.error("Couldn't load course details")
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [open, courseId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Course Details</DialogTitle>
        </DialogHeader>

        {loading && (
          <div className="space-y-3 py-4">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-5 w-full" />)}
          </div>
        )}

        {!loading && detail && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{detail.title}</div>
                <div className="text-sm text-muted-foreground">/{detail.slug}</div>
              </div>
              <Badge variant={detail.active ? "default" : "destructive"}>
                {detail.active ? "Active" : "Inactive"}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">{detail.shortDesc}</p>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <Field label="Duration" value={detail.duration} />
              <Field label="Fees" value={`₹${detail.fees.toLocaleString("en-IN")}`} />
              {/* <Field label="Enrolled Students" value={String(detail.)} /> */}
            </div>

            <Field label="Eligibility" value={detail.eligibility} />

            <div>
              <div className="text-xs font-medium text-muted-foreground mb-2">Syllabus</div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {detail.syllabus.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-medium text-muted-foreground mb-2">Benefits</div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {detail.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-accent shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}