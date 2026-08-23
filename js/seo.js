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


        canonical.rel =
            'canonical';


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


    if (
        seo.description
    ) {

        setMetaContent(
            'name',
            'description',
            seo.description
        );

    }


    if (
        seo.keywords
    ) {

        setMetaContent(
            'name',
            'keywords',
            seo.keywords
        );

    }


    /* ==================================================
       CANONICAL
    ================================================== */

    if (
        seo.canonical
    ) {

        setCanonical(
            seo.canonical
        );

    }


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
        'SEO configuration loaded.'
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


        const pageKey =
            'home';


        applySeo(
            config[
                pageKey
            ]
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