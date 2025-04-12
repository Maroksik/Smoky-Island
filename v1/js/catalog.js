// Catalog page specific functionality

document.addEventListener('DOMContentLoaded', () => {
    // Initialize catalog page components
    initPriceRangeSlider();
    initFilterEvents();
    initCatalogSorting();
    initPagination();
    initCatalogAnimations();
});

// Price range slider functionality
function initPriceRangeSlider() {
    const minRange = document.querySelector('.min-range');
    const maxRange = document.querySelector('.max-range');
    const minInput = document.querySelector('.price-min');
    const maxInput = document.querySelector('.price-max');
    const sliderTrack = document.querySelector('.slider-track');

    if (minRange && maxRange && minInput && maxInput && sliderTrack) {
        // Set initial track position
        const minVal = parseInt(minRange.value);
        const maxVal = parseInt(maxRange.value);
        const minPercent = (minVal / parseInt(minRange.max)) * 100;
        const maxPercent = (maxVal / parseInt(maxRange.max)) * 100;
        
        sliderTrack.style.left = `${minPercent}%`;
        sliderTrack.style.width = `${maxPercent - minPercent}%`;
        
        // Update slider track on input change
        function updateSliderTrack() {
            const minVal = parseInt(minRange.value);
            const maxVal = parseInt(maxRange.value);
            const minPercent = (minVal / parseInt(minRange.max)) * 100;
            const maxPercent = (maxVal / parseInt(maxRange.max)) * 100;
            
            sliderTrack.style.left = `${minPercent}%`;
            sliderTrack.style.width = `${maxPercent - minPercent}%`;
        }
        
        // Handle min range input
        minRange.addEventListener('input', () => {
            const minVal = parseInt(minRange.value);
            const maxVal = parseInt(maxRange.value);
            
            if (minVal > maxVal - 500) {
                minRange.value = maxVal - 500;
            }
            
            minInput.value = minRange.value;
            updateSliderTrack();
        });
        
        // Handle max range input
        maxRange.addEventListener('input', () => {
            const minVal = parseInt(minRange.value);
            const maxVal = parseInt(maxRange.value);
            
            if (maxVal < minVal + 500) {
                maxRange.value = minVal + 500;
            }
            
            maxInput.value = maxRange.value;
            updateSliderTrack();
        });
        
        // Handle min price input
        minInput.addEventListener('input', () => {
            const minVal = parseInt(minInput.value);
            const maxVal = parseInt(maxInput.value);
            
            if (minVal < 0) {
                minInput.value = 0;
            } else if (minVal > maxVal - 500) {
                minInput.value = maxVal - 500;
            }
            
            minRange.value = minInput.value;
            updateSliderTrack();
        });
        
        // Handle max price input
        maxInput.addEventListener('input', () => {
            const minVal = parseInt(minInput.value);
            const maxVal = parseInt(maxInput.value);
            
            if (maxVal > parseInt(maxRange.max)) {
                maxInput.value = maxRange.max;
            } else if (maxVal < minVal + 500) {
                maxInput.value = minVal + 500;
            }
            
            maxRange.value = maxInput.value;
            updateSliderTrack();
        });
    }
}

// Filter event handlers
function initFilterEvents() {
    const categoryLinks = document.querySelectorAll('.filter-list a');
    const checkboxes = document.querySelectorAll('.checkbox-label input');
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    const resetFiltersBtn = document.querySelector('.reset-filters-btn');
    
    // Category links
    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                categoryLinks.forEach(item => item.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Simulate filter application
                simulateLoading();
            });
        });
    }
    
    // Brand checkboxes
    if (checkboxes.length > 0) {
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                // No immediate action, wait for apply button
            });
        });
    }
    
    // Apply filters button
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            simulateLoading();
        });
    }
    
    // Reset filters button
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            // Reset category selection
            if (categoryLinks.length > 0) {
                categoryLinks.forEach((link, index) => {
                    if (index === 0) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
            
            // Reset checkboxes
            if (checkboxes.length > 0) {
                checkboxes.forEach((checkbox, index) => {
                    checkbox.checked = index < 3; // Reset to initial state (first 3 checked)
                });
            }
            
            // Reset price range
            const minRange = document.querySelector('.min-range');
            const maxRange = document.querySelector('.max-range');
            const minInput = document.querySelector('.price-min');
            const maxInput = document.querySelector('.price-max');
            
            if (minRange && maxRange && minInput && maxInput) {
                minRange.value = 0;
                maxRange.value = 5000;
                minInput.value = 0;
                maxInput.value = 5000;
                
                // Update slider track
                const sliderTrack = document.querySelector('.slider-track');
                if (sliderTrack) {
                    sliderTrack.style.left = '0%';
                    sliderTrack.style.width = '100%';
                }
            }
            
            simulateLoading();
        });
    }
}

// Simulate loading and filtering
function simulateLoading() {
    const catalogGrid = document.querySelector('.catalog-grid');
    const catalogResults = document.querySelector('.catalog-results');
    
    if (catalogGrid && catalogResults) {
        // Show loading state
        catalogGrid.style.opacity = '0.5';
        catalogGrid.style.pointerEvents = 'none';
        
        // Update after a short delay
        setTimeout(() => {
            catalogGrid.style.opacity = '1';
            catalogGrid.style.pointerEvents = 'auto';
            
            // Simulate different number of results
            const randomResultCount = Math.floor(Math.random() * 10) + 15;
            catalogResults.textContent = `Знайдено ${randomResultCount} товарів`;
            
            // Animate products again
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 800);
    }
}

// Catalog sorting functionality
function initCatalogSorting() {
    const sortSelect = document.getElementById('sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            simulateLoading();
        });
    }
}

// Pagination functionality
function initPagination() {
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    const paginationNext = document.querySelector('.pagination-next');
    
    if (paginationButtons.length > 0) {
        paginationButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Simulate page change
                simulateLoading();
                
                // Scroll to top of catalog
                const catalogContainer = document.querySelector('.catalog-container');
                if (catalogContainer) {
                    window.scrollTo({
                        top: catalogContainer.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    if (paginationNext) {
        paginationNext.addEventListener('click', () => {
            // Find current active button
            const activeButton = document.querySelector('.pagination-btn.active');
            if (activeButton) {
                const activeIndex = Array.from(paginationButtons).indexOf(activeButton);
                
                // Activate next button if not the last one
                if (activeIndex < paginationButtons.length - 1) {
                    paginationButtons[activeIndex].classList.remove('active');
                    paginationButtons[activeIndex + 1].classList.add('active');
                    
                    // Simulate page change
                    simulateLoading();
                    
                    // Scroll to top of catalog
                    const catalogContainer = document.querySelector('.catalog-container');
                    if (catalogContainer) {
                        window.scrollTo({
                            top: catalogContainer.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    }
}

// Additional animations for catalog page
function initCatalogAnimations() {
    // Animate catalog hero section
    gsap.fromTo('.catalog-hero h1', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    );
    
    gsap.fromTo('.catalog-hero p', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4 }
    );
    
    // Animate sidebar filters
    gsap.fromTo('.catalog-sidebar', 
        { opacity: 0, x: -30 },
        { 
            opacity: 1, 
            x: 0, 
            duration: 0.8,
            delay: 0.4
        }
    );
    
    // Animate catalog header
    gsap.fromTo('.catalog-header', 
        { opacity: 0, y: -20 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.6,
            delay: 0.5
        }
    );
    
    // Animate product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        gsap.fromTo(card, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.5,
                delay: 0.6 + (index % 4 * 0.1),
                ease: "power2.out"
            }
        );
    });
    
    // Animate pagination
    gsap.fromTo('.pagination', 
        { opacity: 0, y: 30 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.6,
            delay: 0.8
        }
    );
    
    // Checkbox custom animation
    const checkboxes = document.querySelectorAll('.checkbox-label input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const customCheckbox = this.nextElementSibling;
            
            if (this.checked) {
                gsap.fromTo(customCheckbox, 
                    { scale: 0.8 },
                    { scale: 1, duration: 0.3, ease: "back.out(2)" }
                );
            }
        });
    });
    
    // Button hover animations
    const buttons = document.querySelectorAll('.apply-filters-btn, .reset-filters-btn, .pagination-btn, .pagination-next');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, { scale: 1.05, duration: 0.2 });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, { scale: 1, duration: 0.2 });
        });
    });
    
    // Badge animations
    const badges = document.querySelectorAll('.product-badge');
    badges.forEach(badge => {
        gsap.fromTo(badge, 
            { scale: 0, opacity: 0 },
            { 
                scale: 1, 
                opacity: 1, 
                duration: 0.5,
                delay: 1,
                ease: "elastic.out(1, 0.5)"
            }
        );
    });
}

// Function to filter products based on price range
function filterProductsByPrice(minPrice, maxPrice) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const priceElement = card.querySelector('.product-price');
        let price;
        
        // Handle sale prices
        if (priceElement.querySelector('.old-price')) {
            // Get the actual price (after discount)
            const actualPriceText = priceElement.textContent.replace(priceElement.querySelector('.old-price').textContent, '').trim();
            price = parseInt(actualPriceText.replace(/[^0-9]/g, ''));
        } else {
            price = parseInt(priceElement.textContent.replace(/[^0-9]/g, ''));
        }
        
        if (price >= minPrice && price <= maxPrice) {
            gsap.to(card, { opacity: 1, display: 'flex', duration: 0.5 });
        } else {
            gsap.to(card, { opacity: 0, display: 'none', duration: 0.5 });
        }
    });
    
    // Update results count
    updateResultsCount();
}

// Update visible results count
function updateResultsCount() {
    const catalogResults = document.querySelector('.catalog-results');
    const visibleProducts = document.querySelectorAll('.product-card[style*="opacity: 1"]').length;
    
    if (catalogResults) {
        catalogResults.textContent = `Знайдено ${visibleProducts} товарів`;
    }
}

// Initialize mobile filters toggle for responsive design
window.addEventListener('load', () => {
    if (window.innerWidth <= 1024) {
        const catalogSidebar = document.querySelector('.catalog-sidebar');
        
        if (catalogSidebar) {
            // Create filter toggle button for mobile
            const filterToggle = document.createElement('button');
            filterToggle.className = 'filter-toggle-btn';
            filterToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="4" y1="21" x2="4" y2="14"></line>
                    <line x1="4" y1="10" x2="4" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="3"></line>
                    <line x1="20" y1="21" x2="20" y2="16"></line>
                    <line x1="20" y1="12" x2="20" y2="3"></line>
                    <line x1="1" y1="14" x2="7" y2="14"></line>
                    <line x1="9" y1="8" x2="15" y2="8"></line>
                    <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
                Фільтри
            `;
            
            // Add styles
            const filterToggleStyles = document.createElement('style');
            filterToggleStyles.textContent = `
                .filter-toggle-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 0.75rem 1rem;
                    border-radius: var(--border-radius-lg);
                    cursor: pointer;
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 100;
                    box-shadow: var(--shadow-lg);
                }
                
                .catalog-sidebar {
                    position: fixed;
                    top: 0;
                    left: -300px;
                    width: 280px;
                    height: 100%;
                    background-color: var(--background-color);
                    z-index: 1000;
                    overflow-y: auto;
                    padding: 1rem;
                    transition: left 0.3s ease;
                    box-shadow: var(--shadow-xl);
                }
                
                .catalog-sidebar.open {
                    left: 0;
                }
                
                .filter-close-btn {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--text-light);
                    z-index: 10;
                }
                
                .filter-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 999;
                    visibility: hidden;
                    opacity: 0;
                    transition: opacity 0.3s ease, visibility 0.3s ease;
                }
                
                .filter-overlay.open {
                    visibility: visible;
                    opacity: 1;
                }
            `;
            
            document.head.appendChild(filterToggleStyles);
            document.body.appendChild(filterToggle);
            
            // Add close button to sidebar
            const closeButton = document.createElement('button');
            closeButton.className = 'filter-close-btn';
            closeButton.innerHTML = '&times;';
            catalogSidebar.prepend(closeButton);
            
            // Add filter overlay
            const filterOverlay = document.createElement('div');
            filterOverlay.className = 'filter-overlay';
            document.body.appendChild(filterOverlay);
            
            // Toggle sidebar on button click
            filterToggle.addEventListener('click', () => {
                catalogSidebar.classList.add('open');
                filterOverlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
            
            // Close sidebar on close button click
            closeButton.addEventListener('click', () => {
                catalogSidebar.classList.remove('open');
                filterOverlay.classList.remove('open');
                document.body.style.overflow = '';
            });
            
            // Close sidebar on overlay click
            filterOverlay.addEventListener('click', () => {
                catalogSidebar.classList.remove('open');
                filterOverlay.classList.remove('open');
                document.body.style.overflow = '';
            });
        }
    }
});