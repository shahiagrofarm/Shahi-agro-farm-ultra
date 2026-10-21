# SHAHI AGRO FARM — Website & GitHub Pages Deployment Guide

## Why the Website Showed Blank on GitHub Pages (And How It Is Fixed)

If your website appeared as a blank white screen after uploading to GitHub Pages, it was caused by two standard technical issues:

### 1. The Subpath Asset Path Issue (Fixed with `base: './'`)
* **What happened:** GitHub Pages hosts sites at a subfolder: `https://<your-username>.github.io/<your-repo-name>/`.
* By default, Vite looks for assets at the root domain (`/assets/index.js`), completely missing your repository subfolder and causing **404 Not Found** errors for both the CSS and JavaScript files.
* **The Fix:** We configured `base: './'` in `vite.config.ts` so that all script and style links are relative (`./assets/index.js`), allowing the site to load on any GitHub repository name.

### 2. Browser Cannot Run Raw TypeScript (`.tsx`) Directly
* **What happened:** Web browsers can only execute compiled HTML, CSS, and plain JavaScript (`.js`). Browsers do not understand raw `.tsx` files. If GitHub Pages is pointed to the unbuilt root folder, the browser encounters `<script src="/src/main.tsx">` and halts with a fatal syntax error.
* **The Fix:** We compiled the production distribution into both **`dist/`** and **`docs/`**, and added a pre-configured **GitHub Actions Workflow** (`.github/workflows/deploy.yml`).

---

## How to Deploy to GitHub Pages (Choose Option 1 or 2)

### Option 1 (Recommended — Automatic GitHub Actions Deployment):
1. Push this repository to GitHub.
2. Open your repository on GitHub in your browser.
3. Click **Settings** (top tab) → Click **Pages** (in the left sidebar).
4. Under **Build and deployment** → **Source**, select:
   👉 **GitHub Actions**
5. That's it! GitHub will automatically trigger the included `.github/workflows/deploy.yml` workflow, compile the website, and publish it live within ~60 seconds.

---

### Option 2 (Deploy from `/docs` folder):
1. Push this repository to GitHub.
2. Go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **"Deploy from a branch"**.
4. Under **Branch**, select **`main`** (or `master`) and select folder **`/docs`**.
5. Click **Save**.
6. Your live website will be up and running at `https://<your-username>.github.io/<your-repo-name>/`.
