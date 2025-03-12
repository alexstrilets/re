document.addEventListener("DOMContentLoaded", function() {
    // Enable Bootstrap form validation
    enableFormValidation();
    
    // Enable smooth scrolling for navigation links
    enableSmoothScrolling();
    
    // Add active class to navigation links based on scroll position
    handleNavActiveState();
});

// Form validation using Bootstrap's built-in validation
function enableFormValidation() {
    // Fetch all forms with the 'needs-validation' class
    const forms = document.querySelectorAll('.needs-validation');
    
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                // If form is valid, prevent default and show success message
                event.preventDefault();
                alert('Thank you for your submission! We will contact you shortly.');
                form.reset();
            }
            
            form.classList.add('was-validated');
        }, false);
    });
    
    // Also handle the contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Smooth scrolling for navigation links
function enableSmoothScrolling() {
    const menuItems = document.querySelectorAll('a[href^="#"]');
    
    menuItems.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
            
            // Smooth scroll to the target section
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Handle active state for navigation links based on scroll position
function handleNavActiveState() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
                
                // Legacy support for the original script's active class on sections
                sections.forEach(s => s.classList.remove('active'));
                section.classList.add('active');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}