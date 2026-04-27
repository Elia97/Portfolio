import { translationsSchema } from "./schema"

export const en = translationsSchema.parse({
  site: {
    name: "Elia Zarantonello",
    description: "Full-stack developer. I build and ship complete web systems.",
    rssTitle: "Blog | Elia Zarantonello",
    rssDescription: "Articles about web development, frontend and technology.",
  },
  footer: {
    navigation: "Navigation",
    connect: "Connect",
    copyright: "All rights reserved.",
    builtWith: "Built with",
  },
  nav: {
    home: {
      label: "Home",
      href: "/",
    },
    about: {
      label: "About Me",
      href: "/about",
    },
    projects: {
      label: "Projects",
      href: "/projects",
    },
    blog: {
      label: "Blog",
      href: "/blog",
    },
    contact: {
      label: "Contact",
      href: "/contact",
    },
  },
  home: {
    meta: {
      title: "Full-Stack Developer",
      description:
        "Full-stack developer based in Treviso. I build complete web systems with Node.js and TypeScript.",
    },
    services: {
      heading: 'What I can <span class="text-primary">do for you</span>',
      items: [
        {
          title: "Backend",
          description:
            "Robust APIs, optimized databases, and third-party integrations. The invisible part everything else relies on.",
          bullets: [
            "REST APIs with Node.js and TypeScript",
            "PostgreSQL databases",
            "Third-party service integrations",
          ],
        },
        {
          title: "Frontend",
          description:
            "Interfaces users understand on first use. Fast, accessible, refined — not just good-looking.",
          bullets: [
            "Polished and performant UI",
            "Next.js or Astro depending on the project",
            "SEO and accessibility included",
          ],
        },
        {
          title: "Deploy",
          description:
            "I handle production deployment too. You receive a working product, not just code to manage yourself.",
          bullets: [
            "Containerization with Docker",
            "Deployment to VPS or cloud",
            "Full setup, no surprises",
          ],
        },
      ],
      cta: { text: "Got a project in mind? Let's talk", href: "/contact" },
    },
    work: {
      heading: 'How I <span class="text-primary">work</span>',
      items: [
        {
          label: "01 — Development",
          title: "Clean code, solid architecture",
          description:
            "TypeScript end-to-end. Structures built to last, not just to impress during code review.",
        },
        {
          label: "02 — Performance",
          title: "I measure everything",
          description:
            "Lighthouse, API latency, build times. When something is slow, I find it with data — not guesswork.",
        },
        {
          label: "03 — Production",
          title: "To production.",
          description:
            "Docker, VPS, domain: I don't leave you with code to deploy yourself. You receive something that works.",
        },
      ],
    },
    hero: {
      badge: "Available for new projects",
      heading: "Elia Zarantonello",
      description:
        "Backend, frontend, deploy — from the first line of code to production. <br /> No hand-offs.",
      title: "Full-stack developer",
      buttons: [
        { text: "View projects", href: "/projects" },
        { text: "Contact me", href: "/contact" },
      ],
    },
    stack: {
      heading: 'Technologies I <span class="text-primary">Use<span/>',
      description:
        "A consolidated stack. Battle-tested in production, not trend-driven.",
      scrollLabel: "Go to next section",
      icons: [
        { name: "Node.js", icon: "nodejs" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Next.js", icon: "nextjs" },
        { name: "Astro", icon: "astro" },
        { name: "Postgres", icon: "postgres" },
        { name: "Docker", icon: "docker" },
      ],
    },
  },
  about: {
    meta: {
      title: "About Me",
      description:
        "Full-stack developer based in Treviso. Backend, frontend and deploy — I build the complete product.",
    },
    codeViewer: {
      heading: "About Me",
      description:
        "I work across the entire product cycle: backend architecture, frontend code and production deploy.",
      developer: {
        role: "Full Stack Developer",
        focus: ["Web Architecture", "Backend Systems", "Frontend Interfaces"],
        location: "Treviso, Italy",
        status: "Available for new projects",
      },
      skills: [
        {
          name: "Frontend",
          skills: ["Next.js", "Astro", "React", "TypeScript", "Tailwind CSS"],
        },
        {
          name: "Backend",
          skills: ["Node.js", "Express", "Fastify", "REST", "PostgreSQL"],
        },
        {
          name: "DevOps",
          skills: ["Docker", "VPS", "Nginx", "Git"],
        },
      ],
      interests: [
        {
          title: "Music",
          description: "Music is my mental reset between debug sessions.",
        },
        {
          title: "Mountains",
          description:
            "The Dolomites are an hour away. I hike when the code stops flowing.",
        },
        {
          title: "Reading",
          description:
            "Historical novels and tech books on rotation. Often both on the nightstand.",
        },
      ],
    },
  },
  projects: {
    meta: {
      title: "Projects",
      description:
        "Real projects: production systems, client automation, and open source libraries.",
    },
    ctaLabel: "Read the case study",
    items: [
      {
        slug: "karaoke-system",
        title: "Karaoke System",
        subtitle: "Realtime ecosystem for karaoke queue management",
        description:
          "A backend-driven system for managing queues at a karaoke venue, with real-time multi-device synchronization.",
        year: "2024-2025",
        problem: {
          heading: "The problem",
          body: "In a karaoke venue with dozens of participants, managing the singer queue with paper or shared spreadsheets creates chaos: lost order, duplicates, no visibility for those waiting. When multiple devices are connected (host tablet, participant phones), keeping state synchronized becomes the real technical challenge.",
          highlights: [
            "Inconsistent queue order across devices",
            "No real-time visibility for participants",
            "Frequent conflicts in manual management",
          ],
        },
        solution: {
          heading: "The solution",
          body: "I designed a server-authoritative architecture where the NestJS backend is the single source of truth. The server handles all queue, room, and turn logic, while clients only send actions and receive updates. Communication happens via Socket.IO with Redis as the shared state layer and MongoDB for persistence.",
          highlights: [
            "NestJS backend as single source of truth",
            "Socket.IO for bidirectional real-time updates",
            "Redis for shared state and session recovery",
            "React Native (Expo) app as UI and host interface",
          ],
        },
        result: {
          heading: "The result",
          body: "The system is stable in production and handles karaoke sessions with dozens of participants connected simultaneously. Multi-device synchronization is instantaneous, state conflicts are eliminated by the server-authoritative architecture, and sessions survive disconnections thanks to automatic recovery.",
          highlights: [
            "Zero state conflicts between devices",
            "Automatic session recovery",
            "Synchronization latency under 100ms",
          ],
        },
        features: [
          "Real-time queue management",
          "Multi-device synchronization",
          "Shared state with Redis",
          "Session persistence and recovery",
          "Event-driven architecture",
          "Host and participant modes",
        ],
        technologies: [
          "Node.js",
          "NestJS",
          "Socket.IO",
          "Redis",
          "MongoDB",
          "TypeScript",
          "React Native",
          "Expo",
        ],
        githubUrl: "https://github.com/Elia97/Karaoke",
      },
      {
        slug: "automated-lead-discovery",
        title: "Automated Lead Discovery",
        subtitle: "Differential scraping and automated reports",
        description:
          "An automated lead discovery system via web scraping, snapshot comparison, and periodic report delivery.",
        year: "2025-2026",
        problem: {
          heading: "The context",
          body: "The client was manually monitoring multiple websites in search of new business opportunities. The process was slow, error-prone, and unscalable: new listings were discovered late or missed entirely, directly impacting acquisition capacity.",
          highlights: [
            "Manual monitoring of dozens of web pages",
            "Leads discovered late or missed entirely",
            "Process not scalable or repeatable",
          ],
        },
        solution: {
          heading: "The solution",
          body: "I designed a differential scraping system that automatically monitors target sites. On each run, the system captures a page snapshot, compares it to the previous one, and identifies new listings. Results are filtered and sent as a structured report via Gmail API. Everything is containerized with Docker Compose and scheduled via cron on a VPS.",
          highlights: [
            "Scraping with Puppeteer and headless Chromium",
            "Differential comparison based on atomic snapshots",
            "Automated reports via Gmail API",
            "Docker Compose deploy on VPS with cron scheduling",
          ],
        },
        result: {
          heading: "The result",
          body: "The client receives weekly reports with identified new leads, without any manual intervention. Time spent on research was eliminated and response speed to new opportunities increased significantly.",
          highlights: [
            "Complete elimination of manual work",
            "Automated, structured weekly reports",
            "Response time reduced from days to hours",
          ],
        },
        features: [
          "Automated multi-site scraping",
          "Change detection via snapshots",
          "Periodic report generation",
          "Configurable monitoring intervals",
          "Error handling and automatic retry",
          "Log rotation and monitoring",
        ],
        technologies: [
          "Node.js",
          "TypeScript",
          "Puppeteer",
          "Docker",
          "Docker Compose",
          "Gmail API",
          "Cron",
        ],
      },
      {
        slug: "viewmotion",
        title: "Viewmotion",
        subtitle: "On-scroll animations, zero dependencies",
        description:
          "An npm library for scroll-triggered animations, zero-dependency and framework-agnostic.",
        year: "2026",
        problem: {
          heading: "The problem",
          body: "The most popular scroll animation libraries bring heavy dependencies, are tied to specific frameworks, or require complex configuration for common use cases. For those wanting smooth animations without compromising bundle size and portability, options are limited.",
          highlights: [
            "Existing libraries heavy and framework-dependent",
            "Complex configuration for common animations",
            "Negative impact on bundle size and performance",
          ],
        },
        solution: {
          heading: "The solution",
          body: "I created Viewmotion, a zero-dependency npm library that uses the native Intersection Observer API to trigger scroll animations. The API is declarative and minimal: just an HTML attribute or a single call to activate animations. The project is structured as a pnpm monorepo with adapters for different frameworks and an Astro documentation site.",
          highlights: [
            "Zero dependencies, built on Intersection Observer API",
            "Declarative API with HTML attributes or single call",
            "pnpm monorepo with multi-framework adapters",
            "Astro documentation site",
          ],
        },
        result: {
          heading: "The result",
          body: "A lightweight and portable library, usable in any web project with a single import. Animations are smooth, performant, and don't impact bundle size. The monorepo ensures consistent support across multiple frameworks.",
          highlights: [
            "Bundle size under 3KB gzipped",
            "Compatible with any framework or vanilla JS",
            "Interactive documentation with live examples",
          ],
        },
        features: [
          "Declarative scroll-triggered animations",
          "Zero external dependencies",
          "Framework-agnostic with dedicated adapters",
          "Minimal and intuitive API",
          "Native performance with Intersection Observer",
          "Interactive documentation",
        ],
        technologies: [
          "TypeScript",
          "Intersection Observer API",
          "pnpm",
          "Astro",
          "Changesets",
          "npm",
        ],
        githubUrl: "https://github.com/Elia97/viewmotion",
        npmUrl: "https://www.npmjs.com/package/viewmotion",
      },
    ],
  },
  blog: {
    meta: {
      title: "Blog",
      description:
        "Technical articles on Node.js, TypeScript, and modern web development.",
    },
    ui: {
      backLabel: "Back to blog",
      readingTime: "min read",
      seriesLabel: "Series",
      tocLabel: "Contents",
      prevInSeries: "Previous",
      nextInSeries: "Next",
      noPosts: "No articles yet.",
      italianOnly:
        "This blog is written entirely in Italian. Use your browser's translation feature if needed.",
    },
  },
  contact: {
    meta: {
      title: "Contact",
      description:
        "Looking for a developer who builds and ships? Get in touch.",
    },
    info: {
      heading: "Let's talk",
      description:
        "I build complete web systems with Node.js and TypeScript. <br /> If you have a project, reach out — I reply.",
      location: "Treviso, Italy",
      githubLabel: "GitHub profile",
      linkedinLabel: "LinkedIn profile",
    },
    terminal: {
      lastLogin: "Last login",
      clickToStart: "Click to start",
      touchToStart: "Touch to start",
      installing: "Installing packages...",
      installed: "Packages installed.",
      starting: "Starting email protocol...",
      ready: "Message ready to send!",
      protocol: "Protocol established.",
      opening: "Opening email client...",
      reclick: "Click to send again...",
      promptPath: "elia@portfolio: ~/contact",
      command: "npx send-email",
      email: "email@eliazarantonello.dev",
    },
  },
  ui: {
    themeToggle: "Toggle theme",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  notFound: {
    title: "Page not found",
    cta: "Go back to homepage",
  },
})
