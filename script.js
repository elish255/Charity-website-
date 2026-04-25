// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Newsletter form submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if(email) {
            alert('Thank you for subscribing! We\'ll keep you updated on how you\'re helping children.');
            this.reset();
        }
    });
}

// Gallery filtering and lightbox
if (document.getElementById('galleryGrid')) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.close');

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox functionality
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

// Donation form handling
const donationForm = document.getElementById('donationForm');
if (donationForm) {
    // Amount button selection
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    let selectedAmount = null;
    
    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            amountBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedAmount = btn.getAttribute('data-amount');
            if (customAmountInput) customAmountInput.value = '';
        });
    });
    
    if (customAmountInput) {
        customAmountInput.addEventListener('input', () => {
            amountBtns.forEach(b => b.classList.remove('selected'));
            selectedAmount = null;
        });
    }
    
    // Dedication fields toggle
    const dedicateCheckbox = document.getElementById('dedicate');
    const dedicateFields = document.getElementById('dedicateFields');
    
    if (dedicateCheckbox) {
        dedicateCheckbox.addEventListener('change', () => {
            dedicateFields.style.display = dedicateCheckbox.checked ? 'block' : 'none';
        });
    }
    
    // Form submission
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get values
        const firstName = document.getElementById('firstName')?.value;
        const lastName = document.getElementById('lastName')?.value;
        const email = document.getElementById('email')?.value;
        const amount = selectedAmount || customAmountInput?.value;
        const frequency = document.querySelector('input[name="frequency"]:checked')?.value;
        
        // Validation
        if (!firstName || !lastName || !email) {
            alert('Please fill in all required fields.');
            return;
        }
        
        if (!amount || amount < 1) {
            alert('Please select or enter a donation amount.');
            return;
        }
        
        // Show success message
        alert(`Thank you ${firstName} for your ${frequency === 'monthly' ? 'monthly ' : ''}donation of $${amount}! You will receive a confirmation email at ${email}.`);
        
        // Reset form
        donationForm.reset();
        amountBtns.forEach(b => b.classList.remove('selected'));
        if (dedicateFields) dedicateFields.style.display = 'none';
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '' && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add active class to current page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});