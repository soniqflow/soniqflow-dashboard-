# Download and Run SoniqFlow Dashboard

## Option 1: Using shadcn CLI (Recommended)

### Step 1: Download the ZIP file
- Click **"Download ZIP"** button from v0
- Extract the ZIP file to your desired location

### Step 2: Navigate to project
```bash
cd path-to-extracted-folder
```

### Step 3: Install with shadcn CLI
```bash
npx shadcn-ui@latest init -d
```

This will:
- Install all dependencies
- Setup TypeScript
- Configure Tailwind CSS
- Setup shadcn/ui components

### Step 4: Install additional dependencies
```bash
npm install next-auth@^5.0.0 bcryptjs framer-motion
```

### Step 5: Run the app
```bash
npm run dev
```

The app will be available at **http://localhost:3000**

---

## Option 2: GitHub + Deployment

### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com/new)
2. Create new repository
3. Clone locally: `git clone <your-repo-url>`

### Step 2: Add project files
```bash
cd your-repo
# Copy all files from downloaded ZIP
cp -r ../downloaded-folder/* .
git add .
git commit -m "Initial commit: SoniqFlow dashboard"
git push origin main
```

### Step 3: Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Configure environment variables:
   ```
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=generate-a-secure-key
   ```
5. Click Deploy

---

## Option 3: Manual Installation

### Step 1: Extract ZIP and install
```bash
cd path-to-project
npm install
# or
pnpm install
# or
yarn install
```

### Step 2: Create environment file
If `.env.local` doesn't exist, create it:
```bash
touch .env.local
```

Add:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=soniqflow-dev-secret-key-local-development-only
```

### Step 3: Run development server
```bash
npm run dev
```

### Step 4: Access the app
Open browser and go to: **http://localhost:3000**

---

## Demo Account

Use these credentials to sign in:
- **Email:** demo@soniqflow.com
- **Password:** demo123

After signing in, you'll see the Command Center dashboard with:
- KPI cards (Files Processed, Hours Saved, etc.)
- System status monitoring
- Quick action buttons
- Profile and Settings pages

---

## Troubleshooting

### Issue: "Port 3000 already in use"
Solution:
```bash
# Use different port
npm run dev -- -p 3001
```

### Issue: "Module not found" errors
Solution:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Styling not loading
Solution:
```bash
# Restart dev server
# Stop with Ctrl+C
npm run dev
```

### Issue: "Cannot find module '@/components/...'"
Solution:
- Ensure you're in the project root directory
- Check that all files are extracted from ZIP
- Run `npm install` again

---

## Building for Production

```bash
npm run build
npm start
```

This will create an optimized production build and start the server.

---

## Project Structure

```
soniqflow-dashboard/
├── app/
│   ├── (auth)/signin/       ← Sign-in page
│   ├── (dashboard)/         ← Protected dashboard
│   ├── api/auth/            ← NextAuth API
│   ├── layout.tsx           ← Root layout
│   ├── globals.css          ← Global styles
│   └── page.tsx             ← Home (redirects to signin)
├── components/
│   ├── auth/                ← Auth components
│   ├── dashboard/           ← Dashboard components
│   ├── widgets/             ← Widget components
│   └── ui/                  ← shadcn/ui components
├── lib/
│   ├── auth.ts              ← NextAuth config
│   └── mock-data.ts         ← Demo data
├── hooks/
│   └── use-realtime-data.ts ← Data hook
├── .env.local               ← Environment variables
├── package.json             ← Dependencies
└── tailwind.config.ts       ← Tailwind config
```

---

## Next Steps

1. **Customize Colors:**
   - Edit `/app/globals.css`
   - Update CSS color variables in `:root` section

2. **Add Real Data:**
   - Replace mock data in `/lib/mock-data.ts`
   - Connect to your backend API

3. **Configure OAuth:**
   - Add Google credentials to `.env.local`
   - Update NEXTAUTH_SECRET to a secure value

4. **Deploy:**
   - Use Vercel (recommended)
   - Or any Node.js hosting (Heroku, Railway, etc.)

---

## Support & Documentation

- **Next.js:** https://nextjs.org/docs
- **NextAuth.js:** https://next-auth.js.org
- **Tailwind CSS:** https://tailwindcss.com
- **shadcn/ui:** https://ui.shadcn.com

---

**SoniqFlow Command Center Dashboard**
Built with Next.js 16, React 19, NextAuth.js, and Tailwind CSS

Happy coding! 🚀
