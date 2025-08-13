# Codebase Structure

## Directory Layout
```
/
├── generator-rs/           # Rust blog generator source code
│   ├── src/               # Rust source files
│   ├── Cargo.toml         # Rust dependencies
│   └── Cargo.lock         # Dependency lock file
├── posts/                 # Blog posts in Markdown format
│   ├── img/              # Post images
│   └── *.md              # Individual blog posts
├── templates/             # HTML templates for generation
│   ├── index.template.html
│   ├── posts.template.html
│   ├── preview.template.html
│   ├── tags.template.html
│   └── en.template.html
├── css/                   # Stylesheets
├── js/                    # JavaScript files
├── img/                   # Static images
├── emoji/                 # Emoji assets
├── font/                  # Font files
├── gen                    # Symlink to compiled Rust binary
├── index.html             # Generated homepage
├── rss.xml               # Generated RSS feed
├── .env                  # Environment configuration
└── README.md             # Project documentation
```

## Key Files
- `gen`: Symlink to `./generator-rs/target/debug/generator-rs`
- `.env`: Contains blog configuration (domain, RSS settings, date format)
- `posts/*.md`: Blog content with YAML frontmatter
- `templates/*.html`: Template files for HTML generation