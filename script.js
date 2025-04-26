// Main script file
console.log('Main script loaded');

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Typing animation effect
    function typeEffect(element, text, speed = 100) {
        if (!element) return; // Check if element exists
        
        let i = 0;
        element.style.opacity = '1';
        element.textContent = ''; // Clear existing content
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Apply typing effect to hero section elements
    const heroGreeting = document.querySelector('.hero-greeting');
    const heroName = document.querySelector('.hero h1');
    const heroTitle = document.querySelector('.hero h2');
    const heroText = document.querySelector('.hero-text');

    // Sequence the typing effects
    if (heroGreeting) {
        typeEffect(heroGreeting, "Hello, I'm", 100);
    }
    
    if (heroName) {
        setTimeout(() => {
            typeEffect(heroName, "Muhammad Furqan", 100);
        }, 1000);
    }
    
    if (heroTitle) {
        setTimeout(() => {
            typeEffect(heroTitle, "AI Engineer & Data Scientist", 100);
        }, 2000);
    }
    
    if (heroText) {
        setTimeout(() => {
            typeEffect(heroText, "Passionate about creating intelligent systems and solving complex problems through AI and data science.", 50);
        }, 3000);
    }
    
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        const toggleMenu = () => {
            const isActive = navLinks.classList.contains('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open', !isActive);
            
            // Update icon
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                if (isActive) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        };

        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                toggleMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
    
    // Handle loading animation
    const loadingAnimation = document.querySelector('.loading-animation');
    if (loadingAnimation) {
        window.addEventListener('load', function() {
            loadingAnimation.style.opacity = '0';
            setTimeout(() => {
                loadingAnimation.style.display = 'none';
            }, 500);
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Scroll to top button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact form submission - Improved approach
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (in a real implementation, you would use a server-side solution)
            setTimeout(() => {
                // Log the form data (in a real implementation, this would be sent to your server)
                console.log('Form submitted:', formObject);
                
                // Show success message
                const formContainer = this.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message, ${formObject.name}! I'll get back to you soon.</p>
                `;
                
                // Replace form with success message
                formContainer.innerHTML = '';
                formContainer.appendChild(successMessage);
                
                // In a real implementation, you would use a service like Formspree, Netlify Forms, or your own backend
                // Example with Formspree (uncomment and replace with your endpoint):
                /*
                fetch('https://formspree.io/f/muhammadfurqan0100@gmail.com', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        // Show success message
                        const formContainer = this.parentElement;
                        const successMessage = document.createElement('div');
                        successMessage.className = 'form-success';
                        successMessage.innerHTML = `
                            <i class="fas fa-check-circle"></i>
                            <p>Thank you for your message, ${formObject.name}! I'll get back to you soon.</p>
                        `;
                        
                        // Replace form with success message
                        formContainer.innerHTML = '';
                        formContainer.appendChild(successMessage);
                    } else {
                        throw new Error('Form submission failed');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was a problem submitting your form. Please try again later.');
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                });
                */
            }, 1500); // Simulate network delay
        });
    }

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
        
        // Set initial theme
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Initialize visual effects
    if (typeof ParticleEffect !== 'undefined') {
        new ParticleEffect();
    }
    if (typeof MatrixRain !== 'undefined') {
        new MatrixRain();
    }
    if (typeof LogoAnimation !== 'undefined') {
        new LogoAnimation();
    }

    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    // Add animation classes to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
    });

    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Custom cursor
    const createCustomCursor = () => {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-icon, .contact-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    };
    
    // Initialize custom cursor
    createCustomCursor();
    
    // Loading screen
    const createLoadingScreen = () => {
        const loadingScreen = document.createElement('div');
        loadingScreen.classList.add('loading-screen');
        
        const loadingAnimation = document.createElement('div');
        loadingAnimation.classList.add('loading-animation');
        
        loadingScreen.appendChild(loadingAnimation);
        document.body.appendChild(loadingScreen);
        
        // Remove loading screen after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 1000);
        });
    };
    
    // Initialize loading screen
    createLoadingScreen();
    
    // Add highlight text effect to name and title
    const addHighlightEffect = () => {
        const nameElement = document.querySelector('.hero h1');
        const titleElement = document.querySelector('.hero h2');
        
        if (nameElement) {
            nameElement.classList.add('highlight-text');
        }
        
        if (titleElement) {
            titleElement.classList.add('highlight-text');
        }
    };
    
    // Initialize highlight text effect
    addHighlightEffect();
    
    // Add background pattern to sections
    const addBackgroundPattern = () => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const pattern = document.createElement('div');
            pattern.classList.add('bg-pattern');
            section.appendChild(pattern);
        });
    };
    
    // Initialize background pattern
    addBackgroundPattern();
    
    // Add parallax effect to hero section
    const addParallaxEffect = () => {
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            heroSection.classList.add('parallax');
            
            window.addEventListener('scroll', () => {
                const scrollPosition = window.pageYOffset;
                heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            });
        }
    };
    
    // Initialize parallax effect
    addParallaxEffect();
    
    // Add timeline animation
    const addTimelineAnimation = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        if (timelineItems.length > 0) {
            timelineItems.forEach(item => {
                item.classList.add('animate-on-scroll');
            });
        }
    };
    
    // Initialize timeline animation
    addTimelineAnimation();
});

// Loading Animation with Progress
document.addEventListener('DOMContentLoaded', () => {
    const loadingAnimation = document.querySelector('.loading-animation');
    const progressBar = document.querySelector('.progress-bar');
    let progress = 0;
    
    // Simulate loading progress
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        progressBar.style.width = `${progress}%`;
        loadingAnimation.setAttribute('aria-valuenow', progress);
        
        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingAnimation.classList.add('fade-out');
                setTimeout(() => {
                    loadingAnimation.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 200);

    // Lazy load non-critical resources
    const lazyLoadResources = () => {
        // Load matrix rain effect
        const matrixScript = document.createElement('script');
        matrixScript.src = 'matrix-rain.js';
        matrixScript.async = true;
        document.body.appendChild(matrixScript);

        // Load particle effects
        const particleScript = document.createElement('script');
        particleScript.src = 'particle-effects.js';
        particleScript.async = true;
        document.body.appendChild(particleScript);

        // Load logo animation
        const logoScript = document.createElement('script');
        logoScript.src = 'logo-animation.js';
        logoScript.async = true;
        document.body.appendChild(logoScript);
    };

    // Load non-critical resources after initial page load
    window.addEventListener('load', lazyLoadResources);
});

// Theme Toggle with Keyboard Support
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', toggleTheme);
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
    }
});

// Mobile Menu with Keyboard Support
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', toggleMobileMenu);
mobileMenuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMobileMenu();
    }
});

// Handle keyboard navigation in mobile menu
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleMobileMenu();
        }
    });
});

// Smooth Scrolling with Keyboard Support
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

// Scroll to Top Button with Keyboard Support
const scrollToTopButton = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Performance Optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll event handling
const debouncedScroll = debounce(() => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
}, 100);

window.addEventListener('scroll', debouncedScroll);
