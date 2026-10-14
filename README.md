# Brinda & Sai Chaitanya — Next.js Wedding Invitation

A responsive, cinematic wedding invitation built entirely with Next.js 16 App Router and React 19.

## Architecture

- `app/page.jsx` is the only page entry point.
- `app/invitation.jsx` contains the server-rendered invitation markup.
- `app/invitation-controller.jsx` contains the client-side media, countdown, sharing, calendar, reveal, and auto-scroll behavior.
- `app/globals.css` contains the site styling.
- `public/assets/` contains all images, video, and audio.
- There is no standalone root `index.html`, external `script.js`, or duplicate stylesheet entry.

## Local development

```powershell
npm install
npm run dev
```

The development server opens at `http://localhost:3002/`. You can also use `START_INVITATION.cmd` on Windows.

## Production build

```powershell
npm run build
```

The production build is a standard Next.js application written to `.next/`. Vercel should detect the Next.js framework automatically; do not configure a custom static output directory.

## Wedding details

- **Bride:** Brinda Yellapu (BHMS)
- **Bride's parents:** Yellapu Devendra Kumar and Priya Darshini
- **Groom:** Dr. Malla Venkata Satya Sai Chaitanya (MBBS, MD)
- **Groom's parents:** Malla Murali and Sujatha
- **Date:** Sunday, 15 November 2026
- **Muhurtham:** 10:14 PM IST
- **Venue:** Pentakota Convention Hall, Near Ring Road, Anakapalle, Andhra Pradesh
