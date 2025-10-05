# Visit the live demo : https://nasa-seven-tau.vercel.app/

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


