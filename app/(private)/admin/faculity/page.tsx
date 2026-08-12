import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
  import { Mail, GraduationCap, Briefcase, User, UserPlus, Check } from "lucide-react";  
import { Button } from "@/components/ui/button";
export const metadata: Metadata = {
  title: "Faculty — Study Centre",
  description: "Meet our experienced teachers at Study Centre. Industry-trained faculty with 6–15 years of practical experience.",
};

// Full faculty list (includes original + 2 new teachers)
const faculty = [
  {
    name: "Mr. Robert Wilson",
    initials: "RW",
    subject: "Physics",
    qualification: "M.Sc. in Physics",
    experience: "8 years of teaching",
    contact: "robert.w@studycentre.edu",
  },
  {
    name: "Ms. Anna Martinez",
    initials: "AM",
    subject: "Chemistry",
    qualification: "Ph.D. in Chemistry",
    experience: "10 years of research",
    contact: "anna.m@studycentre.edu",
  },

];

export default function FacultyPage() {
  return (
    <div>
      
      {/* Hero Section */}
      <section className="gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <Badge className="bg-white/15 text-white border-white/25">Faculty</Badge>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold">
            Meet Our Teachers
          </h1>
          <p className="mt-3 text-white/85 max-w-2xl">
            Experienced, patient and passionate — our teachers make the difference.
          </p>
        </div>
      </section>

      {/* Teacher Cards - Horizontal, fixed height 200px, image on the right */}
      <section className="mx-auto max-w-[968px] px-4 sm:px-6 py-16 grid grid-cols-1 gap-6">
        {faculty.map((f, i) => (
          <Card
            key={f.name}
            className="hover:shadow-elegant transition hover:-translate-y-1 overflow-hidden h-[200px] flex flex-row"
          >
            {/* Left side: text details */}
            <CardContent className="p-4 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary font-display text-lg font-extrabold">
                  {f.initials}
                </div>
                <div>
                  <div className="font-display text-base font-bold">{f.name}</div>
                  <div className="text-sm text-primary font-medium">{f.subject}</div>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <GraduationCap className="h-3.5 w-3.5" /> {f.qualification}
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" /> {f.experience}
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" /> {f.contact}
                </div>
              </div>
            </CardContent>

            {/* Right side: picture section */}
            <div className="w-48 h-full flex-shrink-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              {/* Replace this placeholder with an actual <Image /> component if you have images */}
              <User className="h-16 w-16 text-muted-foreground/40" />
            </div>
          </Card>
        ))}
            {/* Quick Actions */}

      <div className="grid md:grid-cols-2 gap-4 mt-6">

        <Card>

          <CardContent className="p-6 text-center">

            <UserPlus className="mx-auto h-10 w-40 text-primary" />

            <h3 className="font-semibold mt-4">
              New Teacher
            </h3>

            <p className="text-sm text-muted-foreground mt-2">
              Register a new teacher.
            </p>

            <Button className="mt-5 w-full">
              Add Teacher
            </Button>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="p-6 text-center">

            <Check className="mx-auto h-10 w-40 text-green-600" />

            <h3 className="font-semibold mt-4">
              Add New Teacher
            </h3>

            <p className="text-sm text-muted-foreground mt-2">
              Review pending teacher.
            </p>

            <Button className="mt-5 w-full">
              Review
            </Button>

          </CardContent>

        </Card>

      </div>
      </section>
    </div>
  );
}