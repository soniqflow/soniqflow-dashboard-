# ⚡ SONIQFLOW DASHBOARD - QUICK START

## 🚀 Get Running in 2 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
```
http://localhost:3000
```

---

## 🔐 Demo Login

- **Email:** demo@soniqflow.com
- **Password:** demo123

---

## 📁 What's Included

✅ Full authentication system (NextAuth.js)  
✅ Command Center dashboard  
✅ User profile page  
✅ Settings page with tabs  
✅ Real-time data widgets  
✅ Responsive design  
✅ Dark mode with cyan accents  
✅ Production-ready code  

---

## 🎨 Customize Colors

Edit `/app/globals.css` - Change CSS variables in `:root` section:

```css
:root {
  --background: 7 25 82;        /* Navy blue */
  --accent: 151 254 237;        /* Bright cyan */
  --primary: 11 102 106;        /* Teal */
}
```

---

## 📚 Documentation

- **README.md** - Full documentation
- **PROJECT_SUMMARY.md** - Complete project overview
- **SETUP.md** - Detailed setup instructions  
- **DOWNLOAD_AND_RUN.md** - Deployment guide

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `npm run dev -- -p 3001` |
| Module not found | `rm -rf node_modules && npm install` |
| Styling broken | `rm -rf .next && npm run dev` |
| Login not working | Clear browser cookies |

---

## 🌐 Deploy to Vercel

1. Push code to GitHub
2. Go to [Vercel.com](https://vercel.com/new)
3. Import your GitHub repository
4. Add environment variables:
   - `NEXTAUTH_URL`: your domain
   - `NEXTAUTH_SECRET`: secure random key
5. Click Deploy

---

## 📖 Useful Commands

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm start         # Run production build
npm run lint      # Run linter
```

---

## 🎯 Pages After Login

- `/dashboard` - Main command center
- `/dashboard/profile` - User profile
- `/dashboard/settings` - Settings & preferences

---

## 💻 Tech Stack

- Next.js 16
- React 19.2
- TypeScript
- Tailwind CSS v4
- NextAuth.js v5
- shadcn/ui
- Framer Motion

---

## ✨ Features

- Email/password authentication
- Google OAuth ready
- Real-time dashboard
- KPI metrics cards
- System status monitoring
- User profile management
- Settings with multiple tabs
- API Keys management
- Subscription tiers display
- Glassmorphism UI
- Dark mode optimized
- Fully responsive

---

## 🔧 Environment Variables

All pre-configured in `.env.local` for development:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=soniqflow-dev-secret-key-local-development-only
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

That's it! You're ready to go. Enjoy your dashboard! 🎉

**Questions?** Check the documentation files or visit:
- NextAuth.js: https://next-auth.js.org
- Next.js: https://nextjs.org
- Tailwind CSS: https://tailwindcss.com
