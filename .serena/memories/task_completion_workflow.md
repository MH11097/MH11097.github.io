# Task Completion Workflow

## When Task is Completed

### 1. Build and Test
```bash
# Build the Rust generator
cd generator-rs
cargo build

# Generate the blog
cd ..
./gen posts
```

### 2. Verify Generated Content
- Check that `index.html` is updated
- Verify new posts appear correctly
- Test RSS feed (`rss.xml`) if posts were added/modified

### 3. Preview (Optional)
```bash
./gen preview
# Visit http://localhost:3123/view/<post-name> to preview
```

### 4. Git Operations
```bash
# Check status
git status

# Add changes
git add .

# Commit with descriptive message
git commit -m "descriptive commit message"

# Push to remote
git push origin main
```

## Common Issues
- **Rust compilation errors**: Update dependencies in `Cargo.toml` or fix version compatibility
- **Missing gen symlink**: Rebuild with `cargo build` in `generator-rs/`
- **Template errors**: Check template syntax in `templates/` directory

## Quality Checks
- Ensure all posts have proper frontmatter
- Verify image links are working
- Check that CSS/JS assets are properly linked
- Test RSS feed validity