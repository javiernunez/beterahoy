/**
 * Genera logo de cabecera y favicons a partir de assets/logo-source.png.
 * Uso: node scripts/generate-brand-assets.mjs [ruta-logo-origen]
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const defaultSource = path.join(root, "assets", "logo-source.png");
const source = process.argv[2] ?? defaultSource;

const brandingDir = path.join(root, "public", "branding");
const iconsDir = path.join(root, "public", "icons");

/** Fondo del favicon (crema del sitio, coherente con cabecera). */
const FAVICON_BG = "#f4faf5";

/** Proporción aproximada del icono castillo respecto al logo horizontal recortado. */
const CASTLE_WIDTH_RATIO = 0.42;

const FAVICON_SIZES = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512];

const LOGO_HEIGHT = 120;

async function trimLogoBuffer(input) {
  return sharp(input).trim({ threshold: 12 }).png({ compressionLevel: 9 }).toBuffer();
}

/**
 * Convierte fondos claros (blanco / crema del JPEG) en transparencia para la cabecera.
 */
async function removeLightBackground(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = data;
  const { width, height } = info;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const creamish = Math.abs(r - 244) + Math.abs(g - 250) + Math.abs(b - 245) < 36;
      if (min >= 232 || (max - min < 18 && min >= 220) || creamish) {
        pixels[i + 3] = 0;
      }
    }
  }

  return sharp(Buffer.from(pixels), {
    raw: { width, height, channels: 4 },
  })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function extractCastleIcon(trimmedBuffer) {
  const meta = await sharp(trimmedBuffer).metadata();
  const castleWidth = Math.min(meta.width, Math.round(meta.width * CASTLE_WIDTH_RATIO));

  const castle = await sharp(trimmedBuffer)
    .extract({ left: 0, top: 0, width: castleWidth, height: meta.height })
    .trim({ threshold: 12 })
    .png()
    .toBuffer();

  const castleMeta = await sharp(castle).metadata();
  const side = Math.max(castleMeta.width, castleMeta.height);
  const left = Math.floor((side - castleMeta.width) / 2);
  const top = Math.floor((side - castleMeta.height) / 2);

  return sharp({
    create: {
      width: side,
      height: side,
      channels: 4,
      background: FAVICON_BG,
    },
  })
    .composite([{ input: castle, left, top }])
    .png()
    .toBuffer();
}

async function writeLogo(trimmedBuffer) {
  const transparent = await removeLightBackground(trimmedBuffer);
  const meta = await sharp(transparent).metadata();
  const logoWidth = Math.round((meta.width / meta.height) * LOGO_HEIGHT);

  await sharp(transparent)
    .resize(logoWidth, LOGO_HEIGHT, { fit: "inside", withoutEnlargement: false })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(brandingDir, "logo-beterahoy.png"));

  return { logoWidth, logoHeight: LOGO_HEIGHT };
}

async function writeFavicons(iconBuffer) {
  await writeFile(path.join(brandingDir, "favicon.svg"), await buildFaviconSvg(iconBuffer));

  const pngBySize = {};
  for (const size of FAVICON_SIZES) {
    const out = path.join(iconsDir, `favicon-${size}x${size}.png`);
    await sharp(iconBuffer)
      .resize(size, size, { fit: "contain", background: FAVICON_BG })
      .png({ compressionLevel: 9 })
      .toFile(out);
    pngBySize[size] = out;
  }

  await sharp(iconBuffer).resize(512, 512).png().toFile(path.join(root, "app", "icon.png"));
  await sharp(iconBuffer).resize(180, 180).png().toFile(path.join(root, "app", "apple-icon.png"));

  const icoSizes = [16, 32, 48];
  const icoImages = await Promise.all(
    icoSizes.map(async (size) => ({
      size,
      buffer: await sharp(iconBuffer).resize(size, size).png().toBuffer(),
    })),
  );

  for (const target of [path.join(root, "public", "favicon.ico"), path.join(root, "app", "favicon.ico")]) {
    await writeIco(target, icoImages);
  }

  return pngBySize;
}

/** SVG embebido para referencia (p. ej. PWA); generado desde el castillo rasterizado. */
async function buildFaviconSvg(iconBuffer) {
  const pngBase64 = (await sharp(iconBuffer).resize(128, 128).png({ compressionLevel: 9 }).toBuffer()).toString("base64");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="beterahoy">
  <rect width="128" height="128" fill="${FAVICON_BG}"/>
  <image href="data:image/png;base64,${pngBase64}" width="128" height="128"/>
</svg>`;
}

/** ICO con varias resoluciones (formato Windows estándar). */
async function writeIco(filePath, images) {
  const count = images.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];

  for (const { size, buffer } of images) {
    entries.push({ size, buffer, offset });
    offset += buffer.length;
  }

  const totalSize = offset;
  const out = Buffer.alloc(totalSize);
  let pos = 0;

  out.writeUInt16LE(0, pos);
  pos += 2;
  out.writeUInt16LE(1, pos);
  pos += 2;
  out.writeUInt16LE(count, pos);
  pos += 2;

  for (const { size, buffer, offset: entryOffset } of entries) {
    const dim = size >= 256 ? 0 : size;
    out.writeUInt8(dim, pos);
    pos += 1;
    out.writeUInt8(dim, pos);
    pos += 1;
    out.writeUInt8(0, pos);
    pos += 1;
    out.writeUInt8(0, pos);
    pos += 1;
    out.writeUInt16LE(1, pos);
    pos += 2;
    out.writeUInt16LE(32, pos);
    pos += 2;
    out.writeUInt32LE(buffer.length, pos);
    pos += 4;
    out.writeUInt32LE(entryOffset, pos);
    pos += 4;
  }

  for (const { buffer } of entries) {
    buffer.copy(out, pos);
    pos += buffer.length;
  }

  await writeFile(filePath, out);
}

async function main() {
  await mkdir(brandingDir, { recursive: true });
  await mkdir(iconsDir, { recursive: true });

  const trimmed = await trimLogoBuffer(source);
  const iconBuffer = await extractCastleIcon(trimmed);
  const { logoWidth, logoHeight } = await writeLogo(trimmed);
  await writeFavicons(iconBuffer);

  console.log(JSON.stringify({ ok: true, logoWidth, logoHeight, source }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
