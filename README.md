# MH11097's Tech Blog

Jekyll-based tech blog with Vietnamese language support, math rendering, and clean design.

## 🚀 Quick Start

```bash
# Install dependencies
make install

# Create new post
make new-post

# Start development server
make serve

# Deploy to GitHub Pages
make deploy
```

## 📝 Writing Posts

1. Create new post:
   ```bash
   ruby new_post.rb "Your Post Title"
   ```

2. Edit the generated markdown file in `_posts/`

3. Add images to `assets/images/posts/your-post-slug/`

4. Preview locally:
   ```bash
   bundle exec jekyll serve
   ```

## 🔬 Scientific Features

- **Math Rendering**: MathJax 3 support for equations
- **Code Highlighting**: Rouge with syntax highlighting
- **Vietnamese Support**: Full UTF-8 and proper fonts
- **Responsive Design**: Mobile-friendly layout
- **SEO Optimized**: Meta tags, sitemaps, structured data

## 📄 Post Format

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-08-10 10:00:00 +0700
categories: [research, programming]
tags: [python, science, tutorial]
author: MH11097
description: "Brief description for SEO"
math: true
---

# Your Content Here

Math equations: $E = mc^2$

Display math:
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

Code blocks:
```python
def hello_world():
    print("Hello, World!")
```

## Commands

- `make serve` - Development server
- `make build` - Production build  
- `make new-post` - Create new post
- `make deploy` - Deploy to GitHub Pages
- `make clean` - Clean build files

## Deployment

Pushes to `main` branch automatically deploy via GitHub Actions to GitHub Pages.

## Tech Stack

- **Jekyll 4.3+** - Static site generator
- **Ruby 3.1+** - Backend language
- **Liquid** - Template engine
- **SASS/SCSS** - CSS preprocessing
- **MathJax 3** - Math rendering
- **Rouge** - Syntax highlighting
- **GitHub Actions** - CI/CD pipeline