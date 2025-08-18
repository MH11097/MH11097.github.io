// Shared Data for Multilingual Website
window.SharedData = {
    // Navigation data
    nav: {
        en: {
            posts: "Posts",
            cv: "CV"
        },
        vi: {
            posts: "Bài viết", 
            cv: "CV"
        }
    },

    // Breadcrumbs
    breadcrumbs: {
        en: {
            home: "/",
            posts: "/posts",
            cv: "/cv"
        },
        vi: {
            home: "/",
            posts: "/bài-viết",
            cv: "/CV"
        }
    },

    // Contact information
    contact: {
        email: "minhhieu111097@gmail.com",
        github: "https://github.com/MH11097",
        telegram: "https://t.me/mh11097",
        phone: {
            display: "☎ •••••••••••",
            real: "033.520.9922"
        }
    },

    // Footer data by page
    footer: {
        home: {
            en: {
                quote: "Code is poetry written in logic",
                github: "⚫ GitHub",
                telegram: "✈ Telegram", 
                email: "✉ Email"
            },
            vi: {
                quote: "Mã nguồn là thơ được viết bằng logic",
                github: "⚫ GitHub",
                telegram: "✈ Telegram", 
                email: "✉ Email"
            }
        },
        cv: {
            en: {
                quote: "Data is the new oil, but insights are the refined fuel",
                print: "🖨️ Print/PDF",
                github: "⚫ GitHub",
                telegram: "✈ Telegram", 
                email: "✉ Email"
            },
            vi: {
                quote: "Dữ liệu là dầu mỏ mới, nhưng thông tin chi tiết là nhiên liệu tinh chế",
                print: "🖨️ In/PDF",
                github: "⚫ GitHub",
                telegram: "✈ Telegram", 
                email: "✉ Email"
            }
        },
        posts: {
            en: {
                quote: "Writing code is like writing a book, debugging is like editing it",
                github: "⚫ GitHub",
                telegram: "✈ Telegram", 
                email: "✉ Email"
            },
            vi: {
                quote: "Viết mã như viết sách, debug như biên tập",
                github: "⚫ GitHub",
                telegram: "✈ Telegram", 
                email: "✉ Email"
            }
        }
    }
};

// Shared Footer Renderer
window.SharedComponents = {
    renderFooter: function(pageType, lang, includeContact = false, includePrint = false) {
        const footerData = window.SharedData.footer[pageType][lang];
        const contact = window.SharedData.contact;
        
        let footerHTML = `<div class="footer-quote">"${footerData.quote}"</div>`;
        
        if (includeContact) {
            footerHTML += `<div class="footer-contact">${footerData.contact}</div>`;
        }
        
        footerHTML += `<div class="footer-links">
            <a href="${contact.github}">${footerData.github}</a>
            <a href="${contact.telegram}">${footerData.telegram}</a>
            <a href="mailto:${contact.email}">${footerData.email}</a>`;
        
        if (includePrint) {
            footerHTML += `<a href="#" onclick="window.print()" class="print-link">${footerData.print}</a>`;
        }
        
        footerHTML += `</div>`;
        
        return footerHTML;
    },

    updateNavigation: function(lang) {
        const navData = window.SharedData.nav[lang];
        const breadcrumbData = window.SharedData.breadcrumbs[lang];
        
        // Update navigation links
        const navPosts = document.querySelector('nav a[href="posts.html"]');
        if (navPosts) navPosts.textContent = navData.posts;
        
        // Update breadcrumbs
        const breadcrumb = document.querySelector('.breadcrumb');
        if (breadcrumb) {
            const currentPath = window.location.pathname;
            if (currentPath.includes('posts')) {
                breadcrumb.textContent = breadcrumbData.posts;
            } else if (currentPath.includes('cv')) {
                breadcrumb.textContent = breadcrumbData.cv;
            }
        }
    },

    initializeLanguage: function() {
        const currentLang = window.languageManager ? window.languageManager.getCurrentLang() : 'en';
        this.updateNavigation(currentLang);
        return currentLang;
    },

    // Common transition effect
    applyTransition: function(element, callback) {
        element.classList.add('switching');
        
        setTimeout(() => {
            callback();
            setTimeout(() => {
                element.classList.remove('switching');
            }, 50);
        }, 200);
    }
};