# Style and Conventions

## Content Style
- Blog posts are written in **Vietnamese** language
- Personal, casual tone with technical content
- Posts cover programming, technology, random thoughts
- Use of technical terms mixed with Vietnamese

## File Naming
- Post files: kebab-case with `.md` extension (e.g., `life-with-robot.md`)
- Image files: descriptive names in `posts/img/` or `img/`

## Post Metadata Format
```yaml
---
title: <descriptive title in Vietnamese>
published: true | false | private | guest
date: YYYY-DD-mm HH:MM:SS
tags: <comma-separated tags>
description: <brief description>
image: <optional featured image URL>
---
```

## Published Status
- `true`: Public post, shown on homepage
- `false`: Draft, not generated
- `private`: Generated but not shown on homepage
- `guest`: Shown as guest post

## Code Style (Rust)
- Standard Rust conventions
- Use of external crates for functionality
- Simple, straightforward implementation
- Focus on static site generation functionality

## Template Structure
- HTML templates with placeholder variables
- Separate templates for different page types
- CSS organized in thematic files