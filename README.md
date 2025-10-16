# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/64225a17-203f-42a2-aa19-4d407cf911ae

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/64225a17-203f-42a2-aa19-4d407cf911ae) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Deploy to Vercel (Recommended)

This project is configured for seamless Vercel deployment with zero configuration needed.

**Quick Deploy:**
1. Push this repository to GitHub
2. Import the repository in Vercel dashboard
3. Vercel will auto-detect the Vite framework and deploy

**Manual Configuration (if needed):**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Framework Preset: Vite

**Environment Variables:**
- Copy `.env.example` to `.env.local` for local development
- Add environment variables in Vercel dashboard under Project Settings > Environment Variables

### Deploy to Other Platforms

**Build for production:**
```sh
npm run build
```

The `dist/` directory will contain your production-ready application.

**Preview production build locally:**
```sh
npm run preview
```

### Deploy via Lovable

Alternatively, you can open [Lovable](https://lovable.dev/projects/64225a17-203f-42a2-aa19-4d407cf911ae) and click on Share -> Publish.

## Can I connect a custom domain?

**Vercel:**
Navigate to Project Settings > Domains and add your custom domain.

**Lovable:**
Navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
