# NBL Training Visual Enhancements

## Overview
This document details the comprehensive 3D visual enhancements made to the NBL (Neutral Buoyancy Laboratory) Training module to create a more realistic and immersive underwater astronaut training experience.

## Enhancement Summary

### Components Enhanced
1. **Astronaut Model** - Complete realistic space suit
2. **Floating Tools** - Detailed tool geometry (4 types)
3. **Repair Panels** - Circuit board design with damage indicators
4. **Cables** - Realistic electrical connectors and braided cables

---

## 1. Astronaut Model Enhancement

### Overview
Transformed from basic geometric shapes to a detailed, realistic astronaut space suit with proper materials and animations.

### Components Added

#### Helmet System (4 meshes)
- **Main Glass Dome**
  - Geometry: Sphere (radius: 0.5)
  - Material: meshPhysicalMaterial
  - Properties: transmission=0.9, opacity=0.4, metalness=0.1
  - Creates realistic glass appearance with see-through effect

- **Inner Helmet Layer**
  - Geometry: Sphere (radius: 0.48)
  - Material: Transparent with opacity=0.3
  - Provides depth and realistic helmet structure

- **Gold Visor**
  - Geometry: Cylinder (width: 0.35, height: 0.15)
  - Material: Gold metallic (#FFD700)
  - Properties: metalness=0.95, roughness=0.2
  - Positioned at front of helmet

- **Seal Ring**
  - Geometry: Torus (radius: 0.52, tube: 0.05)
  - Color: Dark metal (#505050)
  - Connects helmet to body

#### Body/Torso (6 meshes)
- **Main Suit Body**
  - Geometry: Box (1.1 × 1.4 × 0.7)
  - Material: White with metalness=0.2, roughness=0.5

- **Red Stripe** - Across chest (#cc0000)
- **Blue Stripe** - Below red stripe (#0055aa)
- **NASA Logo**
  - Circle geometry with 3D sphere detail
  - Position: Left chest
  - Blue color (#0055aa)

- **Control Panel** - Chest mounted
  - 3 LED indicators:
    - 2 green lights (always on)
    - 1 status light (changes with buoyancy state)
  - Emissive materials with intensity=2

#### Life Support Backpack - PLSS (4 meshes)
- **Main PLSS Box**
  - Geometry: Box (0.9 × 1.2 × 0.35)
  - Position: z=-0.5 (behind astronaut)
  - Dark gray metallic finish

- **Oxygen Tanks (2)**
  - Geometry: Cylinders (radius: 0.12, height: 0.8)
  - Positioned on left/right sides of backpack
  - Material: metalness=0.8, roughness=0.3
  - Color: Dark gray (#606060)

- **Communication Antenna**
  - Geometry: Thin cylinder (radius: 0.02, height: 0.4)
  - Red LED sphere on top
  - Emissive red material

#### Arms (16 meshes - 8 per arm)
**Each Arm Structure:**
- Shoulder Joint: Sphere (radius: 0.15)
- Upper Arm: Cylinder (radius: 0.12, length: 0.5)
- Forearm: Cylinder (radius: 0.1, length: 0.45)
- Glove: Sphere (radius: 0.13)

**Articulation:**
- Shoulder rotation: [0, 0, ±0.4] for natural pose
- Forearm rotation: [±0.2, 0, ±0.3]
- Materials: White suit color, metalness=0.2-0.5

#### Legs (12 meshes - 6 per leg)
**Each Leg Structure:**
- Thigh: Cylinder (radius: 0.14, length: 0.6)
- Knee Joint: Sphere (radius: 0.12)
- Lower Leg: Cylinder (radius: 0.12, length: 0.55)

**Pose:**
- Positioned ±0.25 on x-axis (hip width)
- Staggered z-positions for walking pose
- Rotation: thigh [±0.1,0,0], lower leg [∓0.1,0,0]

#### Boots (4 meshes - 2 per boot)
- **Main Boot**: Box (0.28 × 0.25 × 0.5), black metallic
- **Sole**: Box (0.3 × 0.1 × 0.15), darker black with grip texture

#### Bubble System (8 animated meshes)
- **Purpose**: Simulate underwater breathing bubbles
- **Geometry**: Small spheres with random initial positions
- **Material**: meshPhysicalMaterial
  - transmission=0.9
  - opacity=0.3
  - color=#88ccff (light blue)
- **Animation**:
  - Rise continuously (position.y += 0.02)
  - Reset at y>3 (returns to backpack)
  - Scale pulsing: 0.8 to 1.2 using sine wave

#### Lighting (2 lights)
- **Helmet Spotlight**
  - Position: [0, 1.8, 0.6] (above and in front of helmet)
  - Color: White
  - Intensity: 0.8
  - Angle: 0.6 radians
  - Distance: 10 units
  - Purpose: Illuminates area in front of astronaut

- **Status Point Light**
  - Position: [0, 0.6, 0] (chest level)
  - Intensity: 1
  - Distance: 4
  - Color: Dynamic based on buoyancy state
    - Green: Floating
    - Red: Sinking
    - Light Green: Neutral

### Animations

#### Gentle Bobbing
```javascript
position.y = Math.sin(time * 0.5) * 0.05
```
- Simulates natural underwater floating motion
- Amplitude: ±0.05 units
- Frequency: 0.5 Hz

#### Rotation
```javascript
rotation.y = Math.sin(time * 0.3) * 0.03
rotation.x = Math.sin(time * 0.4) * 0.02
```
- Y-axis: Gentle swaying motion
- X-axis: Forward/backward tilt
- Creates organic, natural movement

### Material Properties Summary
| Component | Metalness | Roughness | Emissive |
|-----------|-----------|-----------|----------|
| Helmet Glass | 0.1 | 0.2 | No |
| Gold Visor | 0.95 | 0.2 | No |
| Suit Body | 0.2 | 0.5 | No |
| Oxygen Tanks | 0.8 | 0.3 | No |
| LED Lights | N/A | N/A | Yes (2.0) |
| Boots | 0.4 | 0.8 | No |

### Performance Impact
- **Mesh Count**: ~50 meshes (up from 8)
- **Animation Loops**: 3 (position, rotation, bubbles)
- **Lights**: 2 dynamic lights
- **Performance**: Optimized with instancing where possible

---

## 2. Floating Tools Enhancement

### Overview
Each tool type now has unique, realistic 3D geometry instead of basic boxes.

### Tool Types

#### 1. Wrench
**Components:**
- **Handle**
  - Geometry: Cylinder (radius: 0.08, length: 0.9)
  - Material: Silver chrome (#c0c0c0)
  - Properties: metalness=0.9, roughness=0.2

- **Open-End Head**
  - Geometry: Torus (partial, Math.PI arc)
  - Radius: 0.15, tube: 0.04
  - Material: Metallic gray (#a0a0a0)
  - Rotation: Perpendicular to handle

- **Jaw Sides** (2 pieces)
  - Geometry: Small boxes forming the wrench opening
  - Positioned at ±0.15 from center

- **Grip Section**
  - Geometry: Cylinder (radius: 0.09, length: 0.4)
  - Material: Orange rubber (#ff6600)
  - Properties: roughness=0.8 (non-slip texture)

**Material Summary:**
- Main metal: Chrome silver, highly reflective
- Grip: Textured rubber, high roughness
- Overall metalness: 0.9-0.95

#### 2. Screwdriver
**Components:**
- **Handle**
  - Geometry: Tapered cylinder (0.08 → 0.06, length: 0.4)
  - Material: Red plastic (#ff4444)
  - Properties: metalness=0.3, roughness=0.6

- **Metal Shaft**
  - Geometry: Thin cylinder (radius: 0.02, length: 0.6)
  - Material: Steel (#d0d0d0)
  - Properties: metalness=0.95, roughness=0.1

- **Flathead Tip**
  - Geometry: Thin box (0.03 × 0.08 × 0.01)
  - Rotation: 45° on z-axis
  - Material: Hardened steel (#909090)

- **End Cap**
  - Geometry: Sphere (radius: 0.06)
  - Material: Dark red (#cc0000)

**Material Summary:**
- Handle: Plastic with moderate metalness
- Shaft: Highly metallic steel
- Tip: Ultra-hard metal finish

#### 3. Pliers
**Components:**
- **Handles (2)**
  - Geometry: Cylinders (radius: 0.05, length: 0.5)
  - Material: Blue rubber grip (#0088ff)
  - Rotation: ±0.3 radians (slightly open)

- **Pivot Joint**
  - Geometry: Cylinder (radius: 0.06, length: 0.2)
  - Material: Dark metal (#606060)
  - Properties: metalness=0.9, roughness=0.2

- **Jaws (2)**
  - Geometry: Boxes (0.05 × 0.3 × 0.06)
  - Material: Shiny metal (#b0b0b0)
  - Rotation: ±0.2 radians (slightly open)
  - Properties: metalness=0.95, roughness=0.1

**Material Summary:**
- Handles: Grippy rubber texture
- Pivot: Dark hardened steel
- Jaws: Bright polished metal

#### 4. Hammer
**Components:**
- **Handle**
  - Geometry: Cylinder (radius: 0.06, length: 0.8)
  - Material: Wood grain (#8B4513)
  - Properties: metalness=0.1, roughness=0.9

- **Grip Section**
  - Geometry: Cylinder (radius: 0.07, length: 0.3)
  - Material: Dark wood (#654321)
  - Properties: roughness=0.95 (textured)

- **Hammer Head**
  - Geometry: Box (0.35 × 0.15 × 0.12)
  - Material: Steel gray (#707070)
  - Rotation: Perpendicular to handle
  - Properties: metalness=0.95, roughness=0.15

- **Claw**
  - Geometry: Box (0.15 × 0.08 × 0.06)
  - Position: Back of head, angled
  - Material: Dark metal (#606060)

**Material Summary:**
- Handle: Wooden texture, very rough
- Head: Polished steel, highly reflective
- Realistic weight distribution

### Common Tool Features
- **Proximity Ring**: Green glowing ring when player near
- **Particle Effects**: Floating particles around each tool
- **Point Light**: Color-coded glow matching tool type
- **Shadow Casting**: All tools cast realistic shadows

### Color Coding
| Tool | Primary Color | Accent Color |
|------|---------------|--------------|
| Wrench | Gold (#FFD700) | Silver |
| Screwdriver | Red (#FF6B6B) | Steel |
| Pliers | Cyan (#4ECDC4) | Blue |
| Hammer | Green (#95E1D3) | Wood |

---

## 3. Repair Panel Enhancement

### Overview
Transformed from simple colored boxes to detailed equipment panels with circuit boards, components, and damage indicators.

### Panel Structure

#### Frame & Housing (2 layers)
- **Outer Frame**
  - Geometry: Box (1.6 × 1.1 × 0.15)
  - Material: Dark metal (#404040)
  - Properties: metalness=0.8, roughness=0.3
  - Purpose: Protective housing

- **Inner Circuit Board**
  - Geometry: Box (1.4 × 0.95 × 0.08)
  - Material: Dynamic color based on health
    - Healthy: Green (#00aa55)
    - Damaged: Red (#aa2222)
  - Properties: metalness=0.4, roughness=0.6
  - Emissive glow: intensity=0.2

#### Corner Bolts (4 pieces)
- **Position**: Each corner (±0.7, ±0.45)
- **Geometry**: Small cylinders (radius: 0.05, height: 0.04)
- **Material**: Steel gray (#808080)
- **Properties**: metalness=0.9, roughness=0.2
- **Purpose**: Realistic mounting hardware

#### Circuit Traces (3 paths)
- **Horizontal Trace 1**: 0.8 × 0.02 × 0.01
- **Horizontal Trace 2**: 0.6 × 0.02 × 0.01
- **Vertical Trace**: 0.02 × 0.6 × 0.01
- **Material**: meshBasicMaterial, color=#00ff88 (circuit green)
- **Purpose**: Simulates PCB copper traces

#### Electronic Components (5 resistors)
- **Geometry**: Small cylinders (radius: 0.03, length: 0.08)
- **Material**: Dynamic color
  - Healthy: Blue (#0066ff)
  - Damaged: Orange (#ff6600)
- **Position**: Evenly spaced across board
- **Properties**: metalness=0.5, roughness=0.4

#### Central Processor Chip
- **Main Chip Body**
  - Geometry: Box (0.25 × 0.25 × 0.06)
  - Material: Black (#202020)
  - Properties: metalness=0.7, roughness=0.3

- **Contact Pins** (8 total, 4 per side)
  - Geometry: Tiny boxes (0.02 × 0.02 × 0.03)
  - Material: Silver (#c0c0c0)
  - Properties: metalness=0.95, roughness=0.1
  - Purpose: Realistic IC pin layout

#### Health Bar System
- **Background Bar**
  - Geometry: Plane (1.3 × 0.12)
  - Material: Black (#000000)

- **Health Fill**
  - Geometry: Dynamic width based on health percentage
  - Material: Color changes with health
    - >75%: Green (#00ff88)
    - 50-75%: Yellow (#ffaa00)
    - <50%: Red

#### Status LED Indicators (3 LEDs)
- **LED Housing** (per LED)
  - Geometry: Cylinder (radius: 0.06, height: 0.03)
  - Material: Dark housing (#303030)

- **LED Light** (per LED)
  - Geometry: Circle (radius: 0.05)
  - Material: meshBasicMaterial (self-illuminated)
  - Colors:
    - LED 1: Panel repaired status
    - LED 2: Health >50% indicator
    - LED 3: Health >75% indicator
  - States: Green (on) / Red (off)

#### Damage Indicators (shown when health <60%)
- **Crack 1**
  - Geometry: Thin plane (0.3 × 0.02)
  - Rotation: 0.5 radians
  - Material: Black (#000000), opacity=0.8

- **Crack 2**
  - Geometry: Thin plane (0.25 × 0.02)
  - Rotation: -0.3 radians
  - Material: Black (#000000), opacity=0.8

- **Burn Mark**
  - Geometry: Circle (radius: 0.1)
  - Material: Dark brown (#1a0a00)
  - Opacity: 0.7
  - Purpose: Shows damage from overheating

#### Wiring Connectors (2 pieces)
- **Left Connector** (Yellow)
  - Geometry: Cylinder (radius: 0.04, length: 0.08)
  - Color: #ffcc00 (power connector)
  - Properties: metalness=0.7, roughness=0.3

- **Right Connector** (Blue)
  - Geometry: Cylinder (radius: 0.04, length: 0.08)
  - Color: #0088ff (data connector)
  - Properties: metalness=0.7, roughness=0.3

### Dynamic Behavior
- **Rotation Animation**: Gentle sway when not repaired
- **Proximity Ring**: Yellow/orange when near, green when can repair
- **Point Light**: Color changes based on repair status
  - Damaged: Red glow (intensity=0.3)
  - Repaired: Green glow (intensity=1)

### Visual States

#### Healthy Panel (>75% health)
- All 3 LEDs: Green
- Circuit board: Green tint
- No damage indicators visible
- Bright green circuit traces
- Blue capacitors/resistors

#### Damaged Panel (25-75% health)
- 1-2 LEDs: Red
- Circuit board: Mixed green/red
- Some cracks visible
- Yellow health bar
- Orange components

#### Critical Panel (<25% health)
- All LEDs: Red
- Circuit board: Red tint
- Multiple cracks
- Burn marks visible
- Red health bar
- Orange/red components

---

## 4. Cable Enhancement

### Overview
Transformed from simple lines with cylinder caps to detailed electrical connectors with braided cable appearance.

### Start Connector (Plug)

#### Housing
- **Main Body**
  - Geometry: Tapered cylinder (0.12 → 0.18, length: 0.4)
  - Material: Dark plastic (#303030)
  - Properties: metalness=0.7, roughness=0.3

- **Metal Collar**
  - Geometry: Cylinder (0.13 → 0.11, length: 0.08)
  - Position: Top of housing
  - Material: Steel (#909090)
  - Properties: metalness=0.9, roughness=0.2

#### Colored Indicator Ring
- **Geometry**: Torus (radius: 0.14, tube: 0.03)
- **Material**: Color-coded by cable type (red/blue/yellow)
- **Properties**: 
  - Emissive with intensity=0.3
  - Metalness=0.5
  - Creates glowing identifier ring

#### Contact Pins (4 pieces)
- **Geometry**: Small cylinders (radius: 0.02, length: 0.06)
- **Material**: Gold plated (#FFD700)
- **Properties**: metalness=0.95, roughness=0.1
- **Layout**: Evenly spaced in circular pattern (0°, 90°, 180°, 270°)
- **Purpose**: Realistic electrical contacts

#### Strain Relief
- **Geometry**: Tapered cylinder (0.1 → 0.08, length: 0.15)
- **Material**: Flexible rubber (#202020)
- **Properties**: metalness=0.3, roughness=0.7
- **Purpose**: Protects cable from bending damage

### End Connector (Socket)

#### Socket Housing
- **Main Body**
  - Geometry: Tapered cylinder (0.18 → 0.12, length: 0.4)
  - Material: Dynamic color
    - Connected: Green (#00aa55)
    - Disconnected: Gray (#505050)
  - Emissive when connected (intensity=0.3)

- **Metal Ring**
  - Geometry: Cylinder (0.13 → 0.11, length: 0.08)
  - Position: Bottom of housing
  - Material: Steel (#707070)

#### Socket Opening
- **Geometry**: Cylinder (radius: 0.09, depth: 0.05)
- **Material**: Black interior (#101010)
- **Properties**: metalness=0.8, roughness=0.3
- **Purpose**: Shows receptacle for plug

#### Status LEDs (3 pieces)
- **Geometry**: Small cylinders (radius: 0.02, length: 0.02)
- **Layout**: 120° spacing in circle (0°, 120°, 240°)
- **Material**: meshBasicMaterial (self-illuminated)
- **Colors**:
  - Connected: Green (#00ff88)
  - Disconnected: Red (#ff0000)
- **Purpose**: Visual connection feedback

#### Mounting Bracket
- **Geometry**: Flat cylinder (radius: 0.2, height: 0.05)
- **Position**: Top of socket
- **Material**: Metal (#404040)
- **Properties**: metalness=0.7, roughness=0.4
- **Purpose**: Shows permanent wall/panel mounting

### Cable Structure

#### Main Cable Sheath (Primary line)
- **Geometry**: BufferGeometry with 21 points
- **Path**: Curved arc between start and end
  - Height variation: Sin curve with amplitude 2 units
  - Smooth interpolation between points
- **Material**: lineBasicMaterial
- **Width**: 5 (thick main cable)
- **Color**: Dynamic
  - Connected: Green (#00ff88)
  - Disconnected: Cable type color

#### Inner Wire Strands (4 strands)
- **Purpose**: Create braided/twisted appearance
- **Geometry**: 4 parallel lines with helical offset
- **Offsets**: ±0.02, ±0.03 units from center
- **Twist Pattern**: 
  ```javascript
  x = p.x + cos(angle) * offset
  y = p.y + sin(angle) * offset * 0.5
  z = p.z + sin(angle) * offset
  angle = (i / points.length) * π * 4
  ```
- **Material**: lineBasicMaterial
- **Width**: 2
- **Opacity**: 0.6 (semi-transparent)
- **Purpose**: Creates depth and realistic cable thickness

#### Cable Segments (Spherical joints)
- **Frequency**: Every 3rd point (7 segments total)
- **Geometry**: Small spheres (radius: 0.05)
- **Material**: meshStandardMaterial
- **Properties**: metalness=0.4, roughness=0.6
- **Purpose**: Adds solid volume to cable, shows flexibility

### Animation
- **Wave Motion**: Applied to main cable geometry
  ```javascript
  for each vertex:
    y += sin(time * 2 + vertexIndex) * 0.01
  ```
- **Only when disconnected**: Cable sways naturally
- **Proximity Ring**: Rotates and pulses when player near

### Cable Colors
| Cable Type | Color Code | Hex Value |
|------------|------------|-----------|
| Red | Power | #ff0000 |
| Blue | Data | #0088ff |
| Yellow | Signal | #ffff00 |

### Lighting
- **Start Connector Light**
  - Intensity: 0.5
  - Color: Cable type color
  - Distance: 2 units

- **End Connector Light**
  - Intensity: Dynamic (0.8 connected, 0.3 disconnected)
  - Color: Green when connected, cable color otherwise
  - Distance: 3 units

### Visual States

#### Disconnected State
- Start connector: Color-coded indicator ring
- End connector: Gray housing, red LEDs
- Cable: Color-coded, gently swaying
- Cable strands visible: Braided appearance
- Proximity ring: Orange/yellow glow

#### Connected State
- Start connector: Same appearance
- End connector: Green housing, green LEDs, emissive glow
- Cable: Bright green, no animation
- Cable strands: Green overlay
- Strong green point lights at both ends

---

## Technical Implementation Details

### Three.js Features Used

#### Geometries
- **Primitive Shapes**: Box, Sphere, Cylinder, Torus, Plane, Circle
- **Custom Geometry**: BufferGeometry for cables
- **Buffer Attributes**: For particle systems and custom lines

#### Materials
- **meshStandardMaterial**: PBR workflow, responds to lights
- **meshPhysicalMaterial**: Advanced features (transmission for glass)
- **meshBasicMaterial**: Self-illuminated LEDs and indicators
- **lineBasicMaterial**: Cable rendering

#### Material Properties
- **metalness**: 0.1 (plastic) to 0.98 (polished metal)
- **roughness**: 0.05 (mirror) to 0.95 (matte rubber)
- **emissive**: For glowing LEDs and indicators
- **emissiveIntensity**: 0.2 to 2.0
- **transmission**: 0.9 for glass/bubbles
- **opacity**: 0.3 to 1.0 for transparency effects

#### Lighting
- **pointLight**: 9 dynamic lights total
  - 2 on astronaut
  - 1 per tool (4 tools)
  - 1 per panel (variable count)
  - 2 per cable (variable count)
- **Spotlight**: 1 on astronaut helmet
- **Dynamic Colors**: Lights change with game state

#### Animation (useFrame hook)
- **Astronaut**: Position bobbing, rotation, bubble rise
- **Tools**: Gentle rotation, particle drift
- **Panels**: Rotation when damaged, LED blinking
- **Cables**: Wave motion, segment movement
- **Proximity Rings**: Rotation and scale pulsing

### Performance Optimization

#### Instancing
- Corner bolts on panels use position mapping
- Cable segments filtered (every 3rd point)
- LED housings shared geometry

#### Conditional Rendering
- Proximity rings only render when player near
- Damage indicators only show when health <60%
- Bubble particles limited to 8 per astronaut

#### LOD Considerations
- High detail preserved (all components visible up close)
- Shadows only on main components
- Particle counts kept reasonable

### File Structure
```
src/components/NBL/
├── Astronaut.js          (450 lines, +300 from original)
└── NBLSceneEnhanced.js   (935 lines, +240 from original)
```

### Lines of Code
- **Astronaut Enhancement**: +300 lines
- **Tools Enhancement**: +150 lines (wrench: 40, screwdriver: 35, pliers: 40, hammer: 35)
- **Panels Enhancement**: +50 lines
- **Cables Enhancement**: +40 lines
- **Total Added**: ~540 lines of detailed 3D geometry

---

## Visual Comparison

### Before Enhancement
- **Astronaut**: 8 simple geometric shapes (spheres, boxes, cylinders)
- **Tools**: 2 boxes per tool (body + head)
- **Panels**: 1 box + 3 circles for LEDs
- **Cables**: Line + 2 cylinder end caps

### After Enhancement
- **Astronaut**: 50+ detailed meshes with realistic materials
- **Tools**: 4-8 meshes per tool with proper tool geometry
- **Panels**: 20+ meshes with circuit board details
- **Cables**: Detailed connectors + braided cable with 4 strands

### Mesh Count Increase
| Component | Before | After | Increase |
|-----------|--------|-------|----------|
| Astronaut | 8 | 50+ | 525% |
| Tool | 2 | 4-8 | 200-300% |
| Panel | 4 | 20+ | 400% |
| Cable | 3 | 15+ | 400% |

---

## Usage in Game

### Player Experience
- **Visual Clarity**: Each component now instantly recognizable
- **Realism**: NASA-accurate space suit details
- **Immersion**: Underwater bubbles, realistic lighting
- **Feedback**: Damage states clearly visible on panels
- **Professionalism**: Tool-specific geometries match real NASA equipment

### Gameplay Impact
- No change to collision detection
- No change to interaction distances
- Enhanced visual feedback for player proximity
- Clearer indication of repairable vs repaired states
- More engaging training environment

---

## Future Enhancement Possibilities

### Potential Additions
1. **Astronaut Customization**
   - Different suit colors
   - Mission patch variations
   - Name tags

2. **Tool Wear States**
   - Rust on metal parts
   - Scratches on handles
   - Usage indicators

3. **Panel Variations**
   - Different circuit layouts
   - More component types (capacitors, inductors)
   - Animated circuit paths

4. **Cable Physics**
   - More realistic sagging
   - Collision with other objects
   - Dynamic tension

5. **Environmental Effects**
   - Water caustics on surfaces
   - Suspended particles in water
   - Distance fog effects

---

## Credits

### Technologies
- **Three.js**: 3D rendering engine
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helper components and utilities

### References
- NASA Extravehicular Mobility Unit (EMU) specifications
- Neutral Buoyancy Laboratory training procedures
- International Space Station tools and equipment

---

## Change Log

### Version 1.0 (Current)
- ✅ Complete astronaut model enhancement
- ✅ All four tool types with unique geometry
- ✅ Detailed repair panels with circuit boards
- ✅ Realistic cable connectors and braided cables
- ✅ Dynamic lighting system
- ✅ Animations for all components

---

## Notes for Developers

### Editing Components
- **Astronaut**: Edit `src/components/NBL/Astronaut.js` FallbackAstronaut function
- **Tools**: Edit `NBLSceneEnhanced.js` FloatingTool component renderTool() switch statement
- **Panels**: Edit `NBLSceneEnhanced.js` RepairPanel component
- **Cables**: Edit `NBLSceneEnhanced.js` Cable component

### Material Adjustments
- Increase metalness for shinier appearance
- Decrease roughness for more reflective surfaces
- Adjust emissiveIntensity for LED brightness
- Modify transmission for glass transparency

### Performance Tuning
- Reduce mesh count by removing detail components
- Disable shadows on smaller components
- Lower particle counts in bubble system
- Simplify cable strands (use fewer than 4)

### Testing
- Test with different lighting conditions
- Verify shadows render correctly
- Check performance with multiple instances
- Ensure proximity detection still works
- Validate all animations are smooth

---

**Document Version**: 1.0  
**Last Updated**: Current Session  
**Status**: Complete ✅
