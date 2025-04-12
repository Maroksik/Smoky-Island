// Main functionality for Smoky Island website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initMobileMenu();
    initQuickViewModal();
    initCartSidebar();
    initQuantityControls();
    initAddToCartButtons();
    initSearchFunctionality();
    initNewsletterForm();
});

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            
            if (mobileMenuToggle.classList.contains('active')) {
                // Show mobile menu
                nav.style.display = 'block';
                gsap.fromTo(nav, 
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 0.3 }
                );
                
                // Add mobile menu styles
                nav.classList.add('mobile-nav');
                document.body.style.overflow = 'hidden';
            } else {
                // Hide mobile menu
                gsap.to(nav, { 
                    opacity: 0, 
                    y: -20, 
                    duration: 0.3,
                    onComplete: () => {
                        nav.style.display = '';
                        nav.classList.remove('mobile-nav');
                        document.body.style.overflow = '';
                    }
                });
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                nav.style.display = '';
                nav.style.opacity = '';
                nav.style.transform = '';
                nav.classList.remove('mobile-nav');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Quick view modal functionality
function initQuickViewModal() {
    const modal = document.getElementById('quickViewModal');
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    const closeModal = document.querySelector('.close-modal');
    
    if (modal && quickViewButtons.length > 0 && closeModal) {
        // Open modal on quick view button click
        quickViewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get product information from parent card
                const productCard = button.closest('.product-card');
                const productTitle = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.product-price').textContent;
                const productDesc = productCard.querySelector('.product-description').textContent;
                const productImg = productCard.querySelector('img').src;
                
                // Update modal content
                document.getElementById('modalProductTitle').textContent = productTitle;
                document.getElementById('modalProductPrice').textContent = productPrice;
                document.getElementById('modalProductDescription').textContent = productDesc;
                modal.querySelector('.modal-product-image img').src = productImg;
                
                // Show modal
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal on X button click
        closeModal.addEventListener('click', () => {
            closeQuickViewModal();
        });
        
        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeQuickViewModal();
            }
        });
        
        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeQuickViewModal();
            }
        });
    }
}

function closeQuickViewModal() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Cart sidebar functionality
function initCartSidebar() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    
    if (cartIcon && cartSidebar && cartOverlay && closeCart) {
        // Open cart on cart icon click
        cartIcon.addEventListener('click', () => {
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
        
        // Close cart on X button click
        closeCart.addEventListener('click', () => {
            closeCartSidebar();
        });
        
        // Close cart on overlay click
        cartOverlay.addEventListener('click', () => {
            closeCartSidebar();
        });
        
        // Close cart on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeCartSidebar();
            }
        });
    }
}

function closeCartSidebar() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Quantity controls functionality
function initQuantityControls() {
    const quantityControls = document.querySelectorAll('.quantity-controls');
    
    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.minus');
        const plusBtn = control.querySelector('.plus');
        const input = control.querySelector('input');
        
        if (minusBtn && plusBtn && input) {
            minusBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                }
            });
            
            plusBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                input.value = currentValue + 1;
            });
            
            input.addEventListener('change', () => {
                const currentValue = parseInt(input.value);
                if (isNaN(currentValue) || currentValue < 1) {
                    input.value = 1;
                }
            });
        }
    });
}

// Cart functionality
let cart = [];
const cartCount = document.querySelector('.cart-count');
const cartItems = document.querySelector('.cart-items');
const emptyCartMessage = document.querySelector('.empty-cart-message');
const totalPriceElement = document.querySelector('.total-price');

function initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('animate');
            setTimeout(() => button.classList.remove('animate'), 500);
            
            // Get product information
            let productCard, productTitle, productPrice, productImg, quantity = 1;
            
            // Check if button is in modal or product card
            if (button.closest('.modal-product-info')) {
                productTitle = document.getElementById('modalProductTitle').textContent;
                productPrice = document.getElementById('modalProductPrice').textContent;
                productImg = document.querySelector('.modal-product-image img').src;
                quantity = parseInt(document.getElementById('quantity').value);
                closeQuickViewModal();
            } else {
                productCard = button.closest('.product-card');
                productTitle = productCard.querySelector('h3').textContent;
                productPrice = productCard.querySelector('.product-price').textContent;
                productImg = productCard.querySelector('img').src;
            }
            
            // Add to cart
            addToCart(productTitle, productPrice, productImg, quantity);
            
            // Animate cart count
            if (cartCount) {
                cartCount.classList.add('animate');
                setTimeout(() => cartCount.classList.remove('animate'), 800);
            }
        });
    });
}

function addToCart(name, price, image, quantity) {
    // Clean price string to get only number
    const priceValue = parseInt(price.replace(/[^0-9]/g, ''));
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.name === name);
    
    if (existingItemIndex !== -1) {
        // Update quantity if product already in cart
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new product to cart
        cart.push({
            name,
            price: priceValue,
            image,
            quantity
        });
    }
    
    // Update cart UI
    updateCartUI();
}

function updateCartUI() {
    // Update cart count
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    // Update cart items
    if (cartItems && emptyCartMessage && totalPriceElement) {
        if (cart.length === 0) {
            // Show empty cart message
            emptyCartMessage.style.display = 'block';
            totalPriceElement.textContent = '0 грн';
        } else {
            // Hide empty cart message and show items
            emptyCartMessage.style.display = 'none';
            
            // Clear current items
            cartItems.innerHTML = '';
            
            // Add cart items
            let totalPrice = 0;
            
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                totalPrice += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-content">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">${item.price} грн</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn-cart minus" data-index="${index}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn-cart plus" data-index="${index}">+</button>
                        </div>
                    </div>
                    <button class="remove-item-btn" data-index="${index}">&times;</button>
                `;
                
                cartItems.appendChild(cartItem);
            });
            
            // Update total price
            totalPriceElement.textContent = `${totalPrice} грн`;
            
            // Add event listeners to cart item buttons
            initCartItemButtons();
        }
    }
}

function initCartItemButtons() {
    // Quantity buttons in cart
    const minusButtons = document.querySelectorAll('.quantity-btn-cart.minus');
    const plusButtons = document.querySelectorAll('.quantity-btn-cart.plus');
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    
    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                updateCartUI();
            }
        });
    });
    
    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            cart[index].quantity++;
            updateCartUI();
        });
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            cart.splice(index, 1);
            updateCartUI();
        });
    });
}

// Search functionality
function initSearchFunctionality() {
    const searchIcon = document.querySelector('.search-icon');
    
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            // Create search overlay if it doesn't exist
            if (!document.querySelector('.search-overlay')) {
                const searchOverlay = document.createElement('div');
                searchOverlay.className = 'search-overlay';
                
                searchOverlay.innerHTML = `
                    <div class="search-container">
                        <button class="close-search">&times;</button>
                        <form class="search-form">
                            <input type="text" placeholder="Пошук товарів..." autofocus>
                            <button type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                        </form>
                        <div class="search-results"></div>
                    </div>
                `;
                
                document.body.appendChild(searchOverlay);
                
                // Add styles for search overlay
                const searchStyles = document.createElement('style');
                searchStyles.textContent = `
                    .search-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.9);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 2000;
                        animation: fadeIn 0.3s ease forwards;
                    }
                    
                    .search-container {
                        width: 80%;
                        max-width: 800px;
                        position: relative;
                    }
                    
                    .close-search {
                        position: absolute;
                        top: -50px;
                        right: 0;
                        background: none;
                        border: none;
                        color: white;
                        font-size: 2rem;
                        cursor: pointer;
                    }
                    
                    .search-form {
                        display: flex;
                        margin-bottom: 2rem;
                    }
                    
                    .search-form input {
                        flex: 1;
                        padding: 1rem;
                        font-size: 1.2rem;
                        border: none;
                        border-radius: var(--border-radius-lg) 0 0 var(--border-radius-lg);
                    }
                    
                    .search-form button {
                        background-color: var(--primary-color);
                        color: white;
                        border: none;
                        padding: 0 1.5rem;
                        border-radius: 0 var(--border-radius-lg) var(--border-radius-lg) 0;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .search-results {
                        background-color: white;
                        border-radius: var(--border-radius-lg);
                        padding: 1rem;
                        max-height: 60vh;
                        overflow-y: auto;
                        display: none;
                    }
                    
                    .search-result-item {
                        display: flex;
                        padding: 1rem;
                        border-bottom: 1px solid var(--gray-200);
                        transition: background-color 0.3s ease;
                    }
                    
                    .search-result-item:hover {
                        background-color: var(--gray-100);
                    }
                    
                    .search-result-image {
                        width: 80px;
                        height: 80px;
                        margin-right: 1rem;
                    }
                    
                    .search-result-image img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: var(--border-radius);
                    }
                    
                    .search-result-details h4 {
                        margin: 0 0 0.5rem;
                        font-size: 1.1rem;
                    }
                    
                    .search-result-price {
                        color: var(--primary-color);
                        font-weight: 600;
                        margin-bottom: 0.5rem;
                    }
                    
                    .no-results {
                        text-align: center;
                        padding: 2rem;
                        color: var(--text-light);
                    }
                `;
                
                document.head.appendChild(searchStyles);
                
                // Handle close button click
                const closeSearchBtn = document.querySelector('.close-search');
                if (closeSearchBtn) {
                    closeSearchBtn.addEventListener('click', () => {
                        document.body.removeChild(searchOverlay);
                    });
                }
                
                // Handle clicks outside search container
                searchOverlay.addEventListener('click', (e) => {
                    if (e.target === searchOverlay) {
                        document.body.removeChild(searchOverlay);
                    }
                });
                
                // Handle ESC key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        if (document.querySelector('.search-overlay')) {
                            document.body.removeChild(searchOverlay);
                        }
                    }
                });
                
                // Handle search form submit
                const searchForm = document.querySelector('.search-form');
                const searchInput = searchForm.querySelector('input');
                const searchResults = document.querySelector('.search-results');
                
                searchForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    const searchQuery = searchInput.value.trim().toLowerCase();
                    
                    if (searchQuery.length > 0) {
                        // Show search results
                        searchResults.style.display = 'block';
                        
                        // Simulate search results (in a real app, this would be an API call)
                        const products = [
                            {
                                name: 'JUUL Starter Kit',
                                price: '1299 грн',
                                image: '/api/placeholder/80/80'
                            },
                            {
                                name: 'SMOK Novo 4',
                                price: '899 грн',
                                image: '/api/placeholder/80/80'
                            },
                            {
                                name: 'Картриджі JUUL (4 шт)',
                                price: '499 грн',
                                image: '/api/placeholder/80/80'
                            },
                            {
                                name: 'Рідина Smoke Kitchen',
                                price: '349 грн',
                                image: '/api/placeholder/80/80'
                            }
                        ];
                        
                        // Filter products based on search query
                        const filteredProducts = products.filter(product => 
                            product.name.toLowerCase().includes(searchQuery)
                        );
                        
                        // Display results
                        if (filteredProducts.length > 0) {
                            searchResults.innerHTML = filteredProducts.map(product => `
                                <div class="search-result-item">
                                    <div class="search-result-image">
                                        <img src="${product.image}" alt="${product.name}">
                                    </div>
                                    <div class="search-result-details">
                                        <h4>${product.name}</h4>
                                        <div class="search-result-price">${product.price}</div>
                                        <button class="add-to-cart-btn">Додати у кошик</button>
                                    </div>
                                </div>
                            `).join('');
                            
                            // Add event listeners to add to cart buttons
                            const addToCartBtns = searchResults.querySelectorAll('.add-to-cart-btn');
                            addToCartBtns.forEach((btn, index) => {
                                btn.addEventListener('click', () => {
                                    const product = filteredProducts[index];
                                    addToCart(product.name, product.price, product.image, 1);
                                    
                                    // Close search overlay after adding to cart
                                    document.body.removeChild(searchOverlay);
                                });
                            });
                        } else {
                            searchResults.innerHTML = `
                                <div class="no-results">
                                    <p>Немає результатів для "${searchQuery}"</p>
                                </div>
                            `;
                        }
                    }
                });
            }
        });
    }
}

// Newsletter form functionality
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <p>Дякуємо за підписку! Ми надіслали вам електронний лист для підтвердження.</p>
                `;
                
                // Add styles
                const successStyles = document.createElement('style');
                successStyles.textContent = `
                    .newsletter-success {
                        display: flex;
                        align-items: center;
                        background-color: rgba(255, 255, 255, 0.1);
                        border-radius: var(--border-radius-lg);
                        padding: 1rem;
                        margin-top: 1rem;
                        animation: fadeIn 0.5s ease forwards;
                    }
                    
                    .newsletter-success svg {
                        color: white;
                        margin-right: 1rem;
                        flex-shrink: 0;
                    }
                    
                    .newsletter-success p {
                        margin: 0;
                    }
                `;
                
                document.head.appendChild(successStyles);
                
                // Replace form with success message
                newsletterForm.parentNode.replaceChild(successMessage, newsletterForm);
            }
        });
    }
}

// Additional animations and UI enhancements
document.addEventListener('scroll', () => {
    // Parallax effect for the hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollY = window.scrollY;
        const heroImg = hero.querySelector('.hero-image');
        if (heroImg) {
            heroImg.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
    }
    
    // Rotate feature icons on scroll
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
        const rect = icon.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
            const scrollPercentage = (windowHeight * 0.8 - rect.top) / (windowHeight * 0.8);
            const rotation = Math.min(scrollPercentage * 720, 720);
            icon.style.transform = `rotate(${rotation}deg)`;
        }
    });
});