# Per-section photo galleries

Each point-of-interest card in the world can show a **PHOTOS** row that opens a
fullscreen lightbox.

## How to add photos

1. Drop JPEGs into `public/gallery/<section>/`, where `<section>` is the card
   id: `about`, `athletics`, `experience`, `photography`, `bear`, `todoclaw`,
   `chefclaw`, or `contact`. Keep them web-sized (≤ ~2200px on the long edge)
   and stripped of EXIF/GPS (run them through `scripts/posterize.py` like the
   world backdrops, or export without metadata).
2. List the paths in the `galleries` map in `src/content/site.ts`:

   ```ts
   export const galleries: Partial<Record<CardId, string[]>> = {
     photography: ["/gallery/photography/dunes.jpg", "/gallery/photography/ridge.jpg"],
   };
   ```

The order of the array is the order in the thumbnail row and the lightbox.

> Until real photo sets arrive, the galleries are seeded with the existing
> `/world/*.jpg` images so the feature is visible.
