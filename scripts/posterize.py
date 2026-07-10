#!/usr/bin/env python3
"""Stylize an original photograph into the site's flat-color poster art.

The world is drawn from Braeden's photos; this is the pipeline that does it.
Originals live in the gitignored content-src/ directory and never enter git —
outputs are EXIF-free by construction (Pillow drops metadata unless asked).

Usage:
  python3 scripts/posterize.py IN.jpg OUT.jpg [--width 900] [--colors 16]
                               [--bright 1.0] [--quality 58]

Recipe (validated across 12 design mocks):
  resize -> saturation/contrast lift -> ModeFilter + MedianFilter (flat paint
  regions) -> k-means palette quantization with dithering OFF (crisp
  silk-screen patches; dithering causes speckle) -> light despeckle.
Night photos usually want --bright 1.1..1.4 and fewer colors (12-14).
"""
import argparse
from PIL import Image, ImageEnhance, ImageFilter


def posterize(src: str, dst: str, width: int, colors: int, bright: float, quality: int) -> None:
    img = Image.open(src).convert("RGB")
    img.thumbnail((width, width * 2), Image.LANCZOS)
    if bright != 1.0:
        img = ImageEnhance.Brightness(img).enhance(bright)
    img = ImageEnhance.Color(img).enhance(1.25)
    img = ImageEnhance.Contrast(img).enhance(1.04)
    img = img.filter(ImageFilter.ModeFilter(5))
    img = img.filter(ImageFilter.MedianFilter(3))
    img = img.quantize(colors=colors, kmeans=colors, dither=Image.Dither.NONE).convert("RGB")
    img.save(dst, quality=quality)
    print(f"{dst}  {img.size[0]}x{img.size[1]}  colors={colors}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("src")
    ap.add_argument("dst")
    ap.add_argument("--width", type=int, default=900)
    ap.add_argument("--colors", type=int, default=16)
    ap.add_argument("--bright", type=float, default=1.0)
    ap.add_argument("--quality", type=int, default=58)
    a = ap.parse_args()
    posterize(a.src, a.dst, a.width, a.colors, a.bright, a.quality)
