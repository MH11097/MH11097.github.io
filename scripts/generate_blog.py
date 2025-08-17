#!/usr/bin/env python3
"""
Blog Post Generator for MH11097's Tech Blog

Generates HTML files from Jekyll markdown posts with proper formatting
and Vietnamese language support.

Author: MH11097
Version: 2.0
"""

import os
import re
import sys
import argparse
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Tuple

def parse_metadata(content: str) -> Tuple[Dict[str, str], str]:
    """Parse YAML front matter from markdown content.
    
    Args:
        content: Raw markdown content with potential front matter
        
    Returns:
        Tuple of (metadata dict, content without front matter)
    """
    metadata = {}
    lines = content.split('\n')
    
    if not lines or lines[0].strip() != '---':
        return {}, content
        
    end_idx = 1
    while end_idx < len(lines) and lines[end_idx].strip() != '---':
        line = lines[end_idx].strip()
        if ':' in line:
            key, value = line.split(':', 1)
            metadata[key.strip()] = value.strip().strip('"\'')
        end_idx += 1
    
    # Return content without front matter
    content_start = end_idx + 1 if end_idx < len(lines) else len(lines)
    markdown_content = '\n'.join(lines[content_start:])
    return metadata, markdown_content

def simple_markdown_to_html(markdown_text: str) -> str:
    """Convert markdown to HTML with Vietnamese support.
    
    Args:
        markdown_text: Raw markdown content
        
    Returns:
        HTML formatted string
    """
    if not markdown_text.strip():
        return ''
        
    html = markdown_text
    
    # Convert headers (with proper ID generation for Vietnamese)
    html = re.sub(r'^### (.*$)', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.*$)', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^# (.*$)', r'<h1>\1</h1>', html, flags=re.MULTILINE)
    
    # Convert code blocks
    html = re.sub(r'```([^\n]*)\n([^`]+?)```', r'<pre><code class="language-\1">\2</code></pre>', html, flags=re.DOTALL)
    html = re.sub(r'`([^`]+)`', r'<code>\1</code>', html)
    
    # Convert paragraphs
    paragraphs = re.split(r'\n\s*\n', html)
    processed_paragraphs = []
    
    for para in paragraphs:
        para = para.strip()
        if para and not re.match(r'^<[^>]+>', para):  # Not already HTML
            para = f'<p>{para}</p>'
        processed_paragraphs.append(para)
    
    html = '\n\n'.join(processed_paragraphs)
    
    # Convert formatting
    html = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', html)
    html = re.sub(r'\*(.*?)\*', r'<em>\1</em>', html)
    
    # Convert links
    html = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', html)
    
    # Convert lists
    html = re.sub(r'^- (.*$)', r'<li>\1</li>', html, flags=re.MULTILINE)
    html = re.sub(r'(<li>.*?</li>)', r'<ul>\n\1\n</ul>', html, flags=re.DOTALL)
    
    return html.strip()

def generate_post_html(post_path: str) -> Optional[Dict[str, str]]:
    """Generate HTML file from Jekyll markdown post.
    
    Args:
        post_path: Path to the markdown file
        
    Returns:
        Dict with post information or None if skipped
    """
    try:
        with open(post_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except (IOError, UnicodeDecodeError) as e:
        print(f"Error reading {post_path}: {e}")
        return None
    
    metadata, markdown_content = parse_metadata(content)
    
    # Skip if not published (default to true if not specified)
    published = metadata.get('published', 'true').lower()
    if published not in ['true', 'guest']:
        print(f"Skipping {post_path} - not published (status: {published})")
        return None
    
    # Convert markdown to HTML
    html_content = simple_markdown_to_html(markdown_content)
    
    # Create simple HTML template
    title = metadata.get('title', 'Untitled')
    date = metadata.get('date', '')
    tags = metadata.get('tags', '').split(', ')
    
    # Format date
    try:
        date_obj = datetime.strptime(date, '%Y-%m-%d %H:%M:%S')
        formatted_date = date_obj.strftime('%d-%m-%Y')
    except:
        formatted_date = date
    
    html_template = f"""<!DOCTYPE html>
<html>
<head>
    <title>{title} | MH11097's Tech Blog</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Inconsolata:400,700&amp;subset=latin-ext,vietnamese" rel="stylesheet">
    <link href="../assets/css/theme.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="../assets/css/highlight/tomorrow-night.css">
    <link rel="stylesheet" href="../assets/css/fontello.css">
    <link rel="stylesheet" href="../assets/emoji/css/messenger.min.css">
    <link rel="stylesheet" href="../assets/emoji/css/thinking.ext.css">
</head>
<body>
    <div class="header">
        <a href="/"><span class="header-link">MH11097's Tech Blog</span></a>
    </div>
    
    <div class="container">
        <div class="main">
            <article class="post-content">
                <h1 class="post-title">{title}</h1>
                <div class="post-meta">
                    <span class="post-date">{formatted_date}</span>
                    {' | ' + ', '.join(tags) if tags and tags[0] else ''}
                </div>
                <div class="post-body">
                    {html_content}
                </div>
            </article>
        </div>
    </div>

    <div class="footer">
        <p>Created with <a href="https://github.com/MH11097">MH11097's Blog</a></p>
        <div class="social">
            <a target="_blank" href="http://github.com/MH11097"><i class="icon-github-squared"></i></a>
        </div>
    </div>
</body>
</html>"""
    
    # Write HTML file
    html_filename = post_path.replace('.md', '.html').replace('_posts/', 'content/')
    with open(html_filename, 'w', encoding='utf-8') as f:
        f.write(html_template)
    
    print(f"Generated: {html_filename}")
    
    return {
        'title': title,
        'date': date,
        'formatted_date': formatted_date,
        'tags': tags,
        'filename': os.path.basename(html_filename),
        'published': published
    }

def create_new_post(title: str) -> None:
    """Create a new blog post template.
    
    Args:
        title: Title of the new post
    """
    # Create filename from title
    date_str = datetime.now().strftime('%Y-%m-%d')
    slug = re.sub(r'[^a-zA-Z0-9\s]', '', title.lower())
    slug = re.sub(r'\s+', '-', slug.strip())
    filename = f"{date_str}-{slug}.md"
    
    # Create post content
    content = f"""---
title: "{title}"
date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
layout: post
published: false
tags: []
---

# {title}

Your content here...
"""

    post_path = os.path.join('_posts', filename)
    try:
        with open(post_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Created new post: {post_path}")
    except IOError as e:
        print(f"Error creating post: {e}")

def main() -> None:
    """Main function with command line argument parsing."""
    parser = argparse.ArgumentParser(description='Generate HTML blog posts from markdown')
    parser.add_argument('--new-post', type=str, help='Create a new post with given title')
    parser.add_argument('--posts-dir', default='_posts', help='Directory containing markdown posts')
    parser.add_argument('--output-dir', default='content', help='Directory for generated HTML posts')
    
    args = parser.parse_args()
    
    if args.new_post:
        create_new_post(args.new_post)
        return
    
    # Generate posts
    posts_dir = args.posts_dir
    output_dir = args.output_dir
    generated_posts = []
    
    # Create output directory if it doesn't exist
    Path(output_dir).mkdir(exist_ok=True)
    
    try:
        if not os.path.exists(posts_dir):
            print(f"Posts directory '{posts_dir}' not found!")
            return
            
        files = os.listdir(posts_dir)
        md_files = [f for f in files if f.endswith('.md') and 
                   f not in ['about.md', 'projects.md', 'README.md']]
        
        if not md_files:
            print(f"No markdown files found in {posts_dir}")
            return
            
        print(f"Processing {len(md_files)} markdown files...")
        
        for md_file in md_files:
            post_path = os.path.join(posts_dir, md_file)
            post_info = generate_post_html(post_path)
            if post_info:
                generated_posts.append(post_info)
        
        print(f"\n[SUCCESS] Generated {len(generated_posts)} blog posts successfully!")
        
        # Show list of generated posts
        if generated_posts:
            print("\nGenerated posts:")
            for post in generated_posts:
                print(f"  - {post['title']} ({post['filename']})")
        
    except Exception as e:
        print(f"[ERROR] {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Set UTF-8 encoding for Windows console
    if sys.platform == "win32":
        import codecs
        sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
        sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')
    
    main()