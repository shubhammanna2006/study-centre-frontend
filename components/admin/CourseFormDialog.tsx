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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { CourseFormPayload } from "@/interfaces/interface";
import api from "@/api/api";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
  courseId: string | null; // null = create mode, set = edit mode
}

const emptyForm: CourseFormPayload = {
  title: "",
  slug: "",
  shortDesc: "",
  duration: "",
  fees: 0,
  eligibility: "",
  syllabus: [],
  benefits: [],
  active: true,
};

function slugify(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function CourseFormDialog({
  open,
  onOpenChange,
  onSaved,
  courseId,
}: Props) {
  const [form, setForm] = useState<CourseFormPayload>(emptyForm);
  const [syllabusText, setSyllabusText] = useState("");
  const [benefitsText, setBenefitsText] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);

  const isEdit = courseId !== null;

  useEffect(() => {
    const fetchDetails = async () => {
      if (!open) return;
      if (!courseId) {
        setForm(emptyForm);
        setSyllabusText("");
        setBenefitsText("");
        setSlugTouched(false);
        return;
      }
      setLoading(true);
      try {
        const response = await api.get(`/api/v1/admin/courses/${courseId}`);
        const c = response.data;
        setForm({
          title: c.title,
          slug: c.slug,
          shortDesc: c.shortDesc,
          duration: c.duration,
          fees: c.fees,
          eligibility: c.eligibility,
          syllabus: c.syllabus,
          benefits: c.benefits,
          active: c.active,
        });
        setSyllabusText(c.syllabus.join("\n"));
        setBenefitsText(c.benefits.join("\n"));
        setSlugTouched(true);
      } catch (error) {
        toast.error("Couldn't load course details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [open, courseId]);

  const set = <K extends keyof CourseFormPayload>(
    key: K,
    value: CourseFormPayload[K],
  ) => setForm((f) => ({ ...f, [key]: value }));

  const handleTitleChange = (title: string) => {
    set("title", title);
    if (!slugTouched) set("slug", slugify(title));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CourseFormPayload = {
      ...form,
      syllabus: syllabusText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      benefits: benefitsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    setBusy(true);
    try {
      if (isEdit && courseId) {
        const response = await api.put(
          `/api/v1/admin/courses/${courseId}`,
          payload,
        );
        if (response.status === 200) {
          toast.success("Course updated");
        } else {
          throw new Error("Something went wrong");
        }
      } else {
        const response = await api.post("/api/v1/admin/courses", payload);
        if (response.status === 201) {
          toast.success("Course Created");
        } else {
          throw new Error("Something went wrong");
        }
      }
      onSaved();
      onOpenChange(false);
    } catch {
      toast.error("Couldn't save the course");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Course" : "Add New Course"}</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            Loading...
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Title</Label>
                <Input
                  required
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </div>
              <div>
                <Label>Slug</Label>
                <Input
                  required
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", slugify(e.target.value));
                  }}
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  required
                  placeholder="e.g. 6 Months"
                  value={form.duration}
                  onChange={(e) => set("duration", e.target.value)}
                />
              </div>
              <div>
                <Label>Fees (₹)</Label>
                <Input
                  required
                  type="number"
                  min={0}
                  value={form.fees}
                  onChange={(e) => set("fees", Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label>Short Description</Label>
              <Textarea
                required
                rows={2}
                value={form.shortDesc}
                onChange={(e) => set("shortDesc", e.target.value)}
              />
            </div>

            <div>
              <Label>Eligibility</Label>
              <Input
                required
                value={form.eligibility}
                onChange={(e) => set("eligibility", e.target.value)}
              />
            </div>

            <div>
              <Label>Syllabus (one item per line)</Label>
              <Textarea
                rows={4}
                value={syllabusText}
                onChange={(e) => setSyllabusText(e.target.value)}
              />
            </div>

            <div>
              <Label>Benefits (one item per line)</Label>
              <Textarea
                rows={3}
                value={benefitsText}
                onChange={(e) => setBenefitsText(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <div className="text-sm font-medium">Active</div>
                <div className="text-xs text-muted-foreground">
                  Visible on the public site and open for enrollment
                </div>
              </div>
              <Switch
                checked={form.active}
                onCheckedChange={(v) => set("active", v)}
              />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={busy}
                className="gradient-primary border-0"
              >
                {busy ? "Saving..." : isEdit ? "Save Changes" : "Create Course"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
