document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation functionality
    initMobileNav();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Animate on scroll initialization
    initAnimateOnScroll();
    
    // Initialize form validation
    initFormValidation();
    
    // Ensure mobile navigation is always visible on small screens
    function forceShowMobileNav() {
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        if (mobileNavToggle && window.innerWidth <= 768) {
            mobileNavToggle.style.display = 'flex';
            mobileNavToggle.style.visibility = 'visible';
            mobileNavToggle.style.opacity = '1';
            
            // Make sure the icon is visible and correct
            if (!mobileNavToggle.querySelector('i')) {
                mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    }
    
    // Call immediately and on any potential layout changes
    forceShowMobileNav();
    window.addEventListener('resize', forceShowMobileNav);
    window.addEventListener('orientationchange', forceShowMobileNav);
    window.addEventListener('load', forceShowMobileNav);
    
    // Initialize mobile navigation functionality
    function initMobileNav() {
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        const header = document.querySelector('header');
        
        if (mobileNavToggle && navLinks) {
            // Set initial display based on screen size
            function setInitialNavState() {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    mobileNavToggle.style.display = 'flex';
                    mobileNavToggle.style.visibility = 'visible';
                    mobileNavToggle.style.opacity = '1';
                } else {
                    navLinks.style.display = 'flex';
                    mobileNavToggle.style.display = 'none';
                    navLinks.classList.remove('active');
                }
            }
            
            // Call initially
            setInitialNavState();
            
            // Toggle menu on click
            mobileNavToggle.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event from bubbling up
                e.preventDefault(); // Prevent default behavior
                
                navLinks.classList.toggle('active');
                const isOpen = navLinks.classList.contains('active');
                
                // Change icon based on state
                mobileNavToggle.innerHTML = isOpen ? 
                    '<i class="fas fa-times"></i>' : 
                    '<i class="fas fa-bars"></i>';
                
                // Add some animation to show the menu smoothly
                if (isOpen) {
                    navLinks.style.display = 'flex';
                    setTimeout(() => {
                        navLinks.style.opacity = '1';
                    }, 10);
                } else {
                    navLinks.style.opacity = '0';
                    setTimeout(() => {
                        if (!navLinks.classList.contains('active')) {
                            navLinks.style.display = 'none';
                        }
                    }, 300);
                }
                
                // Add a class to the body for better styling
                document.body.classList.toggle('mobile-menu-open', isOpen);
            });
            
            // Close mobile nav when clicking outside
            document.addEventListener('click', function(event) {
                if (navLinks.classList.contains('active') && 
                    !event.target.closest('nav') && 
                    !event.target.closest('.mobile-nav-toggle')) {
                    navLinks.classList.remove('active');
                    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    
                    // Animate menu closing
                    navLinks.style.opacity = '0';
                    setTimeout(() => {
                        if (!navLinks.classList.contains('active')) {
                            navLinks.style.display = 'none';
                        }
                    }, 300);
                    
                    document.body.classList.remove('mobile-menu-open');
                }
            });
            
            // Ensure navigation links in mobile view close the menu when clicked
            const navItems = document.querySelectorAll('.nav-links a');
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
                        
                        // Animate menu closing
                        navLinks.style.opacity = '0';
                        setTimeout(() => {
                            if (!navLinks.classList.contains('active')) {
                                navLinks.style.display = 'none';
                            }
                        }, 300);
                        
                        document.body.classList.remove('mobile-menu-open');
                    }
                });
            });
            
            // Handle resize events
            window.addEventListener('resize', setInitialNavState);
        } else {
            console.error('Mobile navigation elements not found'); // Debug log
        }
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href !== '#') {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        const navLinks = document.querySelector('.nav-links');
                        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
                        if (navLinks && navLinks.classList.contains('active') && mobileNavToggle) {
                            navLinks.classList.remove('active');
                            mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
                            document.body.style.overflow = '';
                        }
                    }
                }
            });
        });
    }
    
    // Animate on scroll initialization
    function initAnimateOnScroll() {
        const animateElements = document.querySelectorAll('.animate');
        
        function checkIfInView() {
            const windowHeight = window.innerHeight;
            const windowTopPosition = window.scrollY;
            const windowBottomPosition = windowTopPosition + windowHeight;
            
            animateElements.forEach(element => {
                const elementHeight = element.offsetHeight;
                const elementTopPosition = element.offsetTop;
                const elementBottomPosition = elementTopPosition + elementHeight;
                
                // Check if element is in viewport
                if (
                    (elementBottomPosition >= windowTopPosition) &&
                    (elementTopPosition <= windowBottomPosition)
                ) {
                    element.classList.add('visible');
                }
            });
        }
        
        // Check elements on load
        window.addEventListener('load', checkIfInView);
        
        // Check elements on scroll
        window.addEventListener('scroll', checkIfInView);
    }
    
    // Form validation
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                let hasError = false;
                const requiredFields = form.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        hasError = true;
                        field.classList.add('error');
                        
                        const errorMsg = field.parentNode.querySelector('.error-message');
                        if (!errorMsg) {
                            const message = document.createElement('span');
                            message.className = 'error-message';
                            message.textContent = 'This field is required';
                            field.parentNode.appendChild(message);
                        }
                    } else {
                        field.classList.remove('error');
                        const errorMsg = field.parentNode.querySelector('.error-message');
                        if (errorMsg) {
                            errorMsg.remove();
                        }
                    }
                });
                
                // Email validation
                const emailField = form.querySelector('[type="email"]');
                if (emailField && emailField.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(emailField.value)) {
                        hasError = true;
                        emailField.classList.add('error');
                        
                        const errorMsg = emailField.parentNode.querySelector('.error-message');
                        if (!errorMsg) {
                            const message = document.createElement('span');
                            message.className = 'error-message';
                            message.textContent = 'Please enter a valid email address';
                            emailField.parentNode.appendChild(message);
                        }
                    }
                }
                
                if (hasError) {
                    e.preventDefault();
                }
            });
            
            // Clear error on focus
            const formFields = form.querySelectorAll('input, textarea');
            formFields.forEach(field => {
                field.addEventListener('focus', function() {
                    this.classList.remove('error');
                    const errorMsg = this.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                });
            });
        });
    }
}); 