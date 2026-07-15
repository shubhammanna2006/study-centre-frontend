"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { galleryCategories, galleryImages } from "@/lib/data";

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? galleryImages : galleryImages.filter((g) => g.category === active);

  return (
    <div>
      <section className="gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <Badge className="bg-white/15 text-white border-white/25">Gallery</Badge>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold">Moments at Study Centre</h1>
          <p className="mt-3 text-white/85 max-w-2xl">A glimpse into our classrooms, labs, events and student celebrations.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-wrap gap-2">
          {galleryCategories.map((c) => (
            <Button
              key={c}
              variant={active === c ? "default" : "outline"}
              size="sm"
              onClick={() => setActive(c)}
              className={active === c ? "gradient-primary text-primary-foreground border-0" : ""}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {filtered.map((img) => (
            <div key={img.id} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border shadow-card hover:shadow-elegant transition group">
              <div className="relative">
                <img src={img.src} alt={img.title} loading="lazy" className="w-full h-auto block group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <Badge className="bg-white/20 text-white border-white/25 text-[10px]">{img.category}</Badge>
                    <div className="text-white text-sm font-medium mt-1">{img.title}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
