"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
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
import { X, Plus } from "lucide-react";

// Default gallery data (used if nothing is in localStorage)
const defaultImages = [
  {
    id: 1,
    src: "https://picsum.photos/seed/classroom/400/500",
    title: "Classroom Session",
    category: "Classroom",
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/lab/400/600",
    title: "Lab Work",
    category: "Lab",
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/event/400/400",
    title: "Annual Day Celebration",
    category: "Events",
  },
  {
    id: 4,
    src: "https://picsum.photos/seed/sports/400/700",
    title: "Sports Meet",
    category: "Events",
  },
  {
    id: 5,
    src: "https://picsum.photos/seed/library/400/450",
    title: "Library Hours",
    category: "Classroom",
  },
  {
    id: 6,
    src: "https://picsum.photos/seed/workshop/400/550",
    title: "Workshop on AI",
    category: "Lab",
  },
];

const categories = ["Classroom", "Lab", "Events"];

export default function GalleryPage() {
  const [images, setImages] = useState(defaultImages);
  const [activeCategory, setActiveCategory] = useState("All");

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("galleryImages");
    if (stored) {
      try {
        setImages(JSON.parse(stored));
      } catch (_) {
        // fallback to default
      }
    }
  }, []);

  // Save to localStorage whenever images change
  useEffect(() => {
    localStorage.setItem("galleryImages", JSON.stringify(images));
  }, [images]);

  // --- Add photo state ---
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSrc, setNewSrc] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState(categories[0]);

  const handleAdd = () => {
    if (!newSrc || !newTitle || !newCategory) return;
    const newId = Date.now(); // simple unique id
    setImages([...images, { id: newId, src: newSrc, title: newTitle, category: newCategory }]);
    // Reset form
    setNewSrc("");
    setNewTitle("");
    setNewCategory(categories[0]);
    setShowAddForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this photo?")) {
      setImages(images.filter((img) => img.id !== id));
    }
  };

  // Filter based on active category
  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <Badge className="bg-white/15 text-white border-white/25">Gallery</Badge>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold">
            Moments at Study Centre
          </h1>
          <p className="mt-3 text-white/85 max-w-2xl">
            A glimpse into our classrooms, labs, events and student celebrations.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {/* Controls: Filter + Add button */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeCategory === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("All")}
              className={
                activeCategory === "All"
                  ? "gradient-primary text-primary-foreground border-0"
                  : ""
              }
            >
              All
            </Button>
            {categories.map((c) => (
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Photo
          </Button>
        </div>

        {/* Add Photo Form (conditional) */}
        {showAddForm && (
          <div className="mt-4 p-4 border rounded-lg bg-muted/30 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
            <div>
              <Label htmlFor="src" className="text-xs">Image URL</Label>
              <Input
                id="src"
                placeholder="https://example.com/photo.jpg"
                value={newSrc}
                onChange={(e) => setNewSrc(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="title" className="text-xs">Title</Label>
              <Input
                id="title"
                placeholder="Photo title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category" className="text-xs">Category</Label>
              <Select
                value={newCategory}
                onValueChange={(val) => setNewCategory(val)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} size="sm" className="flex-1">
                Add
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Gallery Grid (masonry) */}
        <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {filtered.map((img) => (
            <div
              key={img.id}
              className="relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border shadow-card hover:shadow-elegant transition group"
            >
              <img
                src={img.src}
                alt={img.title}
                loading="lazy"
                className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <div>
                  <Badge className="bg-white/20 text-white border-white/25 text-[10px]">
                    {img.category}
                  </Badge>
                  <div className="text-white text-sm font-medium mt-1">
                    {img.title}
                  </div>
                </div>
              </div>
              {/* Delete button (always visible, but you can hide behind hover if you prefer) */}
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 bg-black/50 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                aria-label="Delete photo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground py-10">
            No photos in this category. Add some!
          </div>
        )}
      </section>
    </div>
  );
}