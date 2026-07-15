import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { achievements, testimonials } from "@/lib/data";
import { Counter } from "@/components/site/Counter";
import { Award, Trophy, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Achievements — Study Centre",
  description: "Our track record: 5000+ students trained, 1350+ placements, and 18 years of excellence.",
};

export default function AchievementsPage() {
  return (
    <div>
      <section className="gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <Badge className="bg-white/15 text-white border-white/25">Achievements</Badge>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold">Numbers we&apos;re proud of</h1>
          <p className="mt-3 text-white/85 max-w-2xl">Nearly two decades of transforming careers, one student at a time.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.stats.map((s, i) => (
            <Card key={s.label} className="text-center hover:shadow-elegant transition hover:-translate-y-1">
              <CardContent className="p-8">
                <div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl mb-4 ${i % 2 ? "gradient-accent text-accent-foreground" : "gradient-primary text-primary-foreground"}`}>
                  <Trophy className="h-6 w-6" />
                </div>
                <div className="text-4xl font-display font-extrabold text-gradient">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-muted-foreground mt-2">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-10 lg:grid-cols-2">
          <div>
            <Badge variant="secondary">Awards</Badge>
            <h2 className="mt-3 font-display text-3xl font-bold">Awards & recognitions</h2>
            <p className="mt-2 text-muted-foreground">Honored for excellence in computer education.</p>
            <div className="mt-6 space-y-3">
              {achievements.awards.map((a) => (
                <div key={a} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                  <div className="grid h-9 w-9 place-items-center rounded-lg gradient-accent text-accent-foreground shrink-0">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-medium">{a}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Badge variant="secondary">Success Stories</Badge>
            <h2 className="mt-3 font-display text-3xl font-bold">Top performers</h2>
            <p className="mt-2 text-muted-foreground">Our students are shining across companies and cities.</p>
            <div className="mt-6 space-y-4">
              {testimonials.map((t) => (
                <Card key={t.name}>
                  <CardContent className="p-5 flex gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground font-bold shrink-0">
                      {t.name.split(" ").map((s) => s[0]).join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="font-semibold">{t.name}</div>
                        <Badge variant="outline" className="text-[10px]">{t.course}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">&quot;{t.quote}&quot;</p>
                      <div className="mt-1 flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
