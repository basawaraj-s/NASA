# 🎯 ISS Cupola & NBL Experience - User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Cupola Experience](#cupola-experience)
3. [NBL Training](#nbl-training)
4. [Tips & Tricks](#tips--tricks)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### First Launch
1. The app will open at `http://localhost:3000`
2. You'll see the **Navigation Bar** at the top with two main sections:
   - 🌍 **Cupola View** - ISS Earth observation experience
   - 🌊 **NBL Training** - Neutral Buoyancy Lab simulation

### System Requirements
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **WebGL**: Must be enabled for 3D graphics
- **Screen**: Desktop or tablet (1024px+ width recommended)
- **Internet**: Required for NASA imagery

---

## 🌍 Cupola Experience

### What is the ISS Cupola?
The Cupola is a seven-window observatory module on the International Space Station, providing panoramic views of Earth and space. Astronauts use it for:
- Earth observation and photography
- Robotic arm operations
- Spacecraft monitoring
- Educational outreach

### Controls

#### Mouse Controls
| Action | Effect |
|--------|--------|
| **Left Click + Drag** | Rotate Earth |
| **Scroll Wheel** | Zoom in/out |
| **Right Click + Drag** | Pan camera |
| **Click Marker** | View location details |

#### Touch Controls (Tablet)
| Gesture | Effect |
|---------|--------|
| **One Finger Drag** | Rotate |
| **Pinch** | Zoom |
| **Two Finger Drag** | Pan |
| **Tap Marker** | View details |

### Features

#### 1. **Interactive Hotspots**
- **Green glowing markers** indicate Earth observation points
- **Hover** to see location name
- **Click** to open detailed panel with:
  - NASA astronaut photography
  - Location coordinates
  - Temperature data
  - Natural phenomena observations
  - Scientific facts

#### 2. **Live ISS Data Display**
Located in top-left corner:
- **Altitude**: Current ISS orbit height (408 km)
- **Speed**: Orbital velocity (27,600 km/h)
- **Orbit Time**: Complete orbit duration (~90 minutes)

#### 3. **Location Examples**
- **North America**: Great Lakes observation
- **Amazon Basin**: Rainforest monitoring
- **Sahara Desert**: Sand dune patterns
- **Himalayas**: Snow-capped peaks
- **Great Barrier Reef**: Coral reef structures
- **Antarctica**: Ice sheet formations

### How to Explore
1. **Start by zooming out** to see the full Earth
2. **Rotate slowly** to find glowing markers
3. **Click markers** to learn about different regions
4. **Read observations** from real astronauts
5. **Close panels** and explore next location

---

## 🌊 NBL Training

### What is the NBL?
The Neutral Buoyancy Laboratory is NASA's astronaut training facility in Houston, Texas. It contains a massive pool (40 feet deep, 202 feet long) where astronauts practice spacewalks in simulated microgravity conditions.

### Understanding Neutral Buoyancy
- **Neutral (0 kg)**: Perfect balance - you float in place ✅
- **Negative (< 0 kg)**: Too light - you rise to surface ⬆️
- **Positive (> 0 kg)**: Too heavy - you sink to bottom ⬇️

### Controls

#### Weight Adjustment Panel (Bottom-Left)
- **Remove 0.5 kg** button: Decrease weight by 0.5 kg
- **Add 0.5 kg** button: Increase weight by 0.5 kg
- **Quick buttons**: -1 kg, +1 kg, Reset
- **Weight Display**: Shows current weight with color coding:
  - 🟢 Green: Neutral (±1 kg from target)
  - 🟡 Yellow: Rising (too light)
  - 🔴 Red: Sinking (too heavy)

#### Buoyancy Status Panel
Shows real-time status:
- **Icon**: Visual indicator (⚖️ neutral, ⬆️ rising, ⬇️ sinking)
- **Status Text**: Description of current state
- **Color Coding**: Visual feedback

### Tasks

#### Task Panel (Right Side)
Displays 6 training tasks with increasing difficulty:

1. **Enter the Hatch** (Easy)
   - **Points**: 100
   - **Target Weight**: 0 kg (±2 kg)
   - **Goal**: Achieve neutral buoyancy and navigate through hatch
   - **Duration**: 30 seconds

2. **Fix Solar Panel Module** (Medium)
   - **Points**: 200
   - **Target Weight**: 0 kg (±1.5 kg)
   - **Goal**: Maintain position while working on module
   - **Duration**: 45 seconds

3. **Collect Lunar Rock Sample** (Medium)
   - **Points**: 250
   - **Target Weight**: -3 kg (±1 kg)
   - **Goal**: Descend to pool floor and collect sample
   - **Duration**: 60 seconds

4. **Traverse Pool Floor** (Hard)
   - **Points**: 350
   - **Target Weight**: -4 kg (±0.5 kg)
   - **Goal**: Walk across pool floor maintaining contact
   - **Duration**: 90 seconds

5. **Emergency Tool Retrieval** (Hard)
   - **Points**: 300
   - **Target Weight**: 0 kg (±1 kg)
   - **Goal**: Quickly adjust buoyancy to retrieve floating tool
   - **Duration**: 40 seconds

6. **Module Connection** (Expert)
   - **Points**: 500
   - **Target Weight**: 0 kg (±0.5 kg)
   - **Goal**: Perfect neutral buoyancy for precise work
   - **Duration**: 120 seconds

### How to Complete Tasks

#### Step 1: Select a Task
- Click "Start Task" button on any uncompleted task
- Task will highlight and show in current task panel

#### Step 2: Adjust Weight
- Use weight adjustment controls
- Watch buoyancy status indicator
- Get within target weight range (shown in task details)

#### Step 3: Complete Task
- Once at target weight, click "✓ Complete Task" button
- If successful: Earn points and mark task complete
- If failed: Try again with better weight adjustment

#### Step 4: Track Progress
- **Score Display**: Shows total points (top center)
- **Task Counter**: Shows completed/total tasks
- **Completed Badge**: ✓ appears on finished tasks

### Visual Feedback

#### Astronaut Movement
- **Neutral**: Gentle floating animation
- **Sinking**: Slowly descends toward pool floor
- **Rising**: Slowly ascends toward surface

#### Environment
- **Pool Floor**: Grid pattern for depth reference
- **Training Modules**: ISS mock-ups in pool
- **Bubbles**: Rising particle effects
- **Lighting**: Underwater atmosphere

---

## 💡 Tips & Tricks

### Cupola Experience
1. **Zoom Range**: Don't zoom in too close - markers disappear inside Earth
2. **Marker Discovery**: Slowly rotate Earth to find all 6 hotspots
3. **Image Loading**: Wait a moment for NASA images to load
4. **Panel Reading**: Take time to read observations - they're educational!
5. **Multiple Views**: Try different camera angles for unique perspectives

### NBL Training
1. **Start Easy**: Begin with easier tasks to understand mechanics
2. **Small Adjustments**: Use 0.5 kg buttons for fine-tuning
3. **Quick Reset**: Use Reset button to quickly return to neutral
4. **Watch Status**: Keep eye on buoyancy status - color changes warn you
5. **Tolerance Range**: You don't need exact weight - stay within range
6. **Task Order**: Complete in order for progressive difficulty
7. **High Scores**: Expert tasks give most points but are hardest

### General
1. **Browser Performance**: Close other tabs for better 3D performance
2. **Full Screen**: Press F11 for immersive full-screen experience
3. **Responsive Design**: Works on desktop and tablet (not optimized for phone)
4. **Reload**: If stuck, refresh page (F5) to reset

---

## 🐛 Troubleshooting

### 3D Not Rendering
**Problem**: Black screen or no 3D visuals
**Solutions**:
- Enable WebGL in browser settings
- Update graphics drivers
- Try different browser (Chrome recommended)
- Check if hardware acceleration is enabled

### Low Performance
**Problem**: Choppy animation or lag
**Solutions**:
- Close other browser tabs and applications
- Lower screen resolution
- Update browser to latest version
- Check CPU/GPU usage in Task Manager

### Images Not Loading
**Problem**: Blank images in hotspot panels
**Solutions**:
- Check internet connection
- Wait longer - NASA servers may be slow
- Placeholder images will show if URL fails
- Try refreshing the page

### Controls Not Working
**Problem**: Can't rotate Earth or adjust weight
**Solutions**:
- Click inside the 3D viewport first
- Ensure mouse/touchpad is working properly
- Try keyboard + mouse combo
- Refresh the page

### Tasks Won't Complete
**Problem**: "Complete Task" button doesn't work
**Solutions**:
- Verify you're within target weight range
- Check tolerance range in task details
- Make sure you clicked "Start Task" first
- Weight must be stable (not rapidly changing)

### Browser Compatibility
**Recommended**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
**Not Supported**: Internet Explorer, very old browsers

---

## 🎓 Educational Context

### ISS Facts
- **Orbit Altitude**: 408 km (253 miles)
- **Speed**: 27,600 km/h (17,150 mph)
- **Orbit Time**: ~90 minutes per complete orbit
- **Daily Sunrises**: 16 per day!
- **Crew Size**: Typically 6-7 astronauts
- **Cupola Windows**: 7 windows (largest is 80 cm diameter)

### NBL Facts
- **Pool Size**: 40 feet deep, 202 feet long, 102 feet wide
- **Water Volume**: 6.2 million gallons
- **Training Time**: Astronauts train 7 hours underwater for 1 hour spacewalk
- **Weight Ratio**: Need to counteract ~300 lb spacesuit
- **Location**: Sonny Carter Training Facility, Houston, TX
- **Safety Divers**: Multiple divers assist each training session

---

## 🎮 Game Mechanics

### Scoring System
- **Easy Tasks**: 100-200 points
- **Medium Tasks**: 200-250 points
- **Hard Tasks**: 300-350 points
- **Expert Tasks**: 500 points
- **Maximum Score**: 1,700 points (all 6 tasks)

### Difficulty Factors
1. **Target Weight**: Harder tasks need specific weights
2. **Tolerance Range**: Expert tasks have tighter ranges
3. **Duration**: Longer tasks are more challenging
4. **Complexity**: Task objectives increase in difficulty

---

## 📚 Learning Resources

Want to learn more about real ISS and NBL operations?

### NASA Resources
- **ISS Website**: https://www.nasa.gov/mission_pages/station/main/index.html
- **Earth Observatory**: https://earthobservatory.nasa.gov
- **NBL Facility**: https://www.nasa.gov/centers/johnson/news/factsheets/FS_neutral_buoyancy_lab.html
- **Astronaut Training**: https://www.nasa.gov/astronauts

### Videos
- Search "ISS Cupola view" on YouTube for real footage
- "Neutral Buoyancy Lab training" for underwater sessions
- "Astronaut spacewalk training" for NBL content

---

## 🆘 Support

If you encounter issues not covered here:
1. Check browser console (F12) for error messages
2. Review README.md for technical details
3. Ensure all dependencies are installed
4. Try clearing browser cache
5. Update to latest version

---

**Enjoy your virtual journey to space! 🚀🌍✨**
