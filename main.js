// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.md\\:hidden');
    const mobileMenu = createMobileMenu();
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Handle smooth scrolling for anchor links
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
                
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Add scroll animation for elements
    const animateElements = document.querySelectorAll('.animate-fade-in');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
            }
        });
    }
    
    // Set initial state
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.5s ease-in-out';
    });
    
    // Check elements on scroll
    window.addEventListener('scroll', checkScroll);
    // Check once on load
    checkScroll();
});

// Create mobile menu dynamically
function createMobileMenu() {
    let mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu absolute top-20 left-0 w-full bg-white shadow-lg py-4 z-10';
        
        const menuItems = `
            <ul class="flex flex-col space-y-4 px-4">
                <li><a href="#" class="text-gray-700 hover:text-blue-600 block py-2">Home</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-600 block py-2">About</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-600 block py-2">Services</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-600 block py-2">Contact</a></li>
                <li class="pt-4 border-t">
                    <div class="flex flex-col space-y-4">
                        <button class="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 w-full">Login</button>
                        <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full">Sign Up</button>
                    </div>
                </li>
            </ul>
        `;
        
        mobileMenu.innerHTML = menuItems;
        document.querySelector('header .container').appendChild(mobileMenu);
    }
    
    return mobileMenu;
}

// Add scroll to top button functionality
window.addEventListener('scroll', function() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (!scrollTopBtn && window.scrollY > 300) {
        const btn = document.createElement('button');
        btn.id = 'scrollTopBtn';
        btn.className = 'fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-20';
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
        `;
        btn.addEventListener('click', function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
        document.body.appendChild(btn);
    } else if (scrollTopBtn) {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    }
}); 