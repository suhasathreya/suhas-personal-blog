# Personal Blog

A minimalist personal blog built using the **Ralph Wiggum Loop** — an AI-powered development approach where Claude iterates through tasks autonomously.

## What is the Ralph Wiggum Loop?

The Ralph Wiggum Loop is a bash-driven development workflow that:

1. **Decomposes** a product spec into discrete user stories (`tasks.json`)
2. **Iterates** through each task using fresh Claude instances
3. **Maintains context** via a short-term memory file (`progress.txt`)
4. **Ships** working code incrementally

```bash
# The loop in action
while [ "$STATUS" != "completed" ]; do
    claude -p "$(cat ralph-prompt.md)" --dangerously-skip-permissions
    # Claude reads progress.txt, picks next task, implements, updates progress
done
```

Each iteration gets a fresh context window, avoiding the "context stuffing" problem while maintaining project continuity through the progress file.

## How This Blog Was Built

1. **Wrote a PRD** — Raw product spec describing a minimalist blog (inspired by aigrant.com)
2. **Generated tasks.json** — Claude decomposed the PRD into 20 user stories with acceptance criteria
3. **Ran the loop** — Each task was picked up, implemented, and marked complete
4. **Deployed** — Pushed to GitHub, deployed on Vercel with Turso database

Total tasks executed: 20 user stories from "Set up Next.js project" to "Deploy to production"

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Turso (libSQL) — serverless SQLite
- **Auth:** NextAuth.js with Google OAuth
- **Hosting:** Vercel
- **Content:** Markdown with react-markdown

## Features

- Clean, minimal design
- Markdown blog posts
- Admin dashboard (`/admin`) with Google OAuth
- CRUD operations for posts
- Responsive layout

## Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Fill in: TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET

# Initialize database
npm run seed

# Run dev server
npm run dev
```

## Project Structure

```
src/
├── app/
│   ├── admin/          # Admin dashboard & post management
│   ├── api/            # API routes (posts CRUD, auth)
│   ├── posts/          # Public blog posts
│   └── contact/        # Contact page
├── components/         # Header, Footer, UI components
└── lib/
    ├── auth.ts         # NextAuth configuration
    └── db.ts           # Turso database functions
```

## The Ralph Wiggum Philosophy

> "Me fail English? That's unpossible!" — Ralph Wiggum

Like Ralph, the loop embraces simplicity. No complex orchestration, no agent frameworks — just a bash loop, a prompt, and fresh Claude instances chipping away at tasks one by one.

---

Built with Claude Code + the Ralph Wiggum Loop
