"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, ShieldCheck, QrCode } from "lucide-react";

type Result = null | { valid: true; name: string; course: string; date: string; grade: string } | { valid: false };

export default function VerifyPage() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState<Result>(null);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = num.trim();
    if (!trimmed) return;
    // Mock: numbers starting with SC- are valid
    if (/^SC-\d{4,}$/i.test(trimmed)) {
      setResult({ valid: true, name: "Rohit Kumar Singh", course: "Web Development", date: "12 Aug 2025", grade: "A" });
    } else {
      setResult({ valid: false });
    }
  };

  return (
    <div>
      <section className="gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <Badge className="bg-white/15 text-white border-white/25">Verification</Badge>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold">Certificate Verification</h1>
          <p className="mt-3 text-white/85 max-w-2xl">Enter your certificate number to instantly verify its authenticity.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
        <Card className="shadow-elegant">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-bold">Verify a Certificate</div>
                <div className="text-xs text-muted-foreground">Format: SC-XXXXX (try <code>SC-10234</code>)</div>
              </div>
            </div>
            <form onSubmit={check} className="mt-6 flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <Label htmlFor="num" className="sr-only">Certificate Number</Label>
                <Input id="num" value={num} onChange={(e) => setNum(e.target.value)} placeholder="Certificate Number" />
              </div>
              <Button type="submit" className="gradient-primary text-primary-foreground border-0 hover:opacity-90">Verify</Button>
            </form>

            {result && result.valid && (
              <div className="mt-8 rounded-2xl border border-success/30 bg-success/5 p-6 animate-fade-up">
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle2 className="h-5 w-5" /><span className="font-semibold">Valid Certificate</span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
                  <Info k="Name" v={result.name} />
                  <Info k="Course" v={result.course} />
                  <Info k="Issue Date" v={result.date} />
                  <Info k="Grade" v={result.grade} />
                </div>
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                  <QrCode className="h-8 w-8 text-primary" />
                  <span className="text-xs text-muted-foreground">This certificate carries a QR code linking to this verification page.</span>
                </div>
              </div>
            )}
            {result && !result.valid && (
              <div className="mt-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 flex items-center gap-3 animate-fade-up">
                <XCircle className="h-6 w-6 text-destructive" />
                <div>
                  <div className="font-semibold">Invalid Certificate</div>
                  <div className="text-sm text-muted-foreground">We couldn&apos;t find this certificate. Please check the number and try again.</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
function Info({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg bg-card border border-border p-3">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className="font-medium">{v}</div>
    </div>
  );
}
