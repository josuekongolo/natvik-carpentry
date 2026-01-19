/**
 * NATVIK CARPENTRY - Main JavaScript
 * Professional Carpentry Website
 */

(function() {
    'use strict';

    // ===========================================
    // DOM Elements
    // ===========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const header = document.querySelector('.header');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    // ===========================================
    // Mobile Menu Toggle
    // ===========================================
    if (mobileMenuToggle && navMobile) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMobile.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = navMobile.querySelectorAll('a');
        mobileLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMobile.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMobile.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMobile.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===========================================
    // Header Scroll Effect
    // ===========================================
    let lastScroll = 0;

    function handleHeaderScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        // Add shadow when scrolled
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // ===========================================
    // Scroll to Top Button
    // ===========================================
    if (scrollTopBtn) {
        function toggleScrollTopBtn() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', toggleScrollTopBtn, { passive: true });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===========================================
    // Smooth Scroll for Anchor Links
    // ===========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
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

    // ===========================================
    // Contact Form Handling
    // ===========================================
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Hide any existing messages
            if (formSuccess) formSuccess.classList.remove('visible');
            if (formError) formError.classList.remove('visible');

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                projectType: document.getElementById('project-type').value,
                description: document.getElementById('description').value,
                siteVisit: document.getElementById('site-visit').checked
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.phone || !formData.description) {
                alert('Vennligst fyll ut alle obligatoriske felter.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Vennligst oppgi en gyldig e-postadresse.');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sender...';
            submitBtn.disabled = true;

            try {
                // Simulate form submission (replace with actual Resend API call)
                // In production, you would send this to your backend
                await simulateFormSubmission(formData);

                // Show success message
                if (formSuccess) {
                    formSuccess.classList.add('visible');
                }

                // Reset form
                contactForm.reset();

                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

            } catch (error) {
                console.error('Form submission error:', error);

                // Show error message
                if (formError) {
                    formError.classList.add('visible');
                }
            } finally {
                // Reset button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Simulate form submission (replace with actual API call)
    function simulateFormSubmission(data) {
        return new Promise(function(resolve, reject) {
            // Simulate network delay
            setTimeout(function() {
                // Log form data (for development)
                console.log('Form submitted:', data);

                // Simulate success (90% of the time)
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Simulated error'));
                }
            }, 1500);
        });
    }

    // ===========================================
    // Intersection Observer for Animations
    // ===========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .project-card, .value-card, .feature-item').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = '.animate-in { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

    // ===========================================
    // Lazy Loading Images
    // ===========================================
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports lazy loading
        document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        const lazyImageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    lazyImageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function(img) {
            lazyImageObserver.observe(img);
        });
    }

    // ===========================================
    // Phone Number Click Tracking
    // ===========================================
    document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
        link.addEventListener('click', function() {
            // Track phone clicks (for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Contact',
                    'event_label': 'Phone Call',
                    'value': 1
                });
            }
            console.log('Phone link clicked');
        });
    });

    // ===========================================
    // Email Link Click Tracking
    // ===========================================
    document.querySelectorAll('a[href^="mailto:"]').forEach(function(link) {
        link.addEventListener('click', function() {
            // Track email clicks (for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Contact',
                    'event_label': 'Email',
                    'value': 1
                });
            }
            console.log('Email link clicked');
        });
    });

    // ===========================================
    // Service Section Hash Navigation
    // ===========================================
    function handleHashNavigation() {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                setTimeout(function() {
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }

    // Handle initial hash
    handleHashNavigation();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    // ===========================================
    // Current Year for Copyright
    // ===========================================
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(function(el) {
        el.textContent = currentYear;
    });

    // ===========================================
    // Keyboard Navigation Enhancement
    // ===========================================
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape
        if (e.key === 'Escape') {
            if (navMobile && navMobile.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMobile.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // ===========================================
    // Focus Styles for Accessibility
    // ===========================================
    document.body.addEventListener('mousedown', function() {
        document.body.classList.add('using-mouse');
    });

    document.body.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.remove('using-mouse');
        }
    });

    // Add CSS for mouse users
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        body.using-mouse *:focus {
            outline: none;
        }
    `;
    document.head.appendChild(focusStyle);

    // ===========================================
    // Console Welcome Message
    // ===========================================
    console.log('%cNatvik Carpentry', 'color: #2B5329; font-size: 24px; font-weight: bold;');
    console.log('%cKvalitets håndverk for hjem og hytte i Vegårshei', 'color: #666; font-size: 14px;');
    console.log('%cKontakt: post@natvikcarpentry.no', 'color: #4A7C8E; font-size: 12px;');

})();
