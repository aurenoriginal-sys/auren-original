/* ==================================================
   AUREN ORIGINALS
   PORTFOLIO PAGE JAVASCRIPT
================================================== */


/* ==================================================
   PORTFOLIO RETURN STATE
================================================== */

const PORTFOLIO_RETURN_STATE_KEY =
    'aurenPortfolioReturnState';


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
                '/js/site-config.js?v=2';


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
   INITIALIZE SITE
================================================== */

async function initializeSite() {

    try {

        const [
            navbarReady,
            footerReady
        ] =
            await Promise.all([
                navbarLoaded,
                footerLoaded
            ]);


        if (
            !navbarReady
            ||
            !footerReady
        ) {

            throw new Error(
                'Navbar or footer failed to load.'
            );

        }


        await loadSiteConfigScript();


        await window.AurenSite.initialize();


        initializePortfolioNavigation();


        console.log(
            'Portfolio site initialized.'
        );

    }

    catch (error) {

        console.error(
            'Portfolio site initialization error:',
            error
        );

    }

}


/* ==================================================
   ACTIVE WORK NAVIGATION
================================================== */

function initializePortfolioNavigation() {

    document
        .querySelectorAll(
            '.nav-links a[data-page="work"], .mobile-nav-links a[data-page="work"]'
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
            `Portfolio asset loading error (${filename}):`,
            error
        );


        return '';

    }

}


/* ==================================================
   LOAD PORTFOLIO DATA
================================================== */

async function loadPortfolioContent() {

    try {

        const response =
            await fetch(
                '/data/portfolio.json',
                {
                    cache:
                        'no-store'
                }
            );


        if (!response.ok) {

            throw new Error(
                `Portfolio content request failed: HTTP ${response.status}`
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
                'Invalid Portfolio configuration.'
            );

        }


        renderHero(
            data.hero
        );


        renderCategories(
            data.categories
        );


        renderProjects(
            data.projects
        );


        window.portfolioDefaultCategory =
            data.defaultCategory
            ||
            'wedding';


        await loadProjectImages();


        console.log(
            'Portfolio content loaded.'
        );

    }

    catch (error) {

        console.error(
            'Portfolio content loading error:',
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
            '.portfolio-label'
        );


    const title =
        document.querySelector(
            '.portfolio-title'
        );


    const description =
        document.querySelector(
            '.portfolio-description'
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
   CATEGORIES
================================================== */

function renderCategories(
    categories
) {

    const container =
        document.getElementById(
            'category-container'
        );


    if (
        !container
        ||
        !Array.isArray(
            categories
        )
    ) {

        return;

    }


    container.innerHTML =
        categories
            .map(
                category => `

                    <button
                        type="button"
                        class="category-btn"
                        data-category="${category.value}"
                    >
                        ${category.label}
                    </button>

                `
            )
            .join('');

}


/* ==================================================
   PROJECTS
================================================== */

function renderProjects(
    projects
) {

    const container =
        document.getElementById(
            'portfolio-projects'
        );


    if (
        !container
        ||
        !Array.isArray(
            projects
        )
    ) {

        return;

    }


    container.innerHTML =
        projects
            .map(
                (
                    project,
                    index
                ) => `

                    <a
                        href="${project.href}"
                        class="project-card"
                        data-category="${project.category}"
                    >

                        <div
                            class="project-image-wrapper"
                        >

                            <img
                                id="portfolio-image-${index + 1}"
                                src=""
                                alt="${project.alt}"
                                loading="lazy"
                                data-portfolio-file="${project.image}"
                            >

                        </div>


                        <div
                            class="project-info"
                        >

                            <h3>
                                ${project.title}
                            </h3>

                            ${
                                project.categoryLabel
                                    ? `
                                        <p
                                            class="project-category"
                                        >
                                            ${project.categoryLabel}
                                        </p>
                                      `
                                    : ''
                            }

                        </div>

                    </a>

                `
            )
            .join('');

}


/* ==================================================
   LOAD PROJECT IMAGES
================================================== */

async function loadProjectImages() {

    const images =
        document.querySelectorAll(
            '[data-portfolio-file]'
        );


    for (
        const image
        of images
    ) {

        const filename =
            image.dataset.portfolioFile;


        if (
            !filename
        ) {

            continue;

        }


        const url =
            await loadRootAsset(
                filename
            );


        if (
            url
        ) {

            image.src =
                url;

        }

    }

}


/* ==================================================
   CATEGORY FROM URL
================================================== */

function getCategoryFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return params.get(
        'category-2'
    );

}


/* ==================================================
   CHECK RETURN STATE
================================================== */

function hasPortfolioReturnState() {

    return Boolean(
        sessionStorage.getItem(
            PORTFOLIO_RETURN_STATE_KEY
        )
    );

}


/* ==================================================
   SAVE PORTFOLIO RETURN STATE
================================================== */

function savePortfolioReturnState() {

    try {

        const category =
            getCategoryFromURL()
            ||
            document
                .querySelector(
                    '.category-btn.active'
                )
                ?.dataset.category
            ||
            window.portfolioDefaultCategory
            ||
            'wedding';


        const state = {

            scrollY:
                window.scrollY,

            category:
                category

        };


        sessionStorage.setItem(
            PORTFOLIO_RETURN_STATE_KEY,
            JSON.stringify(
                state
            )
        );

    }

    catch (error) {

        console.warn(
            'Could not save Portfolio return state:',
            error
        );

    }

}


/* ==================================================
   RESTORE PORTFOLIO RETURN STATE
================================================== */

function restorePortfolioReturnState() {

    try {

        const saved =
            sessionStorage.getItem(
                PORTFOLIO_RETURN_STATE_KEY
            );


        if (
            !saved
        ) {

            return false;

        }


        const state =
            JSON.parse(
                saved
            );


        sessionStorage.removeItem(
            PORTFOLIO_RETURN_STATE_KEY
        );


        const category =
            state.category
            ||
            window.portfolioDefaultCategory
            ||
            'wedding';


        /*
         * Restore filtering WITHOUT animation.
         */

        filterProjects(
            category,
            false
        );


        const scrollY =
            Number(
                state.scrollY
            );


        if (
            Number.isFinite(
                scrollY
            )
        ) {

            requestAnimationFrame(
                () => {

                    requestAnimationFrame(
                        () => {

                            window.scrollTo(
                                {
                                    top:
                                        scrollY,

                                    left:
                                        0,

                                    behavior:
                                        'auto'

                                }
                            );

                        }
                    );

                }
            );

        }


        return true;

    }

    catch (error) {

        console.warn(
            'Could not restore Portfolio return state:',
            error
        );


        sessionStorage.removeItem(
            PORTFOLIO_RETURN_STATE_KEY
        );


        return false;

    }

}


/* ==================================================
   PROJECT NAVIGATION
================================================== */

function initializeProjectNavigation() {

    document
        .querySelectorAll(
            '.project-card'
        )
        .forEach(
            card => {

                card.addEventListener(
                    'click',
                    () => {

                        savePortfolioReturnState();

                    }
                );

            }
        );

}


/* ==================================================
   FILTER PROJECTS
================================================== */

function filterProjects(
    category,
    animate = true
) {

    const categoryButtons =
        document.querySelectorAll(
            '.category-btn'
        );


    const projectCards =
        document.querySelectorAll(
            '.project-card'
        );


    categoryButtons.forEach(
        button => {

            button.classList.toggle(
                'active',
                button.dataset.category ===
                    category
            );

        }
    );


    const visibleCards = [];


    projectCards.forEach(
        card => {

            const matches =
                card.dataset.category ===
                category;


            if (
                matches
            ) {

                card.classList.remove(
                    'hidden'
                );

                visibleCards.push(
                    card
                );

            }

            else {

                card.classList.add(
                    'hidden'
                );

            }

        }
    );


    /*
     * Returning from a gallery:
     * do not replay the project-card animation.
     */

    if (
        !animate
    ) {

        visibleCards.forEach(
            card => {

                card.style.opacity =
                    '1';

                card.style.transform =
                    'none';

            }
        );


        if (
            typeof ScrollTrigger !==
            'undefined'
        ) {

            ScrollTrigger.refresh();

        }


        return;

    }


    if (
        typeof gsap !==
            'undefined'
    ) {

        gsap.killTweensOf(
            visibleCards
        );


        gsap.fromTo(
            visibleCards,
            {

                y:
                    22,

                opacity:
                    0

            },
            {

                y:
                    0,

                opacity:
                    1,

                duration:
                    0.65,

                stagger:
                    0.12,

                ease:
                    'power2.out',

                overwrite:
                    true

            }
        );

    }


    if (
        typeof ScrollTrigger !==
            'undefined'
    ) {

        ScrollTrigger.refresh();

    }

}


/* ==================================================
   CATEGORY BUTTONS
================================================== */

function initializeCategoryButtons() {

    document
        .querySelectorAll(
            '.category-btn'
        )
        .forEach(
            button => {

                button.addEventListener(
                    'click',
                    () => {

                        const category =
                            button.dataset.category;


                        const url =
                            new URL(
                                window.location.href
                            );


                        url.searchParams.set(
                            'category-2',
                            category
                        );


                        window.history.pushState(
                            {},
                            '',
                            url
                        );


                        filterProjects(
                            category,
                            true
                        );

                    }
                );

            }
        );

}


/* ==================================================
   BROWSER BACK / FORWARD
================================================== */

function initializeHistoryNavigation() {

    window.addEventListener(
        'popstate',
        () => {

            filterProjects(
                getCategoryFromURL()
                ||
                window.portfolioDefaultCategory
                ||
                'wedding',
                true
            );

        }
    );

}


/* ==================================================
   PROJECT HOVER
================================================== */

function initializeProjectHover() {

    document
        .querySelectorAll(
            '.project-card'
        )
        .forEach(
            card => {

                card.addEventListener(
                    'mouseenter',
                    () => {

                        if (
                            card.classList.contains(
                                'hidden'
                            )
                        ) {

                            return;

                        }


                        if (
                            typeof gsap ===
                                'undefined'
                        ) {

                            return;

                        }


                        gsap.to(
                            card,
                            {

                                y:
                                    -2,

                                duration:
                                    0.25,

                                ease:
                                    'power2.out'

                            }
                        );

                    }
                );


                card.addEventListener(
                    'mouseleave',
                    () => {

                        if (
                            typeof gsap ===
                                'undefined'
                        ) {

                            return;

                        }


                        gsap.to(
                            card,
                            {

                                y:
                                    0,

                                duration:
                                    0.25,

                                ease:
                                    'power2.out'

                            }
                        );

                    }
                );

            }
        );

}


/* ==================================================
   INTRO ANIMATION
================================================== */

function initializeIntroAnimation() {

    if (
        typeof gsap ===
            'undefined'
    ) {

        return;

    }


    const timeline =
        gsap.timeline({

            defaults: {

                ease:
                    'power3.out'

            }

        });


    timeline
        .from(
            '.portfolio-label',
            {

                y:
                    15,

                opacity:
                    0,

                duration:
                    0.55

            }
        )
        .from(
            '.portfolio-title',
            {

                y:
                    30,

                opacity:
                    0,

                duration:
                    0.8

            },
            '-=0.2'
        )
        .from(
            '.portfolio-description',
            {

                y:
                    15,

                opacity:
                    0,

                duration:
                    0.6

            },
            '-=0.35'
        )
        .from(
            '.category-btn',
            {

                y:
                    10,

                opacity:
                    0,

                duration:
                    0.45,

                stagger:
                    0.05

            },
            '-=0.25'
        );

}


/* ==================================================
   FOOTER REVEAL
================================================== */

function initializeFooterReveal() {

    if (
        typeof gsap ===
            'undefined'
        ||
        typeof ScrollTrigger ===
            'undefined'
    ) {

        return;

    }


    gsap.fromTo(
        '#footer-container',
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
                0.8,

            ease:
                'power3.out',

            scrollTrigger: {

                trigger:
                    '#footer-container',

                start:
                    'top 94%'

            }

        }
    );

}


/* ==================================================
   FALLBACK FOR REDUCED MOTION
================================================== */

function initializeReducedMotion() {

    if (
        !window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches
    ) {

        return false;

    }


    document
        .querySelectorAll(
            '.portfolio-label, .portfolio-title, .portfolio-description, .category-btn'
        )
        .forEach(
            element => {

                element.style.opacity =
                    '1';

                element.style.transform =
                    'none';

            }
        );


    return true;

}


/* ==================================================
   INITIALIZE PORTFOLIO
================================================== */

async function initializePortfolioPage() {

    await loadPortfolioContent();


    initializeCategoryButtons();


    initializeHistoryNavigation();


    initializeProjectHover();


    initializeProjectNavigation();


    const restoringReturnState =
        hasPortfolioReturnState();


    const reducedMotion =
        initializeReducedMotion();


    /*
     * IMPORTANT:
     * Do not replay Portfolio animations when
     * returning from a gallery.
     */

    if (
        !restoringReturnState
        &&
        !reducedMotion
    ) {

        initializeIntroAnimation();


        initializeFooterReveal();

    }


    if (
        restoringReturnState
    ) {

        restorePortfolioReturnState();

    }

    else {

        filterProjects(
            getCategoryFromURL()
            ||
            window.portfolioDefaultCategory
            ||
            'wedding',
            true
        );

    }


    console.log(
        'Portfolio page initialized.'
    );

}


/* ==================================================
   START
================================================== */

initializeSite()
    .then(
        initializePortfolioPage
    )
    .catch(
        error => {

            console.error(
                'Portfolio initialization failed:',
                error
            );

        }
    );