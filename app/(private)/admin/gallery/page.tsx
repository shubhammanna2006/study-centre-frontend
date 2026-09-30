"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Plus, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { toast } from "sonner";

import type { GalleryImage } from "@/interfaces/interface";
import { AddGalleryImageDialog } from "@/components/admin/AddGalleryImageDialog";
import api from "@/api/api";
import Image from "next/image";

const PAGE_SIZE = 10;

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: PAGE_SIZE.toString(),
      });
      if (activeCategory !== "All") {
        params.append("category", activeCategory);
      }
      const result = await api.get(
        `/api/v1/admin/gallery?${params.toString()}`,
      );
      setImages(result.data?.results);
      setTotalPages(result.data?.totalPages);
    } catch {
      toast.error("Couldn't load gallery images");
    } finally {
      setLoading(false);
    }
  }, [activeCategory, page]);

  const loadCategories = useCallback(async () => {
    try {
      const res = await api.get("/api/v1/admin/gallery/categories")
      setCategories(res.data)
    } catch {
      // non-critical
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  useEffect(() => {
    setPage(0);
  }, [activeCategory]);

  const refreshAfterChange = () => {
    load();
    loadCategories();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this photo? This can't be undone.")) return;
    setDeletingId(id);
    try {
      await api.delete(`/api/v1/admin/gallery/${id}`);
      toast.success("Photo deleted");
      refreshAfterChange();
    } catch {
      toast.error("Couldn't delete the photo");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Badge variant="secondary">Gallery</Badge>
          <h1 className="mt-2 text-3xl font-bold">Gallery Management</h1>
        </div>
        <Button
          className="gradient-accent border-0"
          onClick={() => setAddOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Photo
        </Button>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mt-5">
        {["All", ...categories].map((c) => (
          <Button
            key={c}
            variant={activeCategory === c ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(c)}
            className={
              activeCategory === c
                ? "gradient-primary text-primary-foreground border-0"
                : ""
            }
          >
            {c}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8">
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <Skeleton key={i} className="aspect-4/5 rounded-2xl" />
            ))}
          </div>
        )}

        {!loading && images?.length === 0 && (
          <div className="text-center text-muted-foreground py-16 flex flex-col items-center gap-2">
            <ImageOff className="h-8 w-8" />
            No photos in this category yet. Add some!
          </div>
        )}

        {!loading && images?.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border shadow-card hover:shadow-elegant transition group"
              >
                <Image
                  src={img.imageUrl}
                  alt={img.title}
                  width={800}
                  height={600}
                  className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw,
               (max-width: 1024px) 50vw,
               (max-width: 1280px) 33vw,
               25vw"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <Badge className="bg-white/20 text-white border-white/25 text-[10px] w-fit">
                    {img.category}
                  </Badge>

                  <div className="text-white text-sm font-medium mt-1">
                    {img.title}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(img.id)}
                  disabled={deletingId === img.id}
                  className="absolute top-2 right-2 bg-black/50 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors disabled:opacity-50"
                  aria-label="Delete photo"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            size="icon"
            variant="outline"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page + 1} of {totalPages}
          </span>
          <Button
            size="icon"
            variant="outline"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <AddGalleryImageDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onUploaded={refreshAfterChange}
        existingCategories={categories}
      />
    </div>
  );
}
