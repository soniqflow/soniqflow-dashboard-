# SoniqFlow - Audio Processing Command Center

A futuristic, real-time audio processing dashboard built with Next.js, React, and Framer Motion. Powered by NVIDIA Maxine Audio Effects simulation.

## Features

### Core Functionality
- **Full Authentication System** - NextAuth.js with email/password and Google OAuth
- **Command Center Dashboard** - Real-time monitoring of audio processing workflows
- **6 Interactive Widgets**:
  - NVIDIA Maxine Audio Processing Gauge (denoising, dereverb, enhancement)
  - System Resource Monitor (CPU, Memory, GPU)
  - Active Processing Queue with real-time job tracking
  - Live Audio Quality Metrics Chart (Recharts)
  - Spectral Analyzer with frequency bands
  - KPI Stats Cards (files processed, hours saved, quality metrics)

### Pages
- **Sign In / Authentication** - Secure login with demo credentials
- **Dashboard** - Main command center with real-time data
- **Profile** - User profile management and avatar
- **Settings** - Multi-tab configuration:
  - Account preferences
  - Subscription/Billing tiers (Free/Pro/Enterprise)
  - API Keys management
  - Notification preferences

## Design & Aesthetics

### Color Palette
- **Primary Background**: #071952 (Deep Navy)
- **Accent**: #0B666A (Teal)
- **Highlight**: #35A29F (Mid-Teal)
- **Data/Glow**: #97FEED (Bright Cyan)

### Typography
- **Heading Font**: Oxanium (futuristic, monospace-inspired)
- **Body Font**: Geist (clean, modern sans-serif)
- **Mono Font**: Geist Mono

### Visual Effects
- Glassmorphism cards with backdrop blur
- Glowing text effects and status indicators
- Smooth animations via Framer Motion
- Real-time data updates with pulsing effects
- Gradient bars and progress indicators

## Tech Stack

### Frontend
- **Next.js 16** with App Router
- **React 19.2**
- **TypeScript** for type safety
- **Tailwind CSS** with custom color tokens
- **shadcn/ui** for accessible components
- **Recharts** for data visualization
- **Framer Motion** for animations
- **Lucide Icons** for UI icons

### Authentication
- **NextAuth.js v5** for session management
- **bcryptjs** for password hashing
- Mock database for demo (easily replaceable with Supabase/Database)

### Styling
- Dark mode by default
- CSS custom properties for theming
- Responsive design (mobile, tablet, desktop)
- Custom utility classes for glassmorphism and glows

## Project Structure

```
app/
├── (auth)/
│   └── signin/page.tsx          # Sign-in page
├── (dashboard)/
│   ├── layout.tsx                # Dashboard layout wrapper
│   ├── page.tsx                  # Main dashboard
│   ├── profile/page.tsx           # User profile
│   ├── settings/page.tsx          # Settings hub
│   └── error.tsx                 # Error boundary
├── api/
│   └── auth/[...nextauth]/route.ts
├── globals.css                    # Global styles & color palette
└── layout.tsx                    # Root layout

components/
├── auth/
│   └── signin-form.tsx
├── dashboard/
│   ├── sidebar.tsx               # Left sidebar navigation
│   └── nav-item.tsx
└── widgets/
    ├── audio-processing-gauge.tsx
    ├── cpu-memory-monitor.tsx
    ├── processing-queue.tsx
    ├── live-metrics-chart.tsx
    ├── spectral-analyzer.tsx
    └── stats-card.tsx

lib/
├── auth.ts                        # NextAuth configuration
├── auth-client.ts                 # Server-side auth helper
├── mock-data.ts                   # Data generation utilities
└── colors.ts                      # Color palette exports

hooks/
└── use-realtime-data.ts          # Custom hooks for live updates

middleware.ts                      # Route protection
tailwind.config.ts                # Tailwind theme config
```

## Getting Started

### Installation
```bash
# Clone or download the project
cd soniqflow-dashboard

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add NEXTAUTH_SECRET and GOOGLE_CLIENT_ID if using Google OAuth
```

### Running Locally
```bash
# Development server
pnpm dev

# Open browser to http://localhost:3000
```

### Building for Production
```bash
pnpm build
pnpm start
```

## Demo Credentials

**Email**: `demo@soniqflow.com`  
**Password**: `demo123`

Or sign in with Google OAuth (if configured).

## Real-time Data Simulation

The dashboard uses custom React hooks (`use-realtime-data.ts`) to simulate live audio processing data:
- Updates every 1-6 seconds depending on widget
- Generates realistic processing statistics
- No backend required for MVP (easily replaceable with real API)

## Authentication Flow

1. **Sign In** → Verify credentials against mock database
2. **Session Creation** → NextAuth JWT token
3. **Protected Routes** → Middleware checks session
4. **User Profile** → Stored in session, displayed in sidebar

## Customization

### Colors
Edit `app/globals.css` CSS variables to change the entire color scheme:
```css
--background: #071952;      /* Deep Navy */
--primary: #0B666A;         /* Teal */
--accent: #97FEED;          /* Bright Cyan */
```

### Fonts
Modify `tailwind.config.ts` font families or import different Google Fonts in `app/layout.tsx`.

### Widgets
Each widget is a standalone component in `components/widgets/`. Replace mock data hooks with real API calls:
```typescript
// Replace useProcessingStats() with your API
const stats = await fetchProcessingStats()
```

## Future Enhancements

- [ ] Real Supabase database integration
- [ ] WebSocket support for true real-time updates
- [ ] Audio file upload and processing
- [ ] Export reports and analytics
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Advanced user permissions & roles

## Deployment

### Deploy to Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Connect GitHub repo to Vercel
# Add NEXTAUTH_SECRET environment variable in Vercel dashboard
```

### Deploy to Other Platforms
Ensure Node.js 18+ is available and configure environment variables before deployment.

## Environment Variables

Required for production:
- `NEXTAUTH_SECRET` - Random string for JWT signing
- `NEXTAUTH_URL` - Your app URL (e.g., https://soniqflow.com)
- `GOOGLE_CLIENT_ID` - (Optional) Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - (Optional) Google OAuth secret

## Notes

- This is a **UI/UX demonstration** with mock real-time data
- Replace mock hooks with actual API endpoints for production
- Implement proper database (Supabase, PostgreSQL, etc.) for user data
- Add proper error handling and logging in production
- Consider implementing proper password reset and email verification

## License

MIT - Feel free to use for personal or commercial projects

---

Built with v0.app • Powered by Next.js & Framer Motion
