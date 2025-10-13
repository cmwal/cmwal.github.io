// Global projects array
let projects = [];

// Parse frontmatter from markdown
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
        return { metadata: {}, content: content };
    }
    
    const frontmatter = match[1];
    const body = match[2];
    const metadata = {};
    
    frontmatter.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            
            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            
            // Convert featured to boolean
            if (key === 'featured') {
                value = value.toLowerCase() === 'true';
            }
            
            metadata[key] = value;
        }
    });
    
    return { metadata, content: body };
}

// Simple markdown parser
function parseMarkdown(md) {
    let html = md;
    
    // Code blocks (must be processed first)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    
    // Obsidian-style images with alt text: ![[image.png|Alt text]]
    html = html.replace(/!\[\[([^\]|]+)\|([^\]]+)\]\]/g, (match, filename, alt) => {
        const imagePath = filename.startsWith('images/') ? filename : `images/${filename}`;
        return `<img src="${imagePath}" alt="${alt}">`;
    });
    
    // Obsidian-style images without alt text: ![[image.png]]
    html = html.replace(/!\[\[([^\]]+)\]\]/g, (match, filename) => {
        const imagePath = filename.startsWith('images/') ? filename : `images/${filename}`;
        const alt = filename.replace(/\.(jpg|jpeg|png|gif|svg|webp)$/i, '');
        return `<img src="${imagePath}" alt="${alt}">`;
    });
    
    // Obsidian-style links: [[Page Name]]
    html = html.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '<a href="#" onclick="return false;">$2</a>');
    html = html.replace(/\[\[([^\]]+)\]\]/g, '<a href="#" onclick="return false;">$1</a>');
    
    // Standard markdown images: ![alt](url)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    
    // Headers
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Standard markdown links: [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    
    // Unordered lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
    
    // Wrap consecutive list items in ul
    html = html.replace(/(<li>.*<\/li>\n?)+/g, match => '<ul>' + match + '</ul>');
    
    // Ordered lists
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    
    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
    
    // Line breaks and paragraphs
    html = html.split('\n\n').map(para => {
        para = para.trim();
        if (!para) return '';
        if (para.startsWith('<h') || para.startsWith('<pre') || 
            para.startsWith('<ul') || para.startsWith('<ol') ||
            para.startsWith('<blockquote') || para.startsWith('<img')) {
            return para;
        }
        return '<p>' + para.replace(/\n/g, '<br>') + '</p>';
    }).join('\n');
    
    return html;
}

// Load all markdown files from projects directory
async function loadProjects() {
    try {
        // Get list of markdown files from projects directory
        const response = await fetch('projects/projects.json');
        const fileList = await response.json();
        
        const projectPromises = fileList.map(async filename => {
            try {
                console.log('Attempting to fetch:', `projects/${filename}`);
                const mdResponse = await fetch(`projects/${filename}`);
                console.log('Response status:', mdResponse.status, 'for', filename);
        
                if (!mdResponse.ok) {
                    throw new Error(`HTTP error! status: ${mdResponse.status}`);
                }
        
                const mdContent = await mdResponse.text();
                console.log('Successfully loaded:', filename);
        
            if (!mdResponse.ok) {
                throw new Error(`HTTP error! status: ${mdResponse.status}`);
            }
    
        console.log('Successfully loaded:', filename);
                const { metadata, content } = parseFrontmatter(mdContent);
                
                // Create project object
                return {
                    id: filename.replace('.md', ''),
                    title: metadata.title || filename.replace('.md', '').replace(/-/g, ' '),
                    summary: metadata.summary || metadata.description || 'Project description',
                    image: metadata.image || generatePlaceholderImage(metadata.title || filename),
                    featured: metadata.featured || false,
                    markdown: content,
                    metadata: metadata
                };
            } catch (error) {
                console.error(`Error loading ${filename}:`, error);
                return null;
            }
        });
        
        projects = (await Promise.all(projectPromises)).filter(p => p !== null);
        
        // Sort projects: featured first, then by title
        projects.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return a.title.localeCompare(b.title);
        });
        
        renderProjects();
        populateDropdown();
        
    } catch (error) {
        console.error('Error loading projects:', error);
        console.log('Make sure you have a projects.json file in the projects directory');
        // Load demo projects if file loading fails
        loadDemoProjects();
    }
}

// Generate placeholder image SVG
function generatePlaceholderImage(title) {
    const text = encodeURIComponent(title || 'Project');
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%231a3a5c' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23a8b2bf' font-size='20' font-family='Arial'%3E${text}%3C/text%3E%3C/svg%3E`;
}

// Demo projects for testing without backend
function loadDemoProjects() {
    projects = [
        {
            id: 'demo-project-1',
            title: 'Demo Machine Learning Project',
            summary: 'This is a demo project. Add your own .md files to the projects folder!',
            image: generatePlaceholderImage('ML Project'),
            featured: true,
            markdown: `# Demo Machine Learning Project

## Overview
This is a demonstration project. To use your own projects:

1. Create a \`projects\` folder in your website directory
2. Add your markdown files (e.g., \`my-project.md\`)
3. Create a \`projects.json\` file listing all your markdown files
4. Add frontmatter to your markdown files

## Frontmatter Format
\`\`\`yaml
---
title: My Project Title
summary: A brief description of the project
image: images/project-image.jpg
featured: true
---
\`\`\`

## Markdown Content
Write your project documentation here using standard markdown syntax!`
        }
    ];
    
    renderProjects();
    populateDropdown();
}

// Render projects
function renderProjects() {
    const featuredProjects = projects.filter(p => p.featured);
    renderProjectGrid('featuredProjects', featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3));
    renderProjectGrid('allProjects', projects);
}

function renderProjectGrid(containerId, projectsList) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    projectsList.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.onclick = () => showProjectDetail(project.id);
        
        card.innerHTML = `
            <div class="project-image" style="background-image: url('${project.image}')"></div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-summary">${project.summary}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Populate dropdown
function populateDropdown() {
    const dropdown = document.getElementById('projectsDropdown');
    if (!dropdown) return;
    
    dropdown.innerHTML = '';
    
    projects.forEach(project => {
        const item = document.createElement('a');
        item.className = 'dropdown-item';
        item.textContent = project.title;
        item.onclick = (e) => {
            e.preventDefault();
            showProjectDetail(project.id);
        };
        dropdown.appendChild(item);
    });
}

// Navigation functions
function showHome() {
    document.getElementById('homePage').classList.remove('hidden');
    document.getElementById('projectsPage').classList.add('hidden');
    document.getElementById('projectDetailPage').classList.add('hidden');
    window.scrollTo(0, 0);
}

function showProjects() {
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('projectsPage').classList.remove('hidden');
    document.getElementById('projectDetailPage').classList.add('hidden');
    window.scrollTo(0, 0);
}

function showProjectDetail(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('projectsPage').classList.add('hidden');
    document.getElementById('projectDetailPage').classList.remove('hidden');
    
    const content = document.getElementById('projectContent');
    content.innerHTML = parseMarkdown(project.markdown);
    
    window.scrollTo(0, 0);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});