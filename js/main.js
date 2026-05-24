// main.js
// GSAP-driven interactions and progressive enhancements for performance

// Wait for DOM
window.addEventListener('load', () => {
    // Ensure GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Update year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    navToggle && navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    const typedEl = document.getElementById('typed');
const phrases = [
    'Frontend Developer',
    'Motion Designer',
    'UI Engineer',
    'Performance Enthusiast'
];

let p = 0;
let char = 0;
let forward = true;

function tick() {
    if (!typedEl) return;

    const str = phrases[p];
    typedEl.textContent = str.slice(0, char) + "|";

    if (forward) {
        if (char < str.length) {
            char++;
        } else {
            forward = false;
        }
    } else {
        if (char > 0) {
            char--;
        } else {
            forward = true;
            p = (p + 1) % phrases.length;
        }
    }

    setTimeout(tick, 30); // speed control
}

tick();

    // Floating blobs parallax
    const blobs = document.querySelectorAll('.blob');
    gsap.to(blobs, {
        yPercent: 8,
        xPercent: -6,
        duration: 12,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 1.2
    });

    // Reveal animations for sections
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section.querySelectorAll('.reveal, .card-glass, .section-title, .skill, .project, .timeline-item'), {
            opacity: 1,
            y: 28,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%' }
        });
    });

    // Progress bars animation driven by data-progress
    gsap.utils.toArray('.progress').forEach(el => {
        const bar = el.querySelector('.progress-bar');
        const percent = parseInt(el.dataset.progress || '0', 10);
        gsap.to(bar, {
            width: percent + '%',
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
        });
    });

    // Project card hover with subtle lift and image scale
    gsap.utils.toArray('.project').forEach(card => {
        const img = card.querySelector('img');
        card.addEventListener('pointerenter', () => {
            gsap.to(card, { y: -8, boxShadow: '0 14px 40px rgba(2,6,23,0.6)', duration: 0.4 });
            img && gsap.to(img, { scale: 1.05, duration: 0.6 });
        });
        card.addEventListener('pointerleave', () => {
            gsap.to(card, { y: 0, boxShadow: 'var(--shadow)', duration: 0.45 });
            img && gsap.to(img, { scale: 1, duration: 0.7 });
        });
    });

    // Magnetic buttons
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach(btn => {
        btn.addEventListener('pointermove', e => {
            const rect = btn.getBoundingClientRect();
            const dx = (e.clientX - (rect.left + rect.width / 2)) / 6;
            const dy = (e.clientY - (rect.top + rect.height / 2)) / 6;
            gsap.to(btn, { x: dx, y: dy, duration: 0.25 });
        });
        btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.3 }));
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href === '#') return;
            const el = document.querySelector(href);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Cursor glow follow (optimized)
    const cursor = document.getElementById('cursor');
    if (cursor) {
        window.addEventListener('pointermove', (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.2, ease: 'power2.out' });
        });
        // hide on touch devices
        window.matchMedia('(hover: none)').matches && (cursor.style.display = 'none');
    }

    // Lazy load images with data-src
    const lazyImgs = document.querySelectorAll('img.lazy[data-src]');
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                io.unobserve(img);
            }
        });
    }, { rootMargin: '200px' });
    lazyImgs.forEach(i => io.observe(i));

    // Contact form - animated submit (no external backend)
    const contactForm = document.getElementById('contactForm');
    contactForm && contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        gsap.to(btn, { scale: 0.96, duration: 0.08, yoyo: true, repeat: 1 });
        // Simulate success
        setTimeout(() => {
            gsap.to(contactForm, { opacity: 0.9 });
            alert('Thanks! Message simulated (no mailer configured).');
            contactForm.reset();
        }, 600);
    });

    // Reduce CPU for offscreen tabs
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            gsap.globalTimeline.timeScale(0.3);
        } else {
            gsap.globalTimeline.timeScale(1);
        }
    });

});


