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

// Countdown Timer for Special Offers
document.addEventListener('DOMContentLoaded', function() {
    // Set the end date for the countdown (2 days from now)
    const countdownTimer = () => {
        const now = new Date();
        const endDate = new Date();
        endDate.setDate(now.getDate() + 2); // 2 days from now
        endDate.setHours(23, 59, 59, 0); // Set to end of day

        const timeRemaining = endDate - now;

        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Update the DOM
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        // If countdown ends
        if (timeRemaining < 0) {
            clearInterval(timer);
            document.querySelector('.countdown-title').textContent = "Offer has expired!";
            document.getElementById('countdown-timer').style.opacity = '0.5';
        }
    };

    // Initialize immediately
    countdownTimer();

    // Update every second
    const timer = setInterval(countdownTimer, 1000);

    // Add animation to CTA button on hover
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 20px rgba(231, 76, 60, 0.4)';
        });

        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(231, 76, 60, 0.3)';
        });
    }

    // Add click event to all offer cards
    const offerCards = document.querySelectorAll('.small-offer');
    offerCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the CTA button itself
            if (!e.target.classList.contains('small-cta')) {
                const link = this.querySelector('.small-cta');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
    });

    // Animation for offer cards on scroll
    const animateOnScroll = () => {
        const offers = document.querySelectorAll('.offer-banner, .small-offer');
        const windowHeight = window.innerHeight;
        
        offers.forEach(offer => {
            const offerPosition = offer.getBoundingClientRect().top;
            const offset = 100;

            if (offerPosition < windowHeight - offset) {
                offer.style.opacity = '1';
                offer.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    const offers = document.querySelectorAll('.offer-banner, .small-offer');
    offers.forEach(offer => {
        offer.style.opacity = '0';
        offer.style.transform = 'translateY(20px)';
        offer.style.transition = 'all 0.6s ease-out';
    });

    // Run once on load
    animateOnScroll();

    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
