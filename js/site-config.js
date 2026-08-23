/* ==================================================
   AUREN ORIGINALS
   SITE CONFIGURATION
================================================== */


/* ==================================================
   CONFIGURATION STATE
================================================== */

let siteConfigPromise = null;


/* ==================================================
   LOAD SITE CONFIGURATION
================================================== */

async function loadSiteConfig() {

    if (!siteConfigPromise) {

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

                    if (!response.ok) {

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
                        typeof config !== 'object'
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
   RENDER CONTACT ACTIONS
================================================== */

function renderContactActions(
    config
) {

    if (
        !config
        ||
        !config.actions
    ) {

        return;

    }


    const contactAction =
        config.actions;


    const desktopButton =
        document.querySelector(
            '.btn-get-in-touch'
        );


    if (
        desktopButton
    ) {

        desktopButton.href =
            contactAction.contactHref;


        desktopButton.textContent =
            contactAction.contactLabel;

    }


    const mobileButton =
        document.querySelector(
            '.mobile-nav-contact'
        );


    if (
        mobileButton
    ) {

        mobileButton.href =
            contactAction.contactHref;


        mobileButton.textContent =
            contactAction.contactLabel;

    }

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
   LOAD SHARED SITE LOGO
   SINGLE REQUEST
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


        if (!response.ok) {

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
   INITIALIZE SITE CONFIGURATION
================================================== */

async function initializeSiteConfiguration() {

    try {

        const config =
            await loadSiteConfig();


        /*
         * Render only after the
         * navbar/footer components
         * have already been inserted.
         */

        renderDesktopNavigation(
            config
        );


        renderMobileNavigation(
            config
        );


        renderContactActions(
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

    }

    catch (error) {

        console.error(
            'Site configuration loading error:',
            error
        );

    }

}


/* ==================================================
   PUBLIC API
================================================== */

window.AurenSite = {

    load:
        loadSiteConfig,

    initialize:
        initializeSiteConfiguration

};