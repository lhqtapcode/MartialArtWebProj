document.addEventListener('DOMContentLoaded', function() {
    // Navigation and header functionality
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const backToTopButton = document.getElementById('back-to-top');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCount = document.querySelector('.cart-count');
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (window.scrollY > 500) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Calculate offset with header height
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Course filtering functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter course cards
            courseCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Add animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Shopping cart functionality
    let cartItems = 0;
    let cartCourses = [];
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get course information
            const courseCard = this.closest('.course-card');
            const courseName = courseCard.querySelector('h3').textContent;
            const coursePrice = courseCard.querySelector('.price').textContent;
            
            // Add to cart count
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Save course to cart array
            cartCourses.push({
                name: courseName,
                price: coursePrice
            });
            
            // Animation for cart button
            button.textContent = 'Added to Cart!';
            button.style.backgroundColor = '#008000';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.backgroundColor = '';
            }, 2000);
            
            // Animation for cart icon
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.classList.add('cart-pulse');
            
            setTimeout(() => {
                cartIcon.classList.remove('cart-pulse');
            }, 500);
            
            // Show alert with course information
            showAddToCartAlert(courseName, coursePrice);
        });
    });
    
    // Function to display alert when course is added to cart
    function showAddToCartAlert(courseName, coursePrice) {
        // Create alert container
        const alertContainer = document.createElement('div');
        alertContainer.className = 'cart-alert';
        
        // Add alert content
        alertContainer.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-check-circle"></i>
                <div class="alert-message">
                    <h4>Course Added to Cart!</h4>
                    <p>${courseName}</p>
                    <p class="alert-price">${coursePrice}</p>
                </div>
                <button class="alert-close">&times;</button>
            </div>
        `;
        
        // Add to document
        document.body.appendChild(alertContainer);
        
        // Show alert with animation
        setTimeout(() => {
            alertContainer.classList.add('active');
        }, 10);
        
        // Close button functionality
        alertContainer.querySelector('.alert-close').addEventListener('click', function() {
            closeAlert(alertContainer);
        });
        
        // Auto close after 4 seconds
        setTimeout(() => {
            closeAlert(alertContainer);
        }, 4000);
    }
    
    // Function to close alert
    function closeAlert(alertContainer) {
        alertContainer.classList.remove('active');
        setTimeout(() => {
            alertContainer.remove();
        }, 300);
    }
    
    // Add CSS for alert styling
    const alertStyle = document.createElement('style');
    alertStyle.textContent = `
        .cart-alert {
            position: fixed;
            top: 30px;
            right: 30px;
            background-color: var(--dark-gray);
            border-left: 4px solid var(--primary);
            border-radius: 5px;
            padding: 15px 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 1100;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            max-width: 350px;
        }
        
        .cart-alert.active {
            transform: translateX(0);
        }
        
        .alert-content {
            display: flex;
            align-items: center;
        }
        
        .alert-content i {
            color: var(--primary);
            font-size: 24px;
            margin-right: 15px;
        }
        
        .alert-message {
            flex: 1;
        }
        
        .alert-message h4 {
            font-size: 16px;
            margin-bottom: 5px;
            color: var(--text);
        }
        
        .alert-message p {
            font-size: 14px;
            color: #bdbdbd;
            margin: 0;
        }
        
        .alert-price {
            color: var(--secondary) !important;
            font-weight: bold;
        }
        
        .alert-close {
            background: none;
            border: none;
            color: #bdbdbd;
            font-size: 20px;
            cursor: pointer;
            margin-left: 10px;
            padding: 0 5px;
        }
        
        .alert-close:hover {
            color: var(--primary);
        }
    `;
    document.head.appendChild(alertStyle);
    
    // CTA buttons functionality
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to courses section
            const coursesSection = document.getElementById('courses');
            const headerHeight = header.offsetHeight;
            const targetPosition = coursesSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Course card hover effects
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add active class to navigation links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Animation for elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .course-card, .section-title');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add animation class for CSS transitions
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .feature-card, .testimonial-card, .course-card, .section-title {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
            
            .animated {
                opacity: 1;
                transform: translateY(0);
            }
            
            .cart-pulse {
                animation: pulse 0.5s ease;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
        </style>
    `);
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger once on load
    animateOnScroll();

    // Simple form validation for newsletter if exists
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                alert('Please enter your email address');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                emailInput.value = '';
                submitButton.textContent = 'Subscribed!';
                
                setTimeout(() => {
                    submitButton.textContent = 'Subscribe';
                    submitButton.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    // Add click event to cart icon to show cart contents
    const cartIcon = document.querySelector('.cart-icon');
    
    cartIcon.addEventListener('click', function() {
        if (cartItems > 0) {
            showCartContents();
        } else {
            showEmptyCartMessage();
        }
    });
    
    // Function to show cart contents
    function showCartContents() {
        // Create cart modal container
        const cartModal = document.createElement('div');
        cartModal.className = 'cart-modal';
        
        // Generate course list HTML
        let coursesHTML = '';
        let totalPrice = 0;
        
        cartCourses.forEach((course, index) => {
            // Extract price as number
            const priceValue = parseFloat(course.price.replace('$', ''));
            totalPrice += priceValue;
            
            coursesHTML += `
                <div class="cart-item">
                    <span class="cart-item-name">${course.name}</span>
                    <span class="cart-item-price">${course.price}</span>
                    <button class="remove-item" data-index="${index}">&times;</button>
                </div>
            `;
        });
        
        // Add modal content
        cartModal.innerHTML = `
            <div class="cart-modal-content">
                <div class="cart-header">
                    <h3>Your Cart (${cartItems})</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="cart-items">
                    ${coursesHTML}
                </div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <span>Total:</span>
                        <span>$${totalPrice.toFixed(2)}</span>
                    </div>
                    <button class="checkout-btn">Proceed to Checkout</button>
                </div>
            </div>
        `;
        
        // Add to document
        document.body.appendChild(cartModal);
        
        // Add backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        document.body.appendChild(backdrop);
        
        // Show modal with animation
        setTimeout(() => {
            cartModal.classList.add('active');
            backdrop.classList.add('active');
        }, 10);
        
        // Close modal on close button click
        cartModal.querySelector('.close-modal').addEventListener('click', function() {
            closeCartModal(cartModal, backdrop);
        });
        
        // Close modal on backdrop click
        backdrop.addEventListener('click', function() {
            closeCartModal(cartModal, backdrop);
        });
        
        // Remove item from cart
        cartModal.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index, cartModal, backdrop);
            });
        });
        
        // Checkout button
        cartModal.querySelector('.checkout-btn').addEventListener('click', function() {
            alert('Proceeding to checkout! This would normally redirect to a payment page.');
            closeCartModal(cartModal, backdrop);
        });
    }
    
    // Function to show empty cart message
    function showEmptyCartMessage() {
        const cartModal = document.createElement('div');
        cartModal.className = 'cart-modal';
        
        cartModal.innerHTML = `
            <div class="cart-modal-content">
                <div class="cart-header">
                    <h3>Your Cart</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <button class="continue-shopping">Continue Shopping</button>
                </div>
            </div>
        `;
        
        // Add to document
        document.body.appendChild(cartModal);
        
        // Add backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        document.body.appendChild(backdrop);
        
        // Show modal with animation
        setTimeout(() => {
            cartModal.classList.add('active');
            backdrop.classList.add('active');
        }, 10);
        
        // Close modal on close button click
        cartModal.querySelector('.close-modal').addEventListener('click', function() {
            closeCartModal(cartModal, backdrop);
        });
        
        // Close modal on backdrop click
        backdrop.addEventListener('click', function() {
            closeCartModal(cartModal, backdrop);
        });
        
        // Continue shopping button
        cartModal.querySelector('.continue-shopping').addEventListener('click', function() {
            closeCartModal(cartModal, backdrop);
            
            // Scroll to courses section
            const coursesSection = document.getElementById('courses');
            const headerHeight = header.offsetHeight;
            const targetPosition = coursesSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    }
    
    // Function to close cart modal
    function closeCartModal(modal, backdrop) {
        modal.classList.remove('active');
        backdrop.classList.remove('active');
        
        setTimeout(() => {
            modal.remove();
            backdrop.remove();
        }, 300);
    }
    
    // Function to remove item from cart
    function removeFromCart(index, modal, backdrop) {
        // Remove from cart array
        cartCourses.splice(index, 1);
        
        // Update cart count
        cartItems--;
        cartCount.textContent = cartItems;
        
        // If cart is empty now, show empty cart message
        if (cartItems === 0) {
            closeCartModal(modal, backdrop);
            showEmptyCartMessage();
        } else {
            // Otherwise refresh cart modal
            closeCartModal(modal, backdrop);
            showCartContents();
        }
    }
    
    // Add CSS for cart modal
    const cartModalStyle = document.createElement('style');
    cartModalStyle.textContent = `
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 1200;
            opacity: 0;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(3px);
        }
        
        .modal-backdrop.active {
            opacity: 1;
        }
        
        .cart-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            z-index: 1300;
            width: 100%;
            max-width: 500px;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .cart-modal.active {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        
        .cart-modal-content {
            background-color: var(--dark-gray);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
        
        .cart-header {
            padding: 20px;
            background-color: var(--medium-gray);
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--light-gray);
        }
        
        .cart-header h3 {
            font-size: 18px;
            color: var(--text);
            margin: 0;
        }
        
        .close-modal {
            background: none;
            border: none;
            color: var(--text);
            font-size: 24px;
            cursor: pointer;
            padding: 0 5px;
        }
        
        .close-modal:hover {
            color: var(--primary);
        }
        
        .cart-items {
            max-height: 300px;
            overflow-y: auto;
            padding: 0 20px;
        }
        
        .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid var(--light-gray);
        }
        
        .cart-item-name {
            flex: 1;
            font-size: 14px;
            color: var(--text);
        }
        
        .cart-item-price {
            font-size: 16px;
            font-weight: 600;
            color: var(--secondary);
            margin: 0 20px;
        }
        
        .remove-item {
            background: none;
            border: none;
            color: #bdbdbd;
            font-size: 18px;
            cursor: pointer;
            padding: 0 5px;
        }
        
        .remove-item:hover {
            color: var(--primary);
        }
        
        .cart-footer {
            padding: 20px;
            border-top: 1px solid var(--light-gray);
        }
        
        .cart-total {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: 600;
        }
        
        .cart-total span:last-child {
            color: var(--secondary);
        }
        
        .checkout-btn {
            width: 100%;
            background-color: var(--primary);
            color: var(--text);
            border: none;
            padding: 12px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .checkout-btn:hover {
            background-color: #ff3813;
        }
        
        .cart-empty {
            padding: 40px 20px;
            text-align: center;
        }
        
        .cart-empty i {
            font-size: 48px;
            color: var(--light-gray);
            margin-bottom: 20px;
        }
        
        .cart-empty p {
            font-size: 16px;
            color: #bdbdbd;
            margin-bottom: 25px;
        }
        
        .continue-shopping {
            background-color: var(--primary);
            color: var(--text);
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .continue-shopping:hover {
            background-color: #ff3813;
        }
    `;
    document.head.appendChild(cartModalStyle);
});
