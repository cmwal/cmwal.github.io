# Portfolio Website - Setup Guide

## Directory Structure

Your website should have the following structure:

```
portfolio-website/
├── index.html
├── styles/
│   └── main.css
├── js/
│   └── main.js
├── projects/
│   ├── projects.json
│   ├── your-project-1.md
│   ├── your-project-2.md
│   └── ...
└── images/
    ├── project1-image.jpg
    ├── project2-image.jpg
    └── ...
```

## Quick Start

### 1. Create the Directory Structure

Create the folders as shown above and place the files in their respective locations:
- `index.html` in the root
- `main.css` in the `styles/` folder
- `main.js` in the `js/` folder
- Create a `projects/` folder for your markdown files
- Create an `images/` folder for project images

### 2. Configure Your Projects

Create a `projects.json` file in the `projects/` folder that lists all your markdown files:

```json
[
  "machine-learning-classifier.md",
  "iot-smart-home.md",
  "web-application.md",
  "robotics-project.md"
]
```

### 3. Write Your Project Markdown Files

Each markdown file should include frontmatter at the top with metadata:

```markdown
---
title: Your Project Title
summary: A brief one-sentence description of your project
image: images/your-project-image.jpg
featured: true
---

# Your Project Title

## Section 1

Your content here...
```

#### Frontmatter Fields:

- **title** (required): The display name of your project
- **summary** (required): Brief description shown on project cards
- **image** (optional): Path to project image (relative to root). If omitted, a placeholder is generated
- **featured** (optional): Set to `true` to show on homepage, `false` otherwise

### 4. Add New Projects - Just Drop and Edit!

To add a new project:

1. **Create your markdown file** in the `projects/` folder (e.g., `my-new-project.md`)
2. **Add frontmatter** at the top of the file
3. **Write your content** using standard Obsidian markdown
4. **Add the filename** to `projects.json`
5. **Refresh your website** - that's it!

Example new project file (`my-new-project.md`):

```markdown
---
title: My Awesome New Project
summary: This project does something really cool with AI and robotics
image: images/my-project.jpg
featured: true
---

# My Awesome New Project

## What it does

This project combines...

## How I built it

First, I...
```

Then add to `projects.json`:
```json
[
  "machine-learning-classifier.md",
  "my-new-project.md",
  "other-project.md"
]
```

## Customization

### Update Personal Information

Edit `index.html` to update:
- Your name in the navbar logo
- Hero section title and description
- Social media links (GitHub, LinkedIn, email)

### Change Color Scheme

Edit `styles/main.css` and modify the CSS variables at the top:

```css
:root {
    --navy: #0a2540;
    --dark-navy: #051628;
    --light-navy: #1a3a5c;
    --grey: #5c6b7d;
    --light-grey: #a8b2bf;
}
```

### Add Project Images

Place your project images in the `images/` folder and reference them in your markdown frontmatter:

```yaml
image: images/my-project-screenshot.jpg
```

## Markdown Features Supported

Your Obsidian markdown files support:

- **Headers**: `#`, `##`, `###`, `####`
- **Bold**: `**text**`
- **Italic**: `*text*`
- **Code**: `` `inline code` ``
- **Code blocks**: 
  ````
  ```python
  code here
  ```
  ````
- **Links**: `[text](url)`
- **Images**: `![alt text](image-url)`
- **Lists**: `- item` or `1. item`
- **Blockquotes**: `> quote`
- **Tables**: Standard markdown tables

## Deployment

### Option 1: GitHub Pages (Free)

1. Create a GitHub repository
2. Upload all your files
3. Go to Settings → Pages
4. Select "Deploy from main branch"
5. Your site will be live at `https://yourusername.github.io/repo-name`

### Option 2: Netlify (Free)

1. Sign up at netlify.com
2. Drag and drop your website folder
3. Your site is live instantly!
4. Netlify will give you a URL like `your-site.netlify.app`

### Option 3: Traditional Web Hosting

Upload all files to your web server via FTP, ensuring the directory structure is maintained.

## Important Notes

⚠️ **Browser Security**: Modern browsers block local file loading for security. You need to:
- Use a local web server (like Python's `http.server` or VS Code's Live Server extension)
- OR deploy to a web host (GitHub Pages, Netlify, etc.)

To test locally with Python:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

## Troubleshooting

### Projects not showing up?
- Check that `projects.json` exists and lists your markdown files correctly
- Ensure markdown files have proper frontmatter
- Check browser console (F12) for error messages

### Images not loading?
- Verify image paths are relative to the root directory
- Ensure images are in the `images/` folder
- Check file names match exactly (including case)

### Styling looks wrong?
- Confirm `main.css` is in the `styles/` folder
- Check browser console for 404 errors
- Clear browser cache (Ctrl+F5)

## Example Workflow

Here's how you'd add a new project from your Obsidian notes:

1. You finish a project and document it in Obsidian: `Robotics-Arm-Project.md`
2. Add frontmatter to the top of the file
3. Copy the file to your website's `projects/` folder
4. Add `"Robotics-Arm-Project.md"` to `projects.json`
5. If you have images, copy them to the `images/` folder
6. Commit and push to GitHub (if using GitHub Pages)
7. Your project appears on the website automatically!

## Need Help?

- Check browser console (F12 → Console tab) for errors
- Ensure all file paths are correct
- Verify JSON syntax in `projects.json` (use a JSON validator)
- Make sure you're running a local web server for testing

Enjoy your new portfolio website! 🚀