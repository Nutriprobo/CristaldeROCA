// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Service tabs functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        btn.classList.add('active');
        
        // Show corresponding content
        const targetTab = btn.getAttribute('data-tab');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(102, 126, 234, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards for animation
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Observe contact cards for animation
document.querySelectorAll('.contact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Add loading animation to service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// WhatsApp button hover effect
document.querySelectorAll('.btn-whatsapp').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
    });
});

// Add sparkle effect to gems
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #ffd700;
        border-radius: 50%;
        pointer-events: none;
        animation: sparkleAnim 1s ease-out forwards;
    `;
    
    // Random position
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation CSS
const sparkleCSS = `
    @keyframes sparkleAnim {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = sparkleCSS;
document.head.appendChild(styleSheet);

// Create sparkles periodically
setInterval(createSparkle, 3000);

// Add floating animation to hero gems
document.querySelectorAll('.floating-gem').forEach(gem => {
    gem.addEventListener('click', () => {
        gem.style.animation = 'none';
        gem.offsetHeight; // Trigger reflow
        gem.style.animation = 'floatGem 1s ease-in-out';
    });
});

// Add click effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.btn-whatsapp')) {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(102, 126, 234, 0.1);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            card.style.position = 'relative';
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
});

// Add ripple effect CSS
const rippleCSS = `
    @keyframes ripple {
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

const rippleStyleSheet = document.createElement('style');
rippleStyleSheet.textContent = rippleCSS;
document.head.appendChild(rippleStyleSheet);

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    setTimeout(() => {
        typeWriter(heroTitle, 'Belleza Integral', 150);
    }, 1000);
    
    setTimeout(() => {
        typeWriter(heroSubtitle, 'CRISTAL DE ROCA', 100);
    }, 3000);
});

// Add counter animation for prices
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start) + ' Bs';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate prices when they come into view
const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const priceText = entry.target.textContent;
            const price = parseInt(priceText.match(/\d+/));
            if (price) {
                animateValue(entry.target, 0, price, 1000);
                priceObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.price').forEach(price => {
    if (price.textContent.includes('Bs')) {
        priceObserver.observe(price);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const floatingGems = document.querySelectorAll('.floating-gem');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    floatingGems.forEach((gem, index) => {
        const speed = 0.3 + (index * 0.1);
        gem.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add smooth reveal animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
});

// Add CSS for section animations
const sectionCSS = `
    .section-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

const sectionStyleSheet = document.createElement('style');
sectionStyleSheet.textContent = sectionCSS;
document.head.appendChild(sectionStyleSheet);

// Add loading screen
function showLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="gem-loader">
                <i class="fas fa-gem"></i>
            </div>
            <h2>CRISTAL DE ROCA</h2>
            <p>Cargando...</p>
        </div>
    `;
    
    const loaderCSS = `
        #loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
            color: white;
        }
        
        .gem-loader {
            font-size: 3rem;
            margin-bottom: 1rem;
            animation: pulse 1.5s ease-in-out infinite;
        }
        
        .loader-content h2 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            font-weight: 700;
        }
        
        .loader-content p {
            font-size: 1rem;
            opacity: 0.8;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
    `;
    
    const loaderStyleSheet = document.createElement('style');
    loaderStyleSheet.textContent = loaderCSS;
    document.head.appendChild(loaderStyleSheet);
    
    document.body.appendChild(loader);
    
    // Hide loader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize loading screen
showLoadingScreen();
