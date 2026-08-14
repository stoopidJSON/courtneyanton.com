import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export async function getSettings() {
  const entry = await getEntry("settings", "site");
  if (!entry) throw new Error("Site settings not found at content/settings/site.json");
  return entry.data;
}

export async function getPage(slug: "home" | "about" | "contact") {
  const entry = await getEntry("pages", slug);
  if (!entry) throw new Error(`Page not found: content/pages/${slug}.json`);
  return entry.data;
}

export async function getPublishedGalleries() {
  const all = await getCollection("galleries", ({ data }) => data.published);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getGalleryBySlug(slug: string) {
  const all = await getCollection("galleries");
  return all.find((g) => g.data.slug === slug);
}

export async function getPackages() {
  const all = await getCollection("packages", ({ data }) => data.available);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getTestimonials() {
  const all = await getCollection("testimonials");
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Resolve a Tina reference path (e.g. "content/galleries/newborn.md") to its loaded entry. */
export async function resolveGalleryReference(refPath: string) {
  const slug = refPath.replace(/^content\/galleries\//, "").replace(/\.md$/, "");
  const all = await getCollection("galleries");
  return all.find((g) => g.id === slug);
}

export type Gallery = CollectionEntry<"galleries">;
export type Package = CollectionEntry<"packages">;
export type Testimonial = CollectionEntry<"testimonials">;
