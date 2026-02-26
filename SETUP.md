# SoniqFlow Command Center - Setup Guide

## Quick Start

### 1. **Install Dependencies**
```bash
npm install
# or
pnpm install
```

### 2. **Environment Variables**
The `.env.local` file is already configured with demo settings. For production:
```bash
# Copy and configure
cp .env.local .env.production.local
```

Update with your own values:
```
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. **Run Development Server**
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. **Demo Credentials**
- **Email:** demo@soniqflow.com
- **Password:** demo123

## Project Structure

```
/app
  /(auth)           - Authentication pages (signin)
  /(dashboard)      - Protected dashboard pages
    /profile        - User profile page
    /settings       - Settings page
  /api/auth         - NextAuth API routes
  /globals.css      - Global styles & color palette
  layout.tsx        - Root layout with auth setup

/components
  /auth             - Authentication components
  /dashboard        - Dashboard components (sidebar, etc)
  /ui               - shadcn/ui components
  /widgets          - Dashboard widgets

/lib
  /auth.ts          - NextAuth configuration
  /mock-data.ts     - Mock data for widgets
  /utils.ts         - Utility functions

/hooks
  /use-realtime-data.ts - Real-time data hook
```

## Features

✅ **Full Authentication**
- Email/password login with credentials
- Google OAuth ready (configure in .env)
- Session management with NextAuth.js v5
- User profile and settings pages

✅ **Command Center Dashboard**
- Real-time data widgets (mocked)
- System status monitoring
- KPI cards and metrics
- Responsive design

✅ **Design System**
- **Colors:** Navy (#071952), Teal (#0B666A), Cyan (#97FEED)
- **Typography:** Oxanium (futuristic font) + Geist
- **Components:** Glassmorphism cards with glowing effects
- **Dark mode:** Always-on for tech aesthetic

✅ **Production Ready**
- TypeScript for type safety
- Environment-based configuration
- Error boundaries and loading states
- Fully responsive layout

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Authentication Flow

1. User visits app → redirected to `/signin`
2. Sign in with demo credentials (demo@soniqflow.com / demo123)
3. NextAuth creates session
4. Redirected to `/dashboard`
5. Dashboard checks session, renders protected content
6. User can navigate to `/profile` and `/settings`

## Customization

### Change Colors
Edit `/app/globals.css` - update CSS variables in `:root` section

### Update Widgets
Edit `/app/(dashboard)/page.tsx` - components use mock data from `/lib/mock-data.ts`

### Add Real Backend
Replace mock data functions with actual API calls to your backend

## Troubleshooting

### "Fatal error during initialization"
- Ensure all dependencies installed: `npm install`
- Clear cache: `rm -rf .next && npm run dev`
- Check Node version (requires Node 18+)

### SignIn not working
- Verify `.env.local` has `NEXTAUTH_SECRET` set
- Check demo credentials in `/lib/auth.ts`
- Clear cookies and try again

### Styling issues
- Ensure Tailwind CSS is processing styles
- Verify color CSS variables in `/app/globals.css`
- Check browser DevTools for CSS loading errors

## Support

For issues or questions, check:
- NextAuth.js docs: https://next-auth.js.org
- Next.js 16 docs: https://nextjs.org
- shadcn/ui components: https://ui.shadcn.com

---

**SoniqFlow Command Center**
Professional audio processing platform powered by NVIDIA Maxine Audio Effects SDK.
