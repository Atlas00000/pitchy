# Deployment Guide

## Architecture Overview

| Service | Platform | Notes |
|---|---|---|
| Next.js frontend | Vercel | Auto-deploys from GitHub `main` |
| Backend / DB / Realtime | Convex Cloud | Deployed separately via CLI |
| Auth | Clerk | Managed SaaS — no deployment needed |
| AI (default) | Google Gemini | API key stored in Convex env vars |

---

## 1. Deploy Convex Backend (do this first)

```bash
npx convex deploy
```

This pushes all functions in `convex/` to your Convex production deployment and prints your production URL:

```
✓ Deployed to https://your-deployment.convex.cloud
```

Copy that URL — you need it in the next step.

**Set AI API key in Convex:**
```bash
npx convex env set GEMINI_API_KEY <your-gemini-key>
```

---

## 2. Deploy to Vercel

### Option A — Vercel Dashboard (recommended for first deploy)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import your repo
3. Framework: **Next.js** (auto-detected)
4. Add environment variables (see section below)
5. Click **Deploy**

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

---

## 3. Environment Variables

Set these in **Vercel → Project → Settings → Environment Variables**.  
Set for **Production**, **Preview**, and **Development** as appropriate.

| Variable | Where to get it | Required |
|---|---|---|
| `NEXT_PUBLIC_CONVEX_URL` | Convex dashboard → Settings → URL | ✓ |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk dashboard → API Keys | ✓ |
| `CLERK_SECRET_KEY` | Clerk dashboard → API Keys | ✓ |

> **`NEXT_PUBLIC_*` vars** are baked into the JS bundle at build time — Vercel handles this automatically when you set them before deploying.

---

## 4. Configure Clerk for Production

In **Clerk Dashboard → Domains**:

1. Add your Vercel production domain (e.g. `pitchly.vercel.app`)
2. Add any custom domain if applicable
3. Update **Allowed redirect URLs** to include:
   - `https://your-domain.com/dashboard`
   - `https://your-domain.com/onboarding`

---

## 5. Configure Convex for Production

In **Convex Dashboard → Settings → Authentication**:

1. Add your Clerk JWT issuer URL (found in Clerk → JWT Templates → Convex)
2. If not already wired, follow: [docs.convex.dev/auth/clerk](https://docs.convex.dev/auth/clerk)

---

## 6. Seed Demo Data (optional)

After first deploy, seed the database with demo calls:

```bash
npx convex run seed:run
```

---

## 7. Custom Domain (optional)

In Vercel → Project → Domains → Add domain.  
Update your DNS registrar with the CNAME/A records Vercel provides.  
Then add the new domain to Clerk (step 4 above).

---

## Docker (self-hosted alternative)

Docker is available for self-hosted deployments. See the `Dockerfile` and `docker-compose.yml` in the root.

**Run with:**
```bash
docker compose --env-file .env.local up --build
```

**Required in `.env.local`:**
```
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

> Note: Convex and Clerk remain cloud-hosted even in Docker deployments. Docker only containerises the Next.js frontend.

---

## Deployment Checklist

- [ ] `npx convex deploy` succeeded
- [ ] `GEMINI_API_KEY` set in Convex env vars
- [ ] All 3 env vars set in Vercel
- [ ] Vercel production URL added to Clerk domains
- [ ] Clerk JWT issuer configured in Convex dashboard
- [ ] Smoke test: sign up → onboarding → upload transcript → view analysis
