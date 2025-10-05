# 🎮 NBL TRAINING GAME - SYSTEM ARCHITECTURE

## 📊 COMPLETE SYSTEM OVERVIEW

```
┌─────────────────────────────────────────────────────────────────────┐
│                       NBL TRAINING GAME                              │
│                     (NBLExperienceEnhanced.js)                       │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
         ┌──────────▼─────────┐    ┌─────────▼─────────┐
         │   GAME MODES       │    │   3D SCENE        │
         ├────────────────────┤    │ (NBLSceneEnhanced)│
         │ • Mission Mode     │    ├───────────────────┤
         │ • Free Play Mode   │    │ • Pool Environment│
         │ • Main Menu        │    │ • Astronaut Model │
         └────────────────────┘    │ • Floating Objects│
                                   │ • Lighting/Effects│
                                   └───────────────────┘
```

---

## 🎯 MISSION SYSTEM FLOW

```
START
  │
  ▼
┌───────────────────────┐
│   MAIN MENU           │
│  ┌─────────────────┐  │
│  │ Mission Mode    │◄─┼─ User Clicks
│  │ Free Play       │  │
│  │ Back to Cupola  │  │
│  └─────────────────┘  │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────────────────────────┐
│   MISSION BRIEFING                        │
│  ┌─────────────────────────────────────┐  │
│  │ 🎓 Mission: Fix the Solar Panel     │  │
│  │                                     │  │
│  │ Objectives:                         │  │
│  │ ☐ Collect repair tool               │  │
│  │ ☐ Navigate to solar array           │  │
│  │ ☐ Complete repair sequence          │  │
│  │                                     │  │
│  │ 📦 Objects in This Mission:         │  │
│  │ ┌──────────┬──────────┐            │  │
│  │ │🔧 1 Tool │☀️ Solar  │            │  │
│  │ │          │  Array   │            │  │
│  │ └──────────┴──────────┘            │  │
│  │                                     │  │
│  │ 💡 Quick Tips:                      │  │
│  │ → Look for glowing objects          │  │
│  │ → Get within 3 units, press E       │  │
│  │                                     │  │
│  │      [START MISSION]                │  │
│  └─────────────────────────────────────┘  │
└──────────────┬────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│   GAMEPLAY                               │
│  ┌────────────────────────────────────┐  │
│  │ HUD (Top)                          │  │
│  │ Score│O₂│Time│Combo│Objects│Pos   │  │
│  └────────────────────────────────────┘  │
│                                          │
│        3D Scene with Objects             │
│      (Tools, Panels, Cables, Solar)      │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ Proximity Hints (Bottom)           │  │
│  │ 💡 Press E to collect wrench       │  │
│  │ 🔧 WRENCH (held tool)              │  │
│  └────────────────────────────────────┘  │
└──────────────┬───────────────────────────┘
               │
               ▼
┌───────────────────────────────────────────┐
│   MISSION COMPLETE                        │
│  ┌─────────────────────────────────────┐  │
│  │ 🎉 MISSION COMPLETE!                │  │
│  │                                     │  │
│  │ Final Score: 850                    │  │
│  │ Time: 87s                           │  │
│  │ Accuracy: 95%                       │  │
│  │                                     │  │
│  │ [NEXT MISSION] [MAIN MENU]          │  │
│  └─────────────────────────────────────┘  │
└───────────────────────────────────────────┘
```

---

## 🔧 OBJECT SPAWN SYSTEM

```
startMission(mission)
         │
         ▼
   spawnMissionObjects(mission)
         │
         ├──► Mission 1: spawnRandomTools(1)
         │              setSolarArray({position: X:10, Y:2, Z:-10})
         │
         ├──► Mission 2: spawnRandomTools(5)
         │
         ├──► Mission 3: spawnCables(3)
         │              [Red, Blue, Yellow cables]
         │
         ├──► Mission 4: spawnRepairPanels(4)
         │              (User must find tools)
         │
         └──► Mission 5: spawnRandomTools(3)
                        spawnRepairPanels(2)
                        spawnCables(2)
                        setSolarArray({...})

Each spawn function creates objects with:
- Unique ID
- Random position (except Solar Array = fixed)
- Initial state (collected: false, repaired: false, etc.)
- Visual properties (color, type, rotation)
```

---

## 🎮 INTERACTION SYSTEM

```
Player presses E key
         │
         ▼
   handleInteraction()
         │
         ├──► Check nearby tools (distance < 3)
         │    └─► collectTool(tool)
         │        - Mark as collected
         │        - Set heldTool
         │        - Add to score (+50)
         │        - Play sound
         │
         ├──► Check nearby panels (distance < 3, has tool)
         │    └─► repairPanel(panel)
         │        - Increase health (+20)
         │        - Update visual (health bar)
         │        - Play sound
         │        - If 100%: Mark repaired (+200 points)
         │
         ├──► Check nearby cables (distance < 3)
         │    └─► connectCable(cable)
         │        - Mark as connected
         │        - Turn green
         │        - Add to score (+150)
         │        - Play sound
         │
         └──► Check solar array (distance < 4, has tool)
              └─► repairSolarArray()
                  - Increase progress (+20%)
                  - Show notification
                  - If 100%: Mark complete (+500 points)
                  - Check mission completion
```

---

## 🚀 MOVEMENT SYSTEM

```
Keyboard Input
     │
     ├─► W/↑   → setAstronautVelocity({ z: -0.3 })  [Forward]
     ├─► S/↓   → setAstronautVelocity({ z: +0.3 })  [Backward]
     ├─► A/←   → setAstronautVelocity({ x: -0.3 })  [Left]
     │           setAstronautRotation(+0.1)         [Rotate]
     ├─► D/→   → setAstronautVelocity({ x: +0.3 })  [Right]
     │           setAstronautRotation(-0.1)         [Rotate]
     ├─► Space → setAstronautVelocity({ y: +0.3 })  [Up]
     └─► Shift → setAstronautVelocity({ y: -0.3 })  [Down]

useEffect (game loop):
     │
     ├─► Update astronaut position from velocity
     ├─► Apply drag (velocity *= 0.9)
     ├─► Check proximity to objects
     └─► Update hints
```

---

## 📊 HUD SYSTEM

```
┌──────────────────────────────────────────────┐
│ Top Bar                                      │
├──────────┬─────────┬──────────┬──────────────┤
│ SCORE    │ OXYGEN  │ TIME     │ COMBO        │
│ {score}  │ {O₂}%   │ {time}s  │ x{combo}     │
├──────────┴─────────┴──────────┴──────────────┤
│ OBJECTS                                      │
│ T:{toolsLeft} P:{panelsLeft} C:{cablesLeft}  │
└──────────────────────────────────────────────┘

┌──────────────────────────┐
│ Position (Top-Right)     │
├──────────────────────────┤
│ X: {x.toFixed(1)}        │
│ Y: {y.toFixed(1)}        │
│ Z: {z.toFixed(1)}        │
└──────────────────────────┘

┌────────────────────────────────────┐
│ Bottom Bar                         │
├────────────────────────────────────┤
│ 💡 {proximityHint}                 │
│ 🔧 {heldTool.type.toUpperCase()}   │
└────────────────────────────────────┘

┌────────────────────────────┐
│ Help Hint (Top-Right)      │
├────────────────────────────┤
│ Press H for Help           │
└────────────────────────────┘
```

---

## 🎨 VISUAL INDICATORS

```
TOOLS 🔧
├─ BoxGeometry (body + head)
├─ MeshStandardMaterial (metallic, glowing)
├─ PointLight (colored glow)
├─ Points (particle effects)
└─ Rotation animation (floating)

REPAIR PANELS 📦
├─ BoxGeometry (panel base)
├─ PlaneGeometry (health bar background)
├─ PlaneGeometry (health fill - animated width)
├─ CircleGeometry x3 (indicator lights)
├─ PointLight (red/green based on state)
└─ Rotation animation (subtle wobble)

CABLES 🔌
├─ CylinderGeometry (start/end points)
├─ Line (curved path between points)
├─ BufferGeometry (animated curve)
├─ PointLight x2 (at connection points)
└─ Wave animation (in water)

SOLAR ARRAY ☀️
├─ BoxGeometry (central mast)
├─ BoxGeometry x2 (solar panels)
├─ RingGeometry (progress indicator)
├─ Points (spark particles when damaged)
├─ PointLight (red/green based on state)
└─ Rotation animation (when damaged)
```

---

## 🔊 AUDIO SYSTEM

```
Web Audio API
     │
     ├─► pickup: 800Hz → 1200Hz (0.2s)
     ├─► collect: 600Hz → 900Hz (0.3s)
     ├─► repair: 400Hz → 800Hz (0.4s)
     ├─► success: 800Hz → 1600Hz (0.5s)
     ├─► error: 200Hz → 100Hz (0.3s)
     └─► bubbles: 100-300Hz (0.5s)

All use OscillatorNode + GainNode
```

---

## 📱 STATE MANAGEMENT

```javascript
// Game State (30+ useState hooks)
├─ gameStarted: boolean
├─ gameMode: 'menu' | 'mission' | 'freeplay'
├─ currentMission: Mission object
│
├─ astronautPosition: {x, y, z}
├─ astronautRotation: number
├─ astronautVelocity: {x, y, z}
│
├─ score: number
├─ oxygen: number
├─ timeElapsed: number
├─ missionTime: number
├─ combo: number
│
├─ tools: Array<Tool>
├─ heldTool: Tool | null
├─ repairPanels: Array<Panel>
├─ cables: Array<Cable>
├─ solarArray: SolarArray
│
├─ showTutorial: boolean
├─ showHelp: boolean
├─ showObjectiveTracker: boolean
├─ notification: string
└─ hint: string
```

---

## 🎯 MISSION COMPLETION LOGIC

```
checkMissionCompletion()
     │
     ├─► Mission 1: solarArray.progress >= 100
     ├─► Mission 2: all tools collected
     ├─► Mission 3: all cables connected
     ├─► Mission 4: all panels repaired
     └─► Mission 5: all objectives complete
              │
              ▼
         Calculate scores:
              - Base: mission.reward
              - Speed bonus: timeBonus
              - Combo bonus: comboMultiplier
              - Accuracy bonus: accuracyPercent
              │
              ▼
         Show mission complete overlay
              │
              ▼
         Update completedMissions[]
```

---

## 🎮 HELP SYSTEM

```
Press H key
     │
     ▼
Show Help Overlay
     │
     ├─ Current Mission Info
     │  - Title, description
     │  - Objectives checklist
     │
     ├─ Available Objects
     │  - 🔧 Tools (X remaining)
     │  - 📦 Panels (X remaining)
     │  - 🔌 Cables (X remaining)
     │  - ☀️ Solar Array (X% repaired)
     │
     ├─ Controls Reference
     │  - Movement keys
     │  - Action keys
     │
     └─ Tips & Tricks
        - Proximity hints
        - Navigation tips
        - Strategy advice

Press Tab key
     │
     ▼
Show Objective Tracker
     │
     └─ Mission objectives with checkboxes
        - ✅ Complete
        - ☐ Incomplete
        - Time & Score display
```

---

## 📦 FILE STRUCTURE

```
src/components/
├─ NBLExperienceEnhanced.js (1200+ lines)
│  ├─ Game state management
│  ├─ Mission system
│  ├─ Interaction logic
│  ├─ UI components
│  └─ Main game loop
│
├─ NBLExperienceEnhanced.css (1100+ lines)
│  ├─ Menu styles
│  ├─ HUD styles
│  ├─ Tutorial/Help styles
│  ├─ Mission complete styles
│  └─ Objective tracker styles
│
└─ NBL/
   ├─ NBLSceneEnhanced.js (500+ lines)
   │  ├─ FloatingTool component
   │  ├─ RepairPanel component
   │  ├─ Cable component
   │  ├─ SolarArray component
   │  ├─ UnderwaterBubbles
   │  ├─ PoolEnvironment
   │  └─ Lighting setup
   │
   ├─ Astronaut.js
   ├─ NBLControls.js
   └─ TaskPanel.js

Documentation/
├─ NBL_COMPLETE_GUIDE.md
├─ NBL_GAMEPLAY_SUMMARY.md
├─ NBL_IMPLEMENTATION_COMPLETE.md
├─ NBL_QUICK_START.md
├─ NBL_TROUBLESHOOTING.md
├─ NBL_VISUAL_GUIDE.md
├─ NBL_QUICK_REFERENCE.md
├─ NBL_ENHANCED_GUIDE.md
└─ NBL_DEVELOPER_NOTES.md
```

---

## 🔄 DATA FLOW

```
User Input (Keyboard)
         │
         ▼
Event Handlers (handleKeyPress)
         │
         ▼
State Updates (useState setters)
         │
         ▼
React Re-render
         │
         ├──► UI Components (HUD, overlays)
         │
         └──► 3D Scene (Canvas)
              │
              ▼
         Three.js/Fiber rendering
              │
              ├──► Astronaut model
              ├──► Game objects (tools, panels, etc.)
              ├──► Environment (pool, bubbles)
              └──► Lighting/Effects
```

---

## ✅ SYSTEM CHECKLIST

### **Core Systems:**
- ✅ Mission management (5 missions + free play)
- ✅ Object spawning (tools, panels, cables, solar)
- ✅ Interaction system (E key, proximity detection)
- ✅ Movement system (6-axis underwater physics)
- ✅ Collision detection
- ✅ Score/combo system
- ✅ Timer/oxygen system

### **Visual Systems:**
- ✅ 3D scene rendering
- ✅ Object glow effects
- ✅ Particle systems
- ✅ Lighting system
- ✅ Underwater effects (bubbles, fog, caustics)
- ✅ HUD/UI overlays

### **Audio Systems:**
- ✅ Web Audio API integration
- ✅ 6 sound types
- ✅ Context-aware playback

### **Help Systems:**
- ✅ Tutorial briefing
- ✅ Help overlay (H key)
- ✅ Objective tracker (Tab key)
- ✅ Proximity hints
- ✅ Position display

### **Documentation:**
- ✅ Complete gameplay guide
- ✅ Troubleshooting guide
- ✅ Visual reference
- ✅ Quick start guide
- ✅ Developer notes

---

## 🎉 ALL SYSTEMS OPERATIONAL!

**Total Lines of Code:** ~3000+
**Total Documentation:** 9 comprehensive guides
**Missions:** 5 + Free Play
**Object Types:** 4 (Tools, Panels, Cables, Solar Array)
**Controls:** 11 keys
**Audio Sounds:** 6 types
**UI Screens:** 5 (Menu, Briefing, Gameplay, Help, Complete)

**Status: COMPLETE & READY TO PLAY!** 🚀✨
