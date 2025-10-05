# 🎯 NBL Training Game - Visual Guide

## 📍 What to Look For

### Main Menu Screen
```
┌─────────────────────────────────────┐
│   🚀 NBL TRAINING ACADEMY           │
│   Neutral Buoyancy Laboratory       │
│                                     │
│   ┌───────────────────────┐        │
│   │  🎯 START MISSIONS    │ ← Click this for missions
│   └───────────────────────┘        │
│                                     │
│   ┌───────────────────────┐        │
│   │   🎮 FREE PLAY        │ ← Click this to practice
│   └───────────────────────┘        │
│                                     │
│   🎮 Controls                       │
│   WASD / Arrows: Move              │
│   Space: Ascend                    │
│   Shift: Descend                   │
│   E: Interact                      │
└─────────────────────────────────────┘
```

### Game Screen (In-Game View)
```
┌──────────────────────────────────────────────────────────┐
│ HUD (Top Bar)                                            │
│ [SCORE: 250] [O₂: ████░░ 80%] [TIME: 95s] [COMBO: x3]  │
│                                                          │
│                                                          │
│        🌊  3D Underwater Scene  🌊                       │
│                                                          │
│           👨‍🚀 ← You (Astronaut)                          │
│                                                          │
│       🔧 ← Tools (glowing, floating)                    │
│                                                          │
│       📦 ← Repair Panel (with health bar)               │
│                                                          │
│       🔌 ← Cables (red, blue, yellow lines)             │
│                                                          │
│                                                          │
│ [Bottom Center]                                          │
│ ┌──────────────────────────────────┐                   │
│ │ 🔧 WRENCH                         │ ← Held tool       │
│ └──────────────────────────────────┘                   │
│ ┌──────────────────────────────────┐                   │
│ │ 💡 Press E to repair panel (40%) │ ← Hint/Prompt     │
│ └──────────────────────────────────┘                   │
│                                                          │
│                               ┌────────┐                │
│                               │ X: 5.2 │ ← Position     │
│                               │ Y: 2.1 │   Display      │
│                               │ Z: -3.4│                │
│                               └────────┘                │
└──────────────────────────────────────────────────────────┘
```

---

## 🔍 Object Recognition Guide

### Tools (What They Look Like)
```
🔧 Wrench
   Color: GOLD/YELLOW (#FFD700)
   Shape: Rectangular body with cross head
   Glow: Bright golden aura
   Animation: Slowly rotating, bobbing up/down

🔩 Screwdriver  
   Color: RED (#FF6B6B)
   Shape: Thin rectangular body
   Glow: Red aura
   Animation: Rotating, floating

⚙️ Pliers
   Color: TEAL/CYAN (#4ECDC4)
   Shape: Box with wider head
   Glow: Cyan aura
   Animation: Rotating, floating

🔨 Hammer
   Color: MINT GREEN (#95E1D3)
   Shape: Long handle with head
   Glow: Mint aura
   Animation: Rotating, floating
```

### Repair Panels (What They Look Like)
```
📦 Repair Panel
   ┌─────────────────┐
   │  [━━━━━━░░░░░] │ ← Health bar (fills as you repair)
   │  ● ● ●          │ ← 3 indicator lights
   │                 │
   │   PANEL #1      │
   └─────────────────┘
   
   Colors:
   - Red glow: Damaged (0% health)
   - Orange glow: Partially repaired (1-99% health)
   - Green glow: Fully repaired (100% health)
   
   Lights:
   - Red ●: Not working
   - Green ●: Working
```

### Cables (What They Look Like)
```
🔌 Cable Connection

   Start Point ●─────────────● End Point
       ↑                         ↑
   (Red, Blue,              (Connection
    or Yellow               socket)
    connector)
    
   States:
   - Disconnected: Colored line, dimly lit
   - Connected: Green line, brightly lit
   
   Colors (in order):
   1. RED cable - Connect first
   2. BLUE cable - Connect second
   3. YELLOW cable - Connect third
```

### Solar Array (What It Looks Like)
```
☀️ Solar Array

        Main Beam
            │
   ┌────────┼────────┐
   │ ▓▓▓▓▓▓ │ ▓▓▓▓▓▓ │ ← Solar panels (blue when working)
   │ Panel  │  Panel │
   │   L    │    R   │
   └────────┴────────┘
   
   Damaged:
   - Dark blue panels
   - Orange/red sparks ⚡
   - Red indicator ring on top
   
   Repairing:
   - Progress ring fills (0-100%)
   - Sparks decrease
   
   Fixed:
   - Bright blue panels
   - Green glow ✨
   - No sparks
```

---

## 🎨 Color Legend

### What Each Color Means

**GREEN (#00ff88)**
- ✅ Success, working systems
- ✅ Health bars when full
- ✅ Your score display
- ✅ Connected cables

**CYAN/BLUE (#00ccff)**
- ℹ️ Information, hints
- ℹ️ Oxygen bar (when high)
- ℹ️ Pool environment tint
- ℹ️ Border highlights

**ORANGE (#ffaa00)**
- ⚠️ Warning, caution
- ⚠️ Timer countdown
- ⚠️ Oxygen bar (medium)
- ⚠️ Solar array sparks

**RED (#ff4444)**
- ❌ Danger, errors
- ❌ Damaged systems
- ❌ Oxygen bar (low)
- ❌ Collision penalties

**GOLD/YELLOW**
- 🔧 Tools (most types)
- 🏆 Achievements
- ⭐ Important items

**PURPLE/MAGENTA**
- ✨ Combo multiplier
- ✨ Special effects
- ✨ Achievement badges

---

## 📏 Distance Reference

### How Far is "Close Enough"?

```
Distance in units from object:

0 units: Inside/touching object
1 unit:  Very close ──────● (Almost touching)
2 units: Close ─────────────● (Easy to interact)
3 units: Near ──────────────────● (Interaction range)
4 units: Visible ─────────────────────● (Solar array range)
5 units: Far ────────────────────────────● (Out of range)
10 units: Very far ──────────────────────────────────────●

Visual Reference:
- 1 unit ≈ 1 astronaut body length
- 3 units ≈ 3 astronaut lengths
- If you can see object clearly, you're probably within range
- Watch for hint at bottom: "Press E to..."
```

---

## 🎯 Interaction Zones

### Where to Stand for Each Action

#### Collecting Tools:
```
    Tool
     🔧
    / | \
   3  2  1  ← Distance (units)
       
       👨‍🚀  ← You need to be within this circle
   ╱   │   ╲
  ●────●────●
  OK   OK   OK
```

#### Repairing Panels:
```
    Panel
     📦
    / | \
   3  2  1
       
    👨‍🚀 + 🔧  ← You + Tool within range
```

#### Connecting Cables:
```
  Cable Start
     🔌
    / | \
   3  2  1
       
       👨‍🚀  ← Stand near start point
```

#### Fixing Solar Array:
```
    Solar Array
       ☀️
      / | \
     4  3  2  ← Larger range!
     
        👨‍🚀 + 🔧  ← You + Tool
```

---

## 🧭 Navigation Tips

### Finding Objects by Position

```
Pool Layout (Top View):
         Z: -20 (BACK)
              ↑
    X: -20 ←  +  → X: +20
              ↓
         Z: +20 (FRONT)
         
    You spawn at: (0, 0, 0) - CENTER
    
Common Object Locations:
- Tools: Random within ±20 units
- Panels: Within ±15 units  
- Cables: X:-8 to X:+2, Z:-8 (LEFT SIDE)
- Solar Array: X:10, Z:-10 (RIGHT-BACK)
```

### Height Levels:
```
Y: 8  ──── Pool surface (max height)
Y: 5  ──── Upper zone (tools often here)
Y: 2  ──── Middle zone (panels, solar array)
Y: 0  ──── Spawn height
Y: -3 ──── Lower zone
Y: -5 ──── Pool floor (min height)
```

---

## 💡 Visual Cues Checklist

When you're playing, look for these visual signs:

✅ **Glowing objects** = Something you can interact with
✅ **Particles around tools** = Tool is nearby
✅ **Health bars on panels** = Panel status
✅ **Colored lines** = Cables
✅ **Orange sparks** = Damaged solar array
✅ **Green glow** = Fixed/completed object
✅ **Hint text pulsing** = Something nearby (press E!)

---

## 🎮 Control Visual Guide

```
Keyboard Layout:

  [W]         [↑]
[A][S][D]  [←][↓][→]
   ↑           ↑
 WASD      Arrow Keys
  OR

[SPACE] = Up/Ascend   (above movement keys)
[SHIFT] = Down/Descend (below movement keys)
[E] = Interact        (near WASD)

Hand Position:
- Left hand: WASD + Space + Shift
- Right hand: Mouse (camera control)
- OR use Arrow Keys + Right hand free for E
```

---

## 🎯 Success Screenshots

### What You'll See When It Works:

**✅ Tool Collection Success:**
```
[Notification appears in center]
┌────────────────────────────┐
│  Collected wrench! +50 pts │
└────────────────────────────┘

[Bottom shows]
🔧 WRENCH
```

**✅ Panel Repair Success:**
```
[Panel glows green]
┌────────────────────────────┐
│ Panel Repaired! +200 pts   │
└────────────────────────────┘

[Health bar full]
📦 [████████████] 100%
```

**✅ Mission Complete:**
```
┌───────────────────────────────┐
│   🎉 MISSION COMPLETE!        │
│                               │
│   Fix the Solar Panel         │
│                               │
│   Base Reward:      +500      │
│   Time Bonus:       +350      │
│   Accuracy Bonus:   +475      │
│   Total Score:      1325      │
│                               │
│   [NEXT MISSION →]            │
└───────────────────────────────┘
```

---

Remember: **If you see glowing objects, you're in the right place!** 🌟

The hint at the bottom will guide you when you're close enough. Happy training! 🚀

---

Visual Guide Version: 1.0
Last Updated: October 4, 2025
