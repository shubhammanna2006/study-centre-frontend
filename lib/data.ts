import {
  Laptop, Calculator, FileSpreadsheet, Image as ImageIcon, Code2,
  Globe, Mic, Palette, Cpu, BookOpen,
} from "lucide-react";

export type Course = {
  slug: string;
  title: string;
  short: string;
  duration: string;
  fees: number;
  icon: typeof Laptop;
  eligibility: string;
  benefits: string[];
  syllabus: string[];
  color: "blue" | "orange";
};

export const courses: Course[] = [
  { slug: "basic-computer", title: "Basic Computer", short: "Foundation in computing, internet & typing.", duration: "3 Months", fees: 2500, icon: Laptop, eligibility: "8th pass or above", benefits: ["Hands-on lab practice", "Certificate on completion", "Placement guidance"], syllabus: ["Computer fundamentals", "Windows OS", "Internet & Email", "Typing practice", "MS Paint & basics"], color: "blue" },
  { slug: "dca", title: "DCA — Diploma in Computer Applications", short: "Complete diploma covering office, internet & basics.", duration: "6 Months", fees: 6500, icon: BookOpen, eligibility: "10th pass", benefits: ["Government recognized", "Placement assistance", "Practical exams"], syllabus: ["Computer fundamentals", "MS Office (Word/Excel/PowerPoint)", "Internet & Email", "Tally basics", "Project work"], color: "blue" },
  { slug: "adca", title: "ADCA — Advanced Diploma", short: "Advanced diploma with Tally, DTP & programming intro.", duration: "12 Months", fees: 12000, icon: Cpu, eligibility: "10th pass", benefits: ["Industry-focused", "Job placement", "Free study material"], syllabus: ["Advanced MS Office", "Tally Prime with GST", "Photoshop & DTP", "HTML/CSS", "Programming basics"], color: "orange" },
  { slug: "tally-prime", title: "Tally Prime with GST", short: "Master accounting, inventory & GST filing.", duration: "3 Months", fees: 4500, icon: Calculator, eligibility: "12th commerce preferred", benefits: ["Live GST filing practice", "Placement in accounting firms"], syllabus: ["Accounting principles", "Vouchers & ledgers", "Inventory management", "GST returns", "Payroll"], color: "orange" },
  { slug: "ms-office", title: "MS Office", short: "Word, Excel, PowerPoint & Outlook essentials.", duration: "2 Months", fees: 2500, icon: FileSpreadsheet, eligibility: "Basic computer knowledge", benefits: ["Corporate-ready skills", "Practical assignments"], syllabus: ["MS Word", "MS Excel", "MS PowerPoint", "MS Outlook", "Mail merge & shortcuts"], color: "blue" },
  { slug: "excel-advanced", title: "Excel Advanced", short: "Formulas, pivot tables, dashboards & VBA.", duration: "2 Months", fees: 3500, icon: FileSpreadsheet, eligibility: "MS Office basics", benefits: ["Data-analyst ready", "Dashboard projects"], syllabus: ["Advanced formulas", "Pivot tables & charts", "Power Query", "Dashboards", "VBA macros basics"], color: "orange" },
  { slug: "photoshop", title: "Adobe Photoshop", short: "Professional photo editing & digital art.", duration: "2 Months", fees: 3500, icon: ImageIcon, eligibility: "Basic computer knowledge", benefits: ["Portfolio building", "Freelancing skills"], syllabus: ["Tools & workspace", "Layers & masking", "Retouching", "Photo manipulation", "Print & web export"], color: "orange" },
  { slug: "graphic-design", title: "Graphic Design", short: "Photoshop + Illustrator + CorelDRAW combo.", duration: "6 Months", fees: 9500, icon: Palette, eligibility: "10th pass", benefits: ["Design agency ready", "Full portfolio"], syllabus: ["Design principles", "Adobe Photoshop", "Adobe Illustrator", "CorelDRAW", "Branding project"], color: "orange" },
  { slug: "programming", title: "Programming (C, C++, Java, Python)", short: "Master four languages with real projects.", duration: "8 Months", fees: 11000, icon: Code2, eligibility: "12th pass", benefits: ["Coding interview prep", "Mini-projects", "GitHub portfolio"], syllabus: ["C programming", "C++ & OOP", "Java fundamentals", "Python + libraries", "Capstone project"], color: "blue" },
  { slug: "web-development", title: "Web Development", short: "HTML, CSS, JavaScript, React & Node.", duration: "6 Months", fees: 12500, icon: Globe, eligibility: "12th pass", benefits: ["Full-stack ready", "Live projects", "Deployment"], syllabus: ["HTML5 & CSS3", "JavaScript ES6+", "React.js", "Node & Express", "MongoDB & deployment"], color: "blue" },
  { slug: "spoken-english", title: "Spoken English", short: "Confidence, grammar & fluency for careers.", duration: "3 Months", fees: 3000, icon: Mic, eligibility: "Anyone", benefits: ["Interview-ready English", "Personality development"], syllabus: ["Grammar essentials", "Vocabulary building", "Conversation practice", "Group discussion", "Interview handling"], color: "orange" },
];

export const faculty = [
  { name: "Rajesh Kumar", subject: "Programming & Web Dev", qualification: "M.Tech (CSE)", experience: "12 years", contact: "rajesh@studycenter.in", initials: "RK" },
  { name: "Priya Sharma", subject: "Tally & Accounting", qualification: "M.Com, CA Inter", experience: "9 years", contact: "priya@studycenter.in", initials: "PS" },
  { name: "Neha Gupta", subject: "MS Office & Basics", qualification: "MCA", experience: "6 years", contact: "neha@studycenter.in", initials: "NG" },
  { name: "Suresh Patel", subject: "Spoken English", qualification: "M.A English, TEFL", experience: "10 years", contact: "suresh@studycenter.in", initials: "SP" },
  { name: "Anita Desai", subject: "Excel & Data Analytics", qualification: "MBA, Advanced Excel Cert.", experience: "7 years", contact: "anita@studycenter.in", initials: "AD" },
];

export const testimonials = [
  { name: "Rohit Singh", course: "Web Development", quote: "Study Centre transformed my career. Got placed as Frontend Developer within 2 months of finishing the course." },
  { name: "Kavya Iyer", course: "Tally Prime", quote: "The GST module was so practical. I now handle accounts for 3 small businesses independently." },
  { name: "Aman Khan", course: "ADCA", quote: "Affordable fees, patient teachers and a real computer lab. Highly recommended in our area." },
  { name: "Sneha Reddy", course: "Graphic Design", quote: "Built my freelance portfolio during the course itself. Earning while learning became reality." },
];

export const galleryCategories = [
  "All", "Classroom", "Practical Lab", "Events", "Certificate Distribution",
  "Workshops", "Annual Function", "Independence Day", "Teachers", "Students",
];

export const galleryImages = Array.from({ length: 18 }).map((_, i) => {
  const cats = galleryCategories.slice(1);
  const cat = cats[i % cats.length];
  const hues = [220, 30, 210, 40, 200]; // blues & oranges
  const h = hues[i % hues.length];
  const s = 60 + ((i * 7) % 30);
  const l = 45 + ((i * 5) % 25);
  return {
    id: i + 1,
    category: cat,
    title: `${cat} — Session ${i + 1}`,
    // colored placeholder via inline SVG data URI
    src: `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 ${300 + ((i * 37) % 260)}'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0' stop-color='hsl(${h},${s}%,${l}%)'/><stop offset='1' stop-color='hsl(${(h + 40) % 360},${s}%,${Math.min(l + 15, 80)}%)'/></linearGradient></defs><rect width='600' height='100%' fill='url(%23g)'/><text x='50%' y='50%' fill='white' font-family='Arial' font-size='28' font-weight='700' text-anchor='middle' dominant-baseline='middle'>${cat}</text></svg>`
    )}`,
    height: 300 + ((i * 37) % 260),
  };
});

export const achievements = {
  stats: [
    { label: "Students Trained", value: 5200, suffix: "+" },
    { label: "Certificates Issued", value: 4800, suffix: "+" },
    { label: "Placements", value: 1350, suffix: "+" },
    { label: "Years of Excellence", value: 18, suffix: "" },
  ],
  awards: [
    "Best Computer Institute — District 2023",
    "Top Franchise Excellence Award 2022",
    "Skill India Recognition 2021",
    "5-Star Google Rated Institute",
  ],
};

export const news = [
  { date: "Nov 20, 2025", title: "New batch of Web Development starts December 1st", tag: "Admission" },
  { date: "Nov 12, 2025", title: "Annual function 2025 — save the date!", tag: "Event" },
  { date: "Nov 05, 2025", title: "Tally Prime with GST — weekend batches now open", tag: "Course" },
  { date: "Oct 28, 2025", title: "Placement drive — 45 students hired this quarter", tag: "Placement" },
];

export const faqs = [
  { q: "Do you provide certificates after completion?", a: "Yes. Every student receives a government-recognized certificate with a unique verification number and QR code." },
  { q: "Are your fees affordable?", a: "Absolutely. Our fees are among the most competitive in the region and we offer installment options." },
  { q: "Do you help with placements?", a: "Yes. Our placement cell connects students with local businesses, BPOs, accounting firms and IT companies." },
  { q: "Can I attend a demo class?", a: "Yes. Book a free demo class from the Contact page or WhatsApp us directly." },
  { q: "Do you offer weekend batches?", a: "Yes, we run morning, evening and weekend batches for working professionals." },
];
export const students =  [
    { studentId: "STU001", name: "Rohit Singh", course: "Web Development", email: "rohit.singh@example.com" },
    { studentId: "STU002", name: "Priya Sharma", course: "Data Science", email: "priya.sharma@example.com" },
    { studentId: "STU003", name: "Amit Kumar", course: "Digital Marketing", email: "amit.kumar@example.com" },
  ];

  export const notifications = [
    { id: 1, type: "Exam", title: "Midterm Exam Schedule", message: "The midterm exams will be held from 15th to 20th March. Please check the notice board for details.", date: "2026-03-10" },
    { id: 2, type: "Event", title: "Annual Function", message: "Join us for the annual function on 25th March at the main auditorium. All students are encouraged to participate.", date: "2026-03-12" },
    { id: 3, type: "Urgent", title: "System Maintenance", message: "The computer lab will be closed for maintenance on 18th March. Please plan your work accordingly.", date: "2026-03-14" },
  ];