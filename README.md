# Yun Yang · Academic Website

[Academic website](https://yangyun0125-create.github.io/) · [Source repository](https://github.com/yangyun0125-create/yangyun0125-create.github.io)

A bilingual academic website customized directly from [xyjoey/PRISM](https://github.com/xyjoey/PRISM), upstream commit `f2748db` (PRISM 1.3.3). The original component system, responsive layout, Framer Motion animations, theme switching, internationalization and BibTeX parser are retained.

- Next.js 15.5.28 · React 19 · TypeScript · Tailwind CSS 4
- English by default, with persistent Simplified Chinese switching
- Home · Research · Publications · CV · Contact
- Static export to `out/`, ready for GitHub Pages

Start with the Chinese [beginner's guide](使用指南.md) and [quick checklist](快速操作清单.md) for everyday content updates.

## Run locally

Install Node.js 22 or later, including npm.

```powershell
cd D:\Website-mine\yun-yang
npm ci
npm run dev
```

Development: http://localhost:3000

```powershell
npm run typecheck
npm run lint
npm run check:bibtex
npm run build
npm run check:export
npm run preview
```

Static preview: http://localhost:4173

See [DEPLOYMENT.md](DEPLOYMENT.md) for GitHub Pages, [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for Chinese content-maintenance instructions, and [CLEANUP_REPORT.md](CLEANUP_REPORT.md) for the cleanup audit.

Personal information remains in `content/` and `content_zh/`. The owner-provided portrait and email (yun.yang@inrae.fr) are configured. Publications, awards, supervisors and other personal links are included only when verified. Add a real CV PDF when available.

PRISM is MIT licensed; the original [LICENSE](LICENSE) is preserved. The unmodified BibTeX parser and its license are documented in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Theme switching uses Zustand; styling uses Tailwind 4's CSS configuration in `src/app/globals.css`.
