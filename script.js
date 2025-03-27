document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            
            // Change icon based on state
            mobileNavToggle.innerHTML = isOpen ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
                
            // Prevent scrolling when nav is open
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('nav') && 
            !event.target.closest('.mobile-nav-toggle')) {
            navLinks.classList.remove('active');
            if (mobileNavToggle) {
                mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            document.body.style.overflow = '';
        }
    });
    
    // Ensure navigation links in mobile view close the menu when clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileNavToggle) {
                    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                document.body.style.overflow = '';
            }
        });
    });
    
    // Smooth scrolling for anchor links
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
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
                        document.body.style.overflow = '';
                    }
                }
            }
        });
    });
    
    // Animate on scroll initialization
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
    
    // Form validation
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
}); 