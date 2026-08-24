/* ==================================================
   AUREN ORIGINALS
   SHARED GALLERY JAVASCRIPT
================================================== */


/* ==================================================
   VIDEO STATE
================================================== */

let activeVideoItem =
    null;


let activeVideo =
    null;


let videoBackdrop =
    null;


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


        if (
            !response.ok
        ) {

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


        if (
            !container
        ) {

            throw new Error(
                `Container not found: #${elementId}`
            );

        }


        container.innerHTML =
            html;


        return true;

    }

    catch (
        error
    ) {

        console.error(
            `Gallery component loading error (${url}):`,
            error
        );


        return false;

    }

}


/* ==================================================
   SITE CONFIG SCRIPT
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
                '/js/site-config.js?v=5';


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
   GET GALLERY KEY
================================================== */

function getGalleryKey() {

    const bodyGallery =
        document.body.dataset.gallery;


    if (
        bodyGallery
    ) {

        if (
            bodyGallery ===
            'wedding'
        ) {

            const params =
                new URLSearchParams(
                    window.location.search
                );


            return (
                params.get(
                    'category-2'
                )
                ||
                'wedding'
            );

        }


        return bodyGallery;

    }


    const pathname =
        window.location.pathname
            .toLowerCase();


    if (
        pathname.includes(
            'branding-gallery'
        )
    ) {

        return 'branding';

    }


    if (
        pathname.includes(
            'commercial-gallery'
        )
    ) {

        return 'commercial';

    }


    if (
        pathname.includes(
            'corporate-gallery'
        )
    ) {

        return 'corporate';

    }


    if (
        pathname.includes(
            'fashion-gallery'
        )
    ) {

        return 'fashion';

    }


    if (
        pathname.includes(
            'sports-gallery'
        )
    ) {

        return 'sports';

    }


    if (
        pathname.includes(
            'wedding-gallery'
        )
    ) {

        const params =
            new URLSearchParams(
                window.location.search
            );


        return (
            params.get(
                'category-2'
            )
            ||
            'wedding'
        );

    }


    return 'branding';

}


/* ==================================================
   LOAD GALLERY CONFIG
================================================== */

async function loadGalleryConfig() {

    const response =
        await fetch(
            '/data/galleries.json',
            {
                cache:
                    'no-store'
            }
        );


    if (
        !response.ok
    ) {

        throw new Error(
            `Gallery configuration request failed: HTTP ${response.status}`
        );

    }


    const config =
        await response.json();


    if (
        !config
        ||
        typeof config !==
        'object'
    ) {

        throw new Error(
            'Invalid gallery configuration.'
        );

    }


    const galleryKey =
        getGalleryKey();


    const gallery =
        config[
            galleryKey
        ];


    if (
        !gallery
    ) {

        throw new Error(
            `Gallery configuration not found: ${galleryKey}`
        );

    }


    return {

        key:
            galleryKey,

        config:
            gallery

    };

}


/* ==================================================
   MEDIA URL
================================================== */

function getMediaUrl(
    media
) {

    if (
        typeof media ===
        'string'
    ) {

        return media;

    }


    if (
        media
        &&
        typeof media ===
        'object'
    ) {

        return (
            media.secure_url
            ||
            media.url
            ||
            ''
        );

    }


    return '';

}


/* ==================================================
   VIDEO MIME TYPE
================================================== */

function getVideoMimeType(
    media
) {

    const value =
        String(
            media?.format
            ||
            media?.display_name
            ||
            media?.original_filename
            ||
            media?.public_id
            ||
            ''
        );


    const extension =
        value
            .split('.')
            .pop()
            .toLowerCase();


    const types = {

        mp4:
            'video/mp4',

        webm:
            'video/webm',

        ogg:
            'video/ogg',

        mov:
            'video/quicktime'

    };


    return (
        types[
            extension
        ]
        ||
        'video/mp4'
    );

}


/* ==================================================
   CLOSE ZOOMED VIDEO
================================================== */

function closeZoomedVideo() {

    if (
        activeVideo
    ) {

        activeVideo.pause();

        activeVideo.controls =
            false;

    }


    if (
        activeVideoItem
    ) {

        activeVideoItem.classList.remove(
            'video-zoomed'
        );


        const closeButton =
            activeVideoItem.querySelector(
                '.video-close-btn'
            );


        if (
            closeButton
        ) {

            closeButton.remove();

        }

    }


    if (
        videoBackdrop
    ) {

        videoBackdrop.remove();

        videoBackdrop =
            null;

    }


    document.body.style.overflow =
        '';


    activeVideoItem =
        null;


    activeVideo =
        null;

}


/* ==================================================
   OPEN ZOOMED VIDEO
================================================== */

function openZoomedVideo(
    item,
    video
) {

    closeZoomedVideo();


    activeVideoItem =
        item;


    activeVideo =
        video;


    videoBackdrop =
        document.createElement(
            'div'
        );


    videoBackdrop.className =
        'video-backdrop';


    document.body.appendChild(
        videoBackdrop
    );


    document.body.style.overflow =
        'hidden';


    item.classList.add(
        'video-zoomed'
    );


    video.controls =
        true;


    const closeButton =
        document.createElement(
            'button'
        );


    closeButton.type =
        'button';


    closeButton.className =
        'video-close-btn';


    closeButton.textContent =
        '×';


    closeButton.setAttribute(
        'aria-label',
        'Close video'
    );


    item.appendChild(
        closeButton
    );


    closeButton.addEventListener(
        'click',
        event => {

            event.stopPropagation();


            closeZoomedVideo();

        }
    );


    videoBackdrop.addEventListener(
        'click',
        closeZoomedVideo
    );

}


/* ==================================================
   ESCAPE KEY
================================================== */

document.addEventListener(
    'keydown',
    event => {

        if (
            event.key ===
            'Escape'
        ) {

            closeZoomedVideo();

        }

    }
);


/* ==================================================
   RENDER HERO
================================================== */

function renderHero(
    gallery
) {

    const title =
        document.getElementById(
            'gallery-title'
        );


    const description =
        document.getElementById(
            'gallery-description'
        );


    const heroImage =
        document.getElementById(
            'gallery-hero-image'
        );


    if (
        title
    ) {

        title.innerHTML = `

            ${gallery.name}

            <span
                class="highlight"
            >
                ${gallery.titleSuffix}
            </span>

        `;

    }


    if (
        description
    ) {

        description.textContent =
            gallery.description;

    }


    if (
        heroImage
    ) {

        heroImage.alt =
            gallery.heroAlt
            ||
            `${gallery.name} Hero`;

        /*
         * Do not hide the image here.
         * The browser will render the image
         * once the src is assigned.
         */

        heroImage.style.visibility =
            'visible';

    }

}


/* ==================================================
   LOAD HERO IMAGE
================================================== */

async function loadHero(
    gallery
) {

    const image =
        document.getElementById(
            'gallery-hero-image'
        );


    if (
        !image
    ) {

        console.error(
            'Gallery hero image element not found.'
        );


        return;

    }


    try {

        const response =
            await fetch(
                gallery.heroApi,
                {
                    method:
                        'GET',

                    cache:
                        'no-store'
                }
            );


        if (
            !response.ok
        ) {

            throw new Error(
                `${gallery.name} hero API returned HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        const heroUrl =
            getMediaUrl(
                data
            );


        if (
            !heroUrl
        ) {

            throw new Error(
                `${gallery.name} hero URL was not returned.`
            );

        }


        /*
         * Set the source directly.
         * No hidden-state/onload dependency.
         */

        image.src =
            heroUrl;


        image.style.visibility =
            'visible';


        console.log(
            `${gallery.name} hero loaded.`
        );

    }

    catch (
        error
    ) {

        /*
         * Keep the page usable even if the hero
         * asset cannot be retrieved.
         */

        image.removeAttribute(
            'src'
        );


        image.style.visibility =
            'hidden';


        console.error(
            `${gallery.name} hero loading error:`,
            error
        );

    }

}


/* ==================================================
   EMPTY MESSAGE
================================================== */

function showEmptyMessage(
    message
) {

    const container =
        document.getElementById(
            'dynamic-gallery'
        );


    if (
        !container
    ) {

        return;

    }


    container.innerHTML = `

        <p
            class="empty-message"
        >
            ${message}
        </p>

    `;

}


/* ==================================================
   LOAD PHOTOS
================================================== */

async function loadPhotos(
    gallery
) {

    closeZoomedVideo();


    const container =
        document.getElementById(
            'dynamic-gallery'
        );


    if (
        !container
    ) {

        return;

    }


    container.innerHTML =
        '';


    try {

        const response =
            await fetch(
                gallery.photoApi,
                {
                    cache:
                        'no-store'
                }
            );


        if (
            !response.ok
        ) {

            throw new Error(
                `Photo API HTTP ${response.status}`
            );

        }


        const photos =
            await response.json();


        if (
            !Array.isArray(
                photos
            )
            ||
            photos.length ===
            0
        ) {

            showEmptyMessage(
                `No ${gallery.name} photos available yet.`
            );


            return;

        }


        photos.forEach(
            photo => {

                const imageUrl =
                    getMediaUrl(
                        photo
                    );


                if (
                    !imageUrl
                ) {

                    return;

                }


                const item =
                    document.createElement(
                        'div'
                    );


                item.className =
                    'gallery-item';


                const image =
                    document.createElement(
                        'img'
                    );


                image.src =
                    imageUrl;


                image.alt =
                    photo.display_name
                    ||
                    `${gallery.name} Gallery`;


                image.loading =
                    'lazy';


                image.decoding =
                    'async';


                item.appendChild(
                    image
                );


                container.appendChild(
                    item
                );

            }
        );


        runGalleryAnimation();

    }

    catch (
        error
    ) {

        console.error(
            `${gallery.name} photo loading error:`,
            error
        );


        showEmptyMessage(
            `Could not load ${gallery.name} photos.`
        );

    }

}


/* ==================================================
   LOAD VIDEOS
================================================== */

async function loadVideos(
    gallery
) {

    closeZoomedVideo();


    const container =
        document.getElementById(
            'dynamic-gallery'
        );


    if (
        !container
    ) {

        return;

    }


    container.innerHTML =
        '';


    try {

        const response =
            await fetch(
                gallery.videoApi,
                {
                    cache:
                        'no-store'
                }
            );


        if (
            !response.ok
        ) {

            showEmptyMessage(
                `No ${gallery.name} videos available yet.`
            );


            return;

        }


        const videos =
            await response.json();


        if (
            !Array.isArray(
                videos
            )
            ||
            videos.length ===
            0
        ) {

            showEmptyMessage(
                `No ${gallery.name} videos available yet.`
            );


            return;

        }


        videos.forEach(
            videoFile => {

                const videoUrl =
                    getMediaUrl(
                        videoFile
                    );


                if (
                    !videoUrl
                ) {

                    return;

                }


                const item =
                    document.createElement(
                        'div'
                    );


                item.className =
                    'gallery-item video-item';


                const video =
                    document.createElement(
                        'video'
                    );


                video.preload =
                    'metadata';


                video.playsInline =
                    true;


                video.muted =
                    true;


                const source =
                    document.createElement(
                        'source'
                    );


                source.src =
                    videoUrl;


                source.type =
                    getVideoMimeType(
                        videoFile
                    );


                video.appendChild(
                    source
                );


                item.appendChild(
                    video
                );


                container.appendChild(
                    item
                );


                video.addEventListener(
                    'click',
                    event => {

                        event.stopPropagation();


                        openZoomedVideo(
                            item,
                            video
                        );

                    }
                );

            }
        );


        runGalleryAnimation();

    }

    catch (
        error
    ) {

        showEmptyMessage(
            `No ${gallery.name} videos available yet.`
        );

    }

}


/* ==================================================
   GALLERY ANIMATION
================================================== */

function runGalleryAnimation() {

    if (
        typeof gsap ===
        'undefined'
    ) {

        return;

    }


    const items =
        document.querySelectorAll(
            '#dynamic-gallery .gallery-item'
        );


    if (
        !items.length
    ) {

        return;

    }


    gsap.killTweensOf(
        items
    );


    gsap.fromTo(
        items,
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
                .65,

            stagger:
                .04,

            ease:
                'power3.out'

        }
    );

}


/* ==================================================
   MEDIA FILTER
================================================== */

function initializeMediaButtons(
    gallery
) {

    const buttons =
        document.querySelectorAll(
            '.media-btn'
        );


    if (
        !buttons.length
    ) {

        return;

    }


    buttons.forEach(
        button => {

            button.addEventListener(
                'click',
                async () => {

                    buttons.forEach(
                        item => {

                            item.classList.remove(
                                'active'
                            );

                        }
                    );


                    button.classList.add(
                        'active'
                    );


                    if (
                        button.dataset.media ===
                        'photos'
                    ) {

                        await loadPhotos(
                            gallery
                        );

                    }

                    else {

                        await loadVideos(
                            gallery
                        );

                    }

                }
            );

        }
    );

}


/* ==================================================
   BACK TO PORTFOLIO
================================================== */

function initializeBackButton() {

    const button =
        document.getElementById(
            'back-to-portfolio'
        );


    if (
        !button
    ) {

        return;

    }


    button.addEventListener(
        'click',
        event => {

            event.preventDefault();


            if (
                window.history.length >
                1
            ) {

                window.history.back();

            }

            else {

                window.location.href =
                    'portfolio.html';

            }

        }
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
            window.scrollY >
            500
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
   ACTIVE WORK NAVIGATION
================================================== */

function initializeWorkNavigation() {

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
   HERO ANIMATION
================================================== */

function initializeHeroAnimation() {

    const hero =
        document.querySelector(
            '.hero-content'
        );


    if (
        !hero
    ) {

        return;

    }


    if (
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches
    ) {

        hero.style.transform =
            'translateY(0)';

        hero.style.opacity =
            '1';

        return;

    }


    if (
        typeof gsap ===
        'undefined'
    ) {

        hero.style.transform =
            'translateY(0)';

        hero.style.opacity =
            '1';

        return;

    }


    if (
        window.innerWidth <=
        767
    ) {

        gsap.set(
            hero,
            {

                x:
                    0,

                y:
                    0,

                opacity:
                    1

            }
        );


        return;

    }


    gsap.to(
        hero,
        {

            y:
                0,

            opacity:
                1,

            duration:
                .9,

            delay:
                .12,

            ease:
                'power3.out'

        }
    );

}


/* ==================================================
   SHARED COMPONENTS
================================================== */

async function initializeSharedComponents() {

    const [
        navbarReady,
        footerReady,
        scrollTopReady
    ] =
        await Promise.all([

            loadComponent(
                'components/navbar.html',
                'navbar-container'
            ),

            loadComponent(
                'components/footer.html',
                'footer-container'
            ),

            loadComponent(
                'components/scroll-to-top.html',
                'scroll-to-top-container'
            )

        ]);


    if (
        !navbarReady
        ||
        !footerReady
        ||
        !scrollTopReady
    ) {

        throw new Error(
            'One or more shared gallery components failed to load.'
        );

    }


    await loadSiteConfigScript();


    await window.AurenSite.initialize();


    initializeWorkNavigation();


    initializeScrollToTop();

}


/* ==================================================
   INITIALIZE GALLERY
================================================== */

async function initializeGalleryPage() {

    try {

        await initializeSharedComponents();


        const {
            config
        } =
            await loadGalleryConfig();


        renderHero(
            config
        );


        /*
         * Load hero before starting the rest of the
         * gallery initialization.
         */

        await loadHero(
            config
        );


        initializeBackButton();


        initializeMediaButtons(
            config
        );


        await loadPhotos(
            config
        );


        initializeHeroAnimation();


        console.log(
            'Gallery page initialized:',
            config.name
        );

    }

    catch (
        error
    ) {

        console.error(
            'Gallery initialization error:',
            error
        );

    }

}


/* ==================================================
   START
================================================== */

initializeGalleryPage();