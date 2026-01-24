// Smooth scroll para links internos
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

// Intersection Observer para animações ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Adiciona um pequeno delay para cada elemento
            const delay = entry.target.dataset.delay || 0;
            entry.target.style.animationDelay = `${delay}ms`;
        }
    });
}, observerOptions);

// Observa todos os elementos com animação
document.querySelectorAll('.slide-up, .fade-in').forEach((el, index) => {
    el.dataset.delay = index * 100; // 100ms de delay entre cada elemento
    observer.observe(el);
});

// Animação suave nos cards de benefícios
const benefitCards = document.querySelectorAll('.benefit-card');
benefitCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150); // Delay progressivo
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        cardObserver.observe(card);
    }, 100);
});

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Animação nos números das etapas
const stepNumbers = document.querySelectorAll('.step-number');
stepNumbers.forEach((number, index) => {
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'pulse 0.6s ease';
                }, index * 200);
                stepObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stepObserver.observe(number);
});

// Adiciona animação de pulse ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
    
    .benefit-icon {
        transition: transform 0.3s ease;
    }
    
    .benefit-card:hover .benefit-icon {
        transform: scale(1.2) rotate(5deg);
    }
    
    .step-number {
        transition: transform 0.3s ease;
    }
    
    .step:hover .step-number {
        transform: scale(1.1) rotate(-5deg);
    }
`;
document.head.appendChild(style);

// Hover effect nos CTAs
const ctas = document.querySelectorAll('.cta-primary, .cta-secondary, .cta-tertiary');
ctas.forEach(cta => {
    cta.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    cta.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Header scroll behavior
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animação suave de entrada inicial
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});