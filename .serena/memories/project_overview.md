# Project Overview

## Purpose
This is "Ristretto", an opinionated blog engine that powers a personal blog (previously at https://thefullsnack.com). It's a static site generator written in Rust that converts Markdown posts to HTML.

## Tech Stack
- **Backend**: Rust (Cargo project)
- **Frontend**: Static HTML, CSS, JavaScript
- **Content**: Markdown files with YAML frontmatter
- **Dependencies**: 
  - comrak (Markdown parsing)
  - regex, time, chrono (utilities)
  - rss (RSS feed generation)
  - rouille (web server for preview)
  - dotenv (environment variables)

## Current State
- The project appears to be a personal blog of "Huy Tran" (The Full Snack Developer)
- Contains Vietnamese language content
- Has compilation issues with rustc-serialize dependency (likely due to Rust version compatibility)
- Blog posts are stored in `posts/` directory
- Generated static files are in root directory

## Blog Features
- Markdown posts with metadata (title, published status, date, tags, description, image)
- Post status: true/false/private/guest
- RSS feed generation
- Preview server for development
- Static site generation