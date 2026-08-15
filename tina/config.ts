import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_REF_NAME ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "settings",
        label: "Site Settings",
        path: "content/settings",
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "businessName", label: "Business Name", required: true },
          { type: "string", name: "tagline", label: "Tagline / Meta Description",
            description: "Short description used in browser tabs and search results" },
          { type: "string", name: "contactEmail", label: "Contact Email", required: true },
          { type: "string", name: "phone", label: "Phone (optional)" },
          { type: "string", name: "serviceArea", label: "Service Area" },
          {
            type: "object", name: "socials", label: "Social Links",
            fields: [
              { type: "string", name: "facebook", label: "Facebook URL" },
              { type: "string", name: "instagram", label: "Instagram URL" },
              { type: "string", name: "twitter", label: "Twitter/X URL" },
            ],
          },
          { type: "string", name: "footerText", label: "Footer Text",
            description: "e.g. © Courtney Anton Photography 2026" },
        ],
      },
      {
        name: "home",
        label: "Home Page",
        path: "content/pages",
        match: { include: "home" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object", name: "hero", label: "Hero Slides",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.headline || "Untitled slide" }),
            },
            fields: [
              { type: "image", name: "image", label: "Background Image", required: true },
              { type: "string", name: "headline", label: "Headline", required: true },
              { type: "string", name: "subtext", label: "Subtext" },
            ],
          },
          { type: "string", name: "introTitle", label: "Intro Section Title",
            description: "e.g. 'My Story'" },
          { type: "rich-text", name: "introBody", label: "Intro Body" },
          { type: "image", name: "introImage", label: "Intro Section Image (parallax)" },
          {
            type: "object", name: "featuredGalleries", label: "Featured Galleries",
            description: "Up to 3 galleries shown on home page",
            list: true,
            ui: {
              max: 3,
              itemProps: (item) => ({ label: item?.gallery || "Choose gallery" }),
            },
            fields: [
              { type: "reference", name: "gallery", label: "Gallery", collections: ["gallery"] },
            ],
          },
          { type: "string", name: "ctaText", label: "CTA Button Text" },
          { type: "string", name: "ctaHref", label: "CTA Button Link" },
        ],
      },
      {
        name: "about",
        label: "About Page",
        path: "content/pages",
        match: { include: "about" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "image", name: "portrait", label: "Portrait Image" },
          { type: "string", name: "headline", label: "Headline" },
          { type: "rich-text", name: "bio", label: "Bio", required: true },
          { type: "string", name: "quote", label: "Pull Quote (optional)" },
        ],
      },
      {
        name: "contact",
        label: "Contact Page",
        path: "content/pages",
        match: { include: "contact" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "rich-text", name: "intro", label: "Intro" },
          { type: "string", name: "responseTime", label: "Response Time Note",
            description: "e.g. 'I respond within 48 hours'" },
          {
            type: "object", name: "faqs", label: "FAQs",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.question || "New question" }) },
            fields: [
              { type: "string", name: "question", label: "Question", required: true },
              { type: "rich-text", name: "answer", label: "Answer", required: true },
            ],
          },
        ],
      },
      {
        name: "testimonial",
        label: "Testimonials",
        path: "content/testimonials",
        format: "md",
        defaultItem: () => ({ order: 99 }),
        fields: [
          { type: "string", name: "author", label: "Author", required: true,
            isTitle: true },
          { type: "string", name: "quote", label: "Quote", required: true, ui: { component: "textarea" } },
          { type: "number", name: "order", label: "Display Order" },
        ],
      },
      {
        name: "gallery",
        label: "Galleries",
        path: "content/galleries",
        format: "md",
        defaultItem: () => ({ published: true, order: 99 }),
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "string", name: "slug", label: "URL Slug", required: true,
            description: "lowercase-with-dashes, e.g. 'newborn'" },
          { type: "string", name: "tagline", label: "Short Tagline (optional)" },
          { type: "rich-text", name: "description", label: "Description", isBody: true },
          { type: "image", name: "coverImage", label: "Cover Image", required: true },
          { type: "number", name: "order", label: "Display Order" },
          { type: "boolean", name: "published", label: "Published" },
          {
            type: "object", name: "images", label: "Gallery Images",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.alt || item?.image || "Image" }),
            },
            fields: [
              { type: "image", name: "image", label: "Image", required: true },
              { type: "string", name: "alt", label: "Alt Text (describe for accessibility)", required: true },
              { type: "string", name: "caption", label: "Caption (optional)" },
            ],
          },
        ],
      },
      {
        name: "package",
        label: "Packages & Pricing",
        path: "content/packages",
        format: "md",
        defaultItem: () => ({ available: true, order: 99, category: "standard" }),
        fields: [
          { type: "string", name: "name", label: "Package Name", required: true, isTitle: true },
          { type: "string", name: "subtitle", label: "Subtitle (optional)",
            description: "e.g. 'Session & CD'" },
          {
            type: "string", name: "category", label: "Category", required: true,
            options: [
              { value: "standard", label: "Standard Session" },
              { value: "special", label: "Multi-Session Special" },
            ],
          },
          { type: "string", name: "price", label: "Price",
            description: "Free-form text — e.g. '$400' or 'Starting at $400' or 'Contact for pricing'" },
          { type: "string", name: "priceNote", label: "Price Note (optional)",
            description: "e.g. 'per session' or 'basic package'" },
          { type: "string", name: "altPrice", label: "Alternate Price (optional)",
            description: "For multi-session 'Plus' tier" },
          { type: "string", name: "altPriceNote", label: "Alt Price Note (optional)" },
          { type: "rich-text", name: "description", label: "Description" },
          {
            type: "object", name: "included", label: "What's Included",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.text || "Item" }) },
            fields: [
              { type: "string", name: "text", label: "Item", required: true },
            ],
          },
          {
            type: "object", name: "includedAlt", label: "Alt Tier — What's Included (optional)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.text || "Item" }) },
            fields: [
              { type: "string", name: "text", label: "Item", required: true },
            ],
          },
          { type: "image", name: "image", label: "Featured Image (optional)" },
          { type: "number", name: "order", label: "Display Order" },
          { type: "boolean", name: "available", label: "Available / Show on Site" },
        ],
      },
    ],
  },
});
