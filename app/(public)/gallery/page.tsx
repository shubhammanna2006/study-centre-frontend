"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { galleryCategories, galleryImages } from "@/lib/data";
import api from "@/api/api";
import { toast } from "sonner";
import { GalleryImage } from "@/interfaces/interface";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageOff } from "lucide-react";
import Image from "next/image";

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const PAGE_SIZE = 10;
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
        `/api/v1/gallery?${params.toString()}`,
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
      const res = await api.get("/api/v1/gallery/categories");
      setCategories(res.data);
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
  return (
    <div>
      <section className="gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <Badge className="bg-white/15 text-white border-white/25">
            Gallery
          </Badge>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold">
            Moments at Study Centre
          </h1>
          <p className="mt-3 text-white/85 max-w-2xl">
            A glimpse into our classrooms, labs, events and student
            celebrations.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-wrap gap-2">
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
          <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border shadow-card hover:shadow-elegant transition group"
              >
                <div className="relative">
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
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                      <Badge className="bg-white/20 text-white border-white/25 text-[10px]">
                        {img.category}
                      </Badge>
                      <div className="text-white text-sm font-medium mt-1">
                        {img.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
