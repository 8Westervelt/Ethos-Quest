# EthosQuest website: hand-off

Prepared by 8westervelt for the EthosQuest web team, October 26, 2026.

## The short version

- **The design is a working website, not a Canva or Figma file.** Every page, at desktop and mobile width, is live at
  https://8westervelt.github.io/Ethos-Quest/. Resize the browser or open it on a phone to see the mobile layouts.
- **Two ways to bring it into your Astro codebase,** described under "Integrating" below:
  - Reuse our components directly. They are React and Tailwind, which Astro supports.
  - Rebuild the pages in Astro from the live layouts.
- **Your onboarding, payment and API pages are untouched.** This covers the public marketing pages only.
- **The inquiry form already works with your backend.** It posts to your existing `POST /api/inquiries` endpoint with the
  same JSON and the same Turnstile site key as today's form.
- **Every current public URL is kept** (`/`, `/approach`, `/for-leaders`, `/about`, `/faq`, `/private-inquiry`, `/privacy`),
  so no redirects are needed.

## What's in the package

| Folder | What it is |
|---|---|
| `source/` | The source code. Each page and section is a React component styled with Tailwind CSS 4, in `source/app/ethos/`. The page text is kept in plain data files, listed under "Where things live". To keep the download small, its media is in `assets/media`; copy that to `source/public/media` before running it. Also public at https://github.com/8Westervelt/Ethos-Quest. |
| `assets/` | All photos, video and brand files, with `MEDIA-CREDITS.md`. |
| `site/` | The finished pages as plain HTML, built for the root of www.ethosquest.com. Useful as a reference or as a drop-in (option C below). |
| `HANDOFF.md` | This guide. |

## Integrating

**A. Reuse the components (least work, closest to the design).**
Astro renders React components through `@astrojs/react`, and our styling is Tailwind CSS 4.

1. Add React (`npx astro add react`) and Tailwind 4 to the Astro project, plus `framer-motion` and `lucide-react`,
   which the components use for animation and icons.
2. Copy `source/app/ethos/` into the project (for example `src/ethos/`), and the media into `public/media/`.
3. In your shared layout:
   - import `source/app/globals.css` and `ethos/EthosStyles.css`, and the Google Fonts link from `source/app/layout.tsx`
   - render `<EthosNav client:load />` at the top and `<EthosFloatingCta client:load />` at the end of the body
   This is everything `EthosRoot.tsx` does in our version.
4. In each `.astro` page, render the matching page component with `client:load`. The table below lists the components.
   For example, `src/pages/about.astro` renders `<EthosAboutPage client:load />`. Each page component includes its own footer.
5. Replace the two Next.js-specific pieces:
   - `usePathname` from `next/navigation`, used in `EthosNav.tsx` and `EthosFloatingCta.tsx`. Pass the path in as a prop instead, from `Astro.url.pathname` in the layout.
   - `EthosPath.ts`, which reads a Next.js build variable. Reduce it to
     `export const withBase = (path: string) => path; export const ethosPreview = false;`.
     `ethosPreview = false` hides our preview-only photo pickers and sends inquiries to your endpoint.

| URL | Component |
|---|---|
| `/` | `EthosHomePage` |
| `/approach` | `EthosApproachPage` |
| `/for-leaders` | `EthosLeadersPage` |
| `/who-we-serve/<slug>` | `EthosAudiencePage` (one per entry in `EthosAudiences.ts`) |
| `/coaches` | `EthosCoachesPage` |
| `/coaches/<slug>` | `EthosCoachPage` (one per entry in `EthosCoaches.ts`) |
| `/team` | `EthosTeamPage` |
| `/about` | `EthosAboutPage` |
| `/faq` | `EthosFaqPage` |
| `/private-inquiry` | `EthosInquiryPage` |
| `/privacy` | `EthosPrivacyPage` |

Each route's page title and description are in `source/app/<route>/page.tsx`.

**B. Rebuild in Astro.** Use the live preview as the design, and copy the copy, colors and spacing from it and from the
components. The colors and fonts are listed under "What changed".

**C. Drop in the built pages.** `site/` contains each page as a folder with an `index.html` (for example `about/index.html`
serves `/about`), plus `_next/`, `media/` and the brand files. To use it, remove **only** the matching `.astro` pages
(`index`, `about`, `approach`, `for-leaders`, `faq`, `private-inquiry`, `privacy`). Keep your onboarding, payment and `api/`
routes. Then copy the contents of `site/` into `public/`, and build and deploy as usual. Two things to know:
- `site/` includes its own `404.html` and `_headers` (long-term caching for `/_next/static/`). Merge those with yours.
- Fonts (Cinzel and Raleway) load from Google Fonts, as they do today.

## The inquiry form

The form sends the same request as your current form:

```
POST /api/inquiries
content-type: application/json

{ "first_name", "last_name", "email", "role", "source", "message", "turnstile_token" }
```

- **`source`** is one of `""`, `referral`, `partner`, `event`, `website` or `other`, the same values as today.
- **Coach requests:** each coach's page links to `/private-inquiry?coach=<name>`. Because your endpoint has no coach field,
  the form puts "Requested coach: Name" at the top of `message` instead. Nothing on the API needs to change.
- **Turnstile:** site key `0x4AAAAAAEFYtQqpI_IkI1Cy`, the one on your current form. It only works on hostnames listed for that
  key in Cloudflare, so add your staging hostname there before testing on staging.
- **Responses:** success is `201 { ok: true, requestId }`. Errors show a message and an "Email hello@ethosquest.com" link,
  matching the error codes your endpoint returns today (`invalid_request`, `verification_failed`, rate limits, server errors).

## Testing before release

1. Open each page in the menu, plus the Who We Serve pages linked from the home page and each coach and team profile.
2. Send one inquiry from `/private-inquiry` and one from a coach page ("Request a Discovery Call with ..."). Confirm both arrive
   the way inquiries arrive today, and that the coach one starts with "Requested coach:".
3. Check one page on a phone.

## What changed

The whole site has a new design, plus new pages.

**New design.** Ivory background, navy text and a deep berry red accent. Fonts are the same as today (Cinzel headings, Raleway text).

| Color | Hex |
|---|---|
| Ivory background | `#F7F4EE` |
| Sand sections | `#EEE8DC` |
| Navy text and dark bands | `#132040` |
| Berry red accent | `#9E1B34` (hover `#7F1529`) |
| Rose, on dark backgrounds | `#E4A3AE` |

**Pages**

| Page | Status |
|---|---|
| Home `/` | Rewritten: city hero film, the methodology, who we serve, the business case, coaches |
| The Methodology `/approach` | Rewritten around the EthosQuest methodology |
| For Leaders `/for-leaders` | Rewritten for CEOs |
| Who We Serve `/who-we-serve/...` | **New:** five pages, one per client segment (Founders and CEOs, Private Equity-Backed CEOs, Family Enterprise Leaders, Entrepreneurs & Investors, Public Company CEOs) |
| Our Coaches `/coaches` | **New:** four coaches, each with a profile page and their own discovery-call link |
| Our Team `/team` | **New:** leadership, board and advisors, with profiles that open in place |
| About `/about` | Rewritten around Bassel Hamwi's background |
| FAQ `/faq` | Rewritten as a question-and-answer list |
| Private Inquiry `/private-inquiry` | Redesigned; same fields and same backend |
| Privacy Policy `/privacy` | New design; **the policy text is your current policy, unchanged** |

## Navigation and interactions

**Navigation**
- **Desktop menu:** Home, The Methodology (`/approach`, renamed from "Our Approach"), For Leaders, **Our Coaches (new)**,
  **Our Team (new)**, About and FAQ, with a "Begin Inquiry" button on the right. The current page is marked with a small dot.
- **Mobile:** the menu collapses behind a menu button and opens as a full-screen drawer.
- **Who We Serve:** these pages are not in the menu. They are reached from five cards on the home page.
- **Footer:** links to every page, the hello@ethosquest.com address, the privacy policy and a short note on discretion.

**Interactions**
- **Floating inquiry button:** "Begin a private inquiry" appears at the bottom right once the visitor scrolls past the top
  of a page. It is hidden on the inquiry page itself.
- **Home hero:** a muted, looping city film plays behind the headline, with a still image while it loads.
- **Scroll reveals:** sections fade and rise gently into view as you scroll. Motion is reduced for visitors who turn
  on "reduce motion" in their system settings.
- **Buttons:** on hover the label rolls up and the arrow turns to point up and to the right.
- **Expandable lists:** the FAQ and the home page's business case open one item at a time, like an accordion.
- **Our Team:** clicking a card expands it into a full-screen profile with the bio and links. Esc or the close button
  returns to the page.
- **Coach pages:** each has "Request a Discovery Call with [name]". It opens the inquiry page addressed to that coach,
  with the coach's name in the heading and the confirmation.
- **Inquiry form:** field labels float above the fields as you type. Turnstile, errors and the confirmation all appear inside the form.

## Still open on the EthosQuest side

None of these stop a release. Each is a small text or photo change.

- **Our Team:**
  - Paige's card shows "Portrait to come" and "Bio to come".
  - Profiles link to LinkedIn only. The EthosQuest email addresses haven't been supplied yet.
- **Photos:**
  - Several page photos have a shortlist of options. The site uses the first option in each; see "Choosing photos" below.
  - Andrea Milwidsky's portrait is a casual photo.
- **Copy:** most of the copy is a draft that Alexia planned to revise.

## Choosing photos

Fifteen photo spots on the site have a shortlist (40 photos in all). The home page also has five hero films and an
optional "Executive Coaching" line above the headline. On the preview site
(https://8westervelt.github.io/Ethos-Quest/), arrows on each of these let you flip through the options, and each option has
a name. These arrows appear only on the preview, never on the live site.

The package currently uses the first option everywhere. To choose different ones, either:

- **Send us your picks**, for example "For Leaders hero: Wall Street". We'll lock them in and send an updated package.
- **Change them yourselves:**
  - Photos: in `app/ethos/EthosPhotoOptions.ts`, move the chosen photo to the top of its spot's list, or delete the others.
  - Hero film: same, in `ethosHeroOptions` in `app/ethos/EthosMedia.ts`.
  - "Executive Coaching" line: set `showTagline` in `app/ethos/EthosHero.tsx` to `false` to hide it.

## Where things live

- **Page text:**
  - `app/ethos/EthosMethod.ts`: home and methodology.
  - `EthosContent.ts`: the FAQ.
  - `EthosAudiences.ts`: Who We Serve.
  - `EthosCoaches.ts`: coaches.
  - `EthosTeam.ts`: team.
  - `EthosBassel.ts`: About.
- **Photos and video:** in `public/media/`. The choice for each page is set in `EthosMedia.ts` and `EthosPhotoOptions.ts`.
  The site uses the first photo listed for each slot.
- **Colors and type:** in `app/ethos/EthosStyles.css` and the Tailwind classes in each component.

Contact: Adam Alessi-Sheinman, 8westervelt. We're happy to answer questions or make changes on our side.
