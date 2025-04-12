// Animations with GSAP and scroll triggers

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize animations
    initHeaderAnimation();
    initHeroAnimation();
    initScrollAnimations();
    
    // Add smoke animation particles
    createSmokeParticles();
});

// Header animations on scroll
function initHeaderAnimation() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Hero section animations
function initHeroAnimation() {
    const heroElements = document.querySelectorAll('.stagger-fade-in');
    
    // Animate hero elements on page load
    heroElements.forEach((element, index) => {
        gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out"
        });
    });
    
    // Animate hero image
    gsap.fromTo('.hero-image', 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.6, ease: "back.out(1.7)" }
    );
}

// Scroll animations
function initScrollAnimations() {
    // Fade in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        gsap.fromTo(element, 
            { opacity: 0, y: 20 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Section titles animation
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        gsap.fromTo(title, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    onEnter: () => title.classList.add('animate')
                }
            }
        );
    });
    
    // Product cards animation
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        gsap.fromTo(card, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.5,
                delay: index % 4 * 0.1, // Stagger based on position in row
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Category cards animation
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        gsap.fromTo(card, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.6,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Feature items animation
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        gsap.fromTo(item, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.7,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Newsletter section animation
    const newsletter = document.querySelector('.newsletter');
    const newsletterElements = document.querySelectorAll('.newsletter h2, .newsletter p, .newsletter-form');
    
    if (newsletter) {
        gsap.fromTo(newsletter, 
            { backgroundPosition: "0% 50%" },
            { 
                backgroundPosition: "100% 50%", 
                duration: 15,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );
        
        ScrollTrigger.create({
            trigger: newsletter,
            start: "top 75%",
            onEnter: () => {
                newsletter.classList.add('animate');
                gsap.fromTo(newsletterElements, 
                    { opacity: 0, y: 20 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out"
                    }
                );
            },
            once: true
        });
    }
}

// Create smoke particles animation
function createSmokeParticles() {
    const smokeContainer = document.querySelector('.smoke-animation');
    
    if (smokeContainer) {
        for (let i = 0; i < 5; i++) {
            createSmokeParticle(smokeContainer);
        }
    }
    
    const logoSmoke = document.querySelector('.smoke-effect');
    
    if (logoSmoke) {
        for (let i = 0; i < 3; i++) {
            createSmokeParticle(logoSmoke, true);
        }
    }
}

function createSmokeParticle(container, isLogo = false) {
    const particle = document.createElement('div');
    particle.className = 'smoke-particle';
    
    // Apply styles
    Object.assign(particle.style, {
        position: 'absolute',
        width: isLogo ? '8px' : '15px',
        height: isLogo ? '8px' : '15px',
        borderRadius: '50%',
        backgroundColor: 'rgba(107, 33, 168, 0.1)',
        top: isLogo ? '50%' : Math.random() * 60 + 20 + '%',
        left: isLogo ? 'calc(100% + 5px)' : Math.random() * 80 + 10 + '%',
        transform: isLogo ? 'translateY(-50%)' : 'none',
        opacity: 0
    });
    
    container.appendChild(particle);
    
    // Animate particle
    animateSmokeParticle(particle, isLogo);
}

function animateSmokeParticle(particle, isLogo) {
    const duration = isLogo ? 4 : Math.random() * 4 + 4;
    const delay = Math.random() * 3;
    
    gsap.timeline({
        repeat: -1,
        delay: delay,
        onComplete: () => {
            particle.remove();
            createSmokeParticle(particle.parentElement, isLogo);
        }
    })
    .to(particle, {
        opacity: 0.3,
        duration: duration * 0.1,
        ease: "power1.in"
    })
    .to(particle, {
        x: isLogo ? 30 : Math.random() * 40 - 20,
        y: isLogo ? -40 : -100,
        scale: isLogo ? 3 : Math.random() * 3 + 1,
        opacity: 0,
        duration: duration * 0.9,
        ease: "power1.out"
    });
}