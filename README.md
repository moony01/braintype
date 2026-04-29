# Braintype

> **Brain type personality test** — 12-question quiz that analyzes your cognitive style and visualizes the result as a radar chart.

[![Live](https://img.shields.io/badge/Live-moony01.com%2Fbraintype-blue)](https://moony01.com/braintype)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![i18n](https://img.shields.io/badge/i18n-next--intl-orange)](https://next-intl-docs.vercel.app/)

🌐 **Live Demo**: https://moony01.com/braintype

---

## Overview

**Braintype** is a 4-stage interactive web app that classifies users into brain types based on a 12-question cognitive style quiz. Built with Next.js 15 App Router and `next-intl` for multilingual support, the app delivers a fast, mobile-first experience with integrated ad monetization.

## Key Features

- 🧠 **12-Question Quiz** — Cognitive style assessment based on decision-making and processing patterns
- 📊 **Radar Chart Result** — Visual breakdown of your brain type traits
- 🌏 **Multilingual UI** — Powered by `next-intl`, ready for multiple locales
- 📱 **Mobile-First** — Responsive layout with Tailwind CSS
- 💰 **Ad Monetization** — Interstitial ads at Q4/Q8/Q12, banner ads on result screen
- ⚡ **Fast & Lightweight** — Static-friendly Next.js 15, React 19

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Runtime** | React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3, `clsx`, `tailwind-merge` |
| **i18n** | next-intl 3 |
| **Monetization** | Google AdSense |

## Quiz Flow

```
Landing screen
        ↓
Quiz screen (12 questions, ProgressBar)
        ↓
Interstitial ad (Q4, Q8, Q12)
        ↓
Result screen (brain type + radar chart + share + ads)
```

## Local Development

### Prerequisites
- Node.js 18+
- npm or pnpm

### Setup

```bash
git clone https://github.com/moony01/braintype.git
cd braintype

npm install
npm run dev
```

Open [http://localhost:3003](http://localhost:3003)

## Project Structure

```
braintype/
├── src/
│   ├── app/
│   │   ├── [locale]/         # Localized routes (Next.js App Router)
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Locale redirect
│   │   ├── robots.ts         # SEO
│   │   └── sitemap.ts        # SEO
│   ├── components/
│   │   ├── layout/           # PageLayout, AdBanner, LanguageSwitcher
│   │   ├── quiz/             # QuestionCard, ProgressBar
│   │   ├── result/           # ResultCard (radar chart)
│   │   └── ui/               # Button, HomeButton
│   ├── data/                 # Quiz questions, brain type definitions
│   ├── hooks/                # useQuiz (state machine)
│   ├── i18n/                 # next-intl config
│   ├── lib/                  # Utilities
│   └── types/                # Shared TypeScript types
├── messages/                 # Translation JSON files
└── public/                   # Static assets
```

## SEO

- `sitemap.ts` and `robots.ts` for search engine indexing
- Per-locale routing (`/ko/`, `/en/`, etc.) with `next-intl` middleware
- Meta tags optimized for share previews

## License

[MIT License](LICENSE) © 2024–2026 [moony01](https://github.com/moony01)

You are free to use, modify, and distribute this code. Attribution appreciated.

## Contact

- 👤 **Author**: [@moony01](https://github.com/moony01)
- 📧 **Email**: mun01180@gmail.com
- 🌐 **Website**: [moony01.com](https://moony01.com/)
- 💖 **Sponsor**: [github.com/sponsors/moony01](https://github.com/sponsors/moony01)
