/* ==================================================
   AUREN ORIGINALS
   SERVICES PAGE JAVASCRIPT
================================================== */


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
                                'site-config.js loaded, but AurenSite API was not found.'
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


/* ==================================================
   LOAD HERO ACTION BUTTONS
================================================== */

const heroActionsLoaded =
    loadComponent(
        'components/action-buttons.html',
        'hero-action-buttons'
    );


/* ==================================================
   LOAD FINAL CTA BUTTONS
================================================== */

const finalCtaButtonsLoaded =
    loadComponent(
        'components/cta-buttons.html',
        'final-cta-buttons'
    );


/* ==================================================
   SITE INITIALIZATION
================================================== */

async function initializeSite() {

    try {

        const [
            navbarReady,
            footerReady,
            scrollTopReady,
            heroActionsReady,
            finalCtaButtonsReady
        ] =
            await Promise.all([
                navbarLoaded,
                footerLoaded,
                scrollTopLoaded,
                heroActionsLoaded,
                finalCtaButtonsLoaded
            ]);


        if (
            !navbarReady
            ||
            !footerReady
            ||
            !scrollTopReady
            ||
            !heroActionsReady
            ||
            !finalCtaButtonsReady
        ) {

            throw new Error(
                'One or more Services components failed to load.'
            );

        }


        await loadSiteConfigScript();


        await window.AurenSite.initialize();


        initializeServicesNavigation();


        initializeScrollToTop();


        console.log(
            'Services page site initialized.'
        );

    }

    catch (error) {

        console.error(
            'Services page site initialization error:',
            error
        );

    }

}


/* ==================================================
   ACTIVE SERVICES NAVIGATION
================================================== */

function initializeServicesNavigation() {

    document
        .querySelectorAll(
            '.nav-links a[data-page="services"], .mobile-nav-links a[data-page="services"]'
        )
        .forEach(
            link => {

                link.classList.add(
                    'active'
                );

            }
        );

}


/* ==================================================
   LOAD SERVICES DATA
================================================== */

async function loadServiceContent() {

    try {

        const response =
            await fetch(
                '/data/service.json',
                {
                    cache:
                        'no-store'
                }
            );


        if (!response.ok) {

            throw new Error(
                `Services content request failed: HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        if (
            !data
            ||
            typeof data !== 'object'
        ) {

            throw new Error(
                'Invalid Services page configuration.'
            );

        }


        renderHero(
            data.hero
        );


        renderPhilosophy(
            data.philosophy
        );


        renderServices(
            data.services
        );


        renderIndustries(
            data.industries
        );


        renderProcess(
            data.process
        );


        renderWhyUs(
            data.whyUs
        );


        renderTestimonial(
            data.testimonial
        );


        renderTransition(
            data.transition
        );


        renderFinalCta(
            data.finalCta
        );


        console.log(
            'Services content loaded.'
        );

    }

    catch (error) {

        console.error(
            'Services content loading error:',
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
            '.services-hero .section-label'
        );


    const title =
        document.querySelector(
            '.services-hero h1'
        );


    const description =
        document.querySelector(
            '.services-hero-copy'
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

            <br>

            ${hero.titleMiddle}

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
   PHILOSOPHY
================================================== */

function renderPhilosophy(
    philosophy
) {

    if (
        !philosophy
    ) {

        return;

    }


    const label =
        document.querySelector(
            '.philosophy-section .section-label'
        );


    const lineOne =
        document.querySelector(
            '.philosophy-line-one'
        );


    const lineTwo =
        document.querySelector(
            '.philosophy-line-two'
        );


    if (
        label
    ) {

        label.textContent =
            philosophy.label;

    }


    if (
        lineOne
    ) {

        lineOne.textContent =
            philosophy.lineOne;

    }


    if (
        lineTwo
    ) {

        lineTwo.textContent =
            philosophy.lineTwo;

    }

}


/* ==================================================
   SERVICES
================================================== */

function renderServices(
    services
) {

    if (
        !services
        ||
        !Array.isArray(
            services.items
        )
    ) {

        return;

    }


    const label =
        document.querySelector(
            '.services-header .section-label'
        );


    const title =
        document.querySelector(
            '.services-header h2'
        );


    const container =
        document.getElementById(
            'services-list'
        );


    if (
        label
    ) {

        label.textContent =
            services.label;

    }


    if (
        title
    ) {

        title.textContent =
            services.title;

    }


    if (
        !container
    ) {

        return;

    }


    container.innerHTML =
        services.items
            .map(
                (
                    service,
                    index
                ) => `

                    <article
                        class="service-block ${index % 2 === 1 ? 'reverse' : ''} reveal"
                    >

                        <div
                            class="service-content"
                        >

                            <span
                                class="service-number"
                            >
                                ${service.number}
                            </span>


                            <h3
                                class="service-title"
                            >
                                ${service.title}
                            </h3>


                            <p
                                class="service-description"
                            >
                                ${service.description}
                            </p>

                        </div>


                        <div
                            class="service-image"
                        >

                            <img
                                id="service-image-${index + 1}"
                                src=""
                                alt="${service.alt}"
                                loading="lazy"
                                data-service-file="${service.image}"
                            >

                        </div>

                    </article>

                `
            )
            .join('');

}


/* ==================================================
   INDUSTRIES
================================================== */

function renderIndustries(
    industries
) {

    if (
        !industries
        ||
        !Array.isArray(
            industries.items
        )
    ) {

        return;

    }


    const label =
        document.querySelector(
            '.industries-header .section-label'
        );


    const title =
        document.querySelector(
            '.industries-header h2'
        );


    const grid =
        document.getElementById(
            'industry-grid'
        );


    if (
        label
    ) {

        label.textContent =
            industries.label;

    }


    if (
        title
    ) {

        title.textContent =
            industries.title;

    }


    if (
        !grid
    ) {

        return;

    }


    grid.innerHTML =
        industries.items
            .map(
                industry => `

                    <article
                        class="industry-card reveal"
                    >

                        <img
                            class="industry-image"
                            src=""
                            alt="${industry.alt}"
                            loading="lazy"
                            data-industry-file="${industry.image}"
                        >


                        <div
                            class="industry-overlay"
                        ></div>


                        <div
                            class="industry-content"
                        >

                            <span
                                class="industry-number"
                            >
                                ${industry.number}
                            </span>


                            <h3
                                class="industry-name"
                            >
                                ${industry.name}
                            </h3>


                            <span
                                class="industry-tag"
                            >
                                ${industry.tag}
                            </span>


                            <p
                                class="industry-description"
                            >
                                ${industry.description}
                            </p>

                        </div>

                    </article>

                `
            )
            .join('');

}


/* ==================================================
   PROCESS
================================================== */

function renderProcess(
    process
) {

    if (
        !process
        ||
        !Array.isArray(
            process.items
        )
    ) {

        return;

    }


    const label =
        document.querySelector(
            '.process-header .section-label'
        );


    const title =
        document.querySelector(
            '.process-header h2'
        );


    const list =
        document.getElementById(
            'process-list'
        );


    if (
        label
    ) {

        label.textContent =
            process.label;

    }


    if (
        title
    ) {

        title.textContent =
            process.title;

    }


    if (
        !list
    ) {

        return;

    }


    list.innerHTML =
        process.items
            .map(
                item => `

                    <div
                        class="process-item process-card reveal"
                    >

                        <span
                            class="process-number"
                        >
                            ${item.number}
                        </span>


                        <h3
                            class="process-name"
                        >
                            ${item.name}
                        </h3>


                        <p
                            class="process-description"
                        >
                            ${item.description}
                        </p>

                    </div>

                `
            )
            .join('');

}


/* ==================================================
   WHY US
================================================== */

function renderWhyUs(
    whyUs
) {

    if (
        !whyUs
        ||
        !Array.isArray(
            whyUs.items
        )
    ) {

        return;

    }


    const label =
        document.querySelector(
            '.why-header .section-label'
        );


    const title =
        document.querySelector(
            '.why-header h2'
        );


    const grid =
        document.getElementById(
            'why-grid'
        );


    if (
        label
    ) {

        label.textContent =
            whyUs.label;

    }


    if (
        title
    ) {

        title.textContent =
            whyUs.title;

    }


    if (
        !grid
    ) {

        return;

    }


    grid.innerHTML =
        whyUs.items
            .map(
                item => `

                    <div
                        class="why-card reveal"
                    >

                        <span
                            class="why-number"
                        >
                            ${item.number}
                        </span>


                        <h3>
                            ${item.title}
                        </h3>


                        <p>
                            ${item.description}
                        </p>

                    </div>

                `
            )
            .join('');

}


/* ==================================================
   TESTIMONIAL
================================================== */

function renderTestimonial(
    testimonial
) {

    if (
        !testimonial
    ) {

        return;

    }


    const element =
        document.querySelector(
            '.testimonial-quote'
        );


    if (
        element
    ) {

        element.innerHTML = `

            <span>
                "
            </span>

            ${testimonial.quote}

            <span>
                "
            </span>

        `;

    }

}


/* ==================================================
   TRANSITION
================================================== */

function renderTransition(
    transition
) {

    if (
        !transition
    ) {

        return;

    }


    const label =
        document.querySelector(
            '.cta-transition-label'
        );


    const image =
        document.querySelector(
            '.cta-transition-image'
        );


    if (
        label
    ) {

        label.textContent =
            transition.label;

    }


    if (
        image
    ) {

        image.dataset.rootFile =
            transition.image;

        image.alt =
            transition.alt;

    }

}


/* ==================================================
   FINAL CTA
================================================== */

function renderFinalCta(
    cta
) {

    if (
        !cta
    ) {

        return;

    }


    const title =
        document.querySelector(
            '.final-cta h2'
        );


    const description =
        document.querySelector(
            '.final-cta-copy'
        );


    if (
        title
    ) {

        title.innerHTML = `

            ${cta.title}

            <span
                class="cta-highlight"
            >
                ${cta.highlight}
            </span>

        `;

    }


    if (
        description
    ) {

        description.textContent =
            cta.description;

    }

}


/* ==================================================
   ROOT ASSET LOADER
================================================== */

async function loadRootAsset(
    filename
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


        if (!response.ok) {

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


        return data.secure_url;

    }

    catch (error) {

        console.error(
            `Root asset loading error (${filename}):`,
            error
        );


        return '';

    }

}


/* ==================================================
   LOAD SERVICE IMAGES
================================================== */

async function loadServiceImages() {

    const images =
        document.querySelectorAll(
            '[data-service-file]'
        );


    for (
        const image
        of images
    ) {

        const filename =
            image.dataset.serviceFile;


        if (
            !filename
        ) {

            continue;

        }


        image.src =
            await loadRootAsset(
                filename
            );

    }

}


/* ==================================================
   LOAD INDUSTRY IMAGES
================================================== */

async function loadIndustryImages() {

    const images =
        document.querySelectorAll(
            '[data-industry-file]'
        );


    for (
        const image
        of images
    ) {

        const filename =
            image.dataset.industryFile;


        if (
            !filename
        ) {

            continue;

        }


        image.src =
            await loadRootAsset(
                filename
            );

    }

}


/* ==================================================
   LOAD TRANSITION IMAGE
================================================== */

async function loadTransitionImage() {

    const image =
        document.querySelector(
            '.cta-transition-image'
        );


    if (
        !image
        ||
        !image.dataset.rootFile
    ) {

        return;

    }


    image.src =
        await loadRootAsset(
            image.dataset.rootFile
        );

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
   MOBILE PROCESS INTERACTION
================================================== */

function initializeProcessAccordion() {

    const processItems =
        document.querySelectorAll(
            '.process-card'
        );


    if (
        !processItems.length
    ) {

        return;

    }


    processItems.forEach(
        item => {

            item.addEventListener(
                'click',
                () => {

                    if (
                        window.innerWidth >
                        700
                    ) {

                        return;

                    }


                    const wasOpen =
                        item.classList.contains(
                            'is-open'
                        );


                    processItems.forEach(
                        other => {

                            other.classList.remove(
                                'is-open'
                            );

                        }
                    );


                    if (
                        !wasOpen
                    ) {

                        item.classList.add(
                            'is-open'
                        );

                    }

                }
            );

        }
    );

}


/* ==================================================
   FALLBACK REVEAL
================================================== */

function initializeFallbackReveal() {

    document
        .querySelectorAll(
            '.reveal'
        )
        .forEach(
            element => {

                element.style.opacity =
                    '1';

                element.style.transform =
                    'none';

            }
        );

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


    gsap.to(
        '.services-hero .reveal',
        {

            y:
                0,

            opacity:
                1,

            duration:
                0.85,

            stagger:
                0.08,

            ease:
                'power3.out'

        }
    );


    gsap.utils
        .toArray(
            '.reveal'
        )
        .forEach(
            element => {

                if (
                    element.closest(
                        '.services-hero'
                    )
                ) {

                    return;

                }


                if (
                    element.classList.contains(
                        'cta-transition'
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


    gsap.utils
        .toArray(
            '.service-image'
        )
        .forEach(
            element => {

                gsap.fromTo(
                    element,
                    {

                        y:
                            25,

                        opacity:
                            0,

                        scale:
                            0.985

                    },
                    {

                        y:
                            0,

                        opacity:
                            1,

                        scale:
                            1,

                        duration:
                            0.8,

                        ease:
                            'power3.out',

                        scrollTrigger: {

                            trigger:
                                element,

                            start:
                                'top 92%',

                            once:
                                true

                        }

                    }
                );

            }
        );


    gsap.utils
        .toArray(
            '.industry-card'
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
                            20,

                        opacity:
                            0,

                        scale:
                            0.99

                    },
                    {

                        y:
                            0,

                        opacity:
                            1,

                        scale:
                            1,

                        duration:
                            0.6,

                        delay:
                            (
                                index % 4
                            ) * 0.04,

                        ease:
                            'power3.out',

                        scrollTrigger: {

                            trigger:
                                card,

                            start:
                                'top 92%',

                            once:
                                true

                        }

                    }
                );

            }
        );


    gsap.fromTo(
        '.process-item',
        {

            y:
                18,

            opacity:
                0

        },
        {

            y:
                0,

            opacity:
                1,

            duration:
                0.55,

            stagger:
                0.06,

            ease:
                'power3.out',

            scrollTrigger: {

                trigger:
                    '.process-list',

                start:
                    'top 90%',

                once:
                    true

            }

        }
    );


    gsap.fromTo(
        '.why-card',
        {

            y:
                18,

            opacity:
                0

        },
        {

            y:
                0,

            opacity:
                1,

            duration:
                0.55,

            stagger:
                0.07,

            ease:
                'power3.out',

            scrollTrigger: {

                trigger:
                    '.why-grid',

                start:
                    'top 90%',

                once:
                    true

            }

        }
    );


    gsap.fromTo(
        '.cta-transition',
        {

            opacity:
                0

        },
        {

            opacity:
                1,

            duration:
                0.9,

            ease:
                'power2.out',

            scrollTrigger: {

                trigger:
                    '.cta-transition',

                start:
                    'top 95%',

                once:
                    true

            }

        }
    );


    gsap.fromTo(
        '.cta-transition-image',
        {

            scale:
                1.08

        },
        {

            scale:
                1,

            duration:
                1.3,

            ease:
                'power3.out',

            scrollTrigger: {

                trigger:
                    '.cta-transition',

                start:
                    'top 95%',

                once:
                    true

            }

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
   INITIALIZE SERVICES PAGE
================================================== */

async function initializeServicePage() {

    await loadServiceContent();


    await Promise.all([
        loadServiceImages(),
        loadIndustryImages(),
        loadTransitionImage()
    ]);


    initializeProcessAccordion();


    if (
        prefersReducedMotion()
    ) {

        initializeFallbackReveal();

    }

    else {

        initializeGsap();

    }


    console.log(
        'Services page initialized.'
    );

}


/* ==================================================
   START
================================================== */

initializeSite()
    .then(
        initializeServicePage
    )
    .catch(
        error => {

            console.error(
                'Services initialization failed:',
                error
            );

        }
    );