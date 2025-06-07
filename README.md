# Simple Blog for GitHub Pages

A minimalist blog built with Next.js, designed for easy deployment to GitHub Pages.

## Features

- 📝 Write posts in Markdown
- 🎨 Clean, readable design inspired by GitHub
- 📱 Responsive layout
- 🚀 Automatic deployment to GitHub Pages
- 🔍 SEO optimized
- 💨 Fast static site generation

## Quick Start

1. **Clone this repository**

   ```bash
   git clone https://github.com/yourusername/your-blog-repo.git
   cd your-blog-repo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure your site**
   Edit `utils/consts.ts` with your information:

   ```typescript
   export const SITE_NAME = "Your Blog Name";
   export const SITE_URL = "https://yourusername.github.io/your-repo-name";
   export const TWITTER_USER = "@yourhandle";
   export const AUTHOR = "Your Name";
   export const DESCRIPTION = "Your blog description";
   ```

4. **Update GitHub Pages settings**
   In `next.config.js`, uncomment and update:

   ```javascript
   basePath: isProd ? '/your-repo-name' : '',
   assetPrefix: isProd ? '/your-repo-name/' : '',
   ```

5. **Run locally**

   ```bash
   npm run dev
   ```

6. **Add your first post**
   Create a file in `posts/my-first-post.md`:

   ```markdown
   ---
   title: "My First Post"
   date: "2024-01-01"
   ---

   # Hello World!

   This is my first blog post.
   ```

## Writing Posts

1. Create a new `.md` file in the `posts/` directory
2. Add frontmatter at the top:

   ```markdown
   ---
   title: "Your Post Title"
   date: "YYYY-MM-DD"
   ---

   Your content here...
   ```

3. Write your content in Markdown
4. Commit and push - the site will automatically rebuild!

## Deployment

1. **Enable GitHub Pages** in your repository settings
2. **Set source to GitHub Actions**
3. **Push to main branch** - the site will automatically deploy

## Customization

### Styling

- Edit `styles/globals.scss` for global styles
- Edit `styles/github-theme.scss` for content styling
- Use Tailwind classes for component styling

### Layout

- Modify `pages/_app.tsx` for site-wide layout changes
- Edit `components/SEO.tsx` for meta tags
- Update `components/Icons.tsx` for custom icons

### Content

- All posts go in the `posts/` directory
- Supported frontmatter fields: `title`, `date`
- Markdown with syntax highlighting is supported

## File Structure

```
├── components/          # React components
├── pages/              # Next.js pages
├── posts/              # Your blog posts (Markdown)
├── public/             # Static assets
├── styles/             # CSS/SCSS files
├── utils/              # Utility functions
├── .github/workflows/  # GitHub Actions
└── next.config.js      # Next.js configuration
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Highlight.js** - Syntax highlighting
- **Gray-matter** - Frontmatter parsing
- **Marked** - Markdown parsing

## License

MIT License - feel free to use this for your own blog!
