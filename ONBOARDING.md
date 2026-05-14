# Editing your website — a quick guide for Courtney

Welcome! Your new website is set up so you can keep it up to date yourself, without
having to call Jason or touch any code. This guide walks you through how to do that.

> **Where to log in:** [www.courtneyanton.com/admin](https://www.courtneyanton.com/admin/)
> (Once the new site is live. For now, the admin lives at `http://localhost:4321/admin/index.html` while we're previewing.)

## What you can edit

Everything visible on the public site is editable. From the admin sidebar:

| Section          | What it controls                                                              |
| ---------------- | ----------------------------------------------------------------------------- |
| **Site Settings** | Business name, tagline, contact email, phone, service area, social links     |
| **Home Page**    | Hero photo(s) + headlines, "My Story" section, the three Featured Galleries  |
| **About Page**   | Your portrait, headline, bio, optional pull-quote                            |
| **Contact Page** | Intro text, "I respond within…" note, all FAQ questions and answers           |
| **Testimonials** | Client quotes shown on the home page                                          |
| **Galleries**    | The photo galleries (Newborn, Baby, Child, Maternity, Family, Landscape)     |
| **Packages**     | Pricing tiers — both Standard Sessions and Multi-Session Specials             |

## Common things you'll want to do

### Change a price

1. Sidebar → **Packages** → click the package you want to update (e.g. "Newborn Collection A")
2. Edit the **Price** field (it's free text — write whatever makes sense: `$400`, `Starting at $400`, `Contact for pricing`)
3. Click **Save** in the top-right
4. The site rebuilds automatically — your change will be live in about a minute

### Add a new gallery

1. Sidebar → **Galleries** → **Create New** (top right)
2. Fill in:
   - **Title** — what you want to call it (e.g. "Engagement")
   - **URL Slug** — the URL piece, lowercase with dashes (e.g. `engagement`)
   - **Cover Image** — the photo that represents the gallery on the index page
   - **Display Order** — lower numbers appear first (existing galleries are 1–6)
   - **Published** — leave on
3. Add photos: scroll down to **Gallery Images** → **Add Item** for each photo
   - Click the image picker, drag in your file (or pick one already uploaded)
   - Fill in **Alt Text** describing the photo for accessibility (e.g. "Newborn baby curled up in cream blanket")
4. **Save**. The new gallery now appears at `/galleries/{your-slug}`

### Swap a photo on the home page

1. Sidebar → **Home Page**
2. Under **Hero Slides**, click the slide you want to change
3. Click the **Background Image** picker → upload a new photo or select an existing one
4. **Save**

### Update your bio

1. Sidebar → **About Page**
2. Edit **Bio** in the rich-text editor (bold, italics, paragraphs all work)
3. **Save**

### Add a testimonial

1. Sidebar → **Testimonials** → **Create New**
2. Fill in **Author** and **Quote**, pick a **Display Order** (lower = shown earlier)
3. **Save**

### Hide a package without deleting it

1. Sidebar → **Packages** → click the one to hide
2. Toggle **Available / Show on Site** to off
3. **Save**. It vanishes from the public site but the data is still there if you want to bring it back.

## Photo upload tips

- **Size them down before uploading.** Export from Lightroom (or wherever) at roughly
  **2400 px on the long edge**, sRGB, JPG quality 80–85. That's about 200–500 KB per photo.
  Smaller files = faster site = happier visitors.
- **Always fill in Alt Text** when you upload. It's good for screen readers, good for
  Google, and it's already a field in the editor.
- **Use descriptive filenames** before upload (e.g. `weaver-family-autumn-park.jpg`)
  rather than `IMG_0247.jpg`. Helps you find things later.

## Troubleshooting

### "I saved a change but the public site still shows the old thing"

Wait 60–90 seconds and refresh with cache bypass (`Ctrl+Shift+R` or `Cmd+Shift+R`).
Behind the scenes, your save triggers a rebuild that takes about a minute.

If it's been longer than 3 minutes and still not showing, the rebuild may have failed —
ping Jason and he can check.

### "The admin won't load"

Most often: you got logged out. Click the URL again, log back in.

If that fails:
- Hard-refresh the admin page (`Ctrl+Shift+R`)
- Try a private/incognito window
- If still stuck, ping Jason

### "I accidentally deleted something important"

Don't panic. Every change you make is tracked in version control — Jason can
recover any prior version of any file. Tell him what you deleted and roughly when.

## Logins and accounts you'll have

| Service       | What it does                              | URL                             |
| ------------- | ----------------------------------------- | ------------------------------- |
| Tina CMS      | The admin editor                          | tina.io                         |
| Web3Forms     | Receives contact form submissions         | web3forms.com                   |
| GitHub        | Stores the site code + content (read-only for you) | github.com              |

Jason will hand you logins for each of these.

## Who to call

For anything that's not a content edit (design changes, layout, new features, broken pages):

📬 **Jason** — your contact info goes here.

---

*This guide covers the basics. As you use the admin, you may want me to add new pages,
new content types, or shift how things look. Just tell me — that's a 10-minute change
for me, and the admin will update automatically to match.*
