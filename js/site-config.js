/* ==================================================
   AUREN ORIGINALS
   SITE CONFIGURATION
================================================== */


/* ==================================================
   CONFIGURATION STATE
================================================== */

let siteConfigPromise =
    null;


/* ==================================================
   LOADER STATE
================================================== */

let siteReady =
    false;

let siteReadyTimer =
    null;


/* ==================================================
   CREATE LOADER
================================================== */

function createAurenLoader() {

    if (
        document.querySelector(
            '.auren-loader'
        )
    ) {

        return;

    }


    const loader =
        document.createElement(
            'div'
        );


    loader.className =
        'auren-loader';


    loader.setAttribute(
        'aria-label',
        'Loading Auren Originals'
    );


    loader.innerHTML = `

        <div
            class="auren-loader-content"
        >

            <div
                class="auren-loader-mark"
                id="auren-loader-mark"
            ></div>


            <div
                class="auren-loader-name"
            >
                AUREN
            </div>


            <div
                class="auren-loader-subtitle"
            >
                Originals
            </div>


            <div
                class="auren-loader-progress"
            >

                <div
                    class="auren-loader-track"
                >

                    <div
                        class="auren-loader-bar"
                    ></div>

                </div>


                <div
                    class="auren-loader-footer"
                >

                    <span>
                        Creative Studio
                    </span>


                    <span
                        class="auren-loader-dots"
                        aria-hidden="true"
                    >

                        <span></span>
                        <span></span>
                        <span></span>

                    </span>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(
        loader
    );

}


/* ==================================================
   START LOADER
================================================== */

function initializeLoader() {

    createAurenLoader();

}


/* ==================================================
   INSERT LOADER LOGO SAFELY
================================================== */

function insertLoaderLogo(
    logoUrl
) {

    const loaderMark =
        document.getElementById(
            'auren-loader-mark'
        );


    if (
        !loaderMark
        ||
        !logoUrl
    ) {

        return;

    }


    /*
     * Create the image completely outside the DOM.
     * This prevents any broken-image placeholder
     * from being displayed.
     */

    const logoImage =
        new Image();


    logoImage.decoding =
        'async';


    logoImage.alt =
        'Auren Originals';


    logoImage.onload =
        () => {

            loaderMark.appendChild(
                logoImage
            );

        };


    logoImage.onerror =
        () => {

            console.warn(
                'Auren loader logo could not be loaded.'
            );

        };


    logoImage.src =
        logoUrl;

}


/* ==================================================
   MARK SITE READY
================================================== */

function markSiteReady() {

    if (
        siteReady
    ) {

        return;

    }


    siteReady =
        true;


    if (
        siteReadyTimer
    ) {

        clearTimeout(
            siteReadyTimer
        );

        siteReadyTimer =
            null;

    }


    window.setTimeout(
        () => {

            document.documentElement.classList.add(
                'auren-ready'
            );


            document.dispatchEvent(
                new CustomEvent(
                    'auren:site-ready'
                )
            );


            console.log(
                'Auren site ready.'
            );

        },
        250
    );

}


/* ==================================================
   LOADER SAFETY FALLBACK
================================================== */

siteReadyTimer =
    window.setTimeout(
        () => {

            if (
                !siteReady
            ) {

                console.warn(
                    'Auren loader safety timeout reached.'
                );


                markSiteReady();

            }

        },
        5000
    );


/* ==================================================
   START LOADER IMMEDIATELY
================================================== */

initializeLoader();


/* ==================================================
   LOAD SITE CONFIGURATION
================================================== */

async function loadSiteConfig() {

    if (
        !siteConfigPromise
    ) {

        siteConfigPromise =
            fetch(
                '/data/site.json',
                {
                    cache:
                        'no-store'
                }
            )
            .then(
                response => {

                    if (
                        !response.ok
                    ) {

                        throw new Error(
                            `Site configuration request failed: HTTP ${response.status}`
                        );

                    }


                    return response.json();

                }
            )
            .then(
                config => {

                    if (
                        !config
                        ||
                        typeof config !==
                            'object'
                    ) {

                        throw new Error(
                            'Invalid site configuration.'
                        );

                    }


                    return config;

                }
            );

    }


    return siteConfigPromise;

}


/* ==================================================
   CREATE NAVIGATION LINK
================================================== */

function createNavigationLink(
    item
) {

    const link =
        document.createElement(
            'a'
        );


    link.href =
        item.href;


    link.textContent =
        item.label;


    if (
        item.page
    ) {

        link.dataset.page =
            item.page;

    }


    return link;

}


/* ==================================================
   RENDER DESKTOP NAVIGATION
================================================== */

function renderDesktopNavigation(
    config
) {

    const navLinks =
        document.querySelector(
            '.nav-links'
        );


    if (
        !navLinks
        ||
        !config
        ||
        !Array.isArray(
            config.navigation
        )
    ) {

        return;

    }


    navLinks.innerHTML =
        '';


    config.navigation.forEach(
        item => {

            const listItem =
                document.createElement(
                    'li'
                );


            listItem.appendChild(
                createNavigationLink(
                    item
                )
            );


            navLinks.appendChild(
                listItem
            );

        }
    );

}


/* ==================================================
   RENDER MOBILE NAVIGATION
================================================== */

function renderMobileNavigation(
    config
) {

    const mobileLinks =
        document.querySelector(
            '.mobile-nav-links'
        );


    if (
        !mobileLinks
        ||
        !config
        ||
        !Array.isArray(
            config.navigation
        )
    ) {

        return;

    }


    mobileLinks.innerHTML =
        '';


    config.navigation.forEach(
        item => {

            const listItem =
                document.createElement(
                    'li'
                );


            listItem.appendChild(
                createNavigationLink(
                    item
                )
            );


            mobileLinks.appendChild(
                listItem
            );

        }
    );

}


/* ==================================================
   HEADER CONTACT BUTTON
================================================== */

function renderContactActions(
    config
) {

    if (
        !config
        ||
        !config.actions
        ||
        !config.actions.contactHeader
    ) {

        return;

    }


    const contactAction =
        config.actions.contactHeader;


    document
        .querySelectorAll(
            '.btn-get-in-touch'
        )
        .forEach(
            button => {

                button.href =
                    contactAction.href;


                button.textContent =
                    contactAction.label;

            }
        );


    document
        .querySelectorAll(
            '.mobile-nav-contact'
        )
        .forEach(
            button => {

                button.href =
                    contactAction.href;


                button.textContent =
                    contactAction.label;

            }
        );

}


/* ==================================================
   SHARED ACTION BUTTONS
================================================== */

function renderActionButtons(
    config
) {

    if (
        !config
        ||
        !config.actions
    ) {

        return;

    }


    document
        .querySelectorAll(
            '[data-action="portfolio"]'
        )
        .forEach(
            button => {

                if (
                    !config.actions.portfolio
                ) {

                    return;

                }


                button.href =
                    config.actions.portfolio.href;


                button.textContent =
                    config.actions.portfolio.label;

            }
        );


    document
        .querySelectorAll(
            '[data-action="contact"]'
        )
        .forEach(
            button => {

                if (
                    !config.actions.contact
                ) {

                    return;

                }


                button.href =
                    config.actions.contact.href;


                button.textContent =
                    config.actions.contact.label;

            }
        );

}


/* ==================================================
   RENDER FOOTER
================================================== */

function renderFooter(
    config
) {

    const footerLinks =
        document.querySelector(
            '.footer-links'
        );


    if (
        !footerLinks
        ||
        !config
        ||
        !config.footer
        ||
        !Array.isArray(
            config.footer.columns
        )
    ) {

        return;

    }


    footerLinks.innerHTML =
        '';


    config.footer.columns.forEach(
        column => {

            const columnElement =
                document.createElement(
                    'div'
                );


            columnElement.className =
                'footer-column';


            const heading =
                document.createElement(
                    'h3'
                );


            heading.textContent =
                column.title;


            columnElement.appendChild(
                heading
            );


            if (
                Array.isArray(
                    column.links
                )
            ) {

                column.links.forEach(
                    item => {

                        const link =
                            document.createElement(
                                'a'
                            );


                        link.href =
                            item.href;


                        link.textContent =
                            item.label;


                        if (
                            item.external
                        ) {

                            link.target =
                                '_blank';


                            link.rel =
                                'noopener noreferrer';

                        }


                        columnElement.appendChild(
                            link
                        );

                    }
                );

            }


            footerLinks.appendChild(
                columnElement
            );

        }
    );


    const copyright =
        document.querySelector(
            '.footer-bottom p'
        );


    if (
        copyright
        &&
        config.footer.copyright
    ) {

        copyright.textContent =
            config.footer.copyright;

    }

}


/* ==================================================
   SHARED SITE LOGO
================================================== */

async function loadSharedSiteLogo() {

    try {

        const response =
            await fetch(
                '/api/site-logo',
                {
                    cache:
                        'no-store'
                }
            );


        if (
            !response.ok
        ) {

            throw new Error(
                `Site logo API returned HTTP ${response.status}`
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
                'Site logo URL was not returned.'
            );

        }


        /*
         * Navbar logo
         */

        document
            .querySelectorAll(
                '#site-logo-navbar'
            )
            .forEach(
                logo => {

                    logo.src =
                        data.secure_url;

                }
            );


        /*
         * Footer logo
         */

        document
            .querySelectorAll(
                '#site-logo-footer'
            )
            .forEach(
                logo => {

                    logo.src =
                        data.secure_url;

                }
            );


        /*
         * Loader logo
         */

        insertLoaderLogo(
            data.secure_url
        );


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
   INITIALIZE SITE CONFIGURATION
================================================== */

async function initializeSiteConfiguration() {

    try {

        const config =
            await loadSiteConfig();


        renderDesktopNavigation(
            config
        );


        renderMobileNavigation(
            config
        );


        renderContactActions(
            config
        );


        renderActionButtons(
            config
        );


        renderFooter(
            config
        );


        await loadSharedSiteLogo();


        document.dispatchEvent(
            new CustomEvent(
                'auren:site-config-loaded',
                {
                    detail:
                        config
                }
            )
        );


        console.log(
            'Site configuration loaded.'
        );


        window.setTimeout(
            markSiteReady,
            500
        );


        return config;

    }

    catch (error) {

        console.error(
            'Site configuration loading error:',
            error
        );


        markSiteReady();


        return null;

    }

}


/* ==================================================
   PUBLIC API
================================================== */

window.AurenSite = {

    load:
        loadSiteConfig,

    initialize:
        initializeSiteConfiguration,

    renderActionButtons:
        renderActionButtons,

    ready:
        markSiteReady

};