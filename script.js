// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
}

// Helper: show temporary message
function showMessage(element, msg, isError = false) {
    if (!element) return;
    element.innerHTML = `<div style="background:${isError ? '#f8d7da' : '#d4edda'}; color:${isError ? '#721c24' : '#155724'}; padding:10px; border-radius:5px; margin-top:10px;">${msg}</div>`;
    setTimeout(() => element.innerHTML = '', 4000);
}

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        const msgDiv = document.createElement('div');
        newsletterForm.appendChild(msgDiv);
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            showMessage(msgDiv, data.message || 'Subscribed!', !data.success);
            if (data.success) newsletterForm.reset();
        } catch (err) {
            showMessage(msgDiv, 'Network error. Please try again.', true);
        }
    });
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value;
        const email = document.getElementById('contactEmail')?.value;
        const subject = document.getElementById('contactSubject')?.value;
        const message = document.getElementById('contactMessage')?.value;
        const msgDiv = document.createElement('div');
        contactForm.appendChild(msgDiv);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
            });
            const data = await res.json();
            showMessage(msgDiv, data.message || 'Message sent!', !data.success);
            if (data.success) contactForm.reset();
        } catch (err) {
            showMessage(msgDiv, 'Network error. Please try again.', true);
        }
    });
}

// Volunteer form
const volunteerForm = document.getElementById('volunteerForm');
if (volunteerForm) {
    volunteerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const firstName = document.getElementById('volFirstName')?.value;
        const lastName = document.getElementById('volLastName')?.value;
        const email = document.getElementById('volEmail')?.value;
        const phone = document.getElementById('volPhone')?.value;
        const role = document.getElementById('volRole')?.value;
        const availability = volunteerForm.querySelector('input[placeholder*="Availability"]')?.value || '';
        const msgDiv = document.createElement('div');
        volunteerForm.appendChild(msgDiv);
        try {
            const res = await fetch('/api/volunteer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, phone, role, availability })
            });
            const data = await res.json();
            showMessage(msgDiv, data.message || 'Application submitted!', !data.success);
            if (data.success) volunteerForm.reset();
        } catch (err) {
            showMessage(msgDiv, 'Network error. Please try again.', true);
        }
    });
}

// Fundraiser form (if present)
const fundraiseForm = document.getElementById('fundraiseForm');
if (fundraiseForm) {
    fundraiseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('fundraiserName')?.value;
        const goal = document.getElementById('fundraiserGoal')?.value;
        const description = document.getElementById('fundraiserDesc')?.value;
        const creatorName = document.getElementById('fundraiserCreator')?.value;
        const creatorEmail = document.getElementById('fundraiserEmail')?.value;
        const msgDiv = document.createElement('div');
        fundraiseForm.appendChild(msgDiv);
        try {
            const res = await fetch('/api/fundraiser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, goal, description, creatorName, creatorEmail })
            });
            const data = await res.json();
            showMessage(msgDiv, data.message || 'Fundraiser created!', !data.success);
            if (data.success) fundraiseForm.reset();
        } catch (err) {
            showMessage(msgDiv, 'Network error.', true);
        }
    });
}

// Partner inquiry form
const partnerForm = document.getElementById('partnerForm');
if (partnerForm) {
    partnerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const organizationName = document.getElementById('orgName')?.value;
        const contactPerson = document.getElementById('contactPerson')?.value;
        const email = document.getElementById('partnerEmail')?.value;
        const phone = document.getElementById('partnerPhone')?.value;
        const partnershipType = document.getElementById('partnerType')?.value;
        const message = document.getElementById('partnerMessage')?.value;
        const msgDiv = document.createElement('div');
        partnerForm.appendChild(msgDiv);
        try {
            const res = await fetch('/api/partner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ organizationName, contactPerson, email, phone, partnershipType, message })
            });
            const data = await res.json();
            showMessage(msgDiv, data.message || 'Inquiry sent!', !data.success);
            if (data.success) partnerForm.reset();
        } catch (err) {
            showMessage(msgDiv, 'Network error.', true);
        }
    });
}

// Gallery filtering and lightbox (existing code)
if (document.getElementById('galleryGrid')) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.close');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            galleryItems.forEach(item => {
                item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) ? 'block' : 'none';
            });
        });
    });
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
        });
    });
    if (closeBtn) closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
    window.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.style.display = 'none'; });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '' && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active navigation link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
});