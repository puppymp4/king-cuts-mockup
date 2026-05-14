import sharp from "sharp";
import { existsSync, statSync } from "node:fs";

const jobs = [
  // Brand mark — the Booksy-sourced full logo (gold King + chrome CUTS + crown + tools)
  { in: "source-images/logo-booksy.jpeg", out: "images/logo.webp",        w:  900, q: 88 },
  { in: "source-images/logo-booksy.jpeg", out: "images/logo-sm.webp",     w:  400, q: 86 },
  // Hero image slot (Rift to drop a barber/cut photo here later)
  // { in: "source-images/hero.jpg",     out: "images/hero.webp",        w: 2400, q: 78 },
  // { in: "source-images/hero.jpg",     out: "images/hero-sm.webp",     w: 1200, q: 76 },
  // Gallery photo slots (Rift to drop in later — cut-1.jpg through cut-6.jpg)
  // { in: "source-images/cut-1.jpg",    out: "images/cut-1.webp",       w: 1200, q: 80 },
  // { in: "source-images/cut-2.jpg",    out: "images/cut-2.webp",       w: 1200, q: 80 },
  // { in: "source-images/cut-3.jpg",    out: "images/cut-3.webp",       w: 1200, q: 80 },
  // { in: "source-images/cut-4.jpg",    out: "images/cut-4.webp",       w: 1200, q: 80 },
  // { in: "source-images/cut-5.jpg",    out: "images/cut-5.webp",       w: 1200, q: 80 },
  // { in: "source-images/cut-6.jpg",    out: "images/cut-6.webp",       w: 1200, q: 80 },
];

for (const j of jobs) {
  if (!existsSync(j.in)) {
    console.log(`skip ${j.in.padEnd(34)} (source missing)`);
    continue;
  }
  await sharp(j.in).resize({ width: j.w, withoutEnlargement: true }).webp({ quality: j.q }).toFile(j.out);
  const before = statSync(j.in).size;
  const after  = statSync(j.out).size;
  console.log(`${j.out.padEnd(34)} ${(before/1024).toFixed(0).padStart(5)} KB -> ${(after/1024).toFixed(0).padStart(5)} KB (${Math.round((1 - after/before) * 100)}% smaller)`);
}
