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

    // Enhanced embedded detection and navigation positioning
    function initEmbeddedDetection() {
        const isEmbedded = window !== window.top;
        const nav = document.querySelector('.floating-nav');
        
        // 配置选项：是否在嵌入时隐藏导航栏
        const HIDE_NAV_IN_EMBEDDED = true; // 设置为 true 可以完全隐藏嵌入时的导航栏
        
        // Function to detect parent site navigation height and structure
        function detectParentNavigation() {
            if (!isEmbedded) return { height: 0, hasNav: false };
            
            try {
                const iframe = window.frameElement;
                if (iframe) {
                    const iframeRect = iframe.getBoundingClientRect();
                    const parentWindow = window.parent;
                    
                    // Check if iframe is positioned below typical navigation height
                    if (iframeRect.top > 80) {
                        return { height: iframeRect.top, hasNav: true };
                    }
                    
                    // Try to detect parent navigation elements
                    try {
                        const parentNav = parentWindow.document.querySelector('nav, .nav, .navbar, .header, .menu, [class*="nav"], [class*="menu"], [class*="header"]');
                        if (parentNav) {
                            const navRect = parentNav.getBoundingClientRect();
                            return { height: navRect.height, hasNav: true };
                        }
                    } catch (e) {
                        // Cross-origin restriction
                    }
                }
            } catch (e) {
                // Cross-origin restriction
            }
            
            // Fallback: assume parent has navigation if embedded
            return { height: isEmbedded ? 80 : 0, hasNav: isEmbedded };
        }
        
        // Function to check if navigation is being covered by parent elements
        function checkNavigationVisibility() {
            if (!isEmbedded) return true;
            
            const navRect = nav.getBoundingClientRect();
            const parentInfo = detectParentNavigation();
            
            // If navigation is positioned too close to top and parent has nav, likely covered
            return navRect.top > parentInfo.height + 20;
        }
        
        // Function to determine optimal navigation position
        function calculateOptimalPosition() {
            const parentInfo = detectParentNavigation();
            const currentIsMobile = window.innerWidth <= 768;
            const scrolled = window.pageYOffset;
            const viewportHeight = window.innerHeight;
            
            let position = {
                type: 'fixed',
                top: 16,
                zIndex: 9999,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
            };
            
            if (isEmbedded) {
                // 如果配置为隐藏嵌入时的导航栏
                if (HIDE_NAV_IN_EMBEDDED) {
                    position = {
                        type: 'none',
                        display: 'none'
                    };
                    return position;
                }
                
                // Enhanced embedded positioning logic
                const isLikelyCovered = !checkNavigationVisibility();
                const parentNavHeight = parentInfo.height;
                
                if (isLikelyCovered || parentNavHeight > 60) {
                    // Switch to relative positioning below content
                    position = {
                        type: 'relative',
                        top: 0,
                        zIndex: 999999,
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px) saturate(1.2)',
                        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(255, 255, 255, 0.8)',
                        border: '3px solid rgba(102, 126, 234, 0.4)',
                        margin: '20px auto 30px auto',
                        transform: 'none',
                        left: 'auto'
                    };
                } else {
                    // Use enhanced fixed positioning with parent nav consideration
                    let topPosition;
                    if (scrolled > 50) {
                        topPosition = currentIsMobile ? 
                            Math.max(20, parentNavHeight * 0.4) : 
                            Math.max(40, parentNavHeight * 0.6);
                    } else {
                        topPosition = currentIsMobile ? 
                            Math.max(30, parentNavHeight * 0.6) : 
                            Math.max(60, parentNavHeight * 0.8);
                    }
                    
                    position = {
                        type: 'fixed',
                        top: topPosition,
                        zIndex: 999999,
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px) saturate(1.2)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.5)',
                        border: '2px solid rgba(102, 126, 234, 0.2)',
                        transform: 'translateX(-50%)',
                        left: '50%'
                    };
                }
            } else {
                // Standard positioning for non-embedded
                const topPosition = scrolled > 50 ? 
                    (currentIsMobile ? '8px' : '16px') : 
                    (currentIsMobile ? '12px' : '24px');
                    
                position = {
                    type: 'fixed',
                    top: topPosition,
                    zIndex: 9999,
                    background: scrolled > 50 ? 
                        'rgba(255, 255, 255, 0.98)' : 
                        'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: scrolled > 50 ? 
                        '0 12px 40px rgba(0, 0, 0, 0.2)' : 
                        '0 8px 32px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transform: 'translateX(-50%)',
                    left: '50%'
                };
            }
            
            return position;
        }
        
        function updateNavigationPosition() {
            const position = calculateOptimalPosition();
            
            // 如果配置为隐藏导航栏
            if (position.type === 'none') {
                nav.style.display = 'none';
                return;
            }
            
            // Apply position and styling
            nav.style.display = 'flex'; // 确保显示
            nav.style.position = position.type;
            nav.style.top = position.top + (typeof position.top === 'number' ? 'px' : '');
            nav.style.zIndex = position.zIndex;
            nav.style.background = position.background;
            nav.style.backdropFilter = position.backdropFilter;
            nav.style.boxShadow = position.boxShadow;
            nav.style.border = position.border;
            
            if (position.transform) {
                nav.style.transform = position.transform;
            }
            if (position.left) {
                nav.style.left = position.left;
            }
            if (position.margin) {
                nav.style.margin = position.margin;
            }
            
            // Add/remove embedded classes
            if (isEmbedded) {
                nav.classList.add('embedded');
                if (position.type === 'relative') {
                    nav.classList.add('deep-embed');
                } else {
                    nav.classList.remove('deep-embed');
                }
            } else {
                nav.classList.remove('embedded', 'deep-embed');
            }
        }
        
        // Initial positioning with delay to ensure DOM is ready
        setTimeout(updateNavigationPosition, 100);
        
        // Handle window resize
        window.addEventListener('resize', updateNavigationPosition);
        
        // Handle scroll events
        window.addEventListener('scroll', updateNavigationPosition);
        
        // Periodic check for embedded context changes
        if (isEmbedded) {
            setInterval(updateNavigationPosition, 2000);
        }
        
        // Add intersection observer to detect if nav is being covered
        if (isEmbedded && 'IntersectionObserver' in window) {
            setTimeout(() => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio < 0.8) {
                            // Navigation is being covered, switch to relative mode
                            nav.classList.add('deep-embed');
                            updateNavigationPosition();
                        }
                    });
                }, {
                    threshold: [0.5, 0.8, 1.0],
                    rootMargin: '0px 0px -20px 0px'
                });
                
                observer.observe(nav);
            }, 1000);
        }
        
        // Add message listener for parent communication
        if (isEmbedded) {
            window.addEventListener('message', function(event) {
                if (event.data && event.data.type === 'PARENT_NAV_HEIGHT') {
                    // Parent page can send navigation height information
                    const parentNavHeight = event.data.height || 0;
                    if (parentNavHeight > 0) {
                        // Update navigation position based on parent nav height
                        setTimeout(updateNavigationPosition, 100);
                    }
                }
            });
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