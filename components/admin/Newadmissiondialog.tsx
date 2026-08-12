"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { createRegistration } from "@/api/admissions";
import { toast } from "sonner";
import type { CreateRegistrationPayload } from "@/interfaces/interface";

// Replace with a real fetch from /api/courses if you don't already have this list in context
const COURSE_OPTIONS = [
  { id: "dca", title: "DCA" },
  { id: "adca", title: "ADCA" },
  { id: "tally-prime", title: "Tally Prime" },
  { id: "web-development", title: "Web Development" },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

const emptyForm: CreateRegistrationPayload = {
  fullName: "", fatherName: "", motherName: "", dob: "", gender: "MALE",
  mobile: "", email: "", aadhaar: "", address: "", city: "", state: "", pin: "",
  qualification: "", courseIds: [],
};

export function NewAdmissionDialog({ open, onOpenChange, onCreated }: Props) {
  const [form, setForm] = useState<CreateRegistrationPayload>(emptyForm);
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof CreateRegistrationPayload>(key: K, value: CreateRegistrationPayload[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleCourse = (id: string) => {
    setForm((f) => ({
      ...f,
      courseIds: f.courseIds.includes(id) ? f.courseIds.filter((c) => c !== id) : [...f.courseIds, id],
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.courseIds.length === 0) {
      toast.error("Select at least one course");
      return;
    }
    setBusy(true);
    try {
    //   await createRegistration(form);
      toast.success("Admission application created — status: Pending");
      setForm(emptyForm);
      onCreated();
      onOpenChange(false);
    } catch {
      toast.error("Couldn't create the application");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Admission (Walk-in)</DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <F label="Full Name"><Input required value={form.fullName} onChange={(e) => set("fullName", e.target.value)} /></F>
            <F label="Father's Name"><Input required value={form.fatherName} onChange={(e) => set("fatherName", e.target.value)} /></F>
            <F label="Mother's Name"><Input required value={form.motherName} onChange={(e) => set("motherName", e.target.value)} /></F>
            <F label="Date of Birth"><Input type="date" required value={form.dob} onChange={(e) => set("dob", e.target.value)} /></F>
            <div>
              <Label>Gender</Label>
              <RadioGroup value={form.gender} onValueChange={(v) => set("gender", v as CreateRegistrationPayload["gender"])} className="flex gap-4 mt-2">
                {(["MALE", "FEMALE", "OTHER"] as const).map((g) => (
                  <label key={g} className="flex items-center gap-2 text-sm cursor-pointer">
                    <RadioGroupItem value={g} /> {g}
                  </label>
                ))}
              </RadioGroup>
            </div>
            <F label="Mobile"><Input required value={form.mobile} onChange={(e) => set("mobile", e.target.value)} /></F>
            <F label="Email"><Input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} /></F>
            <F label="Aadhaar Number"><Input required value={form.aadhaar} onChange={(e) => set("aadhaar", e.target.value)} /></F>
          </div>

          <F label="Address"><Textarea required rows={2} value={form.address} onChange={(e) => set("address", e.target.value)} /></F>

          <div className="grid gap-4 sm:grid-cols-3">
            <F label="City"><Input required value={form.city} onChange={(e) => set("city", e.target.value)} /></F>
            <F label="State"><Input required value={form.state} onChange={(e) => set("state", e.target.value)} /></F>
            <F label="PIN Code"><Input required value={form.pin} onChange={(e) => set("pin", e.target.value)} /></F>
          </div>

          <F label="Qualification"><Input required value={form.qualification} onChange={(e) => set("qualification", e.target.value)} /></F>

          <div>
            <Label>Courses (select one or more)</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {COURSE_OPTIONS.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => toggleCourse(c.id)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    form.courseIds.includes(c.id)
                      ? "gradient-primary text-primary-foreground border-transparent"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={busy} className="gradient-primary border-0">
              {busy ? "Creating..." : "Create Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}