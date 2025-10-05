# 📸 Hotspot Images Setup Guide

## Image Files to Add

Please save the 5 images you provided to the following locations:

### 1. Sahara Desert
**Source:** Image with ISS robotic arm showing sandy desert with dark patches  
**Save As:** `public/images/hotspots/sahara-desert.jpg`  
**Location ID:** 3

### 2. Himalayas
**Source:** Image showing snow-capped mountain ranges with clouds  
**Save As:** `public/images/hotspots/himalayas.jpg`  
**Location ID:** 4

### 3. Great Barrier Reef
**Source:** Image showing blue coral reef patterns in ocean  
**Save As:** `public/images/hotspots/great-barrier-reef.jpg`  
**Location ID:** 5

### 4. Great Lakes
**Source:** Image showing lakes with sediment plumes  
**Save As:** `public/images/hotspots/great-lakes.jpg`  
**Location ID:** 1

### 5. Antarctic Ice Sheets
**Source:** Colorful false-color visualization of ice flows  
**Save As:** `public/images/hotspots/antarctic-ice.jpg`  
**Location ID:** 6

---

## Quick Copy Commands (PowerShell)

If you have the images in your Downloads folder, use these commands:

```powershell
# Navigate to project directory
cd "C:\Users\Paul Raj\Nasa o1"

# Copy images (adjust source paths as needed)
Copy-Item "path\to\sahara.jpg" ".\public\images\hotspots\sahara-desert.jpg"
Copy-Item "path\to\himalayas.jpg" ".\public\images\hotspots\himalayas.jpg"
Copy-Item "path\to\reef.jpg" ".\public\images\hotspots\great-barrier-reef.jpg"
Copy-Item "path\to\lakes.jpg" ".\public\images\hotspots\great-lakes.jpg"
Copy-Item "path\to\antarctic.jpg" ".\public\images\hotspots\antarctic-ice.jpg"
```

---

## What's Already Updated

✅ **hotspotsData.json** - All image paths updated to point to local files  
✅ **Directory created** - `public/images/hotspots/` folder ready  
✅ **Descriptions enhanced** - Added detailed observations for each location  

## After Adding Images

The images will automatically appear when you:
1. Click on hotspot markers on the 3D Earth
2. View the location panels in Cupola Experience

No code changes needed - just add the image files!

---

**Directory Structure:**
```
public/
  images/
    hotspots/
      sahara-desert.jpg       ← Image 1 (with ISS arm)
      himalayas.jpg           ← Image 2 (mountains)
      great-barrier-reef.jpg  ← Image 3 (blue reefs)
      great-lakes.jpg         ← Image 4 (lakes/sediment)
      antarctic-ice.jpg       ← Image 5 (colorful ice)
```
