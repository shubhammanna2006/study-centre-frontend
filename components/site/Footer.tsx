import Link from "next/link";
import { GraduationCap, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-display font-bold">Study Centre</div>
              <div className="text-xs text-muted-foreground">Learn Today, Lead Tomorrow.</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Government-recognized computer training institute empowering students with practical, industry-ready skills since 2007.
          </p>
          <div className="flex gap-2 mt-4">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:gradient-accent hover:text-accent-foreground hover:border-transparent transition-all">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="font-display font-semibold mb-3">Explore</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[["/courses","Courses"],["/gallery","Gallery"],["/faculty","Faculty"],["/achievements","Achievements"],["/verify","Certificate Verify"]].map(([to,label])=>(
              <li key={to}><Link href={to} className="hover:text-primary transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display font-semibold mb-3">Popular Courses</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[["/courses/dca","DCA"],["/courses/adca","ADCA"],["/courses/tally-prime","Tally Prime"],["/courses/web-development","Web Development"],["/courses/programming","Programming"]].map(([to,label])=>(
              <li key={to}><Link href={to} className="hover:text-primary transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display font-semibold mb-3">Contact</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Main Road, Near City Center, Your City, IN 800001</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> info@studycenter.in</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Study Centre. All rights reserved.
      </div>
    </footer>
  );
}
