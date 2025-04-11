
# Beckn Leaderboard

A simple leaderboard app built with **Next.js** and **Tailwind CSS** to list the top contributors of a GitHub organization.


---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure that `pnpm` is installed on your device. You can check the steps for installation here:  
👉 [pnpm Installation Docs](https://pnpm.io/installation)

---

### 🧪 Starting the Development Server

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

### 🛠️ Troubleshooting

#### ❗ GITHUB_PAT is not configured / Request quota exhausted for `POST /graphql`

If you're encountering this issue for new contributors:

1. Generate your own GitHub Personal Access Token.  
   🔗 [How to generate one](https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

2. Run the development server with your token:

```bash
GITHUB_PAT=<YOUR_KEY> pnpm dev
```

Alternatively, if you have `gh cli` configured:

```bash
GITHUB_PAT=$(gh auth token) pnpm dev
```

---

### 📦 Installing New Packages

Use the following command to install new packages:

```bash
pnpm add <package_name>
```

More info on `pnpm`:  
📘 [pnpm docs](https://pnpm.io/motivation)

---

## 👥 How to Add a New Member?

Create a markdown file in the `contributors` folder, named as the GitHub username (e.g., `john-doe.md`).

**Example content:**

```md
---
name: John Doe
title: Full Stack Developer
github: john-doe
twitter: john-doe
linkedin: john-doe
slack: U02TDGQQPMJ
joining_date: "09/05/2022"
role: contributor
---

**A Bio about John Doe**  
_Passionate about creating scalable and distributed systems for the power grid and interested in contributing to open source digital public goods._
```

- `role: core` and `role: operations` will be hidden by default from the leaderboard.
- Toggle visibility via filters.
- View individual profile at:  
  ➤ `http://localhost:3000/contributors/john-doe`

---

## 🎨 Customizing the App

1. **Badges** → Modify `config/GraduateAttributes.ts`
2. **GitHub Org Setup** →  
   - Edit [scraper config](https://github.com/beckn/leaderboard/blob/main/.github/workflows/scrapper_new_leaderboard.yml)  
   - Update `DATA_SOURCE` in `.env`
3. **Theme** → Edit `tailwind.config.js` to change colors, fonts, and plugins

---

## 🔐 Environment Variables

| Variable                          | Description                                                                                                     | Default                                                                                                                                                                                                                                                                                                                                                                                                         | Optional? |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **NEXT_PUBLIC_ORG_NAME**          | Displayed in navbar                                                                                             | beckn.network                                                                                                                                                                                                                                                                                                                                                                                                     | No        |
| **NEXT_PUBLIC_ORG_INFO**          | Appears in “What do we do?” section                                                                             | Beckn is a universal resource discovery and transaction protocol that enables the leap to open, decentralized, and interoperable peer-to-peer networks. | Yes       |
| **NEXT_PUBLIC_ORG_LOGO**          | Footer logo                                                                                                     | /logo.webp                                                                                                                                                                                                                                                                                                                                                                                                      | No        |
| **NEXT_PUBLIC_META_TITLE**        | Metadata title                                                                                                  | Beckn                                                                                                                                                                                                                                                                                                                                                                                         | No        |
| **NEXT_PUBLIC_META_IMG**          | Metadata image                                                                                                  | /logo.webp                                                                                                                                                                                                                                                                                                                                                                                                      | No        |
| **NEXT_PUBLIC_META_DESCRIPTION**  | Metadata description                                                                                            | Beckn Leaderboard tracks the weekly contributions across different contributors working on projects in the organisation.                                                                                                                                                                                                                                                                                                                              | No        |
| **NEXT_PUBLIC_META_URL**          | Metadata URL                                                                                                    | https://leaderboard-dev.becknprotcol.io                                                                                                                                                                                                                                                                               | No        |
| **NEXT_PUBLIC_PAGE_TITLE**        | Page title                                                                                                      | Beckn Network Contributors                                                                                                                                                                                                                                                                                                                                                                                        | No        |
| **NEXT_PUBLIC_CONTRIBUTORS_INFO** | Info block next to contributors section                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                 | Yes       |
| **DATA_SOURCE**                   | GitHub URL for data repo                                                                                        | https://github.com/beckn/leaderboard-data.git                                                                                                                                                                                                                                                                                                                                                              | Yes       |
| **NEXT_PUBLIC_FEATURES**          | Comma-separated enabled features (Leaderboard, Contributors, etc.)                                              | Leaderboard,Contributors,Feed,Releases                                                                                                                                                                                                                                                                                                                                                                          | Yes       |

---

## 📦 Release Notes

### v1.0.0 – Initial Release

- 🎉 Launched contributor leaderboard built with **Next.js** and **Tailwind CSS**
- 🔍 Scraper integrated with GitHub GraphQL API
- 📈 Displays contributor profiles and weekly points
- 🧑‍🤝‍🧑 Supports custom contributor markdown profiles
- 🏷️ Badges and graduation attributes added
- 🔒 Configurable via `.env` variables
- 🎨 Theme and layout customization via Tailwind
- ⚙️ GitHub Actions integration for automated scraping
- 🧪 Token-based authentication and gh CLI support

---
