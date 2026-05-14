import { defineCollection, z, reference } from "astro:content";
import { glob, file } from "astro/loaders";

const richText = z.object({
  type: z.literal("root"),
  children: z.array(z.any()),
});

const settings = defineCollection({
  loader: file("content/settings/site.json", {
    parser: (text) => [{ id: "site", ...JSON.parse(text) }],
  }),
  schema: z.object({
    businessName: z.string(),
    tagline: z.string().nullable().optional(),
    contactEmail: z.string(),
    phone: z.string().nullable().optional(),
    serviceArea: z.string().nullable().optional(),
    socials: z.object({
      facebook: z.string().nullable().optional(),
      instagram: z.string().nullable().optional(),
      twitter: z.string().nullable().optional(),
    }),
    footerText: z.string().nullable().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "*.json", base: "content/pages" }),
  schema: z.object({
    hero: z.array(z.object({
      image: z.string(),
      headline: z.string(),
      subtext: z.string().nullable().optional(),
    })).optional(),
    introTitle: z.string().nullable().optional(),
    introBody: richText.optional(),
    introImage: z.string().nullable().optional(),
    featuredGalleries: z.array(z.object({
      gallery: z.string(),
    })).optional(),
    ctaText: z.string().nullable().optional(),
    ctaHref: z.string().nullable().optional(),
    portrait: z.string().nullable().optional(),
    headline: z.string().nullable().optional(),
    bio: richText.optional(),
    quote: z.string().nullable().optional(),
    intro: richText.optional(),
    responseTime: z.string().nullable().optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: richText,
    })).optional(),
  }),
});

const galleries = defineCollection({
  loader: glob({ pattern: "*.md", base: "content/galleries" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    tagline: z.string().nullable().optional(),
    coverImage: z.string(),
    order: z.number().default(99),
    published: z.boolean().default(true),
    images: z.array(z.object({
      image: z.string(),
      alt: z.string(),
      caption: z.string().nullable().optional(),
    })).default([]),
  }),
});

const packages = defineCollection({
  loader: glob({ pattern: "*.md", base: "content/packages" }),
  schema: z.object({
    name: z.string(),
    subtitle: z.string().nullable().optional(),
    category: z.enum(["standard", "special"]),
    price: z.string(),
    priceNote: z.string().nullable().optional(),
    altPrice: z.string().nullable().optional(),
    altPriceNote: z.string().nullable().optional(),
    included: z.array(z.object({ text: z.string() })).default([]),
    includedAlt: z.array(z.object({ text: z.string() })).default([]),
    image: z.string().nullable().optional(),
    order: z.number().default(99),
    available: z.boolean().default(true),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "*.md", base: "content/testimonials" }),
  schema: z.object({
    author: z.string(),
    quote: z.string(),
    order: z.number().default(99),
  }),
});

export const collections = { settings, pages, galleries, packages, testimonials };
