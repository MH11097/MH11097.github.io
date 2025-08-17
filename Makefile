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
	@read -p "Enter post title: " title; \
	python scripts/generate_blog.py --new-post "$title"

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

generate:
	@echo "📝 Generating blog posts..."
	@python scripts/generate_blog.py

update-homepage:
	@echo "🏠 Updating homepage..."
	@python scripts/update-homepage.py

help:
	@echo "Available commands:"
	@echo "  make install       - Install Ruby gems"
	@echo "  make serve         - Start development server" 
	@echo "  make build         - Build for production"
	@echo "  make new-post      - Create new post"
	@echo "  make generate      - Generate blog posts from markdown"
	@echo "  make update-homepage - Update homepage"
	@echo "  make deploy        - Build and deploy"
	@echo "  make clean         - Clean build files"
	@echo "  make update        - Update dependencies"