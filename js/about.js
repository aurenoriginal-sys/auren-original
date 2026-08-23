/* ==================================================
   AUREN ORIGINALS
   ABOUT PAGE JAVASCRIPT
================================================== */


/* ==================================================
   DEVICE CHECK
================================================== */

const isDesktop =
    window.matchMedia(
        '(min-width: 768px)'
    ).matches;


/* ==================================================
   COMPONENT LOADER
================================================== */

async function loadComponent(
    url,
    elementId
) {

    try {

        const response =
            await fetch(
                url,
                {
                    cache:
                        'no-store'
                }
            );


        if (!response.ok) {

            throw new Error(
                `${url} returned HTTP ${response.status}`
            );

        }


        const html =
            await response.text();


        const container =
            document.getElementById(
                elementId
            );


        if (!container) {

            throw new Error(
                `Container not found: #${elementId}`
            );

        }


        container.innerHTML =
            html;


        return true;

    }

    catch (error) {

        console.error(
            `Component loading error (${url}):`,
            error
        );


        return false;

    }

}


/* ==================================================
   LOAD SITE CONFIG SCRIPT
================================================== */

function loadSiteConfigScript() {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            if (
                window.AurenSite
                &&
                typeof
                    window.AurenSite.initialize
                    ===
                    'function'
            ) {

                resolve();

                return;

            }


            const script =
                document.createElement(
                    'script'
                );


            script.src =
                '/js/site-config.js?v=1';


            script.async =
                false;


            script.onload =
                () => {

                    if (
                        window.AurenSite
                        &&
                        typeof
                            window.AurenSite.initialize
                            ===
                            'function'
                    ) {

                        resolve();

                    }

                    else {

                        reject(
                            new Error(
                                'AurenSite API was not found.'
                            )
                        );

                    }

                };


            script.onerror =
                () => {

                    reject(
                        new Error(
                            'Failed to load site-config.js'
                        )
                    );

                };


            document.body.appendChild(
                script
            );

        }
    );

}


/* ==================================================
   LOAD NAVBAR
================================================== */

const navbarLoaded =
    loadComponent(
        'components/navbar.html',
        'navbar-container'
    );


/* ==================================================
   LOAD FOOTER
================================================== */

const footerLoaded =
    loadComponent(
        'components/footer.html',
        'footer-container'
    );


/* ==================================================
   LOAD SCROLL TO TOP
================================================== */

const scrollTopLoaded =
    loadComponent(
        'components/scroll-to-top.html',
        'scroll-to-top-container'
    );


const ctaButtonsLoaded =
    loadComponent(
        'components/cta-buttons.html',
        'about-cta-buttons'
    );


/* ==================================================
   LOAD SITE CONFIGURATION
================================================== */

async function initializeSite() {

    try {

        const [
    navbarReady,
    footerReady,
    scrollTopReady,
    ctaButtonsReady
] =
    await Promise.all([
        navbarLoaded,
        footerLoaded,
        scrollTopLoaded,
        ctaButtonsLoaded
    ]);


        if (
    !navbarReady
    ||
    !footerReady
    ||
    !ctaButtonsReady
) {

    throw new Error(
        'Navbar, footer, or CTA buttons failed to load.'
    );

}


        await loadSiteConfigScript();


        await window.AurenSite.initialize();


        initializeScrollToTop();


        console.log(
            'About page site initialized.'
        );

    }

    catch (error) {

        console.error(
            'About page site initialization error:',
            error
        );

    }

}


/* ==================================================
   ABOUT PAGE ACTIVE NAVIGATION
================================================== */

function initializeAboutActiveNavigation() {

    const desktopLink =
        document.querySelector(
            '.nav-links a[data-page="about"]'
        );


    const mobileLink =
        document.querySelector(
            '.mobile-nav-links a[data-page="about"]'
        );


    if (
        desktopLink
    ) {

        desktopLink.classList.add(
            'active'
        );

    }


    if (
        mobileLink
    ) {

        mobileLink.classList.add(
            'active'
        );

    }

}


/* ==================================================
   LOAD ABOUT CONFIGURATION
================================================== */

async function loadAboutContent() {

    try {

        const response =
            await fetch(
                '/data/about.json',
                {
                    cache:
                        'no-store'
                }
            );


        if (!response.ok) {

            throw new Error(
                `About content request failed: HTTP ${response.status}`
            );

        }


        const content =
            await response.json();


        if (
            !content
            ||
            typeof content !== 'object'
        ) {

            throw new Error(
                'Invalid About page configuration.'
            );

        }


        renderHero(
            content.hero
        );


        renderWhoWeAre(
            content.whoWeAre
        );


        renderPurpose(
            content.purpose
        );


        renderPhilosophy(
            content.philosophy
        );


        renderFounders(
            content.founders
        );


        renderValues(
            content.values
        );


        renderStatement(
            content.statement
        );


        renderGallery(
            content.gallery
        );


        renderCta(
            content.cta
        );


        console.log(
            'About page content loaded.'
        );

    }

    catch (error) {

        console.error(
            'About page content loading error:',
            error
        );

    }

}


/* ==================================================
   HERO
================================================== */

function renderHero(
    hero
) {

    if (
        !hero
    ) {

        return;

    }


    const label =
        document.querySelector(
            '.about-hero .section-label'
        );


    const title =
        document.querySelector(
            '.about-hero .hero-title'
        );


    const description =
        document.querySelector(
            '.about-hero .hero-copy'
        );


    if (
        label
    ) {

        label.textContent =
            hero.label;

    }


    if (
        title
    ) {

        title.innerHTML = `

            ${hero.titleBefore}

            <span
                class="highlight"
            >
                ${hero.titleHighlight}
            </span>

        `;

    }


    if (
        description
    ) {

        description.textContent =
            hero.description;

    }

}


/* ==================================================
   WHO WE ARE
================================================== */

function renderWhoWeAre(
    section
) {

    if (
        !section
    ) {

        return;

    }


    const label =
        document.querySelector(
            '.who-section .section-label'
        );


    const title =
        document.querySelector(
            '.who-heading'
        );


    const copy =
        document.querySelector(
            '.who-copy'
        );


    if (
        label
    ) {

        label.textContent =
            section.label;

    }


    if (
        title
    ) {

        title.textContent =
            section.title;

    }


    if (
        copy
    ) {

        const paragraphs =
            Array.isArray(
                section.paragraphs
            )
                ? section.paragraphs
                : [];


        copy.innerHTML =
            `

                ${section.description}

                ${
                    paragraphs[0]
                        ? `<br><br>${paragraphs[0]}`
                        : ''
                }

                ${
                    paragraphs[1]
                        ? `<br><br><strong>${paragraphs[1]}</strong>`
                        : ''
                }

            `;

    }

}


/* ==================================================
   PURPOSE
================================================== */

function renderPurpose(
    section
) {

    if (
        !section
    ) {

        return;

    }


    const label =
        document.querySelector(
            '.purpose-section .section-label'
        );


    const title =
        document.querySelector(
            '.purpose-title'
        );


    const grid =
        document.querySelector(
            '.purpose-grid'
        );


    if (
        label
    ) {

        label.textContent =
            section.label;

    }


    if (
        title
    ) {

        title.textContent =
            section.title;

    }


    if (
        grid
        &&
        Array.isArray(
            section.items
        )
    ) {

        grid.innerHTML =
            section.items
                .map(
                    item => `

                        <article
                            class="purpose-card reveal"
                        >

                            <h3
                                class="purpose-quote"
                            >
                                ${item.quote}
                            </h3>

                            <p
                                class="purpose-description"
                            >
                                ${item.description}
                            </p>

                        </article>

                    `
                )
                .join('');

    }

}


/* ==================================================
   PHILOSOPHY
================================================== */

function renderPhilosophy(
    section
) {

    if (
        !section
    ) {

        return;

    }


    const label =
        document.querySelector(
            '.philosophy-section .section-label'
        );


    const title =
        document.querySelector(
            '.philosophy-title'
        );


    const grid =
        document.querySelector(
            '.philosophy-grid'
        );


    if (
        label
    ) {

        label.textContent =
            section.label;

    }


    if (
        title
    ) {

        title.textContent =
            section.title;

    }


    if (
        grid
        &&
        Array.isArray(
            section.items
        )
    ) {

        grid.innerHTML =
            section.items
                .map(
                    item => `

                        <article
                            class="philosophy-card reveal"
                        >

                            <h3
                                class="philosophy-name"
                            >
                                ${item.title}
                            </h3>

                            <p
                                class="philosophy-copy"
                            >
                                ${item.description}
                            </p>

                        </article>

                    `
                )
                .join('');

    }

}


/* ==================================================
   FOUNDERS
================================================== */

function renderFounders(
    section
) {

    if (
        !section
    ) {

        return;

    }


    const label =
        document.querySelector(
            '.founder-heading .section-label'
        );


    const title =
        document.querySelector(
            '.founder-heading h2'
        );


    const grid =
        document.querySelector(
            '.founder-grid'
        );


    if (
        label
    ) {

        label.textContent =
            section.label;

    }


    if (
        title
    ) {

        title.textContent =
            section.title;

    }


    if (
        grid
        &&
        Array.isArray(
            section.items
        )
    ) {

        grid.innerHTML =
            section.items
                .map(
                    (
                        founder,
                        index
                    ) => `

                        <article
                            class="founder-card"
                        >

                            <div
                                class="founder-image reveal"
                            >

                                <img
                                    id="founder-image-${index + 1}"
                                    src=""
                                    alt="${founder.alt}"
                                    loading="lazy"
                                    data-founder-file="${founder.image}"
                                >

                            </div>


                            <div
                                class="founder-info"
                            >

                                <span
                                    class="founder-number"
                                >
                                    ${founder.number}
                                </span>


                                <h3
                                    class="founder-name reveal"
                                >
                                    ${founder.name}
                                </h3>


                                <p
                                    class="founder-role reveal"
                                >
                                    ${founder.role}
                                </p>


                                <p
                                    class="founder-copy reveal"
                                >
                                    ${founder.description}
                                </p>

                            </div>

                        </article>

                    `
                )
                .join('');

    }

}


/* ==================================================
   VALUES
================================================== */

function renderValues(
    section
) {

    if (
        !section
    ) {

        return;

    }


    const label =
        document.querySelector(
            '.values-section .section-label'
        );


    const title =
        document.querySelector(
            '.values-title'
        );


    const list =
        document.querySelector(
            '.values-list'
        );


    if (
        label
    ) {

        label.textContent =
            section.label;

    }


    if (
        title
    ) {

        title.textContent =
            section.title;

    }


    if (
        list
        &&
        Array.isArray(
            section.items
        )
    ) {

        list.innerHTML =
            section.items
                .map(
                    item => `

                        <a
                            href="${item.href}"
                            class="value-row reveal"
                        >

                            <span
                                class="value-name"
                            >
                                ${item.name}
                            </span>

                            <span
                                class="value-arrow"
                            >
                                ↗
                            </span>

                        </a>

                    `
                )
                .join('');

    }

}


/* ==================================================
   STATEMENT
================================================== */

function renderStatement(
    section
) {

    if (
        !section
    ) {

        return;

    }


    const element =
        document.querySelector(
            '.statement-text'
        );


    if (
        !element
    ) {

        return;

    }


    element.innerHTML = `

        ${section.textBefore}

        <br>

        ${section.textAfter}

        <span
            class="statement-highlight"
        >
            ${section.highlight}
        </span>

    `;

}


/* ==================================================
   GALLERY
================================================== */

function renderGallery(
    section
) {

    if (
        !section
        ||
        !Array.isArray(
            section.items
        )
    ) {

        return;

    }


    const sets =
        document.querySelectorAll(
            '.about-gallery-set'
        );


    if (
        !sets.length
    ) {

        return;

    }


    sets.forEach(
        (
            set,
            setIndex
        ) => {

            set.innerHTML =
                section.items
                    .map(
                        (
                            filename
                        ) => `

                            <div
                                class="gallery-image"
                            >

                                <img
                                    data-gallery-file="${filename}"
                                    alt="${
                                        setIndex === 0
                                            ? 'Auren Originals'
                                            : ''
                                    }"
                                    ${
                                        setIndex !== 0
                                            ? 'aria-hidden="true"'
                                            : ''
                                    }
                                >

                            </div>

                        `
                    )
                    .join('');

        }
    );

}


/* ==================================================
   CTA
================================================== */

function renderCta(
    section
) {

    if (
        !section
    ) {

        return;

    }


    const title =
        document.querySelector(
            '.about-cta h2'
        );


    if (
        title
    ) {

        title.innerHTML = `

            ${section.title}

            <span
                class="cta-line-highlight"
            >
                ${section.highlight}
            </span>

        `;

    }

}


/* ==================================================
   LOAD ROOT ASSET
================================================== */

async function loadRootAsset(
    filename,
    image
) {

    try {

        const response =
            await fetch(
                `/api/root-asset/${encodeURIComponent(filename)}`,
                {
                    cache:
                        'no-store'
                }
            );


        if (
            !response.ok
        ) {

            throw new Error(
                `Failed to load ${filename}: HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        if (
            !data
            ||
            !data.secure_url
        ) {

            throw new Error(
                `No secure URL returned for ${filename}`
            );

        }


        image.src =
            data.secure_url;

    }

    catch (error) {

        console.error(
            `Root asset loading error (${filename}):`,
            error
        );

    }

}


/* ==================================================
   LOAD FOUNDER IMAGES
================================================== */

async function loadFounderImages() {

    const images =
        document.querySelectorAll(
            '.founder-image img[data-founder-file]'
        );


    for (
        const image
        of images
    ) {

        const filename =
            image.dataset.founderFile;


        if (
            !filename
        ) {

            continue;

        }


        await loadRootAsset(
            filename,
            image
        );

    }

}


/* ==================================================
   LOAD GALLERY IMAGES
   EACH FILENAME IS REQUESTED ONCE
================================================== */

async function loadAboutGalleryImages() {

    const images =
        document.querySelectorAll(
            '.about-gallery-track img[data-gallery-file]'
        );


    if (
        !images.length
    ) {

        return;

    }


    const cache =
        new Map();


    for (
        const image
        of images
    ) {

        const filename =
            image.dataset.galleryFile;


        if (
            !filename
        ) {

            continue;

        }


        try {

            let imageUrl =
                cache.get(
                    filename
                );


            if (
                !imageUrl
            ) {

                const response =
                    await fetch(
                        `/api/root-asset/${encodeURIComponent(filename)}`,
                        {
                            cache:
                                'no-store'
                        }
                    );


                if (
                    !response.ok
                ) {

                    throw new Error(
                        `Failed to load ${filename}: HTTP ${response.status}`
                    );

                }


                const data =
                    await response.json();


                if (
                    !data
                    ||
                    !data.secure_url
                ) {

                    throw new Error(
                        `No secure URL returned for ${filename}`
                    );

                }


                imageUrl =
                    data.secure_url;


                cache.set(
                    filename,
                    imageUrl
                );

            }


            image.src =
                imageUrl;

        }

        catch (error) {

            console.error(
                `Gallery image error (${filename}):`,
                error
            );

        }

    }

}


/* ==================================================
   SCROLL TO TOP
================================================== */

function initializeScrollToTop() {

    const button =
        document.querySelector(
            '#scroll-to-top'
        );


    if (
        !button
    ) {

        return;

    }


    function updateButton() {

        button.classList.toggle(
            'show',
            window.scrollY > 500
        );

    }


    window.addEventListener(
        'scroll',
        updateButton,
        {
            passive:
                true
        }
    );


    button.addEventListener(
        'click',
        () => {

            window.scrollTo({

                top:
                    0,

                behavior:
                    'smooth'

            });

        }
    );


    updateButton();

}



/* ==================================================
   GSAP
================================================== */

function initializeGsap() {

    if (
        typeof gsap ===
            'undefined'
        ||
        typeof ScrollTrigger ===
            'undefined'
    ) {

        console.warn(
            'GSAP or ScrollTrigger is unavailable.'
        );

        initializeFallbackReveal();


        return;

    }


    gsap.registerPlugin(
        ScrollTrigger
    );


    /* ==================================================
       HERO REVEAL
    ================================================== */

    gsap.to(

        '.about-hero .reveal',

        {

            y:
                0,

            opacity:
                1,

            duration:
                0.9,

            stagger:
                0.08,

            ease:
                'power3.out'

        }

    );


    /* ==================================================
       GENERAL REVEALS
    ================================================== */

    gsap.utils
        .toArray(
            '.reveal'
        )
        .forEach(
            element => {

                if (
                    element.closest(
                        '.about-hero'
                    )
                ) {

                    return;

                }


                gsap.to(

                    element,

                    {

                        y:
                            0,

                        opacity:
                            1,

                        duration:
                            0.75,

                        ease:
                            'power3.out',

                        scrollTrigger: {

                            trigger:
                                element,

                            start:
                                'top 90%',

                            once:
                                true

                        }

                    }

                );

            }
        );


    /* ==================================================
       FOUNDER CARDS
    ================================================== */

    gsap.utils
        .toArray(
            '.founder-card'
        )
        .forEach(
            (
                card,
                index
            ) => {

                gsap.fromTo(

                    card,

                    {

                        y:
                            28,

                        opacity:
                            0

                    },

                    {

                        y:
                            0,

                        opacity:
                            1,

                        duration:
                            0.75,

                        delay:
                            index * 0.08,

                        ease:
                            'power3.out',

                        scrollTrigger: {

                            trigger:
                                card,

                            start:
                                'top 88%',

                            once:
                                true

                        }

                    }

                );

            }
        );


    /* ==================================================
       FOUNDER IMAGES
    ================================================== */

    gsap.utils
        .toArray(
            '.founder-image img'
        )
        .forEach(
            image => {

                gsap.fromTo(

                    image,

                    {

                        scale:
                            1.045

                    },

                    {

                        scale:
                            1,

                        duration:
                            1,

                        ease:
                            'power3.out',

                        scrollTrigger: {

                            trigger:
                                image,

                            start:
                                'top 90%',

                            once:
                                true

                        }

                    }

                );

            }
        );


    /* ==================================================
       FOUNDER DETAILS
    ================================================== */

    gsap.utils
        .toArray(
            '.founder-card'
        )
        .forEach(
            card => {

                gsap.fromTo(

                    card.querySelectorAll(
                        '.founder-info > *'
                    ),

                    {

                        y:
                            12,

                        opacity:
                            0

                    },

                    {

                        y:
                            0,

                        opacity:
                            1,

                        duration:
                            0.50,

                        stagger:
                            0.06,

                        ease:
                            'power3.out',

                        scrollTrigger: {

                            trigger:
                                card,

                            start:
                                'top 82%',

                            once:
                                true

                        }

                    }

                );

            }
        );


    /* ==================================================
       PURPOSE CARDS
    ================================================== */

    gsap.fromTo(

        '.purpose-card',

        {

            y:
                20,

            opacity:
                0

        },

        {

            y:
                0,

            opacity:
                1,

            duration:
                0.60,

            stagger:
                0.08,

            ease:
                'power3.out',

            scrollTrigger: {

                trigger:
                    '.purpose-grid',

                start:
                    'top 90%',

                once:
                    true

            }

        }

    );

}


/* ==================================================
   FALLBACK REVEAL
================================================== */

function initializeFallbackReveal() {

    const elements =
        document.querySelectorAll(
            '.reveal'
        );


    elements.forEach(
        element => {

            element.style.opacity =
                '1';

            element.style.transform =
                'none';

        }
    );

}


/* ==================================================
   REDUCED MOTION
================================================== */

function prefersReducedMotion() {

    return window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

}


/* ==================================================
   INITIALIZE ABOUT PAGE
================================================== */

async function initializeAboutPage() {

    await loadAboutContent();


    await Promise.all([
        loadFounderImages(),
        loadAboutGalleryImages()
    ]);


    if (
        prefersReducedMotion()
    ) {

        initializeFallbackReveal();

    }

    else {

        initializeGsap();

    }


    console.log(
        'About page initialized.'
    );

}


/* ==================================================
   START
================================================== */

initializeSite()
    .then(
        initializeAboutPage
    )
    .catch(
        error => {

            console.error(
                'About initialization failed:',
                error
            );

        }
    );