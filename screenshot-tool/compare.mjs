// Compare a new capture with the current docs image.
// Returns { changed, reason, diffPct }. Small differences (anti-aliasing, a few pixels)
// don't count; a different size or more than CHANGE_THRESHOLD of pixels does.
import fs from 'node:fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

export const CHANGE_THRESHOLD = 0.005; // 0.5% of pixels

export function compareImages(oldFile, newFile) {
  if (!fs.existsSync(oldFile)) return { changed: true, reason: 'no current image', diffPct: null };
  let a, b;
  try {
    a = PNG.sync.read(fs.readFileSync(oldFile));
    b = PNG.sync.read(fs.readFileSync(newFile));
  } catch {
    return { changed: true, reason: 'could not compare', diffPct: null };
  }
  if (a.width !== b.width || a.height !== b.height) {
    return { changed: true, reason: `size ${a.width}×${a.height} → ${b.width}×${b.height}`, diffPct: null };
  }
  const diff = pixelmatch(a.data, b.data, null, a.width, a.height, { threshold: 0.1 });
  const diffPct = diff / (a.width * a.height);
  return diffPct > CHANGE_THRESHOLD
    ? { changed: true, reason: `${(diffPct * 100).toFixed(1)}% of pixels differ`, diffPct }
    : { changed: false, reason: 'no visible change', diffPct };
}
