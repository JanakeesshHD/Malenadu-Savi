/*
 * Malenadu Savi - JavaScript
 * 
 * Features:
 * - Product selector modal with quantity selection
 * - WhatsApp integration with prefilled messages
 * - Lazy loading for images
 * - Scroll animations
 * - Testimonial carousel
 * - Mobile navigation
 * 
 * CUSTOMIZATION GUIDE:
 * 1. Replace WHATSAPP_PHONE_NUMBER with your actual WhatsApp number
 * 2. Update PRODUCT_DATA with your actual product information
 * 3. Modify TESTIMONIALS_DATA with your customer reviews
 */

// Configuration - CUSTOMIZE THESE VALUES
const WHATSAPP_PHONE_NUMBER = '+918088653820'; // Replace with your WhatsApp number
const PRODUCT_DATA = {
    honey: {
        name: 'Honey',
        price: 500,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Single-origin honey harvested from pristine Malenadu forests. Pure, unfiltered, and naturally crystallized.'
    },
    pickle: {
        name: 'Amtekayi (hog plum) Pickle',
        price: 300,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Homemade Amtekayi (hog plum) Pickle with traditional spices. Small-batch artisanal preparation.'
    }
};

// Global variables
let currentProduct = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
    initializeScrollAnimations();
    initializeMobileNavigation();
    initializeModal();
    initializeSmoothScrolling();
});

// Lazy Loading Implementation
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        // Observe all images with lazy loading
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        document.querySelectorAll('.product-card, .process-step').forEach(el => {
            animationObserver.observe(el);
        });
    }
}

// Mobile Navigation
function initializeMobileNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinksItems = document.querySelectorAll('.nav-link');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-links') && !event.target.closest('.menu-toggle')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1023) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Add overlay when menu is open
        body.classList.add('has-mobile-menu');
    }
}


// Product Modal Functions
function initializeModal() {
    const modal = document.getElementById('productModal');
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProductModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProductModal();
        }
    });
}

function openProductModal(productType) {
    currentProduct = productType;
    const product = PRODUCT_DATA[productType];
    const modal = document.getElementById('productModal');
    
    if (!product || !modal) return;
    
    // Update modal content
    document.getElementById('modalTitle').textContent = `Order ${product.name}`;
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalImage').alt = product.name;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = `₹${product.price} per jar`;
    
    // Reset quantity
    document.getElementById('quantity').value = 1;
    updateTotalPrice();
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentProduct = null;
}

function changeQuantity(delta) {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value) || 1;
    const newValue = Math.max(1, Math.min(10, currentValue + delta));
    
    quantityInput.value = newValue;
    updateTotalPrice();
}

function updateTotalPrice() {
    if (!currentProduct) return;
    
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const product = PRODUCT_DATA[currentProduct];
    const total = product.price * quantity;
    
    document.getElementById('totalPrice').textContent = total;
}

function confirmOrder() {
    if (!currentProduct) return;
    
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const product = PRODUCT_DATA[currentProduct];
    const total = product.price * quantity;
    
    // Create WhatsApp message
    const message = `Hi! I would like to order:
    
Product: ${product.name}
Quantity: ${quantity} jar${quantity > 1 ? 's' : ''}
Price per jar: ₹${product.price}
Total amount: ₹${total}

Please confirm availability and delivery details. Thank you!`;
    
    openWhatsApp('order', message);
    closeProductModal();
}

// WhatsApp Integration
function openWhatsApp(type, customMessage = '') {
    let message = '';
    
    switch (type) {
        case 'general':
            message = 'Hi! I\'m interested in your Malenadu Savi products. Could you please share more details about availability and pricing?';
            break;
        case 'honey':
            message = `Hi! I would like to order ${PRODUCT_DATA.honey.name}.

Please confirm Price, availability and delivery details. Thank you!`;
            break;
        case 'pickle':
            message = `Hi! I would like to order ${PRODUCT_DATA.pickle.name}.

Please confirm Price, availability and delivery details. Thank you!`;
            break;
        case 'order':
            message = customMessage;
            break;
        default:
            message = 'Hi! I\'m interested in your products. Could you please share more details?';
    }
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility Functions
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

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize
    const navLinks = document.querySelector('.nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    }
}, 250));


// Performance optimization: Preload critical images
function preloadCriticalImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' // Hero background
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalImages();

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        // You could set a fallback image here
        // e.target.src = 'path/to/fallback-image.jpg';
    }
}, true);

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Handle Enter key on buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

// Console message for developers
console.log(`
🍯 Malenadu Savi Website
========================
Built with vanilla HTML, CSS, and JavaScript
Mobile-first responsive design
Accessibility compliant

Customization Guide:
1. Update WHATSAPP_PHONE_NUMBER in script.js
2. Replace product images in HTML
3. Update PRODUCT_DATA with your products

For support or questions, contact the developer.
`);
