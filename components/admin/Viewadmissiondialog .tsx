"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
// import { fetchRegistrationDetail, approveRegistration, rejectRegistration } from "@/api/admissions";
import type { RegistrationDetail } from "@/interfaces/interface";
import { FileText, Check, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import api from "@/api/api";
import { TimeFormeter } from "@/utility/TimeFormeter";
import { error } from "console";

interface Props {
  registrationId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChanged: () => void; // parent refetches the table
}

export function ViewAdmissionDialog({
  registrationId,
  open,
  onOpenChange,
  onStatusChanged,
}: Props) {
  const [detail, setDetail] = useState<RegistrationDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open || !registrationId) {
      setDetail(null);
      return;
    }

    const fetchRegistrationDetail = async () => {
      setLoading(true);

      try {
        const res = await api.get(
          `/api/v1/admin/admission-details/${registrationId}`,
        );

        console.log("Admission response:", res.data);

        setDetail(res.data);
      } catch (err) {
        console.error("Error fetching admission details:", err);

        toast.error("Couldn't load application details");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrationDetail();
  }, [open, registrationId]);

  const act = async (action: "approve" | "reject") => {
    if (!registrationId) return;
    setBusy(true);
    try {
      if (action === "approve") {
        const res = await api.put(`/api/v1/admin/admission/approve/${registrationId}`);
        console.log("first11111", res);
        toast.success("Approved — login credentials emailed to the applicant");
      }
      //   } else {
      //     await rejectRegistration(registrationId);
      //     toast.success("Application rejected");
      //   }
      onStatusChanged();
      onOpenChange(false);
    } catch {
      toast.error("Action failed, please try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Admission Application</DialogTitle>
        </DialogHeader>

        {loading && (
          <div className="space-y-3 py-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        )}

        {!loading && detail && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{detail.fullName}</div>
                <div className="text-sm text-muted-foreground">
                  {detail.email}
                </div>
              </div>
              <Badge
                variant={
                  detail.status === "APPROVED"
                    ? "default"
                    : detail.status === "PENDING"
                      ? "secondary"
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
              <Field
                label="Applied On"
                value={TimeFormeter(detail.createdAt)}
              />
              <Field
                label="Address"
                value={`${detail.address}, ${detail.city}, ${detail.state} - ${detail.pinCode}`}
                span
              />
              <Field label="Courses Applied For" value={detail.course} span />
            </div>

            <div>
              <div className="text-xs font-medium text-muted-foreground mb-2">
                Documents
              </div>
              <div className="flex flex-wrap gap-2">
                {detail.profilePhoto && (
                  <DocLink href={detail.profilePhoto} label="Photo" />
                )}
                {detail.aadhaarDocument && (
                  <DocLink href={detail.aadhaarDocument} label="Aadhaar" />
                )}
                {detail.signature && (
                  <DocLink href={detail.signature} label="Signature" />
                )}
                {!detail.profilePhoto &&
                  !detail.aadhaarDocument &&
                  !detail.signature && (
                    <span className="text-sm text-muted-foreground">
                      No documents uploaded
                    </span>
                  )}
              </div>
            </div>
          </div>
        )}

        {!loading && detail && detail.status === "PENDING" && (
          <DialogFooter className="gap-2">
            <Button
              variant="destructive"
              disabled={busy}
              onClick={() => act("reject")}
            >
              <X className="mr-2 h-4 w-4" /> Reject
            </Button>
            <Button
              className="gradient-primary border-0"
              disabled={busy}
              onClick={() => act("approve")}
            >
              <Check className="mr-2 h-4 w-4" /> Approve & Send Credentials
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  value,
  span,
}: {
  label: string;
  value: string;
  span?: boolean;
}) {
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
      <FileText className="h-3.5 w-3.5" /> {label}{" "}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}
