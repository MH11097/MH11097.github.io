import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');

// Configure marked with syntax highlighting
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {
        console.error(err);
      }
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true
});

export function getAllPosts(): Post[] {
  // Create posts directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    // Create a sample post
    const samplePost = `---
title: "Welcome to Your Blog"
date: "2024-01-01"
---

# Welcome!

This is your first blog post. You can:

- Edit this file in \`posts/welcome.md\`
- Add new markdown files to the \`posts/\` directory
- Each post should have frontmatter with \`title\` and \`date\`

## Code Example

\`\`\`javascript
console.log("Hello, world!");
\`\`\`

Happy blogging!
`;
    fs.writeFileSync(path.join(postsDirectory, 'welcome.md'), samplePost);
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      
      const content = marked(matterResult.content);
      const excerpt = matterResult.content
        .replace(/#+\s+/g, '') // Remove headers
        .split('\n')
        .slice(0, 3)
        .join(' ')
        .substring(0, 200) + '...';

      return {
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date || '2024-01-01',
        content,
        excerpt
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    const content = marked(matterResult.content);

    return {
      slug,
      title: matterResult.data.title || slug,
      date: matterResult.data.date || '2024-01-01',
      content
    };
  } catch (error) {
    return null;
  }
}