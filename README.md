# 📁 Packs website

A website to download my Minecraft texture packs. It replaces the unprofessional mediafire links!

## 🎓 Adding a texture pack

Every pack on the site is defined by two things: a **folder** containing the pack's files, and a **`pack.json`** file that tells the site what to display. Packs are placed in a `packs/` folder (referenced from the site's homepage and detail pages), while the images, screenshots, and download files themselves are stored in the site's file storage and served to visitors from its resources domain.

### 🗃️ Create the folder structure

Give your pack a **folder name** (letters, numbers and dashes, no spaces) and set it up like one of the two layouts below.

**A simple pack** (one file set, no variants):

```
<folder>/
├── pack.json
├── images/
│   └── thumbnail.webp         <- the card image shown on the homepage
├── images/screenshots/        <- screenshots .webp / .mp4 shown on the pack page
└── downloads/
    ├── java-1.8/              <- put the actual pack file here
    ├── java-1.18/             <- put the actual pack file here
    └── bedrock/               <- put the actual pack file here
```

**A pack bundle** (one page with switchable variants):

```
<folder>/
├── pack.json                   <- bundle-level info
├── images/
│   └── thumbnail.webp
└── packs/
    └── <variant>/
        ├── pack.json          <- variant-level info
        ├── screenshots/       <- this variant's screenshots
        └── downloads/
            ├── java-1.8/
            ├── java-1.18/
            └── bedrock/
```

The `downloads/<version>/` folders are the important part: each one should contain **exactly one** pack file. The version folder names tell the site which platforms to offer, so only create the folders you actually support.

### 📝 Write the `pack.json`

Each pack (and each variant) needs its own `pack.json`. Fill in these fields:

| Field | What it's for |
|---|---|
| `name` | The pack's display name, as shown on its card and page. |
| `downloads` | Start at `0`. The site adds to this automatically whenever someone downloads the pack. |
| `videoId` | The ID of the pack's showcase YouTube video (the part after `watch?v=`). |
| `releaseDate` | The release date as a Unix timestamp (seconds). Used for the "Newest"/"Oldest" sorting. |
| `type` | `0` for a simple pack, `1` for a pack bundle that has variants. |
| `authors` | Who made the pack: each entry has a `name`, an `avatar` image, and a `youtube` link. |
| `data` | Filterable properties like `resolution` and `version` (each an array of values). These power the filters on the homepage and can include a `colour` value that tints the variant buttons. |
| `tags` | Labels shown on the pack page, e.g. the game modes it's for (each has a `title`, a `type`, and a `colour`). |

### 🏞️ Add your thumbnail and screenshots

Upload an optimized **`thumbnail.webp`** inside `images/` — this is the picture on the pack's card. Then add **`.webp` or `.mp4`** screenshots to the screenshots folder for the pack (or for each variant, for bundles). These appear in the image carousel on the pack's detail page.

### 📤 Publish

Once the folders, files, and `pack.json` are in place and the resource files are uploaded to the site's storage, the pack appears automatically.