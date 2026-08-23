/* ==================================================
   AUREN ORIGINALS
   SEO CONFIGURATION
================================================== */


/* ==================================================
   GET OR CREATE META TAG
================================================== */

function getMetaTag(
    attribute,
    value
) {

    return document.querySelector(
        `meta[${attribute}="${value}"]`
    );

}


/* ==================================================
   SET META CONTENT
================================================== */

function setMetaContent(
    attribute,
    value,
    content
) {

    if (
        !content
    ) {

        return;

    }


    let meta =
        getMetaTag(
            attribute,
            value
        );


    if (
        !meta
    ) {

        meta =
            document.createElement(
                'meta'
            );


        meta.setAttribute(
            attribute,
            value
        );


        document.head.appendChild(
            meta
        );

    }


    meta.setAttribute(
        'content',
        content
    );

}


/* ==================================================
   SET CANONICAL
================================================== */

function setCanonical(
    url
) {

    if (
        !url
    ) {

        return;

    }


    let canonical =
        document.querySelector(
            'link[rel="canonical"]'
        );


    if (
        !canonical
    ) {

        canonical =
            document.createElement(
                'link'
            );


        canonical.setAttribute(
            'rel',
            'canonical'
        );


        document.head.appendChild(
            canonical
        );

    }


    canonical.href =
        url;

}


/* ==================================================
   APPLY SEO
================================================== */

function applySeo(
    seo
) {

    if (
        !seo
    ) {

        return;

    }


    /* ==================================================
       BASIC SEO
    ================================================== */

    if (
        seo.title
    ) {

        document.title =
            seo.title;

    }


    setMetaContent(
        'name',
        'description',
        seo.description
    );


    setMetaContent(
        'name',
        'keywords',
        seo.keywords
    );


    /* ==================================================
       CANONICAL
    ================================================== */

    setCanonical(
        seo.canonical
    );


    /* ==================================================
       OPEN GRAPH
    ================================================== */

    if (
        seo.og
    ) {

        setMetaContent(
            'property',
            'og:type',
            seo.og.type
        );


        setMetaContent(
            'property',
            'og:title',
            seo.og.title
        );


        setMetaContent(
            'property',
            'og:description',
            seo.og.description
        );


        setMetaContent(
            'property',
            'og:url',
            seo.og.url
        );


        setMetaContent(
            'property',
            'og:site_name',
            seo.og.siteName
        );


        setMetaContent(
            'property',
            'og:image',
            seo.og.image
        );

    }


    /* ==================================================
       TWITTER
    ================================================== */

    if (
        seo.twitter
    ) {

        setMetaContent(
            'name',
            'twitter:card',
            seo.twitter.card
        );


        setMetaContent(
            'name',
            'twitter:title',
            seo.twitter.title
        );


        setMetaContent(
            'name',
            'twitter:description',
            seo.twitter.description
        );


        setMetaContent(
            'name',
            'twitter:image',
            seo.twitter.image
        );

    }


    console.log(
        'SEO configuration loaded.',
        seo.title
    );

}


/* ==================================================
   PAGE MAP
================================================== */

const pageMap = {

    '/':
        'home',

    '/index.html':
        'home',

    '/about.html':
        'about',

    '/service.html':
        'service',

    '/portfolio.html':
        'portfolio'

};


/* ==================================================
   GET CURRENT PAGE KEY
================================================== */

function getCurrentPageKey() {

    const currentPath =
        window.location.pathname
            .toLowerCase();


    return (
        pageMap[
            currentPath
        ]
        ||
        'home'
    );

}


/* ==================================================
   LOAD PAGE SEO
================================================== */

async function loadSeo() {

    try {

        const response =
            await fetch(
                '/data/seo.json',
                {
                    cache:
                        'no-store'
                }
            );


        if (
            !response.ok
        ) {

            throw new Error(
                `SEO configuration request failed: HTTP ${response.status}`
            );

        }


        const config =
            await response.json();


        if (
            !config
            ||
            typeof config !== 'object'
        ) {

            throw new Error(
                'Invalid SEO configuration.'
            );

        }


        const pageKey =
            getCurrentPageKey();


        const pageSeo =
            config[
                pageKey
            ];


        if (
            !pageSeo
        ) {

            console.warn(
                `No SEO configuration found for page: ${pageKey}`
            );


            return;

        }


        applySeo(
            pageSeo
        );

    }

    catch (error) {

        console.error(
            'SEO configuration loading error:',
            error
        );

    }

}


/* ==================================================
   START SEO
================================================== */

loadSeo();