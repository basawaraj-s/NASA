# Next.js Migration Guide

This project has been enhanced with Next.js support while maintaining backward compatibility with Create React App.

## 🚀 Quick Start

### Next.js (Recommended)
```bash
npm run dev
# Open http://localhost:3000
```

### Create React App (Legacy)
```bash
npm run cra-start
```

## 📁 Project Structure

```
NASA/
├── pages/                      # Next.js pages
│   ├── index.tsx              # Home page
│   ├── nbl-training.tsx       # NBL Training page (SSR disabled)
│   └── _app.tsx               # Custom App component with global styles
├── src/                        # React components (shared)
│   ├── components/
│   │   └── NBL/
│   │       ├── NBLExperienceEnhanced.js
│   │       └── NBLSceneEnhanced.js
│   └── ...
├── public/                     # Static assets
├── next.config.js             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## 🎯 Pages

### NBL Training Page
- **URL**: `/nbl-training`
- **Component**: `NBLExperienceEnhanced`
- **SSR**: Disabled (uses `dynamic` import with `{ ssr: false }`)
- **Reason**: Three.js/WebGL components require browser APIs not available during SSR

## 🔧 Key Changes

### 1. Dynamic Import for 3D Components
The NBL component uses Next.js dynamic imports to disable SSR:

```tsx
import dynamic from "next/dynamic";

const NBLExperienceEnhanced = dynamic(
  () => import("../src/components/NBL/NBLExperienceEnhanced"),
  { ssr: false }
);
```

### 2. Global CSS Imports
All global CSS files are imported in `pages/_app.tsx`:
- `src/index.css`
- `src/App.css`
- `src/components/NBL/NBLExperienceEnhanced.css`

### 3. Component Changes
Removed CSS import from `NBLExperienceEnhanced.js` to comply with Next.js CSS rules.

## 📦 Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js production bundle
- `npm start` - Start Next.js production server
- `npm run export` - Export static Next.js site
- `npm run cra-start` - Start Create React App dev server (legacy)
- `npm run cra-build` - Build Create React App bundle (legacy)

## 🌟 Benefits of Next.js

1. **Better Performance**: Automatic code splitting and optimization
2. **SEO Friendly**: Server-side rendering support for non-3D pages
3. **File-based Routing**: Intuitive page organization
4. **Image Optimization**: Built-in image optimization (future enhancement)
5. **TypeScript Support**: Native TypeScript support

## 🎮 NBL Training Academy

The NBL (Neutral Buoyancy Laboratory) Training Academy is a 3D interactive game that simulates astronaut training underwater. Features:

- 5 progressive missions
- Free play mode
- WASD/Arrow key controls
- 3D underwater environment with Three.js
- Achievement system
- Real-time scoring and objectives

## 🔮 Future Enhancements

- [ ] Add more pages (Cupola, Earth View, etc.)
- [ ] Implement API routes for leaderboards
- [ ] Add user authentication
- [ ] Optimize 3D assets loading
- [ ] Add more interactive experiences

## 🐛 Troubleshooting

### CSS Import Errors
If you see errors about global CSS imports:
1. Ensure all global CSS is imported in `pages/_app.tsx`
2. Remove CSS imports from component files
3. Restart the dev server

### Three.js/WebGL Errors
The NBL component requires a browser environment:
- Always use `{ ssr: false }` with dynamic imports for 3D components
- Ensure `window` object checks are in place for browser-only code

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
