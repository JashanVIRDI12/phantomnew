import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "public/new-images";
const OUT = "public/services/photos";

const MAP = {
  "hf_20260725_115715_a588cbf8-31a7-4905-a2c6-7dedb04384e2.png": "dry-van-trucking.webp",
  "hf_20260725_131320_f8c390d8-f5e0-42d3-95b1-2f01f589930a.png": "government-secured-cargo.webp",
  "hf_20260725_115913_33cd4c4d-d292-471a-b557-ac1a7817bf51.png": "freight-shipping.webp",
  "hf_20260725_130029_02cb8fb6-e990-44e1-9789-dfd66a15d1cc.png": "ltl-trucking.webp",
  "hf_20260725_121322_7a7fc235-2292-45f1-82ae-c87e02692474.png": "expedited-trucking.webp",
  "hf_20260725_120955_4bf4f50a-c837-4833-9182-0e05d9730686.png": "hotshot-trucking.webp",
  "hf_20260725_121300_2c2bbab2-787b-4fb8-a0cb-4a946d588bb9.png": "long-haul-trucking.webp",
  "hf_20260725_131653_bd6a01f6-2d0e-49d5-9385-bb7a0d2e7e64.png": "freight-transportation.webp",
  "hf_20260725_125306_248d0660-800f-4fd4-9c8e-643878f5e40a.png": "freight-forwarding.webp",
  "hf_20260725_121359_98535ca7-b7dc-42d3-9936-93fd3edbc4be.png": "services-index-hero.webp",
  // spares — converted + available, not yet placed on a specific page
  "hf_20260725_120413_86184ee2-eb2a-47dc-973b-2ac7648ce7e9.png": "spare-winter-mountain.webp",
  "hf_20260725_121041_6d26005b-93b6-4e04-9786-d06575ef6f96.png": "spare-driver-portrait.webp",
  "hf_20260725_125808_a51a6e64-9610-46f1-8565-cb1233da6e7e.png": "spare-warehouse-2.webp",
};

await mkdir(OUT, { recursive: true });

for (const [src, out] of Object.entries(MAP)) {
  const inPath = path.join(SRC, src);
  const outPath = path.join(OUT, out);
  await sharp(inPath)
    .resize({ width: 2200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outPath);
  console.log(`${src} -> ${outPath}`);
}
console.log("done");
