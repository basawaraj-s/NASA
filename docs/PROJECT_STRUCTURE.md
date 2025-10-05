# 🏗️ Project Structure - NASA ISS Experience

## 📁 Complete Directory Organization

This document describes the reorganized modular structure of the NASA ISS Experience project.

---

## 🎯 Directory Structure

```
nasa-o1/
├── 📂 src/
│   ├── 📂 components/
│   │   ├── 📂 Cupola/           # Cupola Window Experience Module
│   │   │   ├── CupolaExperience.js
│   │   │   ├── CupolaExperience.css
│   │   │   ├── CupolaGame.js
│   │   │   ├── CupolaGame.css
│   │   │   ├── CupolaView.js
│   │   │   ├── CupolaView.css
│   │   │   ├── CupolaOverlay.js
│   │   │   ├── CupolaOverlay.css
│   │   │   ├── HotspotPanel.js
│   │   │   └── HotspotPanel.css
│   │   │
│   │   ├── 📂 Earth/            # 3D Earth View Module
│   │   │   ├── Earth.js
│   │   │   ├── EarthScene.js
│   │   │   ├── Hotspots.js
│   │   │   └── Hotspots.css
│   │   │
│   │   ├── 📂 NBL/              # NBL Training Module
│   │   │   ├── NBLExperience.js
│   │   │   ├── NBLExperience_old.css
│   │   │   ├── NBLExperienceEnhanced.js
│   │   │   ├── NBLExperienceEnhanced.css
│   │   │   ├── NBLScene.js
│   │   │   ├── NBLSceneEnhanced.js
│   │   │   ├── NBLControls.js
│   │   │   ├── NBLControls.css
│   │   │   ├── TaskPanel.js
│   │   │   ├── TaskPanel.css
│   │   │   ├── Astronaut.js
│   │   │   └── PoolEnvironment.js
│   │   │
│   │   └── 📂 Shared/           # Shared/Reusable Components
│   │       ├── Navigation.js
│   │       └── Navigation.css
│   │
│   ├── 📂 data/                 # JSON Data Files
│   │   ├── hotspotsData.json
│   │   └── nblTasks.json
│   │
│   ├── App.js                   # Main Application Component
│   ├── App.css
│   ├── index.js                 # React Entry Point
│   └── index.css                # Global Styles
│
├── 📂 public/
│   ├── index.html
│   ├── verify-images.html
│   ├── astronaut.glb
│   ├── 📂 images/
│   │   └── 📂 hotspots/
│   │       ├── antarctic-ice.jpg
│   │       ├── great-barrier-reef.jpg
│   │       ├── great-lakes.jpg
│   │       ├── himalayas.jpg
│   │       └── sahara-desert.jpg
│   └── 📂 textures/
│       ├── clouds_earth.png
│       ├── earth_albedo.jpg
│       ├── earth_bump.jpg
│       ├── earth_land_ocean_mask.png
│       └── earth_night_lights_modified.png
│
├── 📂 docs/                     # Documentation
│   ├── README.md                # Main documentation
│   ├── USER_GUIDE.md            # User guide
│   ├── QUICK_REFERENCE.md       # Quick reference
│   ├── BUG_FIXES.md             # Bug tracking
│   ├── PROJECT_STRUCTURE.md     # This file
│   ├── 📂 earth-view/
│   ├── 📂 game/
│   └── 📂 nbl-training/
│
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md

```

---

## 🎯 Module Breakdown

### 1. **Cupola Module** (`src/components/Cupola/`)
**Purpose:** ISS Cupola window experience with Earth viewing and space game

**Components:**
- `CupolaExperience.js` - Main Cupola window component with 3D Earth view
- `CupolaView.js` - Events & Disasters viewing mode
- `CupolaGame.js` - Space Defense Game with power-ups, bosses, achievements
- `CupolaOverlay.js` - UI overlay for Cupola window
- `HotspotPanel.js` - Interactive hotspot information panels

**Features:**
- 3D Earth visualization
- Interactive hotspot system
- Space shooter game (500+ lines of professional game mechanics)
- Real-time Earth rotation
- Glass morphism UI

---

### 2. **Earth Module** (`src/components/Earth/`)
**Purpose:** 3D Earth rendering and hotspot management

**Components:**
- `Earth.js` - Earth sphere with textures and lighting
- `EarthScene.js` - Three.js scene setup for Earth view
- `Hotspots.js` - Interactive 3D hotspot markers
- `Hotspots.css` - Hotspot styling

**Features:**
- High-resolution Earth textures (albedo, bump, night lights, clouds)
- Realistic lighting and shadows
- Rotation animation
- 5 Geographic hotspots (Antarctica, Sahara, Himalayas, Great Lakes, Great Barrier Reef)

---

### 3. **NBL Module** (`src/components/NBL/`)
**Purpose:** Neutral Buoyancy Laboratory training simulation

**Components:**
- `NBLExperienceEnhanced.js` - Enhanced NBL training game (PRIMARY)
- `NBLExperience.js` - Original NBL experience (legacy)
- `NBLSceneEnhanced.js` - Enhanced 3D underwater scene
- `NBLScene.js` - Original 3D scene
- `NBLControls.js` - Astronaut movement controls
- `TaskPanel.js` - Mission objectives panel
- `Astronaut.js` - 3D astronaut model
- `PoolEnvironment.js` - Underwater pool environment

**Features:**
- Mission-based gameplay
- Oxygen management system
- Tool collection mechanics
- Repair panel tasks
- Cable connection challenges
- Combo system with scoring
- Achievement unlocks
- Statistics tracking
- Free play mode

---

### 4. **Shared Module** (`src/components/Shared/`)
**Purpose:** Reusable components used across multiple modules

**Components:**
- `Navigation.js` - Top navigation bar
- `Navigation.css` - Navigation styling

**Features:**
- Consistent navigation across all views
- Active page highlighting
- Responsive design
- Location display

---

## 📊 Import Path Reference

### Updated Import Paths

After reorganization, import paths have been updated as follows:

**In App.js:**
```javascript
import Navigation from './components/Shared/Navigation';
import CupolaExperience from './components/Cupola/CupolaExperience';
import CupolaView from './components/Cupola/CupolaView';
import CupolaGame from './components/Cupola/CupolaGame';
import NBLExperience from './components/NBL/NBLExperience';
import NBLExperienceEnhanced from './components/NBL/NBLExperienceEnhanced';
```

**In Cupola Components:**
```javascript
// CupolaExperience.js
import EarthScene from '../Earth/EarthScene';
import HotspotPanel from './HotspotPanel';
import CupolaOverlay from './CupolaOverlay';
import hotspotsData from '../../data/hotspotsData.json';
```

**In NBL Components:**
```javascript
// NBLExperienceEnhanced.js
import NBLSceneEnhanced from './NBLSceneEnhanced';

// NBLExperience.js
import NBLScene from './NBLScene';
import NBLControls from './NBLControls';
import TaskPanel from './TaskPanel';
import nblTasks from '../../data/nblTasks.json';
```

---

## 🎨 CSS Organization

Each module maintains its own CSS files co-located with components:

### Cupola Module CSS:
- `CupolaExperience.css` - Main Cupola styles
- `CupolaGame.css` - Game UI, animations, power-ups (933 lines)
- `CupolaView.css` - Events view styles
- `CupolaOverlay.css` - Overlay UI
- `HotspotPanel.css` - Panel styling

### Earth Module CSS:
- `Hotspots.css` - Hotspot marker styles

### NBL Module CSS:
- `NBLExperienceEnhanced.css` - Enhanced game styles (1100+ lines)
- `NBLExperience_old.css` - Legacy styles
- `NBLControls.css` - Control panel styles
- `TaskPanel.css` - Task UI styles

### Shared CSS:
- `Navigation.css` - Navigation bar styles

---

## 📦 Data Files

Located in `src/data/`:

### `hotspotsData.json`
Earth hotspot information including:
- Geographic coordinates
- Names and descriptions
- Associated images
- Category tags

### `nblTasks.json`
NBL training mission data including:
- Task descriptions
- Completion criteria
- Difficulty levels
- Time limits

---

## 📚 Documentation Organization

All documentation is in the `docs/` folder:

### Root Documentation:
- `README.md` - Main project documentation
- `USER_GUIDE.md` - End-user guide
- `QUICK_REFERENCE.md` - Quick reference guide
- `BUG_FIXES.md` - Bug tracking and fixes
- `PROJECT_STRUCTURE.md` - This file

### Module-Specific Docs:

**`docs/earth-view/`** - Earth visualization documentation
**`docs/game/`** - Space game documentation (features, enhancements, player guide)
**`docs/nbl-training/`** - NBL training system documentation (complete guides, architecture)

---

## 🚀 Benefits of This Structure

### ✅ **Modularity**
- Each module is self-contained
- Easy to locate related files
- Clear separation of concerns

### ✅ **Scalability**
- Easy to add new modules
- Simple to expand existing modules
- Clear patterns for new components

### ✅ **Maintainability**
- Related code is grouped together
- Reduced import path complexity within modules
- Easier debugging and refactoring

### ✅ **Team Collaboration**
- Different developers can work on different modules
- Reduced merge conflicts
- Clear ownership boundaries

### ✅ **Code Reusability**
- Shared components in dedicated folder
- Consistent patterns across modules
- DRY principle enforcement

---

## 🔧 Development Guidelines

### Adding New Components:

1. **Determine the module** - Cupola, Earth, NBL, or Shared
2. **Create component in appropriate folder**
3. **Co-locate CSS with JS file**
4. **Use relative imports within module**
5. **Update documentation**

### Import Path Rules:

- **Same folder:** `import Component from './Component';`
- **Sibling folder:** `import Component from '../Folder/Component';`
- **Data folder:** `import data from '../../data/file.json';`
- **Shared components:** `import Shared from '../Shared/Component';`

### File Naming Conventions:

- **Components:** PascalCase (e.g., `CupolaGame.js`)
- **Styles:** Match component name (e.g., `CupolaGame.css`)
- **Data:** camelCase (e.g., `hotspotsData.json`)
- **Docs:** SCREAMING_SNAKE_CASE (e.g., `USER_GUIDE.md`)

---

## 📝 Migration Notes

### What Changed:

1. ✅ Created `Shared/` folder for Navigation components
2. ✅ Moved all Cupola files to `Cupola/` subfolder
3. ✅ Moved all NBL files to `NBL/` subfolder
4. ✅ Updated all import paths in App.js
5. ✅ Updated all import paths in module components
6. ✅ Moved root-level .md files to `docs/` folder
7. ✅ Renamed duplicate NBLExperience.css to NBLExperience_old.css
8. ✅ Removed duplicate files from root components/

### No Breaking Changes:

- ✅ All imports updated automatically
- ✅ All CSS references updated
- ✅ Data paths corrected
- ✅ No compilation errors
- ✅ Full backward compatibility

---

## 🎯 Quick Navigation

**Earth View Module:**
- Entry: `src/components/Earth/EarthScene.js`
- Used by: `CupolaExperience.js`
- Features: 3D Earth, hotspots, textures

**Cupola Experience Module:**
- Entry: `src/components/Cupola/CupolaExperience.js`
- Routes: `/cupola`, `/events`, `/game`
- Features: Window view, events, space game

**NBL Training Module:**
- Entry: `src/components/NBL/NBLExperienceEnhanced.js`
- Route: `/nbl`
- Features: Training missions, tasks, achievements

**Shared Components:**
- Location: `src/components/Shared/`
- Components: Navigation
- Used by: All modules via App.js

---

## 📊 Component Dependency Graph

```
App.js
├── Navigation (Shared)
├── CupolaExperience (Cupola)
│   ├── EarthScene (Earth)
│   │   ├── Earth (Earth)
│   │   └── Hotspots (Earth)
│   ├── CupolaOverlay (Cupola)
│   └── HotspotPanel (Cupola)
├── CupolaView (Cupola)
├── CupolaGame (Cupola)
└── NBLExperienceEnhanced (NBL)
    └── NBLSceneEnhanced (NBL)
        ├── Astronaut (NBL)
        └── PoolEnvironment (NBL)
```

---

## 🔄 Version History

**v2.0 - October 5, 2025**
- ✅ Complete modular reorganization
- ✅ Created Cupola/, Earth/, NBL/, Shared/ folders
- ✅ Updated all import paths
- ✅ Consolidated documentation
- ✅ Removed duplicate files
- ✅ Established clear module boundaries

**v1.x - Previous**
- Flat component structure
- Mixed concerns
- Inconsistent organization

---

## 📞 Support

For questions about the project structure:
1. Check this document first
2. Review module-specific docs in `docs/` subfolders
3. Check component files for inline comments

---

**Last Updated:** October 5, 2025  
**Structure Version:** 2.0  
**Status:** ✅ Fully Reorganized & Tested
