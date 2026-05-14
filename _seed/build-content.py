#!/usr/bin/env python3
"""Convert _seed/content.json into Tina-compatible content files."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SEED = json.loads((ROOT / "_seed" / "content.json").read_text())


def slugify(s: str) -> str:
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s


def rich_text(prose: str) -> dict:
    """Wrap plain prose in a TinaMarkdown root-AST structure (paragraphs split on blank lines)."""
    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", prose) if p.strip()] if prose else []
    if not paragraphs:
        paragraphs = [prose.strip()] if prose else [""]
    return {
        "type": "root",
        "children": [
            {"type": "p", "children": [{"type": "text", "text": p}]}
            for p in paragraphs
        ],
    }


def write_json(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")


def yaml_dump(obj, indent=0):
    """Minimal YAML serializer for our use case (strings, numbers, bools, None, lists, dicts)."""
    pad = "  " * indent
    if obj is None:
        return "null"
    if isinstance(obj, bool):
        return "true" if obj else "false"
    if isinstance(obj, (int, float)):
        return str(obj)
    if isinstance(obj, str):
        # Always quote strings to avoid edge cases (colons, brackets, special chars)
        escaped = obj.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
        return f'"{escaped}"'
    if isinstance(obj, list):
        if not obj:
            return "[]"
        lines = []
        for item in obj:
            if isinstance(item, dict):
                first = True
                for k, v in item.items():
                    prefix = f"{pad}- " if first else f"{pad}  "
                    first = False
                    if isinstance(v, (dict, list)):
                        lines.append(f"{prefix}{k}:")
                        lines.append(yaml_dump(v, indent + 2))
                    else:
                        lines.append(f"{prefix}{k}: {yaml_dump(v)}")
            else:
                lines.append(f"{pad}- {yaml_dump(item)}")
        return "\n".join(lines)
    if isinstance(obj, dict):
        lines = []
        for k, v in obj.items():
            if isinstance(v, (dict, list)):
                if isinstance(v, list) and not v:
                    lines.append(f"{pad}{k}: []")
                elif isinstance(v, dict) and not v:
                    lines.append(f"{pad}{k}: {{}}")
                else:
                    lines.append(f"{pad}{k}:")
                    lines.append(yaml_dump(v, indent + 1))
            else:
                lines.append(f"{pad}{k}: {yaml_dump(v)}")
        return "\n".join(lines)
    raise TypeError(f"Unsupported type: {type(obj)}")


def write_md(path: Path, frontmatter: dict, body: str = "") -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fm_yaml = yaml_dump(frontmatter)
    content = f"---\n{fm_yaml}\n---\n\n{body}\n"
    path.write_text(content)


# ---- Site settings ----
site = SEED["site"]
write_json(ROOT / "content" / "settings" / "site.json", {
    "businessName": site["businessName"],
    "tagline": site["tagline"],
    "contactEmail": site["contactEmail"],
    "phone": site.get("phone"),
    "serviceArea": site["serviceArea"],
    "socials": {
        "facebook": site["socials"]["facebook"],
        "instagram": site["socials"]["instagram"],
        "twitter": site["socials"]["twitter"],
    },
    "footerText": f"© Courtney Anton Photography {site['copyrightYear']}",
})


# ---- Home page ----
home = SEED["hero"]
def hero_path(filename):
    # e.g. courtneyanton/WeaverFamily40.jpg -> /uploads/hero/WeaverFamily40.jpg
    bn = filename.rsplit("/", 1)[-1]
    return f"/uploads/hero/{bn}"

write_json(ROOT / "content" / "pages" / "home.json", {
    "hero": [
        {"image": hero_path(s["image"]), "headline": s["headline"], "subtext": s["subtext"]}
        for s in home["slides"]
    ],
    "introTitle": SEED["about"]["title"],
    "introBody": rich_text(SEED["about"]["body"]),
    "introImage": f"/uploads/about/{SEED['about']['parallaxImage'].rsplit('/', 1)[-1]}",
    "featuredGalleries": [
        {"gallery": "content/galleries/newborn.md"},
        {"gallery": "content/galleries/family.md"},
        {"gallery": "content/galleries/maternity.md"},
    ],
    "ctaText": "View packages",
    "ctaHref": "/packages",
})


# ---- About page (initial = same bio; later can be enriched) ----
write_json(ROOT / "content" / "pages" / "about.json", {
    "portrait": None,
    "headline": SEED["about"]["title"],
    "bio": rich_text(SEED["about"]["body"]),
    "quote": None,
})


# ---- Contact page ----
contact = SEED["contact"]
write_json(ROOT / "content" / "pages" / "contact.json", {
    "intro": rich_text(contact["intro"]),
    "responseTime": "I'll get back to you as soon as possible.",
    "faqs": [
        {"question": f["question"], "answer": rich_text(f["answer"])}
        for f in SEED["faqs"]
    ],
})


# ---- Testimonials ----
for i, t in enumerate(SEED["testimonials"]):
    slug = slugify(t["author"])
    write_md(
        ROOT / "content" / "testimonials" / f"{slug}.md",
        {"author": t["author"], "quote": t["quote"], "order": i + 1},
    )


# ---- Galleries ----
for g in SEED["galleries"]:
    slug = g["slug"]
    cat_dir = ROOT / "public" / "uploads" / "galleries" / slug
    image_files = sorted([f for f in cat_dir.iterdir() if f.suffix.lower() in (".jpg", ".jpeg", ".png")]) if cat_dir.exists() else []
    if not image_files:
        print(f"WARNING: no images for {slug}")
        cover = ""
        images_list = []
    else:
        cover = f"/uploads/galleries/{slug}/{image_files[0].name}"
        images_list = [
            {
                "image": f"/uploads/galleries/{slug}/{f.name}",
                "alt": f"{g['title']} session — {f.stem}",
                "caption": "",
            }
            for f in image_files
        ]
    write_md(
        ROOT / "content" / "galleries" / f"{slug}.md",
        {
            "title": g["title"],
            "slug": slug,
            "tagline": g.get("tagline"),
            "coverImage": cover,
            "order": g["order"],
            "published": True,
            "images": images_list,
        },
        body=g["description"],
    )


# ---- Packages ----
packages = SEED["packages"]
order = 0
for p in packages["standard"]:
    order += 1
    write_md(
        ROOT / "content" / "packages" / f"{slugify(p['name'])}.md",
        {
            "name": p["name"],
            "subtitle": p["subtitle"],
            "category": "standard",
            "price": p["price"],
            "priceNote": None,
            "altPrice": None,
            "altPriceNote": None,
            "included": [{"text": i} for i in p["included"]],
            "includedAlt": [],
            "order": order,
            "available": True,
        },
    )

for p in packages["specials"]:
    order += 1
    write_md(
        ROOT / "content" / "packages" / f"{slugify(p['name'])}.md",
        {
            "name": p["name"],
            "subtitle": p["description"],
            "category": "special",
            "price": p["basicPrice"],
            "priceNote": "Basic Package",
            "altPrice": p["plusPrice"],
            "altPriceNote": "Plus Package",
            "included": [{"text": i} for i in p["includedBasic"]],
            "includedAlt": [{"text": i} for i in p["includedPlus"]],
            "order": order,
            "available": True,
        },
    )

print("Done.")
print("  Site settings: 1")
print("  Singletons: home, about, contact")
print(f"  Testimonials: {len(SEED['testimonials'])}")
print(f"  Galleries: {len(SEED['galleries'])}")
print(f"  Packages: {len(packages['standard']) + len(packages['specials'])}")
