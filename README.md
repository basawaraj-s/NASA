# 🚀 ISS Cupola & Neutral Buoyancy Lab Experience

An interactive 3D web application built with React and Three.js that simulates the ISS Cupola Earth observation experience and the Neutral Buoyancy Laboratory training environment.

![NASA ISS Experience](https://img.shields.io/badge/NASA-ISS_Experience-fc3d21?style=for-the-badge&logo=nasa)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-3D_Graphics-000000?style=for-the-badge&logo=three.js)

## 🌟 Features

### 🌍 ISS Cupola Experience
- **3D Rotating Earth** with realistic textures and space environment
- **Interactive Hotspots** on continents with NASA imagery and facts
- **Starfield Background** for immersive space effect
- **Smooth Camera Controls** - zoom, rotate, and pan
- **Educational Content** - NASA astronaut photos, observations, and data
- **Real-time Information** - altitude, speed, and orbit details

### 🌊 Neutral Buoyancy Lab (NBL) Training
- **3D Underwater Environment** simulating microgravity training
- **Weight Adjustment System** for achieving neutral buoyancy
- **Interactive Tasks** including:
  - Enter the hatch
  - Fix solar panel modules
  - Collect lunar rock samples
  - Traverse pool floor
  - Emergency tool retrieval
  - Module connection
- **Visual Feedback** - astronaut floats, sinks, or rises based on weight
- **Progress Tracking** - score system and task completion tracking
- **Realistic Physics** - buoyancy simulation

## 🛠️ Technology Stack

- **React** 18.2.0 - UI framework
- **Three.js** - 3D graphics rendering
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **TailwindCSS** - Styling framework
- **PostCSS** - CSS processing

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🚀 Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd "C:\Users\Paul Raj\Nasa o1"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   The app will automatically open at `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🎮 How to Use

### Cupola View
1. Click the **"Cupola View"** button in the navigation
2. Use your mouse to:
   - **Drag** to rotate the Earth
   - **Scroll** to zoom in/out
   - **Right-click + drag** to pan
3. Click on **glowing markers** to view NASA imagery and information
4. Close popups by clicking the X or outside the panel

### NBL Training
1. Click the **"NBL Training"** button in the navigation
2. Select a task from the **Task Panel** on the right
3. Use the **Weight Adjustment** controls to:
   - Add/remove weight in 0.5 kg increments
   - Use quick adjustment buttons for faster changes
   - Reset to neutral (0 kg)
4. Monitor your **Buoyancy Status**:
   - 🟢 **Neutral** - Perfect balance
   - 🔴 **Sinking** - Too heavy
   - 🟡 **Rising** - Too light
5. Complete tasks when you achieve the target weight
6. Earn points and track your progress

## 📊 Data Sources

### NASA Resources Used:
- **NASA Image and Video Library**: [https://images.nasa.gov](https://images.nasa.gov)
- **ISS Earth Observations**: [https://eol.jsc.nasa.gov](https://eol.jsc.nasa.gov)
- **NASA Open APIs**: [https://api.nasa.gov](https://api.nasa.gov)
- **Blue Marble Textures**: [https://visibleearth.nasa.gov](https://visibleearth.nasa.gov)

### Custom Data Files:
- `src/data/hotspotsData.json` - Earth observation hotspots
- `src/data/nblTasks.json` - NBL training tasks

## � Documentation

Comprehensive documentation is available in the `docs/` folder:

### Quick Start
- **[User Guide](USER_GUIDE.md)** - Complete guide to using the application
- **[Quick Reference](QUICK_REFERENCE.md)** - Controls and shortcuts cheat sheet

### Detailed Documentation
- **[📖 Documentation Index](docs/README.md)** - Complete documentation overview
- **[🌍 Earth & Cupola View](docs/earth-view/)** - 3D Earth implementation guides
- **[🚀 NBL Training Game](docs/nbl-training/)** - Complete NBL training documentation
- **[🎮 Space Game](docs/game/)** - Cupola mini-game documentation

### Recommended Reading Order
1. Start with this README for setup and installation
2. Read [USER_GUIDE.md](USER_GUIDE.md) to learn the features
3. Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for controls
4. Browse [docs/README.md](docs/README.md) for detailed documentation by topic

## �🗂️ Project Structure

```
nasa-o1/
├── docs/                           ← 📚 All documentation
│   ├── README.md                   ← Documentation index
│   ├── earth-view/                 ← Earth & Cupola docs (3 files)
│   ├── nbl-training/               ← NBL game docs (12 files)
│   └── game/                       ← Space game docs
├── public/
│   ├── index.html
│   └── astronaut.glb
├── src/
│   ├── components/
│   │   ├── Earth/
│   │   │   ├── Earth.js
│   │   │   ├── EarthScene.js
│   │   │   ├── Hotspots.js
│   │   │   └── Hotspots.css
│   │   ├── Cupola/
│   │   │   ├── CupolaOverlay.js
│   │   │   ├── CupolaOverlay.css
│   │   │   ├── HotspotPanel.js
│   │   │   └── HotspotPanel.css
│   │   ├── NBL/
│   │   │   ├── Astronaut.js
│   │   │   ├── NBLControls.js
│   │   │   ├── NBLControls.css
│   │   │   ├── NBLScene.js
│   │   │   ├── NBLSceneEnhanced.js
│   │   │   ├── PoolEnvironment.js
│   │   │   ├── TaskPanel.js
│   │   │   └── TaskPanel.css
│   │   ├── Navigation.js
│   │   ├── Navigation.css
│   │   ├── CupolaView.js
│   │   ├── CupolaView.css
│   │   ├── CupolaGame.js
│   │   ├── CupolaGame.css
│   │   ├── CupolaExperience.js
│   │   ├── CupolaExperience.css
│   │   ├── NBLExperience.js
│   │   ├── NBLExperience.css
│   │   ├── NBLExperienceEnhanced.js
│   │   └── NBLExperienceEnhanced.css
│   ├── data/
│   │   ├── hotspotsData.json
│   │   └── nblTasks.json
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── README.md                       ← You are here
├── USER_GUIDE.md                   ← User guide
└── QUICK_REFERENCE.md              ← Quick reference
```

## 🎨 Customization

### Adding New Hotspots
Edit `src/data/hotspotsData.json`:
```json
{
  "id": 7,
  "name": "Your Location",
  "position": [lon, lat, radius],
  "coordinates": { "lat": 0, "lon": 0 },
  "title": "Location Title",
  "description": "Description here...",
  "imageUrl": "https://...",
  "observations": ["Observation 1", "Observation 2"],
  "temperature": "20°C",
  "naturalEvents": "Events here"
}
```

### Adding New Tasks
Edit `src/data/nblTasks.json`:
```json
{
  "id": 7,
  "task": "Task Name",
  "difficulty": "easy|medium|hard|expert",
  "instructions": "Task instructions...",
  "targetWeight": 0,
  "toleranceRange": 1,
  "duration": 60,
  "points": 100
}
```

## 🔧 Configuration

### Colors
Modify `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  space: { dark: '#0a0e27', blue: '#1a237e', light: '#283593' },
  nasa: { red: '#fc3d21', blue: '#0b3d91' }
}
```

### 3D Settings
Adjust camera and scene settings in:
- `src/components/Earth/EarthScene.js`
- `src/components/NBL/NBLScene.js`

## 🐛 Troubleshooting

### Issue: 3D scenes not rendering
- Ensure WebGL is enabled in your browser
- Try a different browser (Chrome recommended)
- Check browser console for errors

### Issue: Images not loading
- Check internet connection
- NASA image URLs may need updating
- Fallback placeholder images are provided

### Issue: Performance issues
- Close other browser tabs
- Reduce number of stars in Earth scene
- Lower particle count in NBL scene

## 🚀 Future Enhancements

- [ ] Add real NASA Blue Marble Earth textures
- [ ] Integrate live ISS position tracking
- [ ] Add VR support for immersive experience
- [ ] Implement multiplayer NBL training
- [ ] Add voice narration for educational content
- [ ] Mobile app version (React Native)
- [ ] Save progress and achievements
- [ ] Leaderboard system

## 📄 License

This project is created for educational purposes using publicly available NASA data and imagery.

## 🙏 Acknowledgments

- **NASA** for providing amazing imagery and data
- **ISS Crew** for capturing Earth observations
- **Three.js** community for 3D graphics tools
- **React Three Fiber** team for React integration

## 📞 Contact

For questions or suggestions, please open an issue on the repository.

---

**Made with ❤️ for space exploration and education**

🌍 🚀 🌟

## 🔁 How to upload the codebase to GitHub

Quick steps (run in repo root: C:\Users\HP\Documents\Nasa o1\Nasa o1):

1. Set identity (one-time or per-repo)
```bash
# global (recommended)
git config --global user.email "you@example.com"
git config --global user.name "Your Name"

# or repo-local (run inside repo)
git config user.email "you@example.com"
git config user.name "Your Name"
```

2. Inspect or fix remote
```bash
# show remotes
git remote -v

# if origin exists but wrong URL:
git remote set-url origin https://github.com/youruser/yourrepo.git

# or remove+re-add:
git remote remove origin
git remote add origin https://github.com/youruser/yourrepo.git
```

3. Commit and push
```bash
# create initial commit if you don't have one
git add .
git commit -m "Initial commit"

# ensure branch name matches remote (use main)
git branch -M main

# push and set upstream
git push -u origin main
```

4. If you get "src refspec main does not match any"
- You likely have no commits; run git commit first.
- Or your branch is named master — push master (git push -u origin master) or rename with git branch -M main.

5. If "remote origin already exists" error
- Use git remote set-url origin <url> to update the URL, or remove then add as shown above.

6. Authentication notes
- For HTTPS pushes use a GitHub Personal Access Token (PAT) instead of password.
- Alternatively use GitHub CLI:
```bash
gh auth login
gh repo create --public --source=. --remote=origin
git push -u origin main
```

7. Quick recovery for common state
```bash
# ensure at least one commit and push
git add .
git commit -m "Fix: index.js and initial project files"
git branch -M main
git push -u origin main
```

Troubleshooting tips
- If push is rejected, run git status and git branch -vv to inspect.
- If remote uses a different default branch name, adapt (master/main).
- For HTTPS auth failures, generate a PAT at https://github.com/settings/tokens and use your username and PAT when prompted.