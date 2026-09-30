import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";;
import { Counter } from "@/components/site/Counter";
import {
  ArrowRight, Sparkles, Users, Award, 
  Briefcase,
  Star,
} from "lucide-react";
const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <img src="/assets/pattern-tech.jpg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-overlay" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-accent/40 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-24 md:pt-32 md:pb-32 grid gap-12 lg:grid-cols-2 items-center">
          <div className="text-white animate-fade-up">
            <Badge className="bg-white/15 text-white border-white/25 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 mr-1" /> Admissions Open — Batch of 2026
            </Badge>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
              Learn Today,<br />
              <span className="bg-linear-to-r from-orange-300 to-amber-200 bg-clip-text text-transparent">Lead Tomorrow.</span>
            </h1>
            <p className="mt-5 text-lg text-white/85 max-w-xl">
              Government-recognized computer courses with real-world labs, expert faculty and placement assistance. Build the career you deserve at <strong className="text-white">Study Centre</strong>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register">
                <Button size="lg" className="gradient-accent text-accent-foreground border-0 hover:opacity-90 shadow-accent">
                  Join Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
                  Explore Courses
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2"><Users className="h-4 w-4" /> 5,200+ students trained</div>
              <div className="flex items-center gap-2"><Award className="h-4 w-4" /> 18 years of excellence</div>
              <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-amber-300 text-amber-300" /> 4.9 rating</div>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="absolute -inset-4 rounded-3xl gradient-accent opacity-30 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
              <img src="/assets/hero-classroom.jpg" alt="Students learning at Study Centre computer lab" width={1600} height={1000} className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card text-card-foreground rounded-2xl p-4 shadow-elegant flex items-center gap-3 border border-border">
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-primary-foreground"><Award className="h-5 w-5" /></div>
              <div>
                <div className="text-xs text-muted-foreground">Certificates Issued</div>
                <div className="font-bold text-lg"><Counter value={4800} suffix="+" /></div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-card text-card-foreground rounded-2xl p-4 shadow-accent flex items-center gap-3 border border-border">
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-accent text-accent-foreground"><Briefcase className="h-5 w-5" /></div>
              <div>
                <div className="text-xs text-muted-foreground">Placements</div>
                <div className="font-bold text-lg"><Counter value={1350} suffix="+" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HeroSection