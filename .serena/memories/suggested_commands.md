# Suggested Commands

## Development Commands

### Build the generator
```bash
cd generator-rs
cargo build
```

### Generate blog from posts
```bash
./gen posts
```

### Preview blog during development
```bash
./gen preview
# Then visit http://localhost:3123/view/<post-name-without-extension>
```

### Git operations
```bash
git add .
git commit -m "commit message"
git push origin main
```

## File Operations (macOS)
```bash
ls -la          # List files with details
find . -name    # Find files by name
grep -r         # Search in files
```

## Post Management

### Create new post
Create file in `posts/` directory with format:
```markdown
---
title: <string>
published: true | false | private | guest
date: YYYY-DD-mm HH:MM:SS
tags: <string>, <string>,...
description: <string>
image: <url to a featured image>
---

Post content here...
```

### Publish workflow
1. Edit post in `posts/` directory
2. Set `published: true` in frontmatter
3. Run `./gen posts` to regenerate site
4. Commit and push changes