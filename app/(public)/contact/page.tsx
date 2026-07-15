"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(20),
  message: z.string().trim().min(5).max(800),
});

export default function ContactPage() {
  const [busy, setBusy] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thanks! We'll get back to you within one working day.");
    }, 800);
  };

  return (
    <div>
      <section className="gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <Badge className="bg-white/15 text-white border-white/25">Contact</Badge>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold">Get in touch</h1>
          <p className="mt-3 text-white/85 max-w-2xl">Have questions? We&apos;d love to hear from you. Reach out and our team will respond quickly.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {[
            { icon: MapPin, title: "Address", text: "Main Road, Near City Center, Your City, IN 800001" },
            { icon: Phone, title: "Phone", text: "+91 98765 43210" },
            { icon: Mail, title: "Email", text: "info@studycenter.in" },
            { icon: MessageCircle, title: "WhatsApp", text: "Chat with us instantly" },
          ].map((c, i) => (
            <Card key={c.title} className="hover:shadow-card transition">
              <CardContent className="p-5 flex gap-4">
                <div className={`grid h-11 w-11 place-items-center rounded-xl shrink-0 ${i % 2 ? "gradient-accent text-accent-foreground" : "gradient-primary text-primary-foreground"}`}>
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm text-muted-foreground">{c.text}</div>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="overflow-hidden rounded-2xl border border-border shadow-card">
            <iframe
              title="Study Centre map"
              src="https://www.google.com/maps?q=New%20Delhi&output=embed"
              className="w-full h-64 border-0"
              loading="lazy"
            />
          </div>
        </div>

        <Card className="shadow-elegant">
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold">Send an enquiry</h2>
            <p className="text-sm text-muted-foreground">We reply within one working day.</p>
            <form onSubmit={onSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label htmlFor="name">Full name</Label><Input id="name" name="name" required maxLength={80} /></div>
                <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" required maxLength={20} /></div>
              </div>
              <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required maxLength={160} /></div>
              <div><Label htmlFor="message">Message</Label><Textarea id="message" name="message" required rows={5} maxLength={800} /></div>
              <Button type="submit" disabled={busy} className="gradient-primary text-primary-foreground border-0 hover:opacity-90">
                <Send className="mr-2 h-4 w-4" />{busy ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
