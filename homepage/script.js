document.addEventListener('DOMContentLoaded', function() {
    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.timeline-item, .honors-list li');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Check on initial load
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item, .honors-list li {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .timeline-item.animate, .honors-list li.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        nav ul li a.active {
            color: var(--light-color);
            border-bottom: 2px solid var(--light-color);
        }
        
        @media (max-width: 768px) {
            .mobile-nav-toggle {
                display: block;
            }
            
            nav ul {
                display: none;
            }
            
            nav ul.show {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Mobile navigation toggle
    const createMobileNavToggle = () => {
        if (window.innerWidth <= 768) {
            // Create toggle button if it doesn't exist
            if (!document.querySelector('.mobile-nav-toggle')) {
                const navContainer = document.querySelector('nav .container');
                const toggle = document.createElement('button');
                toggle.className = 'mobile-nav-toggle';
                toggle.innerHTML = '<i class="fas fa-bars"></i>';
                toggle.style.cssText = `
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    display: none;
                `;
                navContainer.style.position = 'relative';
                navContainer.appendChild(toggle);
                
                // Toggle navigation
                toggle.addEventListener('click', () => {
                    const navList = document.querySelector('nav ul');
                    navList.classList.toggle('show');
                    toggle.innerHTML = navList.classList.contains('show') 
                        ? '<i class="fas fa-times"></i>' 
                        : '<i class="fas fa-bars"></i>';
                });
            }
            
            document.querySelector('.mobile-nav-toggle').style.display = 'block';
        } else {
            // Hide toggle button on larger screens
            const toggle = document.querySelector('.mobile-nav-toggle');
            if (toggle) {
                toggle.style.display = 'none';
                document.querySelector('nav ul').classList.remove('show');
            }
        }
    };
    
    // Initialize mobile navigation
    createMobileNavToggle();
    window.addEventListener('resize', createMobileNavToggle);
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                document.querySelector('nav ul').classList.remove('show');
                const toggle = document.querySelector('.mobile-nav-toggle');
                if (toggle) {
                    toggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
});
