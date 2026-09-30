"use client";

import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { fetchStudentDetail, updateStudent } from "@/api/students";
import type {
  UpdateStudentPayload,
  StudentStatus,
} from "@/interfaces/interface";
import { toast } from "sonner";
import api from "@/api/api";

interface Props {
  studentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

const empty: UpdateStudentPayload = {
  fullName: "",
  mobileNumber: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
  qualification: "",
  status: "ACTIVE",
};

export function EditStudentDialog({
  studentId,
  open,
  onOpenChange,
  onSaved,
}: Props) {
  const [form, setForm] = useState<UpdateStudentPayload>(empty);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);


  useEffect(() => {
    if (!open || !studentId) {
      setForm(empty);
      return;
    }

    const fetchRegistrationDetail = async () => {
      setLoading(true);

      try {
        const res = await api.get(`/api/v1/admin/student/${studentId}`);
        const s = res.data;
        setForm({
          fullName: s.fullName,
          mobileNumber: s.mobileNumber,
          email: s.email,
          address: s.address,
          city: s.city,
          state: s.state,
          pinCode: s.pinCode,
          qualification: s.qualification,
          status: s.status,
        });
      } catch (err) {
        toast.error("Couldn't load student details");
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrationDetail();
  }, [open, studentId]);
  const set = <K extends keyof UpdateStudentPayload>(
    key: K,
    value: UpdateStudentPayload[K],
  ) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId) return;
    setBusy(true);
    try {
      await api.put(`/api/v1/admin/student/${studentId}`,form);
      toast.success("Student updated");
      onSaved();
      onOpenChange(false);
    } catch {
      toast.error("Couldn't save changes");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            Loading...
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4">
            <div>
              <Label>Full Name</Label>
              <Input
                required
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Mobile</Label>
                <Input
                  required
                  value={form.mobileNumber}
                  onChange={(e) => set("mobileNumber", e.target.value)}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Address</Label>
              <Input
                required
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>City</Label>
                <Input
                  required
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                />
              </div>
              <div>
                <Label>State</Label>
                <Input
                  required
                  value={form.state}
                  onChange={(e) => set("state", e.target.value)}
                />
              </div>
              <div>
                <Label>PIN Code</Label>
                <Input
                  required
                  value={form.pinCode}
                  onChange={(e) => set("pinCode", e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Qualification</Label>
                <Input
                  required
                  value={form.qualification}
                  onChange={(e) => set("qualification", e.target.value)}
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => set("status", v as StudentStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={busy}
                className="gradient-primary border-0"
              >
                {busy ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
