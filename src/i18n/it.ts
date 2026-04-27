import { translationsSchema } from "./schema"

export const it = translationsSchema.parse({
  site: {
    name: "Elia Zarantonello",
    description:
      "Full-stack developer. Costruisco e consegno sistemi web completi.",
    rssTitle: "Blog | Elia Zarantonello",
    rssDescription: "Articoli su sviluppo web, frontend e tecnologia.",
  },
  footer: {
    navigation: "Navigazione",
    connect: "Connettiti",
    copyright: "Tutti i diritti riservati.",
    builtWith: "Realizzato con",
  },
  nav: {
    home: {
      label: "Home",
      href: "/",
    },
    about: {
      label: "Chi Sono",
      href: "/chi-sono",
    },
    projects: {
      label: "Progetti",
      href: "/progetti",
    },
    blog: {
      label: "Blog",
      href: "/blog",
    },
    contact: {
      label: "Contatti",
      href: "/contatti",
    },
  },
  home: {
    meta: {
      title: "Full-Stack Developer",
      description:
        "Full-stack developer con base a Treviso. Costruisco sistemi web completi con Node.js e TypeScript.",
    },
    hero: {
      badge: "Disponibile per nuovi progetti",
      heading: "Elia Zarantonello",
      description:
        "Backend, frontend, deploy — dalla prima riga di codice alla produzione. <br /> Senza intermediari.",
      title: "Full-stack developer",
      buttons: [
        { text: "Vedi i progetti", href: "/progetti" },
        { text: "Contattami", href: "/contatti" },
      ],
    },
    stack: {
      heading: 'Tecnologie che <span class="text-primary">utilizzo</span>',
      description:
        "Stack consolidato. Scelte testate in produzione, non per tendenza.",
      scrollLabel: "Vai alla sezione successiva",
      icons: [
        { name: "Node.js", icon: "nodejs" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Next.js", icon: "nextjs" },
        { name: "Astro", icon: "astro" },
        { name: "Postgres", icon: "postgres" },
        { name: "Docker", icon: "docker" },
      ],
    },
    services: {
      heading: 'Cosa posso <span class="text-primary">fare per te</span>',
      items: [
        {
          title: "Backend",
          description:
            "API robuste, database ottimizzati e integrazioni con servizi esterni. <br /> La parte invisibile su cui regge tutto il resto.",
          bullets: [
            "API REST con Node.js e TypeScript",
            "Database PostgreSQL",
            "Integrazioni con servizi terzi",
          ],
        },
        {
          title: "Frontend",
          description:
            "Interfacce che gli utenti capiscono al primo utilizzo. <br /> Veloci, accessibili, curate — non solo belle.",
          bullets: [
            "UI curata e performante",
            "Next.js o Astro a seconda del progetto",
            "SEO e accessibilità inclusi",
          ],
        },
        {
          title: "Deploy",
          description:
            "Mi occupo anche della messa in produzione. <br /> Tu ricevi un prodotto funzionante, non solo codice da gestire.",
          bullets: [
            "Containerizzazione con Docker",
            "Deploy su VPS o cloud",
            "Setup completo, zero sorprese",
          ],
        },
      ],
      cta: { text: "Hai un progetto in mente? Parliamone", href: "/contatti" },
    },
    work: {
      heading: 'Come <span class="text-primary">lavoro</span>',
      items: [
        {
          label: "01 — Sviluppo",
          title: "Codice pulito, architettura solida",
          description:
            "TypeScript end-to-end. <br /> Strutture pensate per durare nel tempo, non per fare colpo al momento della review.",
        },
        {
          label: "02 — Performance",
          title: "Misuro tutto",
          description:
            "Lighthouse, latenza API, tempi di build. <br /> Se qualcosa è lento, lo individuo con i dati — non a occhio.",
        },
        {
          label: "03 — Produzione",
          title: "Fino al deploy.",
          description:
            "Docker, VPS, dominio: non ti lascio con codice da mettere online. <br /> Ti consegno qualcosa che funziona.",
        },
      ],
    },
  },
  about: {
    meta: {
      title: "Chi Sono",
      description:
        "Full-stack developer con base a Treviso. Backend, frontend e deploy — costruisco il prodotto completo.",
    },
    codeViewer: {
      heading: "Chi Sono",
      description:
        "Lavoro sull'intero ciclo di un prodotto web: architettura backend, codice frontend e deploy in produzione.",
      developer: {
        role: "Full Stack Developer",
        focus: ["Web Architecture", "Backend Systems", "Frontend Interfaces"],
        location: "Treviso, Italy",
        status: "Disponibile per nuovi progetti",
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
          title: "Musica",
          description:
            "La musica è il mio reset mentale tra una sessione di debug e l'altra.",
        },
        {
          title: "Montagna",
          description:
            "Le Dolomiti sono a un'ora da casa. Cammino quando il codice non scorre.",
        },
        {
          title: "Lettura",
          description:
            "Romanzi storici e libri tecnici a rotazione. Spesso entrambi sul comodino.",
        },
      ],
    },
  },
  projects: {
    meta: {
      title: "Progetti",
      description:
        "Progetti reali: sistemi in produzione, automazione per clienti e librerie open source.",
    },
    ctaLabel: "Leggi il caso studio",
    items: [
      {
        slug: "karaoke-system",
        title: "Karaoke System",
        subtitle: "Ecosistema realtime per la gestione code karaoke",
        description:
          "Sistema backend-driven per la gestione delle code in un karaoke, con sincronizzazione multi-device in tempo reale.",
        year: "2024-2025",
        problem: {
          heading: "Il problema",
          body: "In un karaoke con decine di partecipanti, gestire la coda dei cantanti con carta e penna o fogli condivisi genera confusione: ordine perso, duplicati, nessuna visibilità per chi aspetta. Quando ci sono più dispositivi connessi (tablet dell'host, telefoni dei partecipanti), mantenere lo stato sincronizzato diventa il vero problema tecnico.",
          highlights: [
            "Ordine della coda incoerente tra dispositivi",
            "Nessuna visibilità in tempo reale per i partecipanti",
            "Conflitti frequenti nella gestione manuale",
          ],
        },
        solution: {
          heading: "La soluzione",
          body: "Ho progettato un'architettura server-authoritative dove il backend NestJS è l'unica fonte di verità. Il server gestisce tutta la logica di coda, stanze e turni, mentre i client si limitano a inviare azioni e ricevere aggiornamenti. La comunicazione avviene via Socket.IO con Redis come layer di stato condiviso e MongoDB per la persistenza.",
          highlights: [
            "Backend NestJS come single source of truth",
            "Socket.IO per aggiornamenti realtime bidirezionali",
            "Redis per stato condiviso e recovery delle sessioni",
            "App React Native (Expo) come interfaccia utente e host",
          ],
        },
        result: {
          heading: "Il risultato",
          body: "Il sistema è stabile in produzione e gestisce sessioni karaoke con decine di partecipanti connessi simultaneamente. La sincronizzazione multi-device è istantanea, i conflitti di stato sono eliminati dall'architettura server-authoritative e le sessioni sopravvivono a disconnessioni grazie al recovery automatico.",
          highlights: [
            "Zero conflitti di stato tra dispositivi",
            "Recovery automatico delle sessioni",
            "Latenza di sincronizzazione sotto i 100ms",
          ],
        },
        features: [
          "Gestione code realtime",
          "Sincronizzazione multi-device",
          "Stato condiviso con Redis",
          "Persistenza e recovery sessioni",
          "Architettura event-driven",
          "Modalità host e partecipante",
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
        subtitle: "Scraping differenziale e report automatici",
        description:
          "Sistema automatizzato di scoperta lead tramite scraping web, confronto snapshot e invio report periodici.",
        year: "2025-2026",
        problem: {
          heading: "Il contesto",
          body: "Il cliente monitorava manualmente diversi siti web alla ricerca di nuove opportunità commerciali. Il processo era lento, soggetto a errori e non scalabile: le nuove inserzioni venivano scoperte in ritardo o perse del tutto, con un impatto diretto sulla capacità di acquisizione.",
          highlights: [
            "Monitoraggio manuale di decine di pagine web",
            "Lead scoperti in ritardo o persi completamente",
            "Processo non scalabile né ripetibile",
          ],
        },
        solution: {
          heading: "La soluzione",
          body: "Ho progettato un sistema di scraping differenziale che monitora automaticamente i siti target. Ad ogni esecuzione, il sistema acquisisce uno snapshot delle pagine, lo confronta con quello precedente e identifica le nuove inserzioni. I risultati vengono filtrati e inviati come report strutturato via Gmail API. Il tutto è containerizzato con Docker Compose e schedulato via cron su VPS.",
          highlights: [
            "Scraping con Puppeteer e Chromium headless",
            "Confronto differenziale basato su snapshot atomici",
            "Report automatici via Gmail API",
            "Deploy Docker Compose su VPS con scheduling cron",
          ],
        },
        result: {
          heading: "Il risultato",
          body: "Il cliente riceve report settimanali con i nuovi lead identificati, senza alcun intervento manuale. Il tempo dedicato alla ricerca è stato azzerato e la velocità di risposta alle nuove opportunità è aumentata significativamente.",
          highlights: [
            "Eliminazione completa del lavoro manuale",
            "Report settimanali automatici e strutturati",
            "Tempo di risposta ridotto da giorni a ore",
          ],
        },
        features: [
          "Scraping automatico multi-sito",
          "Rilevamento modifiche tramite snapshot",
          "Generazione report periodici",
          "Intervalli di monitoraggio configurabili",
          "Gestione errori e retry automatico",
          "Log rotation e monitoring",
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
        subtitle: "Animazioni on-scroll, zero dipendenze",
        description:
          "Libreria npm per animazioni scroll-triggered, zero-dependency e framework-agnostic.",
        year: "2026",
        problem: {
          heading: "Il problema",
          body: "Le librerie di animazione scroll più diffuse portano con sé dipendenze pesanti, sono legate a framework specifici o richiedono configurazioni complesse per casi d'uso comuni. Per chi vuole animazioni fluide senza compromessi su bundle size e portabilità, le opzioni sono limitate.",
          highlights: [
            "Librerie esistenti pesanti e framework-dependent",
            "Configurazione complessa per animazioni comuni",
            "Impatto negativo su bundle size e performance",
          ],
        },
        solution: {
          heading: "La soluzione",
          body: "Ho creato Viewmotion, una libreria npm zero-dependency che usa l'Intersection Observer API nativa per triggerare animazioni al scroll. L'API è dichiarativa e minimale: basta un attributo HTML o una singola chiamata per attivare le animazioni. Il progetto è strutturato come monorepo pnpm con adapter per diversi framework e un sito di documentazione in Astro.",
          highlights: [
            "Zero dipendenze, basata su Intersection Observer API",
            "API dichiarativa con attributi HTML o chiamata singola",
            "Monorepo pnpm con adapter multi-framework",
            "Sito documentazione in Astro",
          ],
        },
        result: {
          heading: "Il risultato",
          body: "Una libreria leggera e portabile, utilizzabile in qualsiasi progetto web con un singolo import. Le animazioni sono fluide, performanti e non impattano il bundle size. Il monorepo garantisce supporto consistente su più framework.",
          highlights: [
            "Bundle size sotto i 3KB gzipped",
            "Compatibile con qualsiasi framework o vanilla JS",
            "Documentazione interattiva con esempi live",
          ],
        },
        features: [
          "Animazioni scroll-triggered dichiarative",
          "Zero dipendenze esterne",
          "Framework-agnostic con adapter dedicati",
          "API minimale e intuitiva",
          "Performance native con Intersection Observer",
          "Documentazione interattiva",
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
        "Articoli tecnici su Node.js, TypeScript e sviluppo web moderno.",
    },
    ui: {
      backLabel: "Torna al blog",
      readingTime: "min di lettura",
      seriesLabel: "Serie",
      tocLabel: "Indice",
      prevInSeries: "Precedente",
      nextInSeries: "Successivo",
      noPosts: "Nessun articolo ancora.",
      italianOnly: "",
    },
  },
  contact: {
    meta: {
      title: "Contatti",
      description:
        "Cerchi uno sviluppatore che costruisca e consegni? Scrivimi.",
    },
    info: {
      heading: "Parliamo",
      description:
        "Costruisco sistemi web completi con Node.js e TypeScript. <br /> Se hai un progetto, scrivimi — rispondo.",
      location: "Treviso, Italia",
      githubLabel: "Profilo GitHub",
      linkedinLabel: "Profilo LinkedIn",
    },
    terminal: {
      lastLogin: "Ultimo accesso",
      clickToStart: "Clicca per avviare",
      touchToStart: "Tocca per avviare",
      installing: "Installazione pacchetti...",
      installed: "Pacchetti installati.",
      starting: "Avvio protocollo email...",
      ready: "Messaggio pronto per l'invio!",
      protocol: "Protocollo stabilito.",
      opening: "Apertura client di posta...",
      reclick: "Clicca per inviare di nuovo...",
      promptPath: "elia@portfolio: ~/contact",
      command: "npx send-email",
      email: "email@eliazarantonello.dev",
    },
  },
  ui: {
    themeToggle: "Cambia tema",
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
  },
  notFound: {
    title: "Pagina non trovata",
    cta: "Torna alla homepage",
  },
})
