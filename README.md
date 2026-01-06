# Portfolio Website Guide

## Quick Setup

### 1. Personal Information
Update these in the HTML file:

**Social Links** (around line 440):
```html
<a href="https://youtube.com/@yourchannel" target="_blank">YouTube</a>
<a href="https://github.com/yourusername" target="_blank">GitHub</a>
<a href="mailto:your.email@example.com">Email</a>
```

**Hero Section** (around line 438):
```html
<h1>Hi, I'm Callum</h1>
<p>Student & Creator</p>
```

### 2. Resume
Place a PDF file named **exactly** `resume.pdf` in the same folder as your `index.html` file.

---

## Adding Projects

### Project Format
Find the `projectsData` section (around line 500) and use this format:

```
TITLE: Your Project Name
DATE: Month Year
DESCRIPTION: One-line description of your project
IMAGE: images/thumbnail.jpg
YOUTUBE: video-id-here
FEATURED: yes
---
Your full project description goes here.

You can write multiple paragraphs, add images, 3D models, and format text.

===
```

### Field Explanations

**TITLE:** The name of your project

**DATE:** Used for sorting (most recent first). Format: `January 2025`, `October 2024`, etc.

**DESCRIPTION:** Short one-liner that appears on project cards

**IMAGE:** Path to thumbnail image
- Leave blank if no image
- Example: `images/project-photo.jpg`
- Put images in an `images/` folder

**YOUTUBE:** YouTube video ID only (not full URL)
- From `youtube.com/watch?v=ABC123` use only `ABC123`
- Leave blank if no video
- Video appears at bottom of project page

**FEATURED:** Type `yes` to show on home page, leave blank to hide
- Only featured projects appear on homepage
- All projects appear on "All Projects" page

**---** This line separates the header from content

**===** Separates different projects

---

## Adding Content to Projects

### Text Formatting

**Bold text:**
```html
<b>This is bold</b>
```

**Italic text:**
```html
<i>This is italic</i>
```

**Centered text:**
```html
<div style="text-align: center;">
This text is centered
</div>
```

### Adding Images

**Basic image:**
```
[IMG: images/photo.jpg]
```

**Image with caption:**
```
[IMG: images/photo.jpg | This is the caption]
```

- Images are automatically centered
- Max width: 800px
- Captions appear in pink italic text below

### Adding 3D Models

**Basic 3D model:**
```
[3D: models/robot.glb]
```

**With caption:**
```
[3D: models/robot.glb | Interactive 3D model]
```

**With caption and custom zoom:**
```
[3D: models/robot.glb | Interactive 3D model | 2.5]
```

**Zoom values:**
- Lower = closer (1, 1.5, 2)
- Higher = further (4, 5, 6)
- Default = 3
- Range: 0.5 to 10

**3D Model Requirements:**
- Format: `.glb` or `.gltf` files only
- Put in a `models/` folder
- Export from Fusion 360: Export as OBJ/STL → Convert to GLB using blender

**3D Viewer Controls:**
- Click and drag: Rotate model
- Scroll wheel: Zoom in/out

---

## File Structure

Your website folder should look like this:

```
my-portfolio/
├── index.html              (your main file)
├── resume.pdf              (your resume)
├── images/
│   ├── project1.jpg
│   ├── project2.png
│   └── ...
└── models/
    ├── robot.glb
    ├── mount.glb
    └── ...
```

---

## Complete Project Example

```
TITLE: Robot Arm Controller
DATE: December 2024
DESCRIPTION: A 6-DOF robotic arm with custom inverse kinematics solver
IMAGE: images/robot-thumb.jpg
YOUTUBE: dQw4w9WgXcQ
FEATURED: yes
---
This project involved designing a <b>6 degree-of-freedom robotic arm</b> with custom inverse kinematics.

<div style="text-align: center;">
<b>Key Features</b>
</div>

- Custom IK solver
- Real-time motion planning  
- Python control interface

[IMG: images/robot-cad.png | CAD model of the robot arm]

Here's the interactive 3D model you can rotate:

[3D: models/robot-arm.glb | 3D model - drag to rotate | 2]

The final build used 6 servo motors and a custom PCB for control.

[IMG: images/robot-final.jpg | Completed robot arm]

===
```

---

## Tips & Best Practices

1. **Keep descriptions short** - One line for the DESCRIPTION field
2. **Use high-quality images** - They make your portfolio look professional
3. **Feature your best work** - Only add `FEATURED: yes` to 3-5 top projects
4. **Organize your files** - Use `images/` and `models/` folders
5. **Test 3D models** - Make sure they're not too large (< 10MB recommended)
6. **Write clearly** - Explain what you did, why you did it, and what you learned
7. **Update regularly** - Add new projects as you complete them

---

## Common Issues

**Problem:** Images don't show
- **Solution:** Check the file path is correct (case-sensitive!)
- Make sure image is in the right folder

**Problem:** 3D model doesn't load
- **Solution:** Ensure file is `.glb` format
- Check file path is exact (including spaces in folder names)
- Look at browser console (F12) for errors

**Problem:** Projects not showing
- **Solution:** Make sure there's `===` between each project
- Check you didn't forget the `---` line

**Problem:** Resume not displaying
- **Solution:** File must be named exactly `resume.pdf` (lowercase)
- Must be in same folder as `index.html`

---

## Testing Your Site

1. Open `index.html` in a browser
2. Click through all navigation links
3. Check each project opens correctly
4. Test 3D model controls (drag and scroll)
5. Verify all images load
6. Test on mobile (resize browser window)

or

1. Download Live Server
2. Right click on `index.html`
3. Click on "Open With Live Server"
4. Test as normal

---

## Deployment

To put your site online:

   GitHub Pages (Free):
   - Create GitHub account
   - Clone repository
   - Enable GitHub Pages in settings

---

## Need Help?

- Check browser console (F12) for error messages
- Make sure all file paths are correct
- Verify file names match exactly (case-sensitive)
- Test one change at a time