// Global Language Management System
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
        this.init();
    }

    init() {
        // Set initial language
        this.updateLanguage(this.currentLang);
        
        // Listen for storage changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'preferredLanguage') {
                this.currentLang = e.newValue || 'en';
                this.updateLanguage(this.currentLang, false);
            }
        });
    }

    toggle() {
        this.currentLang = this.currentLang === 'en' ? 'vi' : 'en';
        this.updateLanguage(this.currentLang, true);
    }

    updateLanguage(lang, saveToStorage = true) {
        this.currentLang = lang;
        
        if (saveToStorage) {
            localStorage.setItem('preferredLanguage', lang);
        }

        // Update toggle button
        this.updateToggleButton();

        // Trigger custom event for pages to listen
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { lang: lang }
        }));
    }

    updateToggleButton() {
        const toggleBtn = document.querySelector('.language-toggle');
        const indicator = document.querySelector('.language-indicator');
        
        if (toggleBtn && indicator) {
            if (this.currentLang === 'vi') {
                indicator.textContent = '🇻🇳';
                toggleBtn.childNodes[2].textContent = 'Tiếng Việt';
            } else {
                indicator.textContent = '🇺🇸';
                toggleBtn.childNodes[2].textContent = 'English';
            }
        }
    }

    getCurrentLang() {
        return this.currentLang;
    }
}

// Global instance
window.languageManager = new LanguageManager();

// Global toggle function for onclick handlers
function toggleLanguage() {
    window.languageManager.toggle();
}