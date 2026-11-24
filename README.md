# Bastion Investment Society website

Source for [bastioninvestmentsociety.org](https://www.bastioninvestmentsociety.org).

The site is plain HTML, CSS, and JavaScript. There is no framework and no build step.

## Run it locally

```bash
python3 -m http.server 8000
```

Open http://localhost:8000/index.html. Production uses Vercel's clean URLs with trailing slashes (`/research/` instead of `/research.html`), so open root pages by their `.html` names when testing locally, or run `npx vercel dev` to get the same URLs as production. Chapter pages use `chapters/<school>/index.html` and work locally at `/chapters/<school>/`.

## Where things live

| Path | What it is |
| --- | --- |
| `index.html`, `what-we-do.html`, `research.html`, `investments.html` | Main pages |
| `executive-board.html`, `research-team.html`, `investment-team.html` | Our Team pages (people cards) |
| `styles.css` | Main site styles |
| `team.css` | Our Team dropdown, people cards, Featured Research, Drone Club section, four-strategy grid |
| `site.js` | Shared behavior: mobile menu, scroll reveals, login pop-up, "Under Development" notice |
| `fund-data.js`, `fund.js` | Investments page: fund numbers and holdings chart. Edit `fund-data.js` to change them. |
| `media/` | Images, videos, logos |
| `media/people/` | Team headshots (600×600 JPEG), named `first-last.jpg` |
| `media/research/` | Research PDFs and their cover images |
| `vercel.json` | Clean URLs, redirects, and PDF headers |

## Chapter pages

Each university route at `chapters/<school>/index.html` is a small shell that selects its chapter by key. `chapters/chapter-data.js` holds the school name, crest, location, landmark photograph, intro placeholder, and photo credit. `chapters/chapter-page.js` renders one shared template for all eight routes, and `chapters/chapter-page.css` controls the responsive layout. Edit the template once to update every chapter; edit the data file for school-specific content. The officer grid reuses `team.css`.

The landmark photos and their licenses are documented in [chapters/PHOTO_CREDITS.md](chapters/PHOTO_CREDITS.md). Campus video assets from the earlier design are preserved separately and are no longer embedded on chapter pages.

## Adding a person to a team page

Each card in `executive-board.html`, `research-team.html`, or `investment-team.html` looks like this:

```html
<a class="pc rv d0" href="https://www.linkedin.com/in/THEIR-LINKEDIN/" target="_blank" rel="noopener">
  <h3>First Last</h3><p class="pt">Title</p><p class="ps">School</p>
  <div class="ph pic"><img src="/media/people/first-last.jpg" alt="First Last" loading="lazy"></div>
</a>
```

An open role uses `<article class="pc ...">` with `<div class="ph"><span></span></div>` in place of the photo. Keep rows to four cards.

## Workflow

Vercel deploys this repo automatically: anything merged into `main` goes live on bastioninvestmentsociety.org within about a minute.

1. Branch off `main` and make your change.
2. Open a pull request.
3. Ethan reviews and merges it on GitHub. The merge publishes the site.

Don't push straight to `main`. The Vercel project is on the free Hobby plan, so Vercel only builds commits from the project owner. Commits you author yourself (including preview builds of your pull request) show as "Blocked" in Vercel, and that's expected. Test locally (see above) before opening the pull request.
