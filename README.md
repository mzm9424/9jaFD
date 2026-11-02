# NAIJA POT KITCHEN & GRILL LTD — Static Website

Responsive multi-page restaurant website built with HTML, CSS and vanilla JavaScript. It remains static so it can be uploaded directly to Hostinger `public_html` without Next.js, a server runtime or a build step.

## Pages and assets

- `index.html` — Home
- `our-story.html` — Our story
- `menu.html` — Full menu
- `bakery.html` — Bakery
- `specials.html` — Specials
- `contact.html` — Contact
- `style.css`, `pages.css`, `script.js`
- `assets/` — logo and local image assets
- `sitemap.xml`, `robots.txt` — search engine discovery
- `.github/workflows/` — automated checks and optional Hostinger FTP deployment

## SEO included

- Page-specific titles, descriptions and canonical URLs
- Open Graph and Twitter social-sharing metadata
- Restaurant and WebSite JSON-LD structured data on the home page
- XML sitemap and robots.txt

The address, phone number, opening hours and social profiles in structured data use details supplied for this website. Facebook is omitted until its exact page URL is provided. Prices are not represented as confirmed.

## Motion and accessibility

- Homepage hero carousel rotates every 5 seconds.
- Carousel pauses while visitors interact with its controls/navigation and when the browser tab is hidden.
- Scroll reveal and gentle hover effects use CSS and native browser APIs; no external animation library or build dependency is required.
- Animations respect `prefers-reduced-motion`.
- Mobile navigation remains keyboard-operable.

## Preview locally

Open `index.html` in a browser. Google Fonts and sample food photography use external URLs and require an internet connection.

## Publish manually with Hostinger (iPhone-friendly)

1. Download and extract the ZIP.
2. Open Hostinger hPanel → Websites → Manage → File Manager.
3. Open `public_html`.
4. Back up existing website files before replacing them.
5. Upload the contents of this project directly into `public_html` (not the containing project folder).
6. Make sure `index.html`, `sitemap.xml`, `robots.txt`, the other HTML pages, CSS/JS and `assets` are directly inside `public_html`.
7. Visit `https://naijapotkitchengrill.co.uk` and refresh.

No Node.js, Next.js, React or server build is needed for manual upload.

## Optional GitHub Actions deployment

Included workflows:
- `Check static website` validates pages, local references, metadata, JSON-LD, sitemap and JavaScript syntax.
- `Deploy website to Hostinger` runs checks and then uploads the static site over FTP whenever code is pushed to `main`.

To enable automatic deployment:

1. Push this project to a GitHub repository and use the `main` branch.
2. In Hostinger hPanel, locate the FTP account details. Use the exact FTP hostname shown there; do not guess it.
3. In GitHub, open repository → Settings → Secrets and variables → Actions → New repository secret.
4. Add `FTP_SERVER` (Hostinger FTP hostname), `FTP_USERNAME` (FTP username) and `FTP_PASSWORD` (FTP password).
5. Confirm the FTP account destination is the website's `public_html` directory. The workflow currently deploys to `/public_html/`; adjust `server-dir` if Hostinger shows a different FTP root.
6. Push a small change to `main` or run the workflow manually from Actions.

Keep FTP credentials in GitHub Secrets only. Never put them in website files or the repository.

## Before going live

- Confirm menu items, final prices, availability and delivery details.
- Confirm social media URLs and business contact details.
- Test WhatsApp and telephone links on a phone.
- Submit `https://naijapotkitchengrill.co.uk/sitemap.xml` in Google Search Console after the site is live.
- Check structured data with Google's Rich Results Test or Schema Markup Validator.

## Important

This is a frontend website. WhatsApp links open a chat; they do not take payment, store orders, calculate delivery or confirm bookings. Search engines decide when and how to display rich results; structured data does not guarantee a rich result.
