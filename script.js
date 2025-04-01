document.addEventListener('DOMContentLoaded', () => {
    // Animação suave no scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de entrada dos projetos
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.work-item').forEach(item => {
        observer.observe(item);
    });

    // Efeito hover nos links do menu
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = '#4a90e2';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = 'white';
        });
    });
});

// Adicionar classe ativa ao menu quando scrollar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Função para verificar se um elemento está visível na viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const offset = 100; // pixels antes do elemento entrar na viewport
    return (
        rect.top >= -offset &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight + offset) &&
        rect.right <= window.innerWidth
    );
}

// Função para adicionar classe 'visible' aos elementos quando ficarem visíveis
function handleScroll() {
    // Elementos que queremos animar
    const elements = [
        '.section-header',
        '.about-text',
        '.experience',
        '.stat-item',
        '.timeline-item',
        '.about-image'
    ];

    elements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    });
}

// Adicionar listener de scroll
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Adicionar delay para os stat-items
document.querySelectorAll('.stat-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
});

// Adicionar delay para os timeline-items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.3}s`;
});

// Remover os delays após as animações
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('.stat-item, .timeline-item').forEach(item => {
            item.style.transitionDelay = '0s';
        });
    }, 2000);
});

// Cursor personalizado
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Efeito de digitação
const typingText = document.querySelector('.typing-text');
const texts = ['Desenvolvedor Full Stack', 'Suporte Sap CX', 'Suporte ERP TOTVS'];
let textIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < texts[textIndex].length) {
        typingText.textContent += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingText.textContent = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    }
}

// Iniciar animação de digitação
setTimeout(type, 1000);

// Animações no scroll
function reveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Contador de números
const expNumbers = document.querySelectorAll('.exp-number');

function startCounting(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const count = +element.innerText;
    const increment = target / 50;
    
    if (count < target) {
        element.innerText = Math.ceil(count + increment);
        setTimeout(() => startCounting(element), 40);
    } else {
        element.innerText = target;
    }
}

// Observer para iniciar contagem quando visível
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounting(entry.target);
        }
    });
}, { threshold: 0.5 });

expNumbers.forEach(number => observer.observe(number));

// Menu mobile
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('active');
});

// Manipulação do formulário de contato
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aqui você pode adicionar a lógica para enviar o formulário
    // Por exemplo, usando fetch para enviar para um servidor

    // Exemplo de feedback visual
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Mensagem Enviada!';
    submitBtn.style.background = '#4CAF50';
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        this.reset();
    }, 3000);
});
// Função para mostrar ou esconder o botão conforme a rolagem da página
window.onscroll = function() {
    let scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    // Se a rolagem for maior que 300px, mostra o botão
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Função para rolar até o topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rolar suavemente
    });
}

// Adicionar animação aos links sociais
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.querySelector('i').style.animation = 'bounce 0.5s ease infinite';
    });
    
    link.addEventListener('mouseleave', function() {
        this.querySelector('i').style.animation = '';
    });
}); 