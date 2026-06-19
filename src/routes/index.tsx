import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Github, Linkedin, Mail, MapPin, Download, ArrowRight, ArrowUpRight,
  Code2, Database, Wrench, Globe, GraduationCap, Briefcase, Award, Trophy,
  Sparkles, Moon, Sun, Send, FileText, CheckCircle2, Phone,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "K. Indusri — Software Developer Portfolio" },
      { name: "description", content: "CSE student & aspiring software developer building real-world tech. Python, Web, Databases, AI." },
      { property: "og:title", content: "K. Indusri — Software Developer Portfolio" },
      { property: "og:description", content: "Building Technology Solutions for Real-World Problems." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "K. Indusri",
        jobTitle: "Computer Science Engineering Student",
        email: "23h41a0598@bvcits.edu.in",
        telephone: "+91-8919646170",
        url: "https://linkedin.com/in/indusri-kusuma",
        sameAs: ["https://linkedin.com/in/indusri-kusuma", "https://github.com/Indusrikusuma"],
        address: { "@type": "PostalAddress", addressRegion: "Andhra Pradesh", addressCountry: "IN" },
      }),
    }],
  }),
  component: Portfolio,
});

const TITLES = ["Software Developer", "Python Programmer", "Web Developer", "Problem Solver"];

function useTyping() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = TITLES[i];
    const t = setTimeout(() => {
      if (!del) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDel(true), 1400);
      } else {
        const next = full.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setI((i + 1) % TITLES.length); }
      }
    }, del ? 40 : 80);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return text;
}

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return { dark, toggle: () => setDark(d => !d) };
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <div className="animate-fade-up" style={{ animationDelay: `${delay}ms` }}>{children}</div>;
}

function Portfolio() {
  const typed = useTyping();
  const { dark, toggle } = useTheme();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-brand/30 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-32 h-[460px] w-[460px] rounded-full bg-brand-2/25 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-accent/20 blur-3xl animate-blob" style={{ animationDelay: "8s" }} />
      </div>

      <Nav dark={dark} toggle={toggle} />
      <Hero typed={typed} />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}

const NAV = [
  ["About", "about"], ["Education", "education"], ["Skills", "skills"],
  ["Projects", "projects"], ["Experience", "experience"], ["Contact", "contact"],
] as const;

function Nav({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(96%,1100px)] -translate-x-1/2">
      <nav className="glass-panel flex items-center justify-between rounded-full px-4 py-2.5 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-display font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg gradient-bg text-white shadow-md">KI</span>
          <span className="hidden sm:inline">Indusri</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map(([label, id]) => (
            <li key={id}>
              <a href={`#${id}`} className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme" className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:text-foreground hover:bg-secondary">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href="#contact" className="hidden gradient-bg rounded-full px-4 py-2 text-sm font-medium text-white shadow transition hover:opacity-90 sm:inline-flex">
            Hire me
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero({ typed }: { typed: string }) {
  return (
    <section id="top" className="relative px-4 pt-32 pb-20 sm:pt-40">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-brand" /> Open to internships & placements
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
              Hi, I'm <span className="gradient-text">K. Indusri</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-4 text-xl text-muted-foreground sm:text-2xl">
              I'm a <span className="font-semibold text-foreground">{typed}</span>
              <span className="animate-caret ml-0.5 text-brand">|</span>
            </div>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Building Technology Solutions for Real-World Problems. Computer Science Engineering student
              passionate about software, web, and AI.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="gradient-bg glow-shadow inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]">
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:bg-secondary">
                <Mail className="h-4 w-4" /> Contact Me
              </a>
              <button onClick={() => window.print()} className="no-print inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:bg-secondary">
                <Download className="h-4 w-4" /> Download PDF
              </button>
            </div>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-8 flex items-center gap-4 text-muted-foreground">
              <a href="https://linkedin.com/in/indusri-kusuma" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:bg-secondary hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://github.com/Indusrikusuma" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:bg-secondary hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
              <span className="flex items-center gap-1.5 text-sm">
                <MapPin className="h-4 w-4" /> Andhra Pradesh, India
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div className="relative mx-auto w-full max-w-sm animate-float">
            <div className="absolute -inset-4 rounded-[2rem] gradient-bg opacity-30 blur-2xl" />
            <div className="glass-panel relative overflow-hidden rounded-[2rem] p-2">
              <img
                src={profileImg}
                alt="K. Indusri portrait"
                width={768}
                height={768}
                className="aspect-square w-full rounded-3xl object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 glass-panel flex items-center gap-3 rounded-2xl p-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-bg text-white">
                  <Code2 className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold">CGPA 8.5</div>
                  <div className="truncate text-xs text-muted-foreground">B.Tech CSE • 2023–2027</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-bold sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function About() {
  const stats = [
    { v: "8.5", l: "CGPA" },
    { v: "93.4%", l: "Intermediate" },
    { v: "10+", l: "Certifications" },
    { v: "2", l: "Internships" },
  ];
  return (
    <section id="about" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="About" title="A curious mind, shipping real things." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm a passionate Computer Science student with strong fundamentals in <span className="text-foreground font-medium">Python, Web Development, Databases</span>, and problem solving.
            </p>
            <p>I'm a quick learner, a reliable team player, and a genuine technology enthusiast — I love turning ideas into useful tools.</p>
            <p className="text-foreground">
              <span className="gradient-text font-semibold">Career goal:</span> become a Software Engineer and build impactful technology products.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.l} className="glass-panel rounded-2xl p-5">
                <div className="text-3xl font-bold gradient-text">{s.v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  const items = [
    { period: "2023 – 2027", title: "B.Tech in Computer Science & Engineering", detail: "CGPA: 8.5 / 10", icon: GraduationCap },
    { period: "2021 – 2023", title: "Intermediate (MPC)", detail: "Score: 93.4%", icon: GraduationCap },
  ];
  return (
    <section id="education" className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionTitle eyebrow="Education" title="Academic journey" />
        <div className="relative mt-14 ml-3 border-l border-border pl-8 md:ml-0 md:border-l-2">
          {items.map((it, i) => (
            <div key={i} className="relative mb-10 last:mb-0">
              <div className="absolute -left-[42px] grid h-9 w-9 place-items-center rounded-full gradient-bg text-white shadow-md">
                <it.icon className="h-4 w-4" />
              </div>
              <div className="glass-panel rounded-2xl p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-brand">{it.period}</div>
                <h3 className="mt-1 text-xl font-semibold">{it.title}</h3>
                <p className="mt-1 text-muted-foreground">{it.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SKILL_GROUPS = [
  { title: "Programming", icon: Code2, items: ["Python", "C", "Java"] },
  { title: "Web Technologies", icon: Globe, items: ["HTML", "CSS", "JavaScript"] },
  { title: "Database", icon: Database, items: ["MySQL"] },
  { title: "Tools", icon: Wrench, items: ["Git", "GitHub", "VS Code"] },
];

function Skills() {
  return (
    <section id="skills" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Skills" title="My toolkit" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((g) => (
            <div key={g.title} className="group glass-panel rounded-2xl p-6 transition hover:-translate-y-1 hover:glow-shadow">
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-bg text-white">
                <g.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{g.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const features = [
    "Student profile management",
    "Aptitude tracking",
    "Mock test analysis",
    "Performance reports",
    "Placement readiness monitoring",
  ];
  return (
    <section id="projects" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Featured Project" title="Built with intent" />
        <div className="mt-12 glass-panel overflow-hidden rounded-3xl">
          <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
            <div className="p-8 sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Python • File I/O • Data
              </div>
              <h3 className="mt-4 text-2xl font-bold sm:text-3xl">Student Placement Readiness Tracker</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                A Python application that helps students track aptitude scores, mock test performance,
                technical skills, and placement readiness. Uses file handling and data management to
                generate reports and surface improvement areas.
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#" className="gradient-bg inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white">
                  View Code <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold">
                  Case Study
                </a>
              </div>
            </div>
            <div className="relative min-h-[260px] gradient-bg p-8">
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,.25), transparent 45%)"
              }} />
              <div className="relative grid h-full place-items-center">
                <div className="w-full max-w-xs rounded-2xl bg-white/15 p-5 text-white backdrop-blur-xl">
                  <div className="flex items-center justify-between text-xs opacity-80">
                    <span>readiness.py</span><span>● ● ●</span>
                  </div>
                  <pre className="mt-3 text-[11px] leading-relaxed">
{`def report(student):
  s = aptitude(student)
  m = mock_avg(student)
  score = 0.4*s + 0.6*m
  return {
    "name": student.name,
    "ready": score >= 75,
    "score": score,
  }`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    {
      role: "Frontend Development Intern",
      org: "TalentShine",
      bullets: ["Developed responsive web pages", "Worked with HTML and CSS", "Improved frontend development skills"],
    },
    {
      role: "Python Development Intern",
      org: "TalentShine",
      bullets: ["Worked on Python programming", "Built basic applications", "Strengthened problem-solving skills"],
    },
  ];
  return (
    <section id="experience" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Experience" title="Internship experience" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((it) => (
            <div key={it.role} className="glass-panel rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-bg text-white">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold">{it.role}</h3>
                  <div className="text-sm text-muted-foreground">{it.org}</div>
                </div>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {it.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  const groups = [
    { issuer: "Oracle", items: ["Java Fundamentals", "Java Programming", "Java Foundations"] },
    { issuer: "Infosys Springboard", items: ["Generative AI Models", "Prompt Engineering", "HTML5", "Advanced Python"] },
  ];
  return (
    <section id="certifications" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Certifications" title="Continuous learning" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.issuer} className="glass-panel rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl gradient-bg text-white">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{g.issuer}</h3>
              </div>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {g.items.map((c) => (
                  <li key={c} className="flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-3 py-2 text-sm">
                    <FileText className="h-4 w-4 text-brand" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  const items = [
    "Consistent academic performer",
    "Active learner in AI & Software Development",
    "Completed multiple industry certifications",
  ];
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionTitle eyebrow="Achievements" title="Highlights" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((a) => (
            <div key={a} className="glass-panel rounded-2xl p-6">
              <Trophy className="h-6 w-6 text-brand" />
              <p className="mt-4 font-medium">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionTitle eyebrow="Contact" title="Let's build something together" sub="Open to internships, placements, and startup opportunities." />
        <div className="mt-12 grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="font-semibold">Reach me directly</h3>
            <div className="mt-5 space-y-3 text-sm">
              <a href="mailto:23h41a0598@bvcits.edu.in" className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3 transition hover:bg-secondary">
                <Mail className="h-4 w-4 text-brand" /> 23h41a0598@bvcits.edu.in
              </a>
              <a href="tel:+918919646170" className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3 transition hover:bg-secondary">
                <Phone className="h-4 w-4 text-brand" /> +91 89196 46170
              </a>
              <a href="https://linkedin.com/in/indusri-kusuma" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3 transition hover:bg-secondary">
                <Linkedin className="h-4 w-4 text-brand" /> linkedin.com/in/indusri-kusuma
              </a>
              <a href="https://github.com/Indusrikusuma" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3 transition hover:bg-secondary">
                <Github className="h-4 w-4 text-brand" /> github.com/Indusrikusuma
              </a>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3">
                <MapPin className="h-4 w-4 text-brand" /> Andhra Pradesh, India
              </div>
            </div>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass-panel rounded-2xl p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name"><input required maxLength={100} className="w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-brand" /></Field>
              <Field label="Email"><input required type="email" maxLength={255} className="w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-brand" /></Field>
            </div>
            <div className="mt-4">
              <Field label="Subject"><input maxLength={150} className="w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-brand" /></Field>
            </div>
            <div className="mt-4">
              <Field label="Message"><textarea required maxLength={1000} rows={5} className="w-full resize-none rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-brand" /></Field>
            </div>
            <button type="submit" className="gradient-bg glow-shadow mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]">
              {sent ? "Message sent" : "Send Message"} <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <div>© {new Date().getFullYear()} K. Indusri. Crafted with care.</div>
        <div className="flex items-center gap-3">
          <a href="https://linkedin.com/in/indusri-kusuma" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
          <a href="https://github.com/Indusrikusuma" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:text-foreground"><Github className="h-4 w-4" /></a>
          <a href="mailto:23h41a0598@bvcits.edu.in" aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:text-foreground"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}
