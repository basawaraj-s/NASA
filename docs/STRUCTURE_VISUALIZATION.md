# 🎨 Project Structure Visualization

## 📊 Component Hierarchy

```
NASA ISS Experience
│
├─── 🌍 Earth View Module
│    ├── Earth.js (3D sphere with textures)
│    ├── EarthScene.js (Three.js scene setup)
│    ├── Hotspots.js (Interactive markers)
│    └── Hotspots.css
│
├─── 🪟 Cupola Window Module
│    ├── CupolaExperience.js ──► Uses EarthScene
│    ├── CupolaExperience.css
│    ├── CupolaView.js (Events & Disasters)
│    ├── CupolaView.css
│    ├── CupolaGame.js (Space Defense Game)
│    ├── CupolaGame.css
│    ├── CupolaOverlay.js
│    ├── CupolaOverlay.css
│    ├── HotspotPanel.js
│    └── HotspotPanel.css
│
├─── 🧑‍🚀 NBL Training Module
│    ├── NBLExperienceEnhanced.js (Main - Enhanced)
│    ├── NBLExperienceEnhanced.css
│    ├── NBLExperience.js (Legacy)
│    ├── NBLExperience_old.css
│    ├── NBLSceneEnhanced.js (3D Scene - Enhanced)
│    ├── NBLScene.js (3D Scene - Legacy)
│    ├── NBLControls.js (Movement controls)
│    ├── NBLControls.css
│    ├── TaskPanel.js (Mission objectives)
│    ├── TaskPanel.css
│    ├── Astronaut.js (3D model)
│    └── PoolEnvironment.js (Underwater scene)
│
└─── 🔗 Shared Components
     ├── Navigation.js (Top nav bar)
     └── Navigation.css
```

---

## 🔄 Component Flow Diagram

```
┌─────────────────────────────────────────────┐
│              App.js (Root)                  │
│         Manages routing & state             │
└─────────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┬───────────┐
        │            │            │           │
        ▼            ▼            ▼           ▼
   ┌────────┐  ┌──────────┐ ┌──────────┐ ┌─────────┐
   │Navigate│  │  Cupola  │ │   Game   │ │   NBL   │
   │        │  │Experience│ │          │ │Enhanced │
   └────────┘  └──────────┘ └──────────┘ └─────────┘
   (Shared)      (Cupola)     (Cupola)     (NBL)
                     │
                     │ uses
                     ▼
              ┌──────────────┐
              │  EarthScene  │
              │   (Earth)    │
              └──────────────┘
                     │
           ┌─────────┴─────────┐
           ▼                   ▼
       ┌───────┐          ┌──────────┐
       │ Earth │          │ Hotspots │
       │  .js  │          │   .js    │
       └───────┘          └──────────┘
       (Earth)             (Earth)
```

---

## 📁 Directory Tree

```
src/components/
│
├── Cupola/                    [Cupola Window Module]
│   ├── CupolaExperience.js    → Main window view with Earth
│   ├── CupolaExperience.css   → Styles for window view
│   ├── CupolaGame.js          → Space defense game (500+ lines)
│   ├── CupolaGame.css         → Game UI & animations (933 lines)
│   ├── CupolaView.js          → Events & disasters view
│   ├── CupolaView.css         → Events view styles
│   ├── CupolaOverlay.js       → UI overlay component
│   ├── CupolaOverlay.css      → Overlay styles
│   ├── HotspotPanel.js        → Hotspot information panel
│   └── HotspotPanel.css       → Panel styles
│
├── Earth/                     [3D Earth Module]
│   ├── Earth.js               → Earth sphere with textures
│   ├── EarthScene.js          → Three.js scene setup
│   ├── Hotspots.js            → Interactive 3D markers
│   └── Hotspots.css           → Marker styles
│
├── NBL/                       [Training Module]
│   ├── NBLExperienceEnhanced.js  → Enhanced training game ⭐
│   ├── NBLExperienceEnhanced.css → Enhanced game styles (1100+ lines)
│   ├── NBLExperience.js          → Legacy training game
│   ├── NBLExperience_old.css     → Legacy styles
│   ├── NBLSceneEnhanced.js       → Enhanced 3D underwater scene
│   ├── NBLScene.js               → Legacy 3D scene
│   ├── NBLControls.js            → Movement controls
│   ├── NBLControls.css           → Control styles
│   ├── TaskPanel.js              → Mission objectives UI
│   ├── TaskPanel.css             → Task panel styles
│   ├── Astronaut.js              → 3D astronaut model
│   └── PoolEnvironment.js        → Underwater environment
│
└── Shared/                    [Reusable Components]
    ├── Navigation.js          → Top navigation bar
    └── Navigation.css         → Navigation styles
```

---

## 🎯 Module Dependency Map

```
┌─────────────────────────────────────────────┐
│                   App.js                    │
└─────────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┬───────────┐
        │            │            │           │
        ▼            ▼            ▼           ▼
   Navigation   Cupola/      Cupola/     NBL/
    (Shared)    Experience    Game    ExperienceEnh.
                     │
                     │
                     ├─► Earth/EarthScene
                     │        │
                     │        ├─► Earth/Earth.js
                     │        └─► Earth/Hotspots.js
                     │
                     ├─► Cupola/HotspotPanel
                     └─► Cupola/CupolaOverlay
```

---

## 📊 File Statistics

### Module Sizes:

| Module | Files | Lines of Code | Percentage |
|--------|-------|---------------|------------|
| **Cupola** | 10 | ~3,000 | 40% |
| **NBL** | 13 | ~3,500 | 47% |
| **Earth** | 4 | ~600 | 8% |
| **Shared** | 2 | ~300 | 5% |
| **Total** | **29** | **~7,400** | **100%** |

### Largest Components:

1. **CupolaGame.js** - 1,635 lines (Game logic, power-ups, bosses)
2. **NBLExperienceEnhanced.js** - 1,233 lines (Training game)
3. **NBLExperienceEnhanced.css** - 1,100+ lines (Training UI)
4. **CupolaGame.css** - 933 lines (Game UI & animations)

---

## 🎮 Feature Map

### Cupola Module Features:
```
CupolaExperience
├── 3D Earth Visualization
├── Interactive Hotspots (5 locations)
├── Rotation Controls
└── Real-time Lighting

CupolaView
├── Events & Disasters
└── Earth Monitoring

CupolaGame
├── Space Defense Shooter
├── Power-ups (5 types)
├── Boss Battles
├── Achievements (7 unlocks)
├── Combo System
├── Critical Hits
└── Statistics Tracking
```

### NBL Module Features:
```
NBLExperienceEnhanced
├── Mission-based Gameplay
├── Tool Collection
├── Repair Panel Tasks
├── Cable Connections
├── Oxygen Management
├── Combo System
├── Achievements
├── Score Tracking
├── Free Play Mode
└── Statistics
```

### Earth Module Features:
```
EarthScene
├── High-res Textures
│   ├── Albedo (color)
│   ├── Bump (terrain)
│   ├── Night lights
│   └── Cloud layer
├── Realistic Lighting
├── Shadows
└── Animated Rotation

Hotspots
├── Antarctic Ice
├── Sahara Desert
├── Himalayas
├── Great Lakes
└── Great Barrier Reef
```

---

## 🔄 Data Flow

```
hotspotsData.json
    │
    └─► CupolaExperience.js
            │
            ├─► EarthScene.js
            │       │
            │       └─► Hotspots.js (renders markers)
            │
            └─► HotspotPanel.js (displays info)


nblTasks.json
    │
    └─► NBLExperience.js
            │
            └─► TaskPanel.js (displays missions)
```

---

## 🎨 CSS Architecture

```
Global Styles
├── index.css (Tailwind + global)
└── App.css (App-level styles)

Module Styles (Co-located)
├── Cupola/
│   ├── CupolaExperience.css
│   ├── CupolaGame.css (933 lines - animations, UI)
│   ├── CupolaView.css
│   ├── CupolaOverlay.css
│   └── HotspotPanel.css
│
├── Earth/
│   └── Hotspots.css
│
├── NBL/
│   ├── NBLExperienceEnhanced.css (1100+ lines)
│   ├── NBLExperience_old.css
│   ├── NBLControls.css
│   └── TaskPanel.css
│
└── Shared/
    └── Navigation.css
```

---

## 🚀 Import Path Structure

### Level 1: App.js → Modules
```javascript
'./components/Cupola/Component'
'./components/Earth/Component'
'./components/NBL/Component'
'./components/Shared/Component'
```

### Level 2: Module → Module
```javascript
'../Earth/Component'    // Cupola → Earth
'../NBL/Component'      // Cupola → NBL
```

### Level 3: Within Module
```javascript
'./Component'           // Same folder
'./SubComponent'        // Same folder
```

### Level 4: Module → Data
```javascript
'../../data/file.json'  // Any module → data
```

---

## 📝 Naming Conventions

### Components
- **Format:** PascalCase
- **Example:** `CupolaExperience.js`
- **Pattern:** `[ModuleName][ComponentType].js`

### Styles
- **Format:** Match component name
- **Example:** `CupolaExperience.css`
- **Pattern:** `[ComponentName].css`

### Data Files
- **Format:** camelCase
- **Example:** `hotspotsData.json`
- **Pattern:** `[dataType]Data.json`

### Modules
- **Format:** PascalCase
- **Example:** `Cupola/`, `Earth/`, `NBL/`
- **Pattern:** Single-word descriptive names

---

## 🎯 Quick Access Guide

### Working on Earth rendering?
```
📂 src/components/Earth/
Files: Earth.js, EarthScene.js, Hotspots.js
```

### Working on Cupola features?
```
📂 src/components/Cupola/
Files: CupolaExperience, CupolaGame, CupolaView
```

### Working on NBL training?
```
📂 src/components/NBL/
Files: NBLExperienceEnhanced (primary)
```

### Working on navigation?
```
📂 src/components/Shared/
Files: Navigation.js
```

---

## ✅ Organization Benefits

### Before Reorganization:
```
components/
├── CupolaExperience.js
├── CupolaGame.js
├── Earth.js
├── NBLExperience.js
├── Navigation.js
└── [28 more files mixed together]
```
❌ Hard to find related files
❌ No clear module boundaries
❌ Difficult to scale

### After Reorganization:
```
components/
├── Cupola/     [10 files]
├── Earth/      [4 files]
├── NBL/        [13 files]
└── Shared/     [2 files]
```
✅ Clear module boundaries
✅ Easy to find related files
✅ Simple to scale and maintain

---

**Last Updated:** October 5, 2025  
**Structure Version:** 2.0  
**Total Components:** 29 files  
**Total Lines:** ~7,400
