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
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";
import { galleryCategories } from "@/lib/data";
import api from "@/api/api";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploaded: () => void;
  existingCategories: string[];
}

export function AddGalleryImageDialog({
  open,
  onOpenChange,
  onUploaded,
  existingCategories,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) {
      setFile(null);
      setPreview(null);
      setTitle("");
      setCategory("");
    }
  }, [open]);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFile = (f: File | null) => {
    if (!f) {
      setFile(null);
      return;
    }
    if (!f.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error(`Image must be under 5MB`);
      return;
    }
    setFile(f);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !title.trim() || !category.trim()) {
      toast.error("Add a photo, title, and category");
      return;
    }
    setBusy(true);
    const fd = new FormData();
    fd.append("title", title);
    fd.append("category", category);
    fd.append("image", file);
    try {
      const res = await api.post("/api/v1/admin/gallery", fd);
      console.log(res);
      toast.success("Photo added to the gallery");
      onUploaded();
      onOpenChange(false);
    } catch {
      toast.error("Couldn't upload the photo");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImagePlus className="h-5 w-5" /> Add Photo
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="grid gap-4">
          <div>
            <Label>Photo</Label>
            <label
              className="mt-1 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition cursor-pointer overflow-hidden"
              style={{ minHeight: preview ? undefined : 140 }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-64 object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-1 py-6 text-muted-foreground text-sm">
                  <ImagePlus className="h-6 w-6" />
                  Click to choose an image
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              />
            </label>
            <p className="mt-1 text-xs text-muted-foreground">
              JPG or PNG, up to 5MB.
            </p>
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Annual Day Celebration"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              list="gallery-category-options"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Events"
            />
            <datalist id="gallery-category-options">
              {galleryCategories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={busy}
              className="gradient-primary border-0"
            >
              {busy ? "Uploading..." : "Add Photo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
