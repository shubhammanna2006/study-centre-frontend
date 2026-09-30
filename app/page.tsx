import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { courses, testimonials, achievements, news, faqs } from "@/lib/data";
import { CourseCard } from "@/components/site/CourseCard";
import { Counter } from "@/components/site/Counter";
import {
  ArrowRight, Sparkles, Users, Award, GraduationCap, Building2, Wallet, ShieldCheck,
  Briefcase, MonitorPlay, Quote, CalendarDays, Star,
} from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import AchievementSection from "@/components/home/AchievementSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import CourseSection from "@/components/home/CourseSection";

export const metadata: Metadata = {
  title: "Study Centre — Computer Coaching Institute | Learn Today, Lead Tomorrow",
  description: "Join Study Centre for practical computer training in DCA, ADCA, Tally, MS Office, Programming and Web Development. Government-recognized certificates & placement assistance.",
};

const whyUs = [
  { icon: GraduationCap, title: "Experienced Faculty", text: "Industry-trained teachers with 8–15 years of hands-on experience." },
  { icon: MonitorPlay, title: "Practical Training", text: "70% lab work — you learn by doing, not just watching." },
  { icon: Wallet, title: "Affordable Fees", text: "Competitive fees with easy installment options for every family." },
  { icon: ShieldCheck, title: "Govt. Recognized", text: "Certificates recognized across India with QR-code verification." },
  { icon: Briefcase, title: "Placement Support", text: "Dedicated placement cell with 45+ hiring partners." },
  { icon: Building2, title: "Modern Lab", text: "Air-conditioned lab with the latest computers and licensed software." },
];

export default function Home() {
  const popular = courses.slice(0, 8);

  return (
    <div>
      {/* HERO */}
      <HeroSection />

      {/* STATS STRIP */}
      <AchievementSection />

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <Badge variant="secondary">About Us</Badge>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">
            Empowering students with <span className="text-gradient">digital skills</span> since 2007.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Study Centre is a leading computer coaching institute focused on making quality digital education accessible to every student. We combine classroom teaching with intensive lab practice and mentorship to prepare our students for real jobs.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Card className="border-primary/20">
              <CardContent className="p-5">
                <div className="font-display font-semibold mb-1 text-primary">Our Mission</div>
                <p className="text-sm text-muted-foreground">To equip every student with practical digital skills that lead to employment and entrepreneurship.</p>
              </CardContent>
            </Card>
            <Card className="border-accent/30">
              <CardContent className="p-5">
                <div className="font-display font-semibold mb-1" style={{color:"var(--accent)"}}>Our Vision</div>
                <p className="text-sm text-muted-foreground">To be the most trusted community-first computer institute in the region.</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {whyUs.slice(0, 4).map((w, i) => (
            <Card key={w.title} className="hover:shadow-elegant transition-all hover:-translate-y-1 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <CardContent className="p-5">
                <div className={`grid h-11 w-11 place-items-center rounded-xl mb-3 ${i % 2 ? "gradient-accent text-accent-foreground" : "gradient-primary text-primary-foreground"}`}>
                  <w.icon className="h-5 w-5" />
                </div>
                <div className="font-display font-semibold">{w.title}</div>
                <p className="text-xs text-muted-foreground mt-1">{w.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* WHY US FULL */}
      <WhyUsSection />

      {/* POPULAR COURSES */}
      <CourseSection />

      {/* NEWS */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 grid gap-10 lg:grid-cols-3">
          <div>
            <Badge variant="secondary">Latest News</Badge>
            <h2 className="mt-3 font-display text-3xl font-bold">Admissions, events & announcements</h2>
            <p className="mt-3 text-muted-foreground">Stay updated with what&apos;s happening at Study Centre.</p>
            <Link href="/contact"><Button className="mt-6 gradient-primary text-primary-foreground border-0">Subscribe for updates</Button></Link>
          </div>
          <div className="lg:col-span-2 grid gap-4">
            {news.map((n) => (
              <Card key={n.title} className="hover:shadow-card transition">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-primary-foreground shrink-0">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-[10px]">{n.tag}</Badge>
                      <span className="text-xs text-muted-foreground">{n.date}</span>
                    </div>
                    <div className="mt-1 font-medium">{n.title}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="secondary">Testimonials</Badge>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Words from our students</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <Card key={t.name} className="hover:shadow-elegant transition hover:-translate-y-1">
              <CardContent className="p-6">
                <Quote className="h-6 w-6 text-accent" />
                <p className="mt-3 text-sm text-foreground/85">&quot;{t.quote}&quot;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-primary-foreground font-semibold">
                    {t.name.split(" ").map((s) => s[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.course}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-20">
          <div className="text-center">
            <Badge variant="secondary">FAQ</Badge>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Frequently asked questions</h2>
          </div>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-10 md:p-14 text-white shadow-elegant">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] items-center">
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-bold">Ready to build your future?</h3>
              <p className="mt-2 text-white/85 max-w-2xl">Enroll today and get a free demo class + prospectus. Limited seats per batch.</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link href="/register"><Button size="lg" className="gradient-accent text-accent-foreground border-0 hover:opacity-90">Register Now</Button></Link>
              <Link href="/contact"><Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">Contact Us</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
