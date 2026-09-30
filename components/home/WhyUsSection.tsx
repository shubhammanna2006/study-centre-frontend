import { GraduationCap, MonitorPlay, Wallet, ShieldCheck, Briefcase, Building2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

const whyUs = [
  { icon: GraduationCap, title: "Experienced Faculty", text: "Industry-trained teachers with 8–15 years of hands-on experience." },
  { icon: MonitorPlay, title: "Practical Training", text: "70% lab work — you learn by doing, not just watching." },
  { icon: Wallet, title: "Affordable Fees", text: "Competitive fees with easy installment options for every family." },
  { icon: ShieldCheck, title: "Govt. Recognized", text: "Certificates recognized across India with QR-code verification." },
  { icon: Briefcase, title: "Placement Support", text: "Dedicated placement cell with 45+ hiring partners." },
  { icon: Building2, title: "Modern Lab", text: "Air-conditioned lab with the latest computers and licensed software." },
];
const WhyUsSection = () => {
  return (
      <section className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="secondary">Why Choose Us</Badge>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Everything you need to succeed</h2>
            <p className="mt-3 text-muted-foreground">Six reasons families across the region trust Study Centre with their careers.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((w, i) => (
              <Card key={w.title} className="hover:shadow-elegant transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className={`grid h-12 w-12 place-items-center rounded-xl mb-4 ${i % 2 ? "gradient-accent text-accent-foreground" : "gradient-primary text-primary-foreground"}`}>
                    <w.icon className="h-5 w-5" />
                  </div>
                  <div className="font-display font-semibold text-lg">{w.title}</div>
                  <p className="text-sm text-muted-foreground mt-2">{w.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}

export default WhyUsSection