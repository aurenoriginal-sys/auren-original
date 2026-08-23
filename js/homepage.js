/* ==================================================
   AUREN ORIGINALS
   HOMEPAGE JAVASCRIPT
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
                url
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
   LOAD SITE LOGO ONCE
   APPLY TO NAVBAR + FOOTER
================================================== */

async function loadSharedSiteLogo() {

    try {

        await Promise.all([
            navbarLoaded,
            footerLoaded
        ]);


        const response =
            await fetch(
                '/api/site-logo'
            );


        if (!response.ok) {

            throw new Error(
                `Site logo API returned HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        if (
            !data ||
            !data.secure_url
        ) {

            throw new Error(
                'Site logo URL was not returned.'
            );

        }


        /* ==================================================
           NAVBAR LOGO
        ================================================== */

        const navbarLogo =
            document.getElementById(
                'site-logo-navbar'
            );


        if (
            navbarLogo
        ) {

            navbarLogo.src =
                data.secure_url;

        }


        /* ==================================================
           FOOTER LOGO
        ================================================== */

        const footerLogo =
            document.getElementById(
                'site-logo-footer'
            );


        if (
            footerLogo
        ) {

            footerLogo.src =
                data.secure_url;

        }


        console.log(
            'Shared site logo loaded once.'
        );

    }

    catch (error) {

        console.error(
            'Shared site logo loading error:',
            error
        );

    }

}


/* ==================================================
   START SHARED LOGO LOAD
================================================== */

loadSharedSiteLogo();

/* ==================================================
   HOMEPAGE CONTENT
   Loads editable content from /data/homepage.json
================================================== */

async function loadHomepageContent() {

    try {

        const response =
            await fetch(
                '/data/homepage.json',
                {
                    cache:
                        'no-store'
                }
            );


        if (!response.ok) {

            throw new Error(
                `Homepage content request failed: HTTP ${response.status}`
            );

        }


        const content =
            await response.json();


        if (
            !content ||
            typeof content !== 'object'
        ) {

            throw new Error(
                'Invalid homepage content response.'
            );

        }


        /* ==================================================
           HERO
        ================================================== */

        const heroTitle =
            document.querySelector(
                '.hero-content h1'
            );


        if (
            heroTitle &&
            content.hero
        ) {

            heroTitle.innerHTML = `

                ${content.hero.titleBefore}

                <span
                    class="highlight"
                >
                    ${content.hero.titleHighlight}
                </span>

            `;

        }


        const heroDescription =
            document.querySelector(
                '.hero-content p'
            );


        if (
            heroDescription &&
            content.hero
        ) {

            heroDescription.textContent =
                content.hero.description;

        }


        /* ==================================================
           ABOUT
        ================================================== */

        const aboutTitle =
            document.querySelector(
                '.about-section h2'
            );


        if (
            aboutTitle &&
            content.about
        ) {

            aboutTitle.innerHTML = `

                ${content.about.titleBefore}

                <span
                    class="highlight"
                >
                    ${content.about.titleHighlight}
                </span>

            `;

        }


        const aboutDescription =
            document.querySelector(
                '.about-section p'
            );


        if (
            aboutDescription &&
            content.about
        ) {

            aboutDescription.textContent =
                content.about.description;

        }


        const aboutLink =
            document.querySelector(
                '.about-section .btn-text'
            );


        if (
            aboutLink &&
            content.about
        ) {

            aboutLink.textContent =
                content.about.linkText;

        }


        /* ==================================================
           SERVICES
        ================================================== */

        const servicesLabel =
            document.querySelector(
                '.services-section .section-label'
            );


        if (
            servicesLabel &&
            content.services
        ) {

            servicesLabel.textContent =
                content.services.label;

        }


        const servicesTitle =
            document.querySelector(
                '.services-section h2'
            );


        if (
            servicesTitle &&
            content.services
        ) {

            servicesTitle.textContent =
                content.services.title;

        }


        const servicesGrid =
            document.querySelector(
                '.services-grid'
            );


        if (
            servicesGrid &&
            content.services &&
            Array.isArray(
                content.services.items
            )
        ) {

            servicesGrid.innerHTML =
                content.services.items
                    .map(
                        service => `

                            <div
                                class="service-card"
                            >

                                <h3>
                                    ${service.title}
                                </h3>

                                <p>
                                    ${service.description}
                                </p>

                            </div>

                        `
                    )
                    .join('');

        }


        /* ==================================================
           WHY AUREN
        ================================================== */

        const whyLabel =
            document.querySelector(
                '.why-header .section-label'
            );


        if (
            whyLabel &&
            content.whyAuren
        ) {

            whyLabel.textContent =
                content.whyAuren.label;

        }


        const whyTitle =
            document.querySelector(
                '.why-header h2'
            );


        if (
            whyTitle &&
            content.whyAuren
        ) {

            whyTitle.textContent =
                content.whyAuren.title;

        }


        const whyGrid =
            document.querySelector(
                '.why-grid'
            );


        if (
            whyGrid &&
            content.whyAuren &&
            Array.isArray(
                content.whyAuren.items
            )
        ) {

            whyGrid.innerHTML =
                content.whyAuren.items
                    .map(
                        item => `

                            <div
                                class="why-card"
                            >

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
           CTA
        ================================================== */

        const ctaTitle =
            document.querySelector(
                '.cta-section h2'
            );


        if (
            ctaTitle &&
            content.cta
        ) {

            ctaTitle.innerHTML = `

                ${content.cta.titleBefore}

                <br>

                ${content.cta.titleMiddle}

                <span
                    class="highlight"
                >
                    ${content.cta.titleHighlight}
                </span>

            `;

        }


        const ctaDescription =
            document.querySelector(
                '.cta-section p'
            );


        if (
            ctaDescription &&
            content.cta
        ) {

            ctaDescription.textContent =
                content.cta.description;

        }


        console.log(
            'Homepage content loaded.'
        );

    }

    catch (error) {

        console.error(
            'Homepage content loading error:',
            error
        );

    }

}


/* ==================================================
   LOAD HOMEPAGE CONTENT
================================================== */

loadHomepageContent();

/* ==================================================
   HOMEPAGE ASSETS
   OPTIMIZED IMAGE DELIVERY
================================================== */

async function loadHomepageAssets() {

    try {

        const imageWidth =
            isDesktop
                ? 1400
                : 768;


        const response =
            await fetch(
                `/api/homepage-assets?w=${imageWidth}`
            );


        if (!response.ok) {

            throw new Error(
                `Homepage assets request failed: HTTP ${response.status}`
            );

        }


        const assets =
            await response.json();


        if (
            !assets ||
            typeof assets !== 'object'
        ) {

            throw new Error(
                'Invalid homepage assets response.'
            );

        }


        /* ==================================================
           APPLY OPTIMIZED ASSET
        ================================================== */

        function applyAsset(
            assetName,
            elementId
        ) {

            const asset =
                assets[
                    assetName
                ];


            if (
                !asset ||
                !asset.secure_url
            ) {

                console.warn(
                    `Homepage asset not found: ${assetName}`
                );

                return;

            }


            const element =
                document.getElementById(
                    elementId
                );


            if (
                !element
            ) {

                console.warn(
                    `Element not found: #${elementId}`
                );

                return;

            }


            element.src =
                asset.secure_url;

        }


        /* ==================================================
           TRANSITION IMAGE
        ================================================== */

        applyAsset(
            'transition-image',
            'transition-image'
        );


        /* ==================================================
           GALLERY IMAGE 1
        ================================================== */

        applyAsset(
            'gallery-1',
            'gallery-image-1'
        );


        /* ==================================================
           GALLERY IMAGE 2
        ================================================== */

        applyAsset(
            'gallery-2',
            'gallery-image-2'
        );


        /* ==================================================
           GALLERY IMAGE 3
        ================================================== */

        applyAsset(
            'gallery-3',
            'gallery-image-3'
        );


        console.log(
            'Optimized homepage assets loaded.'
        );

    }

    catch (
        error
    ) {

        console.error(
            'Homepage asset loading error:',
            error
        );

    }

}


/* ==================================================
   LOAD HOMEPAGE ASSETS
================================================== */

loadHomepageAssets();


/* ==================================================
   LOAD ACTION BUTTONS
================================================== */

loadComponent(
    'components/action-buttons.html',
    'hero-action-buttons'
)
.then(
    success => {

        if (!success) {

            return;

        }


        const heroButtons =
            document.getElementById(
                'hero-action-buttons'
            );


        const ctaButtons =
            document.getElementById(
                'cta-action-buttons'
            );


        if (
            heroButtons &&
            ctaButtons
        ) {

            ctaButtons.innerHTML =
                heroButtons.innerHTML;

        }

    }
);


/* ==================================================
   MOBILE PATH
   No GSAP / ScrollTrigger loaded.
================================================== */

if (!isDesktop) {

    const heroMedia =
        document.querySelector(
            '.hero-media'
        );


    const heroBg =
        document.querySelector(
            '.hero-bg'
        );


    const heroContent =
        document.querySelector(
            '.hero-content'
        );


    if (heroMedia) {

        heroMedia.style.width =
            '100%';

        heroMedia.style.height =
            '100%';

        heroMedia.style.top =
            '0';

        heroMedia.style.left =
            '0';

        heroMedia.style.transform =
            'none';

        heroMedia.style.borderRadius =
            '0';

    }


    if (heroBg) {

        heroBg.style.transform =
            'none';

        heroBg.style.opacity =
            '1';

    }


    if (heroContent) {

        heroContent.style.opacity =
            '1';

    }

}


/* ==================================================
   LOAD DESKTOP ANIMATIONS ONLY ON DESKTOP
================================================== */

if (
    isDesktop
) {

    const desktopAnimationScript =
        document.createElement(
            'script'
        );


    desktopAnimationScript.src =
        '/js/desktop-animations.js?v=2';


    desktopAnimationScript.onload =
        () => {

            console.log(
                'Desktop animations loaded.'
            );

        };


    desktopAnimationScript.onerror =
        () => {

            console.error(
                'Desktop animations failed to load.'
            );

        };


    document
        .body
        .appendChild(
            desktopAnimationScript
        );

}