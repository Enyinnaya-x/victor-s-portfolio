(function () {
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    const toggle = nav.querySelector('.nav-toggle');
    const panel = document.getElementById('mobile-nav-panel');
    const backdrop = nav.querySelector('.mobile-nav-backdrop');
    const mobileLinks = nav.querySelectorAll('.mobile-nav-link');
    const bar = nav.querySelector('.nav-bar-inner');

    function setNavHeight() {
        const height = bar ? bar.offsetHeight : nav.offsetHeight;
        nav.style.setProperty('--nav-height', height + 'px');
    }

    function isMenuOpen() {
        return nav.classList.contains('is-open');
    }

    function openMenu() {
        nav.classList.add('is-open');
        document.body.classList.add('nav-open');
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Close menu');
        }
        if (panel) panel.setAttribute('aria-hidden', 'false');
    }

    function closeMenu() {
        nav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Open menu');
        }
        if (panel) panel.setAttribute('aria-hidden', 'true');
    }

    if (toggle) {
        toggle.addEventListener('click', function () {
            if (isMenuOpen()) closeMenu();
            else openMenu();
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeMenu);
    }

    mobileLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isMenuOpen()) closeMenu();
    });

    window.addEventListener('resize', function () {
        setNavHeight();
        if (window.matchMedia('(min-width: 768px)').matches) closeMenu();
    });

    setNavHeight();

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) nav.classList.add('is-scrolled');
        else nav.classList.remove('is-scrolled');
    }, { passive: true });

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            closeMenu();

            const offset = nav.offsetHeight + 12;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    var path = window.location.pathname.split('/').pop() || '';
    if (path === '' || path === '/') path = 'index.html';

    nav.querySelectorAll('.nav-link, .mobile-nav-link').forEach(function (link) {
        var href = link.getAttribute('href') || '';
        if (path === 'index.html' && href === 'blog.html') return;
        if (path === 'blog.html' && (href === 'blog.html' || href.endsWith('/blog.html'))) {
            link.classList.add('is-active');
        }
    });
})();
