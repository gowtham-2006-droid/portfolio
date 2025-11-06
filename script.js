/* ==========================================
   DARK AESTHETIC PORTFOLIO - JAVASCRIPT
   Author: Gowtham Nagaraju
   ========================================== */

// ===== PAGE LOADER =====
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    setTimeout(() => {
        loader.style.animation = 'fadeOut 0.8s ease-out forwards';
    }, 1800);
});

// ===== INIT ALL FUNCTIONS =====
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initNavigation();
    initContactForm();
    initProjectLinks();
    initScrollAnimations();
    initParallaxEffect();
    initSmoothScroll();
    initThemeToggle();
    initScrollProgress();
    initResumeButton();
    initProjectFilters();
    initCounterAnimation();
    initBackToTop();
    initThemeCustomizer();
    initAudioControl();
    initAnalytics();
    initGoogleAnalytics();
    initSkillProgress();
});

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            animateHamburger(hamburger, navMenu.classList.contains('active'));
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (hamburger) {
                animateHamburger(hamburger, false);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            if (hamburger) {
                animateHamburger(hamburger, false);
            }
        }
    });
}

function animateHamburger(hamburger, isOpen) {
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translateY(12px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
}

// ===== NAVIGATION HIGHLIGHTING =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#home') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Let Formspree handle the submission
            showNotification('Sending your message...', 'info');
        });
    }
}

// ===== PROJECT LINKS =====
function initProjectLinks() {
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Project details page is coming soon!', 'info');
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll(
        '.about-card, .project-card, .skill-badge, .social-link, .contact-form-wrapper, .contact-info'
    );
    
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
    const heroVisual = document.querySelector('.hero-visual');
    const floatingBoxes = document.querySelectorAll('.floating-box');
    
    if (heroVisual && floatingBoxes.length > 0) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            floatingBoxes.forEach((box, index) => {
                const moveX = (x - 0.5) * 30 * (index + 1);
                const moveY = (y - 0.5) * 30 * (index + 1);
                
                box.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
}

// ===== HELPER: EMAIL VALIDATION =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== HELPER: SHOW NOTIFICATION =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        success: { bg: '#00d9ff', border: '#00a8b3' },
        error: { bg: '#ff006e', border: '#cc0056' },
        info: { bg: '#8338ec', border: '#6c2fb0' }
    };
    
    const color = colors[type];
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: rgba(10, 14, 39, 0.95);
        color: ${color.bg};
        border-radius: 8px;
        border: 2px solid ${color.bg};
        font-weight: 600;
        z-index: 3000;
        animation: slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: 0 0 30px ${color.bg}40;
        max-width: 400px;
        backdrop-filter: blur(10px);
        font-family: 'Space Grotesk', sans-serif;
        letter-spacing: 0.5px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// ===== GLOBAL PAGE TRANSITION =====
function pageTransition() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    setTimeout(() => transition.remove(), 600);
}

// Handle external links with transition
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.target === '_blank') {
        pageTransition();
    }
});

// ===== SCROLL TO TOP ON SECTION CHANGE =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.borderBottomColor = 'rgba(0, 217, 255, 0.3)';
    } else {
        navbar.style.borderBottomColor = 'rgba(0, 217, 255, 0.1)';
    }
});

// ===== ADD SCROLL REVEAL EFFECT TO SKILL BADGES =====
document.querySelectorAll('.skill-badge').forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.05}s`;
    badge.style.animation = 'slideInUp 0.8s ease-out backwards';
});

// ===== PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN =====
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');

hamburger?.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// ===== ADD CURSOR GLOW EFFECT (Optional) =====
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // You can add cursor effects here if needed
});

// ===== THEME TOGGLE (Dark/Light Mode) =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            showNotification(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated!`, 'info');
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
    window.addEventListener('scroll', () => {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / scrollHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        }
    });
}

// ===== RESUME DOWNLOAD =====
function initResumeButton() {
    const resumeBtn = document.querySelector('.resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace 'your-resume-url' with actual resume URL or path
            const resumeUrl = 'https://drive.google.com/file/d/YOUR_RESUME_ID/view';
            window.open(resumeUrl, '_blank');
            showNotification('Resume opened in new tab!', 'success');
        });
    }
}

// ===== PROJECT FILTER =====
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    console.log('🎯 Filter Buttons found:', filterBtns.length);
    console.log('📦 Project Cards found:', projectCards.length);

    if (filterBtns.length === 0 || projectCards.length === 0) {
        console.warn('⚠️ Filter buttons or project cards not found');
        return;
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            console.log('🔍 Filtering by:', filterValue);

            // Filter projects with animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                    card.style.opacity = '1';
                    card.style.pointerEvents = 'auto';
                } else {
                    card.style.opacity = '0';
                    card.style.pointerEvents = 'none';
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    console.log('✅ Project filters initialized successfully');
}

// ===== ANIMATED COUNTER =====
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) {
        console.warn('No stat numbers found');
        return;
    }

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateCounter(entry.target);
                entry.target.dataset.animated = 'true';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(el => {
        observer.observe(el);
    });

    console.log('Counter animation initialized for', statNumbers.length, 'elements');
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = performance.now();
    const suffix = element.textContent.includes('%') ? '%' : '';

    function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuad = 1 - Math.pow(1 - progress, 2);
        const currentCount = Math.floor(start + (target - start) * easeOutQuad);

        element.textContent = currentCount + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target + suffix;
        }
    }

    requestAnimationFrame(updateCount);
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    console.log('✅ Back to Top button initialized');
}

// ===== THEME CUSTOMIZER =====
function initThemeCustomizer() {
    const customizerToggle = document.getElementById('customizerToggle');
    const customizerPanel = document.getElementById('customizerPanel');
    const colorOptions = document.querySelectorAll('.color-option');

    // Load saved theme color
    const savedColor = localStorage.getItem('themeColor') || 'cyan';
    applyThemeColor(savedColor);

    customizerToggle.addEventListener('click', () => {
        customizerPanel.classList.toggle('active');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-customizer')) {
            customizerPanel.classList.remove('active');
        }
    });

    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            
            // Update active state
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            // Apply theme
            applyThemeColor(theme);
            localStorage.setItem('themeColor', theme);

            showNotification(`Theme changed to ${theme}!`, 'success');
            console.log('🎨 Theme changed to:', theme);
        });
    });

    console.log('✅ Theme customizer initialized');
}

function applyThemeColor(theme) {
    const themeColors = {
        cyan: { primary: '#00d9ff', accent: '#8338ec' },
        purple: { primary: '#a855f7', accent: '#ec4899' },
        pink: { primary: '#ec4899', accent: '#f97316' },
        green: { primary: '#10b981', accent: '#06b6d4' },
        orange: { primary: '#f97316', accent: '#a855f7' }
    };

    const colors = themeColors[theme] || themeColors.cyan;

    document.documentElement.style.setProperty('--primary', colors.primary);
    document.documentElement.style.setProperty('--accent', colors.accent);

    // Update active color option
    const activeOption = document.querySelector(`.color-option[data-theme="${theme}"]`);
    if (activeOption) {
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
        activeOption.classList.add('active');
    }
}

// ===== AUDIO CONTROL =====
function initAudioControl() {
    const audioToggle = document.getElementById('audioToggle');
    let audio = null;
    let isPlaying = false;

    // Load saved audio preference
    const audioEnabled = localStorage.getItem('audioEnabled') === 'true';
    if (audioEnabled) {
        // Create audio element (using a free royalty-free music URL)
        audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        audio.loop = true;
        audio.volume = 0.3;
    }

    audioToggle.addEventListener('click', () => {
        if (!audio) {
            // Create audio element
            audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
            audio.loop = true;
            audio.volume = 0.3;
        }

        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            audioToggle.classList.remove('playing');
            audioToggle.innerHTML = '<i class="fas fa-music"></i> Enable Music';
            localStorage.setItem('audioEnabled', 'false');
            showNotification('Music paused', 'info');
        } else {
            audio.play().catch(err => {
                showNotification('⚠️ Audio playback not supported or blocked', 'error');
                console.log('Audio play error:', err);
            });
            isPlaying = true;
            audioToggle.classList.add('playing');
            audioToggle.innerHTML = '<i class="fas fa-pause"></i> Disable Music';
            localStorage.setItem('audioEnabled', 'true');
            showNotification('🎵 Music playing...', 'success');
        }

        console.log('🎵 Audio:', isPlaying ? 'Playing' : 'Paused');
    });

    // Auto-play if preference was saved
    if (audioEnabled) {
        audioToggle.click();
    }

    console.log('✅ Audio control initialized');
}

// ===== LOCAL ANALYTICS TRACKING =====
function initAnalytics() {
    // Initialize analytics data
    const analyticsData = {
        totalVisitors: parseInt(localStorage.getItem('totalVisitors')) || 0,
        sessionStart: Date.now(),
        sectionsViewed: JSON.parse(localStorage.getItem('sectionsViewed')) || {},
        projectClicks: JSON.parse(localStorage.getItem('projectClicks')) || {}
    };

    // Increment visitor count
    analyticsData.totalVisitors++;
    localStorage.setItem('totalVisitors', analyticsData.totalVisitors);

    // Update visitor display
    document.getElementById('totalVisitors').textContent = analyticsData.totalVisitors;

    // Track section views
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                analyticsData.sectionsViewed[sectionId] = 
                    (analyticsData.sectionsViewed[sectionId] || 0) + 1;
                localStorage.setItem('sectionsViewed', JSON.stringify(analyticsData.sectionsViewed));

                console.log('📊 Section viewed:', sectionId);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Track project clicks
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach((link, index) => {
        link.addEventListener('click', () => {
            const projectName = link.closest('.project-card').querySelector('h3').textContent;
            analyticsData.projectClicks[projectName] = 
                (analyticsData.projectClicks[projectName] || 0) + 1;
            localStorage.setItem('projectClicks', JSON.stringify(analyticsData.projectClicks));

            console.log('📈 Project clicked:', projectName);
        });
    });

    // Update session time
    setInterval(() => {
        const sessionSeconds = Math.floor((Date.now() - analyticsData.sessionStart) / 1000);
        const minutes = Math.floor(sessionSeconds / 60);
        const seconds = sessionSeconds % 60;
        
        if (minutes > 0) {
            document.getElementById('sessionTime').textContent = `${minutes}m ${seconds}s`;
        } else {
            document.getElementById('sessionTime').textContent = `${seconds}s`;
        }
    }, 1000);

    // Find most viewed section
    setTimeout(() => {
        const mostViewed = Object.keys(analyticsData.sectionsViewed).reduce((a, b) => 
            analyticsData.sectionsViewed[a] > analyticsData.sectionsViewed[b] ? a : b
        , 'projects');
        
        const sectionNames = {
            'home': 'Home',
            'about': 'About',
            'experience': 'Experience',
            'projects': 'Projects',
            'stats': 'Statistics',
            'analytics': 'Analytics',
            'certifications': 'Certifications',
            'contact': 'Contact'
        };

        document.getElementById('mostViewed').textContent = sectionNames[mostViewed] || 'Projects';
    }, 5000);

    console.log('✅ Local Analytics initialized');
    console.log('📊 Total Visitors:', analyticsData.totalVisitors);
}

// ===== GOOGLE ANALYTICS INTEGRATION =====
function initGoogleAnalytics() {
    // Google Analytics snippet with your actual Measurement ID
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-VGCSXQKE3G');

    // Track page view
    gtag('event', 'page_view');

    // Track section scrolls
    document.querySelectorAll('section[id]').forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gtag('event', 'scroll_section', {
                        'section_name': entry.target.id
                    });
                }
            });
        }, { threshold: 0.3 });
        observer.observe(section);
    });

    // Track project interactions
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gtag('event', 'project_hover', {
                'project_name': card.querySelector('h3').textContent
            });
        });
    });

    // Track button clicks
    document.querySelectorAll('.btn-primary, .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            gtag('event', 'button_click', {
                'button_text': btn.textContent.trim()
            });
        });
    });

    console.log('✅ Google Analytics initialized with ID: G-VGCSXQKE3G');
}

// ===== SKILL PROGRESS ANIMATION =====
function initSkillProgress() {
    const skillCards = document.querySelectorAll('.skill-progress-card');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill && !progressFill.dataset.animated) {
                    const target = parseInt(progressFill.getAttribute('data-target'));
                    animateSkillProgress(progressFill, target);
                    progressFill.dataset.animated = 'true';
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    skillCards.forEach(card => {
        observer.observe(card);
    });

    console.log('✅ Skill progress animation initialized');
}

function animateSkillProgress(element, target) {
    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = performance.now();

    function updateProgress(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuad = 1 - Math.pow(1 - progress, 2);
        const currentWidth = start + (target - start) * easeOutQuad;

        element.style.width = currentWidth + '%';

        if (progress < 1) {
            requestAnimationFrame(updateProgress);
        } else {
            element.style.width = target + '%';
        }
    }

    requestAnimationFrame(updateProgress);
}

// ===== CONSOLE MESSAGE =====
console.log(
    '%c🚀 Welcome to Gowtham Nagaraju\'s Portfolio!',
    'color: #00d9ff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #00d9ff;'
);
console.log(
    '%cFeature: Dark theme with aesthetic animations',
    'color: #8338ec; font-size: 12px;'
);
