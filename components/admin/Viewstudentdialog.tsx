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
import { FileText, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { StudentDetail } from "@/interfaces/interface";
import api from "@/api/api";

interface Props {
  studentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewStudentDialog({ studentId, open, onOpenChange }: Props) {
  const [detail, setDetail] = useState<StudentDetail | null>(null);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    if (!open || !studentId) {
      setDetail(null);
      return;
    }

    const fetchRegistrationDetail = async () => {
      setLoading(true);

      try {
        const res = await api.get(
          `/api/v1/admin/admit-cards/${studentId}`,
        );

        console.log("Admission response:", res.data);

        setDetail(res.data);
      } catch (err) {
        toast.error("Couldn't load student details");
      } finally {
        setLoading(false);
      }
    };
     fetchRegistrationDetail();
  }, [open, studentId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
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
                <div className="text-lg font-semibold">{detail.fullName}</div>
                <div className="text-sm text-muted-foreground">{detail.enrollmentId} · {detail.email}</div>
              </div>
              <Badge
                variant={
                  detail.status === "ACTIVE" ? "default"
                  : detail.status === "COMPLETED" ? "secondary"
                  : "destructive"
                }
              >
                {detail.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <Field label="Father's Name" value={detail.fatherName} />
              <Field label="Mother's Name" value={detail.motherName} />
              <Field label="Date of Birth" value={detail.dateOfBirth} />
              <Field label="Gender" value={detail.gender} />
              <Field label="Mobile" value={detail.mobileNumber} />
              <Field label="Aadhaar" value={detail.aadhaarNumber} />
              <Field label="Qualification" value={detail.qualification} />
              <Field label="Admission Date" value={new Date(detail.admissionDate).toLocaleDateString()} />
              <Field
                label="Address"
                value={`${detail.address}, ${detail.city}, ${detail.state} - ${detail.pinCode}`}
                span
              />
            </div>

            <div>
              <div className="text-xs font-medium text-muted-foreground mb-2">Enrolled Courses</div>
              <div className="space-y-2">
                {detail.courses.map((c:string,index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
                    <div>
                      <div className="font-medium">{c}</div>
                      {/* <div className="text-xs text-muted-foreground">Enrolled {new Date(c.enrolledDate).toLocaleDateString()}</div> */}
                    </div>
                    {/* <Badge variant="outline">{c.enrollmentStatus}</Badge> */}
                  </div>
                ))}
                {detail.courses.length === 0 && (
                  <div className="text-sm text-muted-foreground">Not enrolled in any course.</div>
                )}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-muted-foreground mb-2">Documents</div>
              <div className="flex flex-wrap gap-2">
                <DocLink href={detail.profilePhotoUrl} label="Photo" />
                <DocLink href={detail.aadhaarCardUrl} label="Aadhaar" />
                <DocLink href={detail.signatureUrl} label="Signature" />
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, value, span }: { label: string; value: string; span?: boolean }) {
  return (
    <div className={span ? "col-span-2" : undefined}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function DocLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-secondary transition"
    >
      <FileText className="h-3.5 w-3.5" /> {label} <ExternalLink className="h-3 w-3" />
    </a>
  );
}