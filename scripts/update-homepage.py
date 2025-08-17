#!/usr/bin/env python3
"""
Homepage Updater for MH11097's Tech Blog

Updates the homepage with latest blog posts and metadata.
Supports Vietnamese content and proper sorting.

Author: MH11097
Version: 2.0
"""

import os
import re
import sys
import argparse
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

def extract_post_info(html_file):
    """Lấy thông tin từ file HTML post"""
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Lấy title từ thẻ <title>
        title_match = re.search(r'<title>(.*?)\s*\|\s*MH11097', content)
        title = title_match.group(1).strip() if title_match else 'Untitled'
        
        # Lấy date từ post-meta
        date_match = re.search(r'<span class="post-date">(.*?)</span>', content)
        date_str = date_match.group(1).strip() if date_match else ''
        
        # Lấy tags từ post-meta
        tags_match = re.search(r'<span class="post-tags">(.*?)</span>', content)
        tags = tags_match.group(1).strip() if tags_match else ''
        
        return {
            'title': title,
            'date': date_str,
            'tags': tags,
            'filename': os.path.basename(html_file)
        }
    except Exception as e:
        print(f"Lỗi khi đọc file {html_file}: {e}")
        return None

def update_homepage():
    """Cập nhật trang chủ với danh sách posts"""
    posts_dir = 'posts'
    posts = []
    
    # Lấy danh sách file HTML (trừ about.html và projects.html)
    try:
        files = os.listdir(posts_dir)
        html_files = [f for f in files if f.endswith('.html') and f not in ['about.html', 'projects.html']]
        
        for html_file in html_files:
            post_path = os.path.join(posts_dir, html_file)
            post_info = extract_post_info(post_path)
            if post_info:
                posts.append(post_info)
        
        # Sắp xếp theo tên file (hoặc bạn có thể sắp xếp theo date nếu muốn)
        posts.sort(key=lambda x: x['filename'], reverse=True)
        
        # Tạo HTML cho danh sách posts
        posts_html = []
        for post in posts:
            guest_tag = ""  # Có thể thêm logic cho guest post nếu cần
            post_html = f"<div class='home-list-item'><span class='home-date-indicator'>{post['date']}</span>{guest_tag}{post['tags']}<br/><a href='/content/{post['filename']}'>{post['title']}</a></div>"
            posts_html.append(post_html)
        
        # Đọc file index.html hiện tại
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Thay thế nội dung trong <div class="main">
        posts_content = '\n                '.join(posts_html)
        pattern = r'(<div class="main">)(.*?)(</div>)'
        replacement = f'\\1\n                {posts_content}\n            \\3'
        
        updated_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        
        # Ghi lại file index.html
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"✅ Đã cập nhật trang chủ với {len(posts)} bài viết:")
        for post in posts:
            print(f"   - {post['title']}")
            
    except Exception as e:
        print(f"❌ Lỗi: {e}")

if __name__ == "__main__":
    update_homepage()