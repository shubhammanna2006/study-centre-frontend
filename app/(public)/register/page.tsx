"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { courses } from "@/lib/data";
import { toast } from "sonner";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import api from "@/api/api";

const schema = z.object({
  fullName: z.string().trim().min(2).max(80),
  fatherName: z.string().trim().min(2).max(80),
  motherName: z.string().trim().min(2).max(80),
  dob: z.string().min(4),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z.string().trim().min(5).max(240),
  city: z.string().trim().min(2).max(60),
  state: z.string().trim().min(2).max(60),
  pin: z.string().trim().regex(/^\d{4,10}$/, "Invalid PIN"),
  mobile: z.string().trim().regex(/^\d{7,15}$/, "Invalid mobile"),
  email: z.string().trim().email(),
  aadhaar: z.string().trim().regex(/^\d{8,16}$/, "Invalid Aadhaar"),
  qualification: z.string().trim().min(2).max(60),
  course: z.string().min(1, "Please select a course"),
  admissionDate: z.string().min(4),
});

export default function RegisterPage() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd);
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    api.post("/api/v1/auth/register", fd)
    // setBusy(true);
    // setTimeout(() => {
    //   setBusy(false);
    //   setDone(true);
    //   // TODO(backend): POST to /api/students; send confirmation email via Nodemailer
    //   toast.success("Registration submitted — status: Pending");
    // }, 900);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl gradient-primary text-primary-foreground shadow-elegant">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Application received!</h1>
        <p className="mt-3 text-muted-foreground">
          Your registration status is <span className="font-semibold text-foreground">Pending</span>. Our counsellor will contact you within one working day. A confirmation email has been sent to your address.
        </p>
        <Button onClick={() => setDone(false)} className="mt-6 gradient-primary text-primary-foreground border-0">Submit another</Button>
      </div>
    );
  }

  return (
    <div>
      <section className="gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <Badge className="bg-white/15 text-white border-white/25">Admissions</Badge>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold">Student Registration</h1>
          <p className="mt-3 text-white/85 max-w-2xl">Fill in your details to secure your seat. Fields marked * are required.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
        <Card className="shadow-elegant">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={onSubmit} className="grid gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name *" name="fullName" />
                <Field label="Father's Name *" name="fatherName" />
                <Field label="Mother's Name *" name="motherName" />
                <Field label="Date of Birth *" name="dob" type="date" />
                <div>
                  <Label>Gender *</Label>
                  <RadioGroup name="gender" defaultValue="Male" className="flex gap-4 mt-2">
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g} className="flex items-center gap-2 text-sm cursor-pointer">
                        <RadioGroupItem value={g} /> {g}
                      </label>
                    ))}
                  </RadioGroup>
                </div>
                <Field label="Mobile Number *" name="mobile" />
                <Field label="Email *" name="email" type="email" />
                <Field label="Aadhaar Number *" name="aadhaar" />
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Textarea id="address" name="address" required rows={2} />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="City *" name="city" />
                <Field label="State *" name="state" />
                <Field label="PIN Code *" name="pin" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Qualification *" name="qualification" />
                <div>
                  <Label>Course *</Label>
                  <Select name="course">
                    <SelectTrigger><SelectValue placeholder="Select a course" /></SelectTrigger>
                    <SelectContent>
                      {courses.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.title}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Field label="Admission Date *" name="admissionDate" type="date" />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <FileField label="Passport Photo" name="photo" />
                <FileField label="Aadhaar" name="aadhaarDoc" />
                <FileField label="Signature" name="signature" />
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={busy} size="lg" className="w-full gradient-primary text-primary-foreground border-0 hover:opacity-90">
                  {busy ? "Submitting..." : "Submit Registration"}
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  By submitting you agree to our terms. Backend wiring: POST to your API, then email via Nodemailer.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required />
    </div>
  );
}
function FileField({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type="file" accept="image/*,.pdf" className="file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-sm" />
    </div>
  );
}
