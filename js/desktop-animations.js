/* ==================================================
   AUREN ORIGINALS
   DESKTOP ANIMATIONS ONLY
================================================== */


/* ==================================================
   DESKTOP ANIMATION LIBRARY LOADER
================================================== */

function loadDesktopAnimationLibraries() {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            const gsapScript =
                document.createElement(
                    'script'
                );


            gsapScript.src =
                'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';


            gsapScript.onload =
                () => {

                    const scrollScript =
                        document.createElement(
                            'script'
                        );


                    scrollScript.src =
                        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';


                    scrollScript.onload =
                        () => {

                            resolve();

                        };


                    scrollScript.onerror =
                        () => {

                            reject(
                                new Error(
                                    'ScrollTrigger failed to load'
                                )
                            );

                        };


                    document
                        .head
                        .appendChild(
                            scrollScript
                        );

                };


            gsapScript.onerror =
                () => {

                    reject(
                        new Error(
                            'GSAP failed to load'
                        )
                    );

                };


            document
                .head
                .appendChild(
                    gsapScript
                );

        }
    );

}


/* ==================================================
   DESKTOP ANIMATION INITIALIZATION
================================================== */

async function initializeDesktopAnimations() {

    try {

        await loadDesktopAnimationLibraries();

    }

    catch (
        error
    ) {

        console.error(
            'Animation library error:',
            error
        );

        return;

    }


    gsap.registerPlugin(
        ScrollTrigger
    );


    /* ==================================================
       HERO INTRO
    ================================================== */

    const heroTimeline =
        gsap.timeline({

            defaults: {

                ease:
                    'power3.out'

            }

        });


    heroTimeline.fromTo(

        '.hero-media',

        {

            width:
                220,

            height:
                130,

            top:
                '50%',

            left:
                '50%',

            xPercent:
                -50,

            yPercent:
                -50,

            borderRadius:
                18

        },

        {

            width:
                '100vw',

            height:
                '100vh',

            top:
                '50%',

            left:
                '50%',

            xPercent:
                -50,

            yPercent:
                -50,

            borderRadius:
                0,

            duration:
                2,

            ease:
                'expo.inOut'

        }

    );


    heroTimeline.fromTo(

        '.hero-bg',

        {

            scale:
                1.12,

            opacity:
                0.85

        },

        {

            scale:
                1,

            opacity:
                1,

            duration:
                2,

            ease:
                'power2.out'

        },

        '<'

    );


    heroTimeline.to(

        '.hero-content',

        {

            opacity:
                1,

            duration:
                0.35

        },

        '-=0.15'

    );


    heroTimeline.from(

        '.hero-content h1',

        {

            x:
                -45,

            opacity:
                0,

            duration:
                0.9

        },

        '-=0.15'

    );


    heroTimeline.from(

        '.hero-content p',

        {

            x:
                -30,

            opacity:
                0,

            duration:
                0.8

        },

        '-=0.48'

    );


    heroTimeline.from(

        '.hero-buttons a',

        {

            x:
                -20,

            opacity:
                0,

            duration:
                0.7,

            stagger:
                0.12

        },

        '-=0.40'

    );


    /* ==================================================
       HERO SCROLL
    ================================================== */

    gsap.to(

        '.hero-bg',

        {

            yPercent:
                5,

            ease:
                'none',

            scrollTrigger: {

                trigger:
                    '.hero',

                start:
                    'top top',

                end:
                    'bottom top',

                scrub:
                    1.5

            }

        }

    );


    /* ==================================================
       ABOUT ANIMATION
    ================================================== */

    const aboutTimeline =
        gsap.timeline({

            scrollTrigger: {

                trigger:
                    '.about-section',

                start:
                    'top 80%',

                toggleActions:
                    'play none none none'

            }

        });


    aboutTimeline

        .from(

            '.about-section h2',

            {

                y:
                    50,

                opacity:
                    0,

                duration:
                    1.05

            }

        )

        .from(

            '.about-section p',

            {

                y:
                    28,

                opacity:
                    0,

                duration:
                    0.9

            },

            '-=0.55'

        )

        .from(

            '.about-section .btn-text',

            {

                y:
                    18,

                opacity:
                    0,

                duration:
                    0.7

            },

            '-=0.45'

        );


    /* ==================================================
       SERVICES ANIMATION
    ================================================== */

    const servicesTimeline =
        gsap.timeline({

            scrollTrigger: {

                trigger:
                    '.services-section',

                start:
                    'top 80%',

                toggleActions:
                    'play none none none'

            }

        });


    servicesTimeline

        .from(

            '.services-section .section-label',

            {

                y:
                    20,

                opacity:
                    0,

                duration:
                    0.65

            }

        )

        .from(

            '.services-section h2',

            {

                y:
                    35,

                opacity:
                    0,

                duration:
                    0.95

            },

            '-=0.30'

        )

        .from(

            '.service-card',

            {

                y:
                    28,

                opacity:
                    0,

                duration:
                    0.75,

                stagger:
                    0.12

            },

            '-=0.35'

        );


    /* ==================================================
       WHY ANIMATION
    ================================================== */

    const whyTimeline =
        gsap.timeline({

            scrollTrigger: {

                trigger:
                    '.why-section',

                start:
                    'top 80%',

                toggleActions:
                    'play none none none'

            }

        });


    whyTimeline

        .from(

            '.why-header .section-label',

            {

                y:
                    18,

                opacity:
                    0,

                duration:
                    0.6

            }

        )

        .from(

            '.why-header h2',

            {

                y:
                    35,

                opacity:
                    0,

                duration:
                    0.9

            },

            '-=0.25'

        )

        .from(

            '.why-card',

            {

                y:
                    25,

                opacity:
                    0,

                duration:
                    0.75,

                stagger:
                    0.12

            },

            '-=0.30'

        );


    /* ==================================================
       TRANSITION IMAGE
    ================================================== */

    gsap.fromTo(

        '.transition-image-wrapper',

        {

            opacity:
                0

        },

        {

            opacity:
                1,

            duration:
                1.2,

            scrollTrigger: {

                trigger:
                    '.transition-image-wrapper',

                start:
                    'top 85%'

            }

        }

    );


    /* ==================================================
       CTA
    ================================================== */

    const ctaTimeline =
        gsap.timeline({

            scrollTrigger: {

                trigger:
                    '.cta-section',

                start:
                    'top 80%',

                toggleActions:
                    'play none none none'

            }

        });


    ctaTimeline

        .from(

            '.cta-section h2',

            {

                y:
                    40,

                opacity:
                    0,

                duration:
                    1.05

            }

        )

        .from(

            '.cta-section p',

            {

                y:
                    22,

                opacity:
                    0,

                duration:
                    0.85

            },

            '-=0.55'

        )

        .from(

            '.cta-buttons a',

            {

                y:
                    18,

                opacity:
                    0,

                duration:
                    0.7,

                stagger:
                    0.12

            },

            '-=0.40'

        );


    /* ==================================================
       DESKTOP GALLERY
       SNAP-FREE / SMOOTH SCROLL
    ================================================== */

    function setupDesktopGallery() {

        const stage =
            document.getElementById(
                'gallery-stage'
            );


        const viewport =
            document.getElementById(
                'gallery-viewport'
            );


        const panel1 =
            document.querySelector(
                '.gallery-panel.panel-1'
            );


        const panel2 =
            document.querySelector(
                '.gallery-panel.panel-2'
            );


        const panel3 =
            document.querySelector(
                '.gallery-panel.panel-3'
            );


        if (
            !stage ||
            !viewport ||
            !panel1 ||
            !panel2 ||
            !panel3
        ) {

            return;

        }


        /* ==================================================
           INITIAL POSITIONS
        ================================================== */

        gsap.set(

            panel1,

            {

                xPercent:
                    0,

                y:
                    0,

                force3D:
                    true

            }

        );


        gsap.set(

            panel2,

            {

                xPercent:
                    0,

                y:
                    '100vh',

                force3D:
                    true

            }

        );


        gsap.set(

            panel3,

            {

                xPercent:
                    0,

                y:
                    '100vh',

                force3D:
                    true

            }

        );


        /* ==================================================
           SMOOTH PROGRESS STATE
        ================================================== */

        const galleryState = {

            progress:
                0

        };


        /* ==================================================
           SMOOTH SCROLL FOLLOWER
        ================================================== */

        const smoothGalleryProgress =
            gsap.quickTo(

                galleryState,

                'progress',

                {

                    duration:
                        0.65,

                    ease:
                        'power3.out'

                }

            );


        /* ==================================================
           SCROLLTRIGGER
        ================================================== */

        ScrollTrigger.create({

            id:
                'auren-gallery',

            trigger:
                stage,

            start:
                'top top',

            end:
                'bottom bottom',

            pin:
                viewport,

            pinSpacing:
                true,

            anticipatePin:
                1,

            invalidateOnRefresh:
                true,

            fastScrollEnd:
                false,

            onUpdate:
                self => {

                    smoothGalleryProgress(
                        self.progress
                    );

                }

        });


        /* ==================================================
           EASING FUNCTION
        ================================================== */

        const easeInOut =
            gsap.parseEase(
                'power2.inOut'
            );


        /* ==================================================
           RENDER GALLERY
        ================================================== */

        const renderGallery =
            () => {

                const progress =
                    galleryState.progress;


                /* ==========================================
                   PANEL 1
                ========================================== */

                gsap.set(

                    panel1,

                    {

                        xPercent:
                            0,

                        y:
                            0,

                        force3D:
                            true

                    }

                );


                /* ==========================================
                   PANEL 2
                ========================================== */

                let panel2Progress =
                    gsap.utils.clamp(

                        0,

                        1,

                        progress /
                        0.5

                    );


                panel2Progress =
                    easeInOut(
                        panel2Progress
                    );


                const panel2Y =
                    100 -
                    (
                        panel2Progress *
                        100
                    );


                gsap.set(

                    panel2,

                    {

                        xPercent:
                            0,

                        y:
                            `${panel2Y}vh`,

                        force3D:
                            true

                    }

                );


                /* ==========================================
                   PANEL 3
                ========================================== */

                let panel3Progress =
                    gsap.utils.clamp(

                        0,

                        1,

                        (
                            progress -
                            0.5
                        ) /
                        0.5

                    );


                panel3Progress =
                    easeInOut(
                        panel3Progress
                    );


                const panel3Y =
                    100 -
                    (
                        panel3Progress *
                        100
                    );


                gsap.set(

                    panel3,

                    {

                        xPercent:
                            0,

                        y:
                            `${panel3Y}vh`,

                        force3D:
                            true

                    }

                );

            };


        /* ==================================================
           UPDATE EVERY FRAME
        ================================================== */

        gsap.ticker.add(
            renderGallery
        );

    }


    /* ==================================================
       INITIALIZE GALLERY ONCE
    ================================================== */

    function initializeGallery() {

        const oldTrigger =
            ScrollTrigger.getById(
                'auren-gallery'
            );


        if (
            oldTrigger
        ) {

            oldTrigger.kill();

        }


        setupDesktopGallery();


        ScrollTrigger.refresh();

    }


    /* ==================================================
       WAIT FOR GALLERY IMAGES
    ================================================== */

    function waitForGalleryImages() {

        const images =
            Array.from(

                document.querySelectorAll(
                    '.gallery-panel img'
                )

            );


        if (
            images.length ===
            0
        ) {

            initializeGallery();

            return;

        }


        let remaining =
            images.length;


        let initialized =
            false;


        const finish =
            () => {

                remaining -= 1;


                if (
                    remaining <= 0 &&
                    !initialized
                ) {

                    initialized =
                        true;

                    initializeGallery();

                }

            };


        images.forEach(

            image => {

                if (
                    image.complete
                ) {

                    finish();

                    return;

                }


                image.addEventListener(

                    'load',

                    finish,

                    {

                        once:
                            true

                    }

                );


                image.addEventListener(

                    'error',

                    finish,

                    {

                        once:
                            true

                    }

                );

            }

        );


        /* ==================================================
           SAFETY FALLBACK
        ================================================== */

        setTimeout(

            () => {

                if (
                    !initialized
                ) {

                    initialized =
                        true;

                    initializeGallery();

                }

            },

            2500

        );

    }


    /* ==================================================
       INITIALIZE GALLERY
       WORKS WHETHER PAGE IS ALREADY LOADED OR NOT
    ================================================== */

    if (
        document.readyState ===
        'complete'
    ) {

        waitForGalleryImages();

    }

    else {

        window.addEventListener(

            'load',

            () => {

                waitForGalleryImages();

            },

            {
                once:
                    true
            }

        );

    }


    /* ==================================================
       FOOTER ANIMATION
    ================================================== */

    gsap.fromTo(

        '#footer-container',

        {

            y:
                30,

            opacity:
                0

        },

        {

            y:
                0,

            opacity:
                1,

            duration:
                1,

            scrollTrigger: {

                trigger:
                    '#footer-container',

                start:
                    'top 92%'

            }

        }

    );

}


/* ==================================================
   START DESKTOP ANIMATIONS
================================================== */

initializeDesktopAnimations();