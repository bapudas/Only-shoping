document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const html = document.documentElement;
    
    function toggleMobileMenu() {
        const isOpen = mobileMenu.style.display === 'block';
        mobileMenu.style.display = isOpen ? 'none' : 'block';
        mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
        html.style.overflowY = isOpen ? 'auto' : 'hidden';
    }
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Mobile dropdown toggle
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    
    mobileDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.dropdown-toggle');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            // Rotate the chevron icon
            const icon = link.querySelector('i');
            icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        });
    });
    
    // Close mobile menu when clicking outside or on a link
    document.addEventListener('click', function(e) {
        if (mobileMenu.style.display === 'block' && !mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
            toggleMobileMenu();
        }
    });
    
    // Close mobile menu when a link is clicked (optional)
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a:not(.dropdown-toggle)');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu.style.display === 'block') {
                toggleMobileMenu();
            }
        });
    });
    
    // Smooth scroll for anchor links (optional)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                return;
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu.style.display === 'block') {
                    toggleMobileMenu();
                }
            }
        });
    });
});
