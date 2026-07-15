# Installation Guide — Windows (PowerShell) + VS Code

This guide walks through setting up and running the **Somnath Cab** Next.js project from scratch on
Windows using PowerShell and Visual Studio Code.

---

## Step 1 — Install Node.js

1. Go to https://nodejs.org and download the **LTS** installer (20.x).
2. Run the installer, accept defaults (this also installs `npm`).
3. Verify the install in PowerShell:

```powershell
node -v
npm -v
```

You should see something like `v20.x.x` and `10.x.x`. If PowerShell says `node is not recognized`,
close and reopen PowerShell (or restart your machine) so the updated PATH takes effect.

> If you use multiple Node versions, consider installing **nvm-windows**
> (https://github.com/coreybutler/nvm-windows) instead, then run `nvm install 20` and `nvm use 20`.

---

## Step 2 — Install Git (if not already installed)

1. Download from https://git-scm.com/download/win and install with defaults.
2. Verify:

```powershell
git --version
```

---

## Step 3 — Install VS Code

1. Download from https://code.visualstudio.com and install.
2. Open VS Code, go to the **Extensions** panel (`Ctrl+Shift+X`), and install:
   - **Prettier — Code formatter** (`esbenp.prettier-vscode`)
   - **ESLint** (`dbaeumer.vscode-eslint`)
   - **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)

---

## Step 4 — Get the Project onto Your Machine

If you received the project as a `.zip`:

```powershell
# Example: unzip to your Documents folder
Expand-Archive -Path "$HOME\Downloads\angel-cabs.zip" -DestinationPath "$HOME\Documents\angel-cabs" -Force
cd "$HOME\Documents\angel-cabs\angel-cabs"
```

If instead it's in a Git repository:

```powershell
cd "$HOME\Documents"
git clone <your-repo-url> angel-cabs
cd angel-cabs
```

---

## Step 5 — Open the Project in VS Code

```powershell
code .
```

This opens the current folder in VS Code. If `code` isn't recognized, open VS Code manually, then
`File → Open Folder…` and select the `angel-cabs` folder.

---

## Step 6 — Set the PowerShell Execution Policy (one-time, if needed)

Some npm-installed CLI tools use `.ps1` scripts, which PowerShell blocks by default. If you hit an
error like *"running scripts is disabled on this system"*, run PowerShell **as Administrator** and:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Type `Y` to confirm. This only needs to be done once per machine.

---

## Step 7 — Install Project Dependencies

Open the built-in VS Code terminal (`` Ctrl+` ``) — it defaults to PowerShell on Windows — and run:

```powershell
npm install
```

This reads `package.json` and installs everything listed in `requirements.txt` /
`package.json` into a local `node_modules` folder. It should take 30–90 seconds depending on your
connection.

---

## Step 8 — Configure Environment Variables

```powershell
Copy-Item .env.example .env.local
```

Open `.env.local` in VS Code and fill in real values as you connect live services (Google Maps,
Razorpay/Stripe, Resend, Twilio, GTM/GA4, etc.). It's safe to leave these blank for local
development — the booking flow works with built-in fallback fare estimation.

---

## Step 9 — Run the Development Server

```powershell
npm run dev
```

You should see:

```
▲ Next.js 14.2.35
- Local:  http://localhost:3000
```

Open http://localhost:3000 in your browser. The site hot-reloads as you edit files.

---

## Step 10 — Useful Commands

```powershell
npm run dev         # start local dev server with hot reload
npm run build       # production build (also type-checks and lints)
npm run start       # run the production build locally (after npm run build)
npm run lint        # run ESLint
npm run typecheck   # run TypeScript compiler checks only
npm run format      # auto-format the codebase with Prettier
```

---

## Step 11 — Recommended VS Code Workspace Settings

Create `.vscode/settings.json` in the project (if not already present) so formatting and Tailwind
class sorting work automatically on save:

```powershell
New-Item -ItemType Directory -Force -Path ".vscode" | Out-Null
@'
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "tailwindCSS.experimental.classRegex": [["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]]
}
'@ | Set-Content ".vscode\settings.json"
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `node is not recognized` | Reinstall Node.js, restart PowerShell/computer |
| `running scripts is disabled` | Run Step 6's `Set-ExecutionPolicy` command as Administrator |
| Port 3000 already in use | `npm run dev -- -p 3001` to use a different port |
| Fonts fail to fetch during build | Ensure you have an active internet connection — `next/font/google` needs to reach `fonts.googleapis.com` once at build time |
| Blank/white page after `npm run dev` | Check the PowerShell terminal for compile errors; hard-refresh the browser (`Ctrl+F5`) |
| `npm install` hangs or fails | Try `npm cache clean --force` then `npm install` again, or check your network/proxy/VPN |

---

## Next Steps After Local Setup

Once running locally, see `README.md` for:
- Full architecture and folder structure
- How to wire up Google Maps/Places, Razorpay/Stripe, Twilio, Resend, and analytics
- Deployment instructions (Vercel and self-hosted)
- The pre-launch checklist
