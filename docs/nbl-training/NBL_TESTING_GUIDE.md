# NBL Training Visual Enhancement - Testing Guide

## 🎯 Testing Overview

This guide helps you verify that all visual enhancements are working correctly in the NBL Training module.

## ✅ Pre-Testing Checklist

### 1. Development Server Status
The development server should already be running. You can verify by checking:
- Browser: http://localhost:3000
- Console: Should see "Compiled successfully!"
- Port: 3000 should be in use

### 2. Browser Compatibility
Recommended browsers:
- ✅ Chrome/Edge (best performance)
- ✅ Firefox (good performance)
- ⚠️ Safari (may have WebGL limitations)

### 3. Performance Requirements
- GPU: WebGL 2.0 capable
- RAM: 4GB minimum, 8GB recommended
- Display: 1920×1080 or higher recommended

## 🧪 Testing Procedures

### Test 1: Astronaut Model ✅

**What to Test**: Detailed space suit with realistic materials

**Steps**:
1. Navigate to http://localhost:3000
2. Click "NBL Training" button
3. Click "Start Mission"
4. Observe the astronaut model

**Expected Results**:
- ✅ Glass helmet with gold visor visible
- ✅ White suit with red and blue stripes
- ✅ NASA logo on chest (blue circle)
- ✅ 3 LED lights on chest control panel (2 green, 1 status)
- ✅ Gray backpack with 2 cylindrical oxygen tanks
- ✅ Antenna with red LED on top of backpack
- ✅ Articulated arms and legs (not just simple cylinders)
- ✅ Black boots with visible soles
- ✅ Bubbles rising from backpack continuously
- ✅ Gentle bobbing motion (up and down)
- ✅ Slight rotation/swaying (left and right)
- ✅ Helmet spotlight illuminating forward area
- ✅ Colored status light at chest (changes with buoyancy)

**Look For**:
- Smooth animations (no stuttering)
- Realistic metallic shine on metal parts
- Glass transparency on helmet
- Proper lighting and shadows

**Performance**:
- FPS should stay above 30 (check browser dev tools → Performance)
- No console errors related to astronaut rendering

### Test 2: Floating Tools 🔧

**What to Test**: Realistic tool geometry for all 4 types

**Steps**:
1. In NBL Training mission
2. Press WASD to move toward floating tools
3. Get close to each tool type (distance < 3 units)
4. Observe tool details

**Expected Results per Tool**:

**🔧 WRENCH** (Golden/Yellow color):
- ✅ Silver cylindrical handle
- ✅ Open-end head at top (curved jaw)
- ✅ Orange rubber grip section
- ✅ Metallic shine on metal parts
- ✅ Green proximity ring when near

**🔩 SCREWDRIVER** (Red color):
- ✅ Red handle (slightly tapered)
- ✅ Long thin metal shaft (silver)
- ✅ Flathead tip at end
- ✅ Rounded end cap
- ✅ Green proximity ring when near

**🔨 PLIERS** (Cyan color):
- ✅ Two blue handles (slightly angled apart)
- ✅ Central pivot joint (gray cylinder)
- ✅ Two metal jaws at top (slightly open)
- ✅ Metallic finish on jaws
- ✅ Green proximity ring when near

**🔨 HAMMER** (Green color):
- ✅ Long wooden handle (brown)
- ✅ Darker grip section in middle
- ✅ Gray steel hammer head (perpendicular to handle)
- ✅ Claw at back of head
- ✅ Green proximity ring when near

**Look For**:
- Each tool looks unique and recognizable
- Proper materials (metal shine, rubber texture, wood grain)
- Tools rotate slowly in place
- Floating particles around each tool
- Color-coded point lights

**Performance**:
- No frame drops when near tools
- Smooth proximity ring animation

### Test 3: Repair Panels 🔌

**What to Test**: Circuit board details and damage states

**Steps**:
1. In NBL Training mission
2. Move toward repair panels
3. Observe panel at different health levels
4. Repair a damaged panel and watch it change

**Expected Results - HEALTHY PANEL (100% health)**:
- ✅ Dark metal frame with 4 corner bolts
- ✅ Green-tinted circuit board
- ✅ Visible green circuit traces (lines on board)
- ✅ 5 small components (resistors/capacitors)
- ✅ Central black processor chip with tiny pins
- ✅ 3 Status LEDs - ALL GREEN
- ✅ Full green health bar at top
- ✅ No cracks or damage visible
- ✅ Yellow and blue connectors on sides
- ✅ Bright green glow

**Expected Results - DAMAGED PANEL (25-75% health)**:
- ✅ Same frame and structure
- ✅ Red-tinted circuit board
- ✅ 1-2 LEDs RED, others green
- ✅ Partial health bar (yellow/orange)
- ✅ If health <60%: Black cracks visible on surface
- ✅ If health <60%: Dark burn mark (circular)
- ✅ Dim red glow

**Expected Results - REPAIRED PANEL**:
- ✅ Changes from red to green
- ✅ All 3 LEDs turn green
- ✅ Health bar fills to 100%
- ✅ Cracks and burn marks disappear
- ✅ Bright green emissive glow
- ✅ Point light changes from red to green

**Look For**:
- Circuit board details clearly visible
- LEDs actually look like housings + lights
- Smooth transition when repairing
- Proximity ring (yellow when near, green when can repair)
- Gentle swaying animation when damaged

**Performance**:
- Multiple panels on screen with no issues
- Smooth state transitions

### Test 4: Cables 🔌

**What to Test**: Detailed connectors and braided cable appearance

**Steps**:
1. In NBL Training mission
2. Move toward disconnected cables
3. Observe cable details (3 colors: red, blue, yellow)
4. Connect a cable and watch it change

**Expected Results - DISCONNECTED CABLE**:

**Start Connector (Plug)**:
- ✅ Dark housing (cylindrical, tapered)
- ✅ Silver metal collar at top
- ✅ Color-coded glowing ring (red/blue/yellow)
- ✅ 4 gold contact pins visible
- ✅ Black strain relief at bottom

**End Connector (Socket)**:
- ✅ Gray cylindrical housing
- ✅ Silver metal ring at bottom
- ✅ Dark socket opening visible at top
- ✅ 3 small RED LEDs around housing
- ✅ Flat mounting bracket on top

**Cable Structure**:
- ✅ Thick main cable (color-coded)
- ✅ 4 inner strands visible (braided effect)
- ✅ Small spheres along cable length
- ✅ Gentle wave motion (cable sways)
- ✅ Curved path between connectors

**Expected Results - CONNECTED CABLE**:
- ✅ Start connector: Same appearance
- ✅ End connector: Changes to GREEN
- ✅ 3 LEDs change from RED to GREEN
- ✅ Socket housing glows green
- ✅ Entire cable turns GREEN
- ✅ Cable stops waving (becomes rigid)
- ✅ Bright green point lights at both ends

**Look For**:
- Realistic connector details (not just simple cylinders)
- Braided cable appearance (not just a line)
- Smooth color transition when connecting
- Proximity ring appears when near
- Different cable colors distinguishable

**Performance**:
- Multiple cables with no slowdown
- Smooth animation on disconnected cables

## 🎮 Interactive Testing

### Test 5: Movement and Proximity

**Steps**:
1. Press W/A/S/D to move astronaut
2. Approach each object type
3. Verify proximity indicators work

**Expected Results**:
- ✅ Green glowing rings appear when distance < 3 units
- ✅ Rings rotate continuously
- ✅ Rings pulse in size
- ✅ "Interaction Hint" text appears on screen
- ✅ ACTION button lights up green when can interact

**Controls to Test**:
- W: Move forward
- S: Move backward
- A: Strafe left
- D: Strafe right
- SPACE: Move up
- SHIFT: Move down
- E or ACTION button: Interact

### Test 6: Interaction System

**Steps**:
1. Move near a tool (proximity ring visible)
2. Press E or click ACTION button
3. Tool should disappear
4. Move near a damaged panel with tool collected
5. Press E or click ACTION button
6. Panel should show repair animation

**Expected Results**:
- ✅ Tool disappears when collected
- ✅ Hint changes to show new abilities
- ✅ Panel health increases
- ✅ Panel LEDs change color
- ✅ Cracks/burns disappear
- ✅ Score increases
- ✅ ACTION button only active when can interact

### Test 7: Mission Flow

**Steps**:
1. Start mission
2. Collect required tools
3. Repair panels
4. Connect cables
5. Complete mission

**Expected Results**:
- ✅ Task list updates as you progress
- ✅ Score increases correctly
- ✅ All visual states update properly
- ✅ Mission complete screen shows
- ✅ Score stops increasing after completion

## 🔍 Visual Quality Checks

### Lighting Test
**Check**:
- Astronaut helmet spotlight illuminates area
- Each object has appropriate point light
- Shadows cast correctly
- No excessive bloom or glare

### Material Test
**Check**:
- Metal parts look shiny (high metalness)
- Rubber/plastic parts look matte (low metalness)
- Glass helmet is transparent
- LEDs are self-illuminated (not affected by shadows)

### Animation Test
**Check**:
- Astronaut bobs gently (smooth motion)
- Bubbles rise continuously and reset
- Tools rotate slowly
- Cables sway when disconnected
- Proximity rings pulse smoothly
- All animations are smooth (no stuttering)

## ⚠️ Known Issues to Check

### Potential Issues
1. **Texture Loading**: Some textures may take a moment to load
   - Expected: Brief moment before full detail appears
   - Not a bug: Progressive loading

2. **Browser Performance**: 
   - If FPS <30: Close other tabs, try Chrome/Edge
   - If stuttering: Check GPU usage in Task Manager

3. **WebGL Context Lost**:
   - Rare issue: Refresh page
   - Usually happens with GPU driver issues

### What's NOT a Bug
- ⚠️ Tailwind CSS warnings in console (expected)
- ⚠️ Brief delay on first load (shader compilation)
- ⚠️ Slight performance drop with many objects (expected)

## 📊 Performance Benchmarks

### Target Performance
- **FPS**: 60 fps ideal, 30 fps minimum acceptable
- **Load Time**: <5 seconds to scene ready
- **Memory**: <500MB RAM usage
- **Draw Calls**: ~200 per frame

### How to Check FPS
**Chrome/Edge**:
1. Press F12 (open DevTools)
2. Press Ctrl+Shift+P
3. Type "Show FPS"
4. Select "Show frames per second (FPS) meter"
5. FPS counter appears in top-right

**Firefox**:
1. Press F12
2. Go to Performance tab
3. Click Record
4. Play for 10 seconds
5. Stop recording
6. Check frame rate in timeline

## 🐛 Troubleshooting

### Issue: Objects Not Visible
**Solutions**:
- Check camera position (should be behind astronaut)
- Verify scene loaded (check console for errors)
- Try moving around (might be outside view)

### Issue: Poor Performance
**Solutions**:
1. Close other browser tabs
2. Update graphics drivers
3. Switch to Chrome/Edge
4. Reduce browser zoom to 100%
5. Check Task Manager for background processes

### Issue: Textures Missing
**Solutions**:
- Refresh page (Ctrl+F5)
- Check Network tab in DevTools
- Verify files in public/textures/

### Issue: Animations Stuttering
**Solutions**:
- Close other applications
- Check GPU usage (should be <80%)
- Reduce number of objects on screen
- Try different browser

## ✅ Final Verification Checklist

After all tests, verify:

### Astronaut ✅
- [ ] Detailed space suit visible
- [ ] Bubbles rising from backpack
- [ ] Smooth animations
- [ ] Proper lighting

### Tools ✅
- [ ] All 4 tools look unique
- [ ] Proper materials (metal, rubber, wood)
- [ ] Proximity rings work
- [ ] Can be collected

### Panels ✅
- [ ] Circuit board details visible
- [ ] LEDs change color
- [ ] Damage indicators show when damaged
- [ ] Can be repaired

### Cables ✅
- [ ] Detailed connectors
- [ ] Braided cable appearance
- [ ] Color changes when connected
- [ ] LEDs work correctly

### Performance ✅
- [ ] FPS >30 consistently
- [ ] No console errors (except Tailwind warnings)
- [ ] Smooth interactions
- [ ] Responsive controls

### Gameplay ✅
- [ ] All interactions work
- [ ] Score increases correctly
- [ ] Mission can be completed
- [ ] No bugs in game logic

## 📸 Screenshot Locations

For documentation/bug reports, take screenshots at:

1. **Astronaut Close-up**: Full detail of space suit
2. **All Four Tools**: Side-by-side comparison
3. **Damaged Panel**: Showing cracks and LEDs
4. **Repaired Panel**: After repair, green glow
5. **Cable Details**: Both connectors visible
6. **Full Scene**: Everything together
7. **Mission Complete**: Final score screen

## 🎉 Success Criteria

The visual enhancement is successful if:

✅ All components look realistic and detailed  
✅ Materials have proper metalness/roughness  
✅ Animations are smooth and natural  
✅ Performance stays above 30 FPS  
✅ No game-breaking bugs  
✅ Interactions still work correctly  
✅ Score system functions properly  
✅ Mission can be completed  

## 📝 Testing Report Template

If you find issues, report using this format:

```
**Issue Title**: [Brief description]

**Component**: [Astronaut/Tool/Panel/Cable/Other]

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Result**:
[What should happen]

**Actual Result**:
[What actually happens]

**Screenshots**:
[Attach if possible]

**Browser**: [Chrome/Firefox/Safari/Edge]
**FPS**: [Number]
**Console Errors**: [Yes/No - paste if yes]
```

---

## 🚀 Quick Test (5 Minutes)

If you only have 5 minutes:

1. **Start NBL Training** (1 min)
2. **Move around and look at astronaut** (1 min)
3. **Approach each tool type** (1 min)
4. **Look at a panel up close** (1 min)
5. **Check a cable** (1 min)

If everything looks detailed and realistic: ✅ SUCCESS!

---

**Testing Guide Version**: 1.0  
**Estimated Testing Time**: 15-30 minutes (full test)  
**Required**: Web browser, development server running  
**Recommended**: Chrome/Edge, 1920×1080 display
