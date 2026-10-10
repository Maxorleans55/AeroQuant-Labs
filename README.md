# AeroQuant Labs

Website for **AeroQuant Labs** — a software development team.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript 5 |
| UI | React 19, Tailwind CSS v4, Headless UI |
| Animation | Framer Motion, AOS |
| Theming | `next-themes` (light/dark) |

## Getting started

```bash
cd aeroquant-labs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
AeroQuant-Labs/
├── aeroquant-labs/          # The Next.js application
│   ├── public/              # Static assets
│   └── src/
│       ├── app/
│       │   ├── (site)/      # Route group — public pages
│       │   ├── api/         # Route handlers
│       │   ├── components/  # React components
│       │   └── types/       # TypeScript types
│       └── utils/           # Helpers
└── README.md
```

Application code lives in `aeroquant-labs/` so additional projects can be
added alongside it later.

## Attribution

Scaffolded from the free
[Desgy Next.js landing page template](https://github.com/GetNextjsTemplates/desgy-nextjs-tailwind-landing-page-template-free)
by GetNextjsTemplates, built with React, Tailwind CSS and Headless UI.

The template ships **without a license file**, so its original code remains the
property of its authors. It is used here as a non-commercial starting point.
All modifications and original work in this repository are © AeroQuant Labs.

## License

UNLICENSED — private, all rights reserved.
