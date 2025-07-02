document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scrolled-down')) {
            header.classList.add('scrolled-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scrolled-down')) {
            header.classList.remove('scrolled-down');
        }
        
        header.classList.add('scrolled');
        lastScroll = currentScroll;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    
    function highlightNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = '#' + section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    highlightNav();

    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimeline() {
        const triggerBottom = window.innerHeight * 0.8;
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                item.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkTimeline);
    checkTimeline(); // Check on page load

    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send this data to a server
            // For now, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon!`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    // Add typing animation to hero section
    const typedTextSpan = document.getElementById('typed-text');
    
    if (typedTextSpan) {
        const textArray = ["DevOps Engineer", "Cloud Architect", "Automation Enthusiast"];
        let textArrayIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let erasingSpeed = 50;
        let newTextDelay = 2000; // Delay between current and next text
        
        function type() {
            const currentText = textArray[textArrayIndex];
            
            if (isDeleting) {
                // Remove character
                typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = erasingSpeed;
            } else {
                // Add character
                typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                // Pause at end of text
                typingSpeed = newTextDelay;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next text
                isDeleting = false;
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start the typing effect after a short delay
        setTimeout(type, 1000);
    }

    // Add animation on scroll for sections
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.about, .experience, .projects, .education, .contact');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize elements with initial styles
    document.querySelectorAll('.about, .experience, .projects, .education, .contact').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
