// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer para animações ao scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const delay = entry.target.dataset.delay || 0;
            entry.target.style.animationDelay = `${delay}ms`;
        }
    });
}, observerOptions);

// Observa todos os elementos com animação
document.querySelectorAll('.slide-up, .fade-in').forEach((el, index) => {
    el.dataset.delay = index * 80;
    observer.observe(el);
});

// Animação progressiva nos cards
const cards = document.querySelectorAll('.benefit-card, .depoimento-card, .step');
cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 120);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        cardObserver.observe(card);
    }, 100);
});

// Efeito parallax suave no hero
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.15}px)`;
        hero.style.opacity = Math.max(0.2, 1 - (scrolled / 700));
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Animação nos números das etapas
const stepNumbers = document.querySelectorAll('.step-number');
stepNumbers.forEach((number, index) => {
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'pulseStep 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                }, index * 200);
                stepObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });
    
    stepObserver.observe(number);
});

// Adiciona animações ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes pulseStep {
        0%, 100% {
            transform: scale(1);
        }
        25% {
            transform: scale(1.15);
        }
        50% {
            transform: scale(0.95);
        }
        75% {
            transform: scale(1.05);
        }
    }
    
    .benefit-icon {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .benefit-card:hover .benefit-icon {
        transform: translateY(-5px);
    }
    
    .step-number {
        transition: all 0.3s ease;
    }
    
    .step:hover .step-number {
        transform: scale(1.08);
        box-shadow: 0 12px 28px rgba(162, 104, 85, 0.35);
    }
    
    .quote-icon {
        animation: floatQuote 3s ease-in-out infinite;
    }
    
    @keyframes floatQuote {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-5px);
        }
    }
`;
document.head.appendChild(style);

// Hover effect aprimorado nos CTAs
const ctas = document.querySelectorAll('.cta-primary, .cta-secondary, .cta-tertiary');
ctas.forEach(cta => {
    cta.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Header comportamento ao scroll
let lastScroll = 0;
const header = document.querySelector('.header');

function handleHeaderScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
        header.style.borderBottom = '1px solid #e6d8ce';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(35, 57, 63, 0.08)';
        header.style.borderBottom = 'none';
    }
    
    lastScroll = currentScroll;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleHeaderScroll);
        ticking = true;
    }
});

// Animação de entrada inicial suave
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Animação de hover nos benefit cards
const benefitCards = document.querySelectorAll('.benefit-card');
benefitCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.benefit-icon svg');
        if (icon) {
            icon.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }
    });
});

// Animação suave nos elementos ao scroll (formas de apoio)
const shapes = document.querySelectorAll('.hero-shape, .fernanda-shape, .comunidade-shape');
shapes.forEach(shape => {
    const shapeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                entry.target.style.transform = 'translate(0, 0)';
                entry.target.style.opacity = '0.3';
            }
        });
    }, { threshold: 0.3 });
    
    shape.style.opacity = '0';
    shape.style.transform = 'translate(50px, 50px)';
    shapeObserver.observe(shape);
});

// Parallax suave nos patterns de fundo
const patterns = document.querySelectorAll('.pattern-bg');
patterns.forEach(pattern => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const patternPosition = pattern.getBoundingClientRect().top;
        
        if (patternPosition < window.innerHeight && patternPosition > -pattern.offsetHeight) {
            pattern.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
});

// Contador de animação para steps
const steps = document.querySelectorAll('.step');
steps.forEach((step, index) => {
    const stepNumber = step.querySelector('.step-number');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    const currentNumber = parseInt(stepNumber.textContent);
                    let count = 0;
                    const interval = setInterval(() => {
                        if (count <= currentNumber) {
                            stepNumber.textContent = count;
                            count++;
                        } else {
                            clearInterval(interval);
                        }
                    }, 150);
                }, index * 300);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    countObserver.observe(step);
});