"""Turn captures in tools/.cache/captures into responsive WebP + AVIF files.

Desktop captures -> 800w and 1440w. Mobile captures -> 400w and 780w.
Usage: python3 tools/optimize-images.py
"""
from pathlib import Path
from PIL import Image

SRC = Path("tools/.cache/captures")
OUT = Path("public/images/projects")
OUT.mkdir(parents=True, exist_ok=True)
WIDTHS = {"desktop": (800, 1440), "mobile": (400, 780)}
MAX_RATIO = {"desktop": 2.4, "mobile": 4.2}  # cap very tall pages

for png in sorted(SRC.glob("*.png")):
    slug, variant = png.stem.rsplit("-", 1)
    im = Image.open(png).convert("RGB")
    w, h = im.size
    im = im.crop((0, 0, w, min(h, int(w * MAX_RATIO[variant]))))
    for tw in WIDTHS[variant]:
        th = round(im.height * tw / im.width)
        r = im.resize((tw, th), Image.LANCZOS)
        r.save(OUT / f"{slug}-{variant}-{tw}.webp", "WEBP", quality=78, method=6)
        r.save(OUT / f"{slug}-{variant}-{tw}.avif", "AVIF", quality=55)
        print(slug, variant, tw, th)

# Write intrinsic sizes so the build can set width/height (prevents layout shift).
import json
manifest = {}
for f in sorted(OUT.glob("*.webp")):
    with Image.open(f) as im:
        manifest[f.name] = list(im.size)
(OUT / "manifest.json").write_text(json.dumps(manifest, indent=2))
print("manifest", len(manifest))
