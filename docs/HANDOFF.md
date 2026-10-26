# EthosQuest website: hand-off

Prepared by 8westervelt for the EthosQuest web team, October 26, 2026.

## The short version

- **The design is a working website, not a Canva or Figma file.** See every page live at
  https://8westervelt.github.io/Ethos-Quest/ (desktop and mobile).
- **`site/` is the finished website,** built and ready to serve from the root of www.ethosquest.com.
  It is plain HTML, CSS, JavaScript and media. Nothing needs to be compiled, and there are no servers or databases to set up.
- **The inquiry form already works with your backend.** It posts to your existing `POST /api/inquiries`
  endpoint with the same JSON and the same Turnstile site key as today's form. Keep that endpoint running and the form works.
- **Every current URL still exists** (`/`, `/approach`, `/for-leaders`, `/about`, `/faq`, `/private-inquiry`, `/privacy`),
  so no redirects are needed.

## What's in the package

| Folder | What it is |
|---|---|
| `site/` | The built website. Deploy this. |
| `assets/` | All photos, video and brand files on their own, with `MEDIA-CREDITS.md`. |
| `source/` | The source code (Next.js on Vite), if you ever want to change and rebuild it. Also public at https://github.com/8Westervelt/Ethos-Quest. |
| `HANDOFF.md` | This guide. |

## Deploying

Today's site is Astro on Cloudflare, with `/api/inquiries` running alongside the pages. The simplest route keeps that project
and swaps only the pages:

1. In the Astro project, delete the page files in `src/pages/` **except the `api/` folder** (the inquiry endpoint).
2. Copy everything inside `site/` into the project's `public/` folder. It includes `favicon.svg`, `eq-mark.svg` and
   `brand/logos/`, which replace your existing copies with identical files.
3. Build and deploy the way you do now.
4. On a staging or preview URL, check a few pages and send one test inquiry (see "Testing" below), then release.

If you would rather host the pages separately (Cloudflare Pages, Workers static assets, or any static host), upload `site/`
as-is and route `/api/inquiries` to your existing endpoint on the same domain. The form calls a relative URL, so it must be
on the same origin as the API.

Notes for any host:

- Each page is a folder with an `index.html` (for example `about/index.html` serves `/about`).
- `404.html` is the not-found page.
- `_headers` sets long-term caching for the fingerprinted files in `/_next/static/`. Cloudflare reads it; other hosts can ignore it.
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

## Still open on the EthosQuest side

None of these stop a release. Each is a small text or photo change.

- **Our Team:**
  - Paige's card shows "Portrait to come" and "Bio to come".
  - Profiles link to LinkedIn only. The EthosQuest email addresses haven't been supplied yet.
- **Photos:**
  - Several page photos were picked from shortlists. The site uses the first photo in each shortlist; say if any should change.
  - Andrea Milwidsky's portrait is a casual photo.
- **Copy:** most of the copy is a draft that Alexia planned to revise.

## Changing the site later

The source is in `source/` (and on GitHub). With Node.js 22 or newer, run `npm install`, then `npm run export:release` to rebuild
`release/site/`. Page text lives in `app/ethos/` (for example `EthosTeam.ts`, `EthosCoaches.ts` and `EthosAudiences.ts`), and
media lives in `public/media/`. 8westervelt is also happy to make changes.

Contact: Adam Alessi-Sheinman, 8westervelt.
