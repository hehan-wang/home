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

    // Check if embedded and adjust navigation
    function initEmbeddedDetection() {
        const isEmbedded = window !== window.top;
        const isMobile = window.innerWidth <= 768;
        const nav = document.querySelector('.floating-nav');
        
        if (isEmbedded) {
            // If embedded, move navigation further down and make it more prominent
            nav.style.top = isMobile ? '8px' : '24px';
            nav.style.zIndex = '99999';
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
            nav.classList.add('embedded');
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            const isMobileNow = window.innerWidth <= 768;
            if (isEmbedded && isMobileNow !== isMobile) {
                nav.style.top = isMobileNow ? '8px' : '24px';
            }
        });
        
        // Also check for scroll to adjust navigation
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const currentIsMobile = window.innerWidth <= 768;
            
            if (scrolled > 50) {
                nav.style.top = isEmbedded ? (currentIsMobile ? '4px' : '12px') : (currentIsMobile ? '4px' : '8px');
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
            } else {
                nav.style.top = isEmbedded ? (currentIsMobile ? '8px' : '24px') : (currentIsMobile ? '8px' : '16px');
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }
        });
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
        const animatableElements = document.querySelectorAll('.model-category, .benefit-card, .doc-card, .contact-card, .qr-card, .pricing-card, .benefit-item, .tier-card, .step-item, .faq-item');
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
            
            .doc-card:nth-child(1) { transition-delay: 0.1s; }
            .doc-card:nth-child(2) { transition-delay: 0.2s; }
            .doc-card:nth-child(3) { transition-delay: 0.3s; }
            .doc-card:nth-child(4) { transition-delay: 0.4s; }
            .doc-card:nth-child(5) { transition-delay: 0.5s; }
            .doc-card:nth-child(6) { transition-delay: 0.6s; }
            
            .benefit-item:nth-child(1) { transition-delay: 0.1s; }
            .benefit-item:nth-child(2) { transition-delay: 0.2s; }
            .benefit-item:nth-child(3) { transition-delay: 0.3s; }
            .benefit-item:nth-child(4) { transition-delay: 0.4s; }
            
            .tier-card:nth-child(1) { transition-delay: 0.1s; }
            .tier-card:nth-child(2) { transition-delay: 0.2s; }
            .tier-card:nth-child(3) { transition-delay: 0.3s; }
            .tier-card:nth-child(4) { transition-delay: 0.4s; }
            
            .step-item:nth-child(odd) { transition-delay: 0.1s; }
            .step-item:nth-child(even) { transition-delay: 0.2s; }
            
            .faq-item:nth-child(1) { transition-delay: 0.1s; }
            .faq-item:nth-child(2) { transition-delay: 0.2s; }
            .faq-item:nth-child(3) { transition-delay: 0.3s; }
            .faq-item:nth-child(4) { transition-delay: 0.4s; }
        `;
        document.head.appendChild(style);
    }

    // Enhanced hover effects for cards
    function initCardEffects() {
        const cards = document.querySelectorAll('.model-category, .benefit-card, .doc-card, .contact-card, .qr-card, .benefit-item, .tier-card, .faq-item');
        
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

    // Initialize revenue chart animation
    function initRevenueChart() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.bar');
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.opacity = '1';
                            bar.classList.add('animate-bar');
                        }, index * 200);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        const revenueChart = document.querySelector('.revenue-chart');
        if (revenueChart) {
            observer.observe(revenueChart);
        }
        
        // Add styles for bar animation
        const barStyle = document.createElement('style');
        barStyle.textContent = `
            .bar {
                opacity: 0;
                transform: scaleY(0);
                transform-origin: bottom;
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .bar.animate-bar {
                opacity: 1;
                transform: scaleY(1);
            }
        `;
        document.head.appendChild(barStyle);
    }

    // Initialize all features
    function init() {
        addAnimationStyles();
        initEmbeddedDetection();
        initSmoothScroll();
        initScrollAnimations();
        initCardEffects();
        initHeroAnimations();
        initButtonEffects();
        initStatsAnimation();
        initRevenueChart();
        
        // Event listeners
        window.addEventListener('scroll', () => {
            updateScrollProgress();
        });
        
        // Initial calls
        updateScrollProgress();
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

// Copy code function
function copyCode() {
    const code = `curl -X POST https://api.wenwen-ai.com/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "Hello!"}]}'`;
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(code).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopy(code);
        });
    } else {
        fallbackCopy(code);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess();
        } else {
            showCopyError();
        }
    } catch (err) {
        console.error('复制失败:', err);
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess() {
    const button = document.querySelector('.copy-button');
    const originalContent = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.style.background = 'rgba(16, 185, 129, 0.3)';
    button.title = '复制成功！';
    
    setTimeout(() => {
        button.innerHTML = originalContent;
        button.style.background = 'rgba(255, 255, 255, 0.1)';
        button.title = '复制代码';
    }, 2000);
}

function showCopyError() {
    const button = document.querySelector('.copy-button');
    const originalContent = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-exclamation"></i>';
    button.style.background = 'rgba(239, 68, 68, 0.3)';
    button.title = '复制失败，请手动复制';
    
    setTimeout(() => {
        button.innerHTML = originalContent;
        button.style.background = 'rgba(255, 255, 255, 0.1)';
        button.title = '复制代码';
    }, 2000);
}

// Export for external use if needed
window.WenwenAPI = {
    version: '2.0.0',
    initialized: true,
    copyCode: copyCode
};