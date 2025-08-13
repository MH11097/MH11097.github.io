.PHONY: install serve build new-post deploy clean help

install:
	@echo "💎 Installing Ruby gems..."
	@bundle install

serve:
	@echo "🚀 Starting development server..."
	@bundle exec jekyll serve --drafts --future --livereload --open-url

build:
	@echo "🏗️ Building for production..."
	@JEKYLL_ENV=production bundle exec jekyll build

new-post:
	@echo "❌ new_post.rb script not found. Create posts manually in _posts/"

deploy: build
	@echo "🚀 Deploying to GitHub Pages..."
	@git add -A
	@git commit -m "Deploy: $$(date)"
	@git push origin main

clean:
	@echo "🧹 Cleaning build files..."
	@bundle exec jekyll clean
	@rm -rf .jekyll-cache

update:
	@echo "⬆️ Updating dependencies..."
	@bundle update

help:
	@echo "Available commands:"
	@echo "  make install   - Install Ruby gems"
	@echo "  make serve     - Start development server" 
	@echo "  make build     - Build for production"
	@echo "  make new-post  - Show instructions for creating posts"
	@echo "  make deploy    - Build and deploy"
	@echo "  make clean     - Clean build files"
	@echo "  make update    - Update dependencies"