// Modern JavaScript for enhanced user experience
document.addEventListener('DOMContentLoaded', function() {
    // Scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }

    // Smooth scroll for navigation links
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navHeight = document.querySelector('.floating-nav').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Navigation background effect on scroll
    function handleNavScroll() {
        const nav = document.querySelector('.floating-nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        }
    }

    // Intersection Observer for animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll('.model-category, .benefit-card, .doc-card, .contact-card, .qr-card, .pricing-card');
        animatableElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    // Add animate-in styles
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .model-category:nth-child(1) { transition-delay: 0.1s; }
            .model-category:nth-child(2) { transition-delay: 0.2s; }
            .model-category:nth-child(3) { transition-delay: 0.3s; }
            
            .benefit-card:nth-child(1) { transition-delay: 0.1s; }
            .benefit-card:nth-child(2) { transition-delay: 0.2s; }
            .benefit-card:nth-child(3) { transition-delay: 0.3s; }
            .benefit-card:nth-child(4) { transition-delay: 0.4s; }
            
            .contact-card:nth-child(1) { transition-delay: 0.1s; }
            .contact-card:nth-child(2) { transition-delay: 0.2s; }
            .contact-card:nth-child(3) { transition-delay: 0.3s; }
        `;
        document.head.appendChild(style);
    }

    // Enhanced hover effects for cards
    function initCardEffects() {
        const cards = document.querySelectorAll('.model-category, .benefit-card, .doc-card, .contact-card, .qr-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Initialize hero animations
    function initHeroAnimations() {
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-actions, .hero-stats');
        
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200 + 300);
        });
    }

    // Button ripple effect
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn, .nav-cta');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add ripple styles
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }

    // Stats counter animation
    function initStatsAnimation() {
        const stats = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    const suffix = text.replace(/\d/g, '');
                    
                    if (number) {
                        animateNumber(target, 0, number, suffix, 1500);
                        observer.unobserve(target);
                    }
                }
            });
        });
        
        stats.forEach(stat => observer.observe(stat));
    }

    function animateNumber(element, start, end, suffix, duration) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * easeOutCubic(progress));
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    // Parallax effect for hero shapes
    function initParallax() {
        const shapes = document.querySelectorAll('.shape');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.3;
                shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });
    }

    // Initialize all features
    function init() {
        addAnimationStyles();
        initSmoothScroll();
        initScrollAnimations();
        initCardEffects();
        initHeroAnimations();
        initButtonEffects();
        initStatsAnimation();
        initParallax();
        
        // Event listeners
        window.addEventListener('scroll', () => {
            updateScrollProgress();
            handleNavScroll();
        });
        
        // Initial calls
        updateScrollProgress();
        handleNavScroll();
    }

    // Start the application
    init();

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Export for external use if needed
window.WenwenAPI = {
    version: '2.0.0',
    initialized: true
};