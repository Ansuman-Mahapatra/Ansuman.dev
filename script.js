// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', toggleTheme);

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation and submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission (replace with actual submission logic)
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced animations on scroll
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

document.querySelectorAll('section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    section.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(section);
});

// Typing effect for hero tagline
const tagline = document.querySelector('.tagline');
const originalText = tagline.textContent;
let isTyping = false;

function typeWriter(text, i = 0) {
    if (i < text.length) {
        tagline.textContent = text.substring(0, i + 1);
        setTimeout(() => typeWriter(text, i + 1), 50);
    }
}

function startTypingEffect() {
    if (!isTyping) {
        isTyping = true;
        tagline.textContent = '';
        setTimeout(() => {
            typeWriter(originalText);
            setTimeout(() => {
                isTyping = false;
            }, originalText.length * 50 + 1000);
        }, 1000);
    }
}

// Start typing effect when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startTypingEffect();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

heroObserver.observe(document.getElementById('hero'));

// Parallax effect for hero background
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    const scrollY = window.scrollY;
    const rate = scrollY * -0.5;

    if (hero) {
        hero.style.backgroundPosition = `center ${rate}px`;
    }

    lastScrollY = scrollY;
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // stop normal form submission

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    const subject = encodeURIComponent("Message from " + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    // This opens Gmail compose window in a new tab
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=ansumanmahapatre@gmail.com&su=${subject}&body=${body}`, '_blank');
});