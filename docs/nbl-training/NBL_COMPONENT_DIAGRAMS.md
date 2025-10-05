# NBL Training Visual Enhancement - Component Breakdown

## Component Architecture Diagrams

### 1. Astronaut Model Structure

```
ASTRONAUT ASSEMBLY (50+ meshes)
│
├── HEAD SECTION (4 meshes)
│   ├── Glass Dome (transmission=0.9)
│   ├── Inner Helmet Layer (opacity=0.3)
│   ├── Gold Visor (metalness=0.95)
│   └── Seal Ring (torus)
│
├── BODY SECTION (9 meshes)
│   ├── Main Torso (white suit)
│   ├── Red Stripe (chest)
│   ├── Blue Stripe (chest)
│   ├── NASA Logo (2 meshes: circle + sphere)
│   └── Control Panel
│       ├── LED 1 (green)
│       ├── LED 2 (green)
│       └── LED 3 (status color)
│
├── BACKPACK SECTION (4 meshes)
│   ├── PLSS Main Box
│   ├── Oxygen Tank Left
│   ├── Oxygen Tank Right
│   └── Antenna + LED
│
├── ARMS (16 meshes: 8 per arm)
│   ├── Left Arm
│   │   ├── Shoulder Joint (sphere)
│   │   ├── Upper Arm (cylinder)
│   │   ├── Forearm (cylinder)
│   │   └── Glove (sphere)
│   └── Right Arm
│       ├── Shoulder Joint (sphere)
│       ├── Upper Arm (cylinder)
│       ├── Forearm (cylinder)
│       └── Glove (sphere)
│
├── LEGS (12 meshes: 6 per leg)
│   ├── Left Leg
│   │   ├── Thigh (cylinder)
│   │   ├── Knee Joint (sphere)
│   │   └── Lower Leg (cylinder)
│   └── Right Leg
│       ├── Thigh (cylinder)
│       ├── Knee Joint (sphere)
│       └── Lower Leg (cylinder)
│
├── BOOTS (4 meshes: 2 per boot)
│   ├── Left Boot + Sole
│   └── Right Boot + Sole
│
├── BUBBLE SYSTEM (8 animated meshes)
│   └── Bubbles 1-8 (rising animation)
│
└── LIGHTING (2 lights)
    ├── Helmet Spotlight (white, 0.8 intensity)
    └── Status Point Light (dynamic color)
```

### 2. Tool Geometry Breakdown

```
WRENCH (7 meshes)
├── Handle (cylinder, 0.9 length)
├── Grip Section (orange rubber)
├── Wrench Head (torus, partial arc)
├── Jaw Side 1 (box)
├── Jaw Side 2 (box)
└── Proximity Ring
└── Point Light (gold glow)

SCREWDRIVER (5 meshes)
├── Handle (tapered cylinder, red)
├── End Cap (sphere)
├── Metal Shaft (thin cylinder)
├── Flathead Tip (rotated box)
└── Proximity Ring
└── Point Light (red glow)

PLIERS (6 meshes)
├── Handle 1 (cylinder, rotated -0.3)
├── Handle 2 (cylinder, rotated +0.3)
├── Pivot Joint (cylinder)
├── Jaw 1 (box, rotated -0.2)
├── Jaw 2 (box, rotated +0.2)
└── Proximity Ring
└── Point Light (cyan glow)

HAMMER (5 meshes)
├── Handle (cylinder, wood texture)
├── Grip Section (darker wood)
├── Hammer Head (box, rotated)
├── Claw (angled box)
└── Proximity Ring
└── Point Light (green glow)
```

### 3. Repair Panel Structure

```
REPAIR PANEL (20+ meshes)
│
├── FRAME & BASE
│   ├── Outer Frame (1.6×1.1×0.15, dark metal)
│   ├── Circuit Board (1.4×0.95×0.08, dynamic color)
│   └── Corner Bolts (4×, cylinders at corners)
│
├── CIRCUIT TRACES
│   ├── Horizontal Trace 1 (green)
│   ├── Horizontal Trace 2 (green)
│   └── Vertical Trace (green)
│
├── COMPONENTS
│   ├── Resistor 1 (cylinder)
│   ├── Resistor 2 (cylinder)
│   ├── Resistor 3 (cylinder)
│   ├── Resistor 4 (cylinder)
│   └── Resistor 5 (cylinder)
│
├── PROCESSOR CHIP
│   ├── Main Chip Body (0.25×0.25×0.06, black)
│   ├── Left Pins (4×, small boxes)
│   └── Right Pins (4×, small boxes)
│
├── STATUS SYSTEM
│   ├── Health Bar Background (plane)
│   ├── Health Fill (dynamic width plane)
│   │
│   ├── LED 1 (housing + light)
│   ├── LED 2 (housing + light)
│   └── LED 3 (housing + light)
│
├── DAMAGE INDICATORS (when health <60%)
│   ├── Crack 1 (thin plane, rotated)
│   ├── Crack 2 (thin plane, rotated)
│   └── Burn Mark (circle, dark brown)
│
├── CONNECTORS
│   ├── Power Connector (yellow, left)
│   └── Data Connector (blue, right)
│
└── LIGHTING
    └── Point Light (dynamic color/intensity)
```

### 4. Cable Assembly

```
CABLE SYSTEM (15+ meshes)
│
├── START CONNECTOR (PLUG) - 7 meshes
│   ├── Main Housing (tapered cylinder)
│   ├── Metal Collar (cylinder, top)
│   ├── Indicator Ring (torus, color-coded)
│   ├── Contact Pin 1 (gold, 0°)
│   ├── Contact Pin 2 (gold, 90°)
│   ├── Contact Pin 3 (gold, 180°)
│   ├── Contact Pin 4 (gold, 270°)
│   └── Strain Relief (tapered cylinder)
│
├── END CONNECTOR (SOCKET) - 6 meshes
│   ├── Socket Housing (tapered cylinder, dynamic color)
│   ├── Metal Ring (cylinder, bottom)
│   ├── Socket Opening (cylinder, black interior)
│   ├── Status LED 1 (0°, red/green)
│   ├── Status LED 2 (120°, red/green)
│   ├── Status LED 3 (240°, red/green)
│   └── Mounting Bracket (flat cylinder)
│
├── CABLE STRUCTURE
│   ├── Main Sheath (line, 21 points, width 5)
│   ├── Strand 1 (helical offset +0.02)
│   ├── Strand 2 (helical offset -0.02)
│   ├── Strand 3 (helical offset +0.03)
│   ├── Strand 4 (helical offset -0.03)
│   └── Segments (7× spheres for volume)
│
├── PROXIMITY RING
│   └── Ring (animated rotation + pulse)
│
└── LIGHTING
    ├── Start Light (0.5 intensity)
    └── End Light (0.3-0.8 intensity)
```

## Material Properties Reference

### Metalness Scale (0.0 - 1.0)
```
0.1  █░░░░░░░░░  Plastic (suit body, handle grips)
0.2  ██░░░░░░░░  Painted metal (suit frame)
0.4  ████░░░░░░  Electronics (circuit boards, LEDs)
0.6  ██████░░░░  Dark metal (backpack, panel frame)
0.8  ████████░░  Polished metal (tool heads, tanks)
0.9  █████████░  Chrome/steel (wrench, bolts)
0.95 ██████████  Gold/mirror (visor, contact pins)
```

### Roughness Scale (0.0 - 1.0)
```
0.05 ██████████  Mirror smooth (gold visor, pins)
0.1  █████████░  Highly polished (tool heads)
0.2  ████████░░  Polished metal (collar, bolts)
0.3  ███████░░░  Metal finish (housing, tanks)
0.4  ██████░░░░  Brushed metal (panels, chips)
0.5  █████░░░░░  Standard finish (suit body)
0.6  ████░░░░░░  Textured plastic (handles)
0.7  ███░░░░░░░  Rubber grip (tools, strain relief)
0.8  ██░░░░░░░░  Matte rubber (boots, grips)
0.9  █░░░░░░░░░  Rough wood (hammer handle)
0.95 ░░░░░░░░░░  Ultra-matte (textured grip)
```

## Animation Timing Reference

### Astronaut Animations
```javascript
// Bobbing (vertical motion)
frequency: 0.5 Hz (2 seconds per cycle)
amplitude: ±0.05 units
formula: y = sin(time * 0.5) * 0.05

// Y-Axis Rotation (swaying)
frequency: 0.3 Hz (3.3 seconds per cycle)
amplitude: ±0.03 radians (~1.7°)
formula: rotY = sin(time * 0.3) * 0.03

// X-Axis Rotation (tilting)
frequency: 0.4 Hz (2.5 seconds per cycle)
amplitude: ±0.02 radians (~1.1°)
formula: rotX = sin(time * 0.4) * 0.02

// Bubble Rise
speed: 0.02 units/frame (~1.2 units/second at 60fps)
reset height: 3.0 units
scale pulse: 0.8 to 1.2 (sine-based)
```

### Cable Wave Animation
```javascript
// Wave motion (only when disconnected)
frequency: 2 Hz (0.5 seconds per cycle)
amplitude: 0.01 units per vertex
formula: y += sin(time * 2 + vertexIndex) * 0.01
```

### Proximity Ring Animation
```javascript
// Rotation
speed: 2 radians/second
formula: rotZ = time * 2

// Scale pulsing
frequency: 3 Hz
amplitude: ±0.2 (scales from 0.8 to 1.2)
formula: scale = 1 + sin(time * 3) * 0.2
```

## Color Palette

### Astronaut Colors
```
White Suit Body:     #ffffff  ████████
Red Stripe:          #cc0000  ████░░░░
Blue Stripe:         #0055aa  ░░██████
NASA Blue:           #0055aa  ░░██████
Gold Visor:          #FFD700  ██████░░
Dark Metal:          #505050  ░░░░░░██
Silver Metal:        #c0c0c0  ████████
LED Green:           #00ff00  ░░██░░██
LED Red:             #ff0000  ██░░░░░░
Bubble Blue:         #88ccff  ░░████░░
```

### Tool Colors
```
Wrench (Gold):       #FFD700  ██████░░
Screwdriver (Red):   #FF6B6B  ██░░░░░░
Pliers (Cyan):       #4ECDC4  ░░████░░
Hammer (Green):      #95E1D3  ░░██░░██
```

### Panel Colors
```
Healthy Green:       #00aa55  ░░██░░██
Damaged Red:         #aa2222  ██░░░░██
Circuit Trace:       #00ff88  ░░██████
Component Blue:      #0066ff  ░░░░████
Component Orange:    #ff6600  ██░░░░░░
Dark Frame:          #404040  ░░░░░░██
LED Green:           #00ff88  ░░██████
LED Red:             #ff0000  ██░░░░░░
```

### Cable Colors
```
Red Cable:           #ff0000  ██░░░░░░
Blue Cable:          #0088ff  ░░░░████
Yellow Cable:        #ffff00  ██████░░
Connected Green:     #00ff88  ░░██████
Housing Dark:        #303030  ░░░░░░░░
Socket Gray:         #505050  ░░░░░░██
```

## Component Size Reference

### Astronaut (units)
```
Helmet:              Radius 0.5
Body:                1.1 × 1.4 × 0.7
Backpack:            0.9 × 1.2 × 0.35
Arm segment:         Length 0.4-0.5
Leg segment:         Length 0.5-0.6
Boot:                0.28 × 0.25 × 0.5
Total height:        ~2.5 units
```

### Tools (units)
```
Wrench:              Length 0.9, head radius 0.15
Screwdriver:         Length 1.0, shaft radius 0.02
Pliers:              Length 0.7, jaw width 0.12
Hammer:              Length 1.2, head 0.35×0.15
```

### Panel (units)
```
Frame:               1.6 × 1.1 × 0.15
Circuit board:       1.4 × 0.95 × 0.08
Chip:                0.25 × 0.25 × 0.06
LED housing:         Radius 0.06
Health bar:          1.3 × 0.12
```

### Cable (units)
```
Connector length:    0.4
Connector radius:    0.12-0.18 (tapered)
Cable path:          Variable (curved)
Cable thickness:     0.05 (main) + strands
Segment spacing:     Every 3rd point
```

## Lighting Configuration

### Light Types and Placement
```
ASTRONAUT LIGHTS (2)
├── Helmet Spotlight
│   Position: [0, 1.8, 0.6] (forward and up)
│   Type: SpotLight
│   Color: #ffffff (white)
│   Intensity: 0.8
│   Angle: 0.6 radians (~34°)
│   Distance: 10 units
│   Purpose: Illuminates work area
│
└── Status Point Light
    Position: [0, 0.6, 0] (chest level)
    Type: PointLight
    Color: Dynamic (green/red/light-green)
    Intensity: 1.0
    Distance: 4 units
    Purpose: Visual status indicator

TOOL LIGHTS (4 total, 1 per tool)
└── Point Light per tool
    Position: [tool.x, tool.y, tool.z]
    Type: PointLight
    Color: Tool-specific color
    Intensity: 0.5
    Distance: 3 units
    Purpose: Highlights interactable objects

PANEL LIGHTS (variable)
└── Point Light per panel
    Position: [panel.x, panel.y, panel.z + 0.3]
    Type: PointLight
    Color: Dynamic (red when damaged, green when repaired)
    Intensity: 0.3 (damaged) to 1.0 (repaired)
    Distance: 4 units
    Purpose: Shows repair status

CABLE LIGHTS (2 per cable)
├── Start Point Light
│   Position: [cable.start.x, cable.start.y, cable.start.z]
│   Type: PointLight
│   Color: Cable color
│   Intensity: 0.5
│   Distance: 2 units
│
└── End Point Light
    Position: [cable.end.x, cable.end.y, cable.end.z]
    Type: PointLight
    Color: Dynamic (cable color or green when connected)
    Intensity: 0.3 (disconnected) to 0.8 (connected)
    Distance: 3 units
    Purpose: Connection status indicator
```

## Performance Metrics

### Mesh Counts
```
Component          | Before | After  | Increase
-------------------|--------|--------|----------
Astronaut          | 8      | 50+    | 525%
Tool (×4)          | 8      | 24-32  | 200-300%
Panel (×variable)  | 4 each | 20 each| 400%
Cable (×variable)  | 3 each | 15 each| 400%
```

### Draw Calls (estimated)
```
Scene Component    | Draw Calls
-------------------|------------
Astronaut          | ~50
All Tools (4)      | ~28
All Panels (3)     | ~60
All Cables (3)     | ~45
Environment        | ~10
Total:             | ~193 draw calls
```

### Optimization Techniques
```
✓ Instancing: Used for repeated geometry (bolts, pins)
✓ Conditional rendering: Proximity rings only when near
✓ LOD ready: Can reduce detail at distance
✓ Shadow optimization: Only main components cast shadows
✓ Particle limits: Max 8 bubbles per astronaut
```

---

**Diagram Version**: 1.0  
**Component Count**: 100+ total meshes in scene  
**Performance**: Optimized for 60 FPS  
**Visual Quality**: NASA-accurate realistic rendering
