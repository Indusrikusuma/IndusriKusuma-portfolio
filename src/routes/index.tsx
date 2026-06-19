import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Github, Linkedin, Mail, MapPin, Download, ArrowRight, ArrowUpRight,
  Code2, Database, Wrench, Globe, GraduationCap, Briefcase, Award, Trophy,
  Sparkles, Moon, Sun, Send, FileText, CheckCircle2, Phone, Target,
  Layout, Server, Cpu, Quote, Github as GitIcon, Star, GitBranch, Users,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "K. Indusri — Software Developer Portfolio" },
      { name: "description", content: "CSE student & aspiring software developer. Python, Java, Web Development, Databases, AI. Open to internships & placements." },
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

const TITLES = ["Python Developer", "Software Engineer", "Web Developer", "AI Enthusiast"];

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

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, seen } = useInView<HTMLDivElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const dur = 1200, start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <div ref={ref} className="text-4xl font-bold gradient-text sm:text-5xl">{n}{suffix}</div>;
}

function Portfolio() {
  const typed = useTyping();
  const { dark, toggle } = useTheme();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-brand/30 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-32 h-[460px] w-[460px] rounded-full bg-brand-2/25 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-accent/20 blur-3xl animate-blob" style={{ animationDelay: "8s" }} />
      </div>

      <Nav dark={dark} toggle={toggle} />
      <Hero typed={typed} />
      <Counters />
      <About />
      <Education />
      <Skills />
      <TechStack />
      <Projects />
      <Services />
      <Experience />
      <Certifications />
      <GithubStats />
      <Testimonials />
      <Objective />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}

const NAV = [
  ["About", "about"], ["Skills", "skills"], ["Projects", "projects"],
  ["Services", "services"], ["Experience", "experience"], ["Contact", "contact"],
] as const;

function Nav({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <header className="no-print fixed top-4 left-1/2 z-50 w-[min(96%,1100px)] -translate-x-1/2">
      <nav className="glass-panel flex items-center justify-between rounded-full px-4 py-2.5 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-display font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg gradient-bg text-white shadow-md">KI</span>
          <span className="hidden sm:inline">Indusri</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
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
          <Reveal delay={160}>
            <div className="mt-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Computer Science Engineering Student · Aspiring Software Developer
            </div>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-4 text-xl text-muted-foreground sm:text-2xl">
              I'm a <span className="font-semibold text-foreground">{typed}</span>
              <span className="animate-caret ml-0.5 text-brand">|</span>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Building Technology Solutions for Real-World Problems. Passionate about software,
              web, and AI — turning ideas into useful, well-crafted tools.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:bg-secondary">
                <Mail className="h-4 w-4" /> Contact Me
              </a>
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:bg-secondary">
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
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

function Counters() {
  const items = [
    { v: 3, s: "+", l: "Projects" },
    { v: 11, s: "+", l: "Certifications" },
    { v: 2, s: "", l: "Internships" },
    { v: 10, s: "+", l: "Technical Skills" },
  ];
  return (
    <section className="px-4 pb-8">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((it) => (
          <div key={it.l} className="glass-panel rounded-2xl p-5 text-center">
            <Counter to={it.v} suffix={it.s} />
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{it.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="About" title="A curious mind, shipping real things." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Passionate Computer Science Engineering student with strong foundations in{" "}
              <span className="text-foreground font-medium">Python, Java, Web Development, Databases, and Problem Solving</span>.
            </p>
            <p>
              Enthusiastic about creating innovative software solutions and continuously
              learning emerging technologies such as Artificial Intelligence, Cloud Computing,
              and Full Stack Development.
            </p>
            <p className="text-foreground">
              <span className="gradient-text font-semibold">Goal:</span> become a Software Engineer
              and build impactful technology products.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: "8.5", l: "CGPA" },
              { v: "93.4%", l: "Intermediate" },
              { v: "10+", l: "Certifications" },
              { v: "2", l: "Internships" },
            ].map((s) => (
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
  { title: "Programming", icon: Code2, items: ["Python", "Java", "C", "JavaScript"] },
  { title: "Web Development", icon: Globe, items: ["HTML5", "CSS3", "Responsive Design"] },
  { title: "Database", icon: Database, items: ["MySQL"] },
  { title: "Tools & AI", icon: Wrench, items: ["Git", "GitHub", "VS Code", "Prompt Engineering", "GenAI Tools"] },
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

const TECH = [
  "Python", "Java", "C", "JavaScript", "HTML5", "CSS3",
  "MySQL", "Git", "GitHub", "VS Code", "GenAI", "Prompt Eng.",
];

function TechStack() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Tech Stack" title="Technologies I work with" />
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {TECH.map((t, i) => (
            <div
              key={t}
              className="glass-panel group rounded-2xl px-5 py-3 text-sm font-medium transition hover:-translate-y-1 hover:glow-shadow"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span className="gradient-text font-bold">#</span> {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    title: "Student Placement Readiness Tracker",
    tag: "Python • File I/O • Analytics",
    desc: "A Python-based application to monitor aptitude scores, technical skills, mock tests, and placement readiness with progress reports.",
    bullets: ["Student profile management", "Aptitude tracking", "Performance analytics", "Placement readiness reports"],
    featured: true,
  },
  {
    title: "Contact Management System",
    tag: "Python • File Handling",
    desc: "A Python file-handling project that stores, updates, searches, and manages contact details efficiently with a simple CLI.",
    bullets: ["Add / Update / Delete contacts", "Search by name or phone", "Persistent file storage", "Clean modular code"],
  },
  {
    title: "Personal Portfolio Website",
    tag: "HTML • CSS • JS",
    desc: "A responsive portfolio website showcasing projects, skills, certifications, and achievements with a modern, accessible UI.",
    bullets: ["Responsive across devices", "Skill & project showcase", "Smooth animations", "SEO friendly"],
  },
];

function Projects() {
  return (
    <section id="projects" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Projects" title="Built with intent" sub="A selection of things I've designed, coded, and shipped." />

        <div className="mt-12 glass-panel overflow-hidden rounded-3xl">
          <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
            <div className="p-8 sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Featured · {PROJECTS[0].tag}
              </div>
              <h3 className="mt-4 text-2xl font-bold sm:text-3xl">{PROJECTS[0].title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{PROJECTS[0].desc}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {PROJECTS[0].bullets.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
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

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {PROJECTS.slice(1).map((p) => (
            <div key={p.title} className="group glass-panel rounded-3xl p-6 transition hover:-translate-y-1 hover:glow-shadow">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-2" /> {p.tag}
              </div>
              <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <ul className="mt-4 grid gap-1.5 text-sm">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
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

const SERVICES = [
  { icon: Code2, title: "Python Development", desc: "Scripts, automations, and data-driven Python applications." },
  { icon: Layout, title: "Web Development", desc: "Responsive, accessible websites built with modern web standards." },
  { icon: Sparkles, title: "Frontend Design", desc: "Clean, modern UI with attention to detail and motion." },
  { icon: Database, title: "Database Design", desc: "Well-structured MySQL schemas for efficient data access." },
  { icon: Server, title: "Software Projects", desc: "End-to-end mini-projects from idea to working build." },
  { icon: Cpu, title: "AI & Prompt Eng.", desc: "Leveraging GenAI tools and prompt engineering for productivity." },
];

function Services() {
  return (
    <section id="services" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Services" title="What I can help with" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.title} className="glass-panel rounded-2xl p-6 transition hover:-translate-y-1 hover:glow-shadow">
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-bg text-white">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
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
      bullets: ["Built responsive web pages using HTML and CSS", "Improved UI/UX understanding", "Strengthened frontend development skills"],
    },
    {
      role: "Python Development Intern",
      org: "TalentShine",
      bullets: ["Developed Python-based applications", "Applied problem-solving techniques", "Reinforced core programming concepts"],
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

function GithubStats() {
  const stats = [
    { icon: GitIcon, v: "3+", l: "Repositories" },
    { icon: Star, v: "Active", l: "Contributions" },
    { icon: GitBranch, v: "Python · JS · Java", l: "Languages" },
    { icon: Code2, v: "Open Source", l: "Mindset" },
  ];
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="GitHub" title="Code & contributions" sub="A snapshot of activity on my GitHub." />
        <div className="mt-12 glass-panel rounded-3xl p-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-secondary/40 p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-bg text-white">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-lg font-bold">{s.v}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            <img
              src="https://ghchart.rshah.org/7c3aed/Indusrikusuma"
              alt="Indusrikusuma GitHub contribution chart"
              className="w-full bg-white p-4"
              loading="lazy"
            />
          </div>
          <div className="mt-6 text-center">
            <a href="https://github.com/Indusrikusuma" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-semibold transition hover:bg-secondary">
              <Github className="h-4 w-4" /> Visit my GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  { q: "Indusri is a quick learner who consistently delivers clean, thoughtful work. She'll be a fantastic engineer.", n: "Faculty Mentor", r: "Department of CSE" },
  { q: "Reliable, curious, and detail-oriented — she picked up frontend development quickly and shipped real pages.", n: "Internship Supervisor", r: "TalentShine" },
  { q: "Great problem solver with a strong grasp of Python fundamentals. A pleasure to collaborate with on projects.", n: "Project Peer", r: "B.Tech CSE" },
];

function Testimonials() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Testimonials" title="Kind words from mentors & peers" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.n} className="glass-panel relative rounded-3xl p-6">
              <Quote className="absolute right-5 top-5 h-8 w-8 text-brand/30" />
              <p className="text-sm leading-relaxed text-muted-foreground">"{t.q}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full gradient-bg text-sm font-bold text-white">
                  {t.n.split(" ").map(w => w[0]).join("").slice(0,2)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Objective() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel relative overflow-hidden rounded-3xl p-10 text-center">
          <div className="absolute -inset-1 -z-10 gradient-bg opacity-20 blur-2xl" />
          <Target className="mx-auto h-10 w-10 text-brand" />
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Career Objective</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            To secure a <span className="gradient-text font-semibold">Software Development</span> role
            where I can apply my technical knowledge, solve real-world problems, and contribute to
            innovative technology products — while continuing to grow as an engineer.
          </p>
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  const items = [
    { i: Trophy, t: "Consistent Academic Performer" },
    { i: Award, t: "Multiple Industry Certifications" },
    { i: Sparkles, t: "Active Technology Learner" },
    { i: Cpu, t: "Strong Problem-Solving Skills" },
    { i: Users, t: "Technical Learning Programs" },
    { i: CheckCircle2, t: "Reliable Team Collaborator" },
  ];
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Achievements" title="Highlights" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <div key={a.t} className="glass-panel flex items-center gap-4 rounded-2xl p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-bg text-white">
                <a.i className="h-5 w-5" />
              </div>
              <p className="font-medium">{a.t}</p>
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
                <Mail className="h-4 w-4 shrink-0 text-brand" /> <span className="truncate">23h41a0598@bvcits.edu.in</span>
              </a>
              <a href="tel:+918919646170" className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3 transition hover:bg-secondary">
                <Phone className="h-4 w-4 shrink-0 text-brand" /> +91 89196 46170
              </a>
              <a href="https://linkedin.com/in/indusri-kusuma" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3 transition hover:bg-secondary">
                <Linkedin className="h-4 w-4 shrink-0 text-brand" /> linkedin.com/in/indusri-kusuma
              </a>
              <a href="https://github.com/Indusrikusuma" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3 transition hover:bg-secondary">
                <Github className="h-4 w-4 shrink-0 text-brand" /> github.com/Indusrikusuma
              </a>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3">
                <MapPin className="h-4 w-4 shrink-0 text-brand" /> Andhra Pradesh, India
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
        <div>Designed and Developed by <span className="gradient-text font-semibold">K. Indusri</span> · © {new Date().getFullYear()}</div>
        <div className="flex items-center gap-3">
          <a href="https://linkedin.com/in/indusri-kusuma" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
          <a href="https://github.com/Indusrikusuma" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:text-foreground"><Github className="h-4 w-4" /></a>
          <a href="mailto:23h41a0598@bvcits.edu.in" aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:text-foreground"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}
