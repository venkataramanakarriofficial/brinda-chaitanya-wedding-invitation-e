# Brinda & Chaitanya — A Wedding in Bloom

A premium, mobile-friendly Next.js floral wedding invitation, rebuilt using the two supplied watercolor designs and the supplied 15-second reference video.

## Start locally

```bash
npm install
npm run dev
```

Open http://localhost:3002. For production, run `npm run build` and deploy the project root to Vercel with the Next.js preset. It is not a plain HTML site; the build needs Node.js.

## What has changed

- Entirely redesigned: blush-pink flowers, watercolor ivory-and-gold arches, sage-green typography, editorial wedding stationery layout.
- Opening animation is taken from the **first ~10 seconds** of the supplied video and optimized for the web. There is a visible skip control and replay option; it is muted by default in line with browser autoplay policies.
- Responsive hero, family introduction, ceremony details, live countdown, maps directions, calendar download, music control, and sharing.
- Original family and wedding details preserved, including the **10:14 PM IST muhurtham**.
- No automatic scrolling or mandatory sound playback; works with reduced-motion preferences.

## Important video inconsistency

The supplied reference movie includes **6:00 PM** text at its ending, but the original invitation project states the wedding's auspicious muhurtham is **10:14 PM IST**, 15 November 2026. To avoid displaying incorrect or conflicting times, the site uses only the early portion of that movie, before the inconsistent time appears. If 6:00 PM is intended to be a separate event, add it explicitly after confirming its meaning.

## Wedding content

- Bride: **Brinda Yellapu**, BHMS; parents: Yellapu Devendra Kumar and Priya Darshini.
- Groom: **Chaitanya**, MBBS, MD; parents: Malla Murali and Sujatha.
- Wedding: **Sunday, 15 November 2026, 10:14 PM IST**.
- Venue: **Pentakota Convention Hall, Near Ring Road, Anakapalle, Andhra Pradesh**.

All media is inside `public/assets/`. This site does not use a database, analytics, or any back-end API.
