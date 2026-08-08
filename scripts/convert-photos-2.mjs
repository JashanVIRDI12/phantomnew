import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "source-images";
const OUT = "public/services/photos";

const MAP = {
  // white VNL + branded 53' van, mountain highway, daytime — primary dry van hero
  "hf_20260808_132215_048b6792-8581-41e1-b7b0-9225ddc7136e.png": "dry-van-highway.webp",
  // tractor + van at the warehouse dock apron, Phantom trailers on the doors behind
  "hf_20260808_132601_5f52d3a3-3855-495a-a24b-f485edfc7547.png": "dry-van-dock.webp",
  // wet mountain lane in the rain — full-bleed CTA / fleet card
  "hf_20260808_132616_fbf95e96-ef58-4770-8703-c3f1789a4c1c.png": "dry-van-rain.webp",
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
