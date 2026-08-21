const express = require('express');
const cors = require('cors');
const path = require('path');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();

const app = express();


/* ==================================================
   SEO FILES
================================================== */

app.get('/sitemap.xml', (req, res) => {

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <url>
        <loc>https://aurenoriginal.in/</loc>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>

    <url>
        <loc>https://aurenoriginal.in/portfolio.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>

    <url>
        <loc>https://aurenoriginal.in/services.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>

    <url>
        <loc>https://aurenoriginal.in/about.html</loc>
        <changefreq>yearly</changefreq>
        <priority>0.7</priority>
    </url>

    <url>
        <loc>https://aurenoriginal.in/contact.html</loc>
        <changefreq>yearly</changefreq>
        <priority>0.8</priority>
    </url>

    <url>
        <loc>https://aurenoriginal.in/wedding.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    <url>
        <loc>https://aurenoriginal.in/fashion.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    <url>
        <loc>https://aurenoriginal.in/sports.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    <url>
        <loc>https://aurenoriginal.in/corporate.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    <url>
        <loc>https://aurenoriginal.in/commercial.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    <url>
        <loc>https://aurenoriginal.in/branding.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

</urlset>`;


    return res
        .status(200)
        .type('application/xml')
        .send(sitemap);

});


app.get('/robots.txt', (req, res) => {

    const robots = `User-agent: *
Allow: /

Sitemap: https://aurenoriginal.in/sitemap.xml`;


    return res
        .status(200)
        .type('text/plain')
        .send(robots);

});


/* ==================================================
   SERVER
================================================== */

const PORT =
    process.env.PORT || 3000;


app.use(
    express.json({
        limit: '1mb'
    })
);


app.use(
    cors()
);


/* ==================================================
   STATIC WEBSITE FILES
================================================== */

app.use(
    express.static(
        path.join(__dirname)
    )
);


/* ==================================================
   CLOUDINARY CONFIGURATION
================================================== */

cloudinary.config({

    cloud_name:
        process.env.CLOUDINARY_CLOUD_NAME,

    api_key:
        process.env.CLOUDINARY_API_KEY,

    api_secret:
        process.env.CLOUDINARY_API_SECRET

});


/* ==================================================
   CLOUDINARY ROOT ASSET FOLDER
================================================== */

const CLOUDINARY_ROOT_FOLDER =
    'auren';


/* ==================================================
   PERFORMANCE SETTINGS
================================================== */

const IMAGE_MAX_WIDTH =
    1600;


const GALLERY_IMAGE_MAX_WIDTH =
    1400;


const VIDEO_MAX_WIDTH =
    1280;


/* ==================================================
   CLOUDINARY ASSET CACHE
   PERFORMANCE OPTIMIZATION
================================================== */

const ASSET_CACHE_TTL =
    5 * 60 * 1000; // 5 minutes


const assetFolderCache =
    new Map();


const assetFolderPending =
    new Map();


/* ==================================================
   CLEAR CLOUDINARY ASSET CACHE
================================================== */

function clearAssetCache() {

    assetFolderCache.clear();

    console.log(
        'Cloudinary asset cache cleared.'
    );

}


/* ==================================================
   GALLERY CONFIGURATION
================================================== */

const GALLERY_CONFIG = {

    branding: {

        name:
            'Branding',

        folder:
            'branding'

    },


    commercial: {

        name:
            'Commercial',

        folder:
            'commercial'

    },


    corporate: {

        name:
            'Corporate',

        folder:
            'corporate'

    },


    fashion: {

        name:
            'Fashion',

        folder:
            'fashion'

    },


    sports: {

        name:
            'Sports',

        folder:
            'sports'

    },


    wedding: {

        name:
            'Wedding',

        folder:
            'wedding'

    },


    'pre-wedding': {

        name:
            'Pre-Wedding',

        folder:
            'pre-wedding'

    }

};


/* ==================================================
   SHARED ROOT ASSETS
================================================== */

const ROOT_ASSETS = {

    logo:
        'logo.png',


    heroBranding:
        'hero-branding.jpg',


    heroCommercial:
        'hero-commercial.jpg',


    heroCorporate:
        'hero-corporate.jpg',


    heroFashion:
        'hero-fashion.jpg',


    heroHome:
        'hero-image.jpg',


    heroPreWedding:
        'hero-pre-wedding.jpg',


    heroSports:
        'hero-sports.jpg',


    heroWedding:
        'hero-wedding.jpg',


    aboutGallery1:
        'about-gallery-1.jpg',


    aboutGallery2:
        'about-gallery-2.jpg',


    aboutGallery3:
        'about-gallery-3.jpg',


    aboutGallery4:
        'about-gallery-4.jpg',


    aboutGallery5:
        'about-gallery-5.jpg',


    branding1:
        'branding1-image.jpg',


    commercial1:
        'commercial1-image.JPG',


    corporate1:
        'corporate1-image.jpg',


    fashion1:
        'fashion1-image.jpg',


    founder:
        'founder.jpg',


    gallery1:
        'gallery-1.jpg',


    gallery2:
        'gallery-2.jpg',


    gallery3:
        'gallery-3.jpg',


    industryArchitecture:
        'industry-architecture.jpg',


    industryCommercial:
        'industry-commercial.jpg',


    industryCorporate:
        'industry-corporate.jpg',


    industryEcommerce:
        'industry-ecommerce.jpg',


    industryFashion:
        'industry-fashion.jpg',


    industryHospitality:
        'industry-hospitality.jpg',


    industrySports:
        'industry-sports.jpg',


    industryWeddings:
        'industry-weddings.jpg',


    serviceBranding:
        'service-branding.jpg',


    serviceCreativeDirection:
        'service-creative-direction.jpg',


    serviceDigitalMarketing:
        'service-digital-marketing.jpg',


    servicePhotography:
        'service-photography.jpg',


    sports1:
        'sports1-image.jpg',


    transitionCta:
        'transition-cta.jpg',


    transitionImage:
        'transition-image.jpg',


    wedding1:
        'wedding1-image.jpg',


    wedding2:
        'wedding2-image.jpg'

};


/* ==================================================
   CLOUDINARY CONFIG VALIDATION
================================================== */

function validateCloudinaryConfig() {

    const missing = [];


    if (
        !process.env.CLOUDINARY_CLOUD_NAME
    ) {

        missing.push(
            'CLOUDINARY_CLOUD_NAME'
        );

    }


    if (
        !process.env.CLOUDINARY_API_KEY
    ) {

        missing.push(
            'CLOUDINARY_API_KEY'
        );

    }


    if (
        !process.env.CLOUDINARY_API_SECRET
    ) {

        missing.push(
            'CLOUDINARY_API_SECRET'
        );

    }


    if (
        missing.length > 0
    ) {

        console.warn(
            'Missing Cloudinary variables:',
            missing.join(', ')
        );


        return false;

    }


    return true;

}


/* ==================================================
   GET ASSETS FROM ASSET FOLDER
   WITH SERVER-SIDE CACHE
================================================== */

async function getAssetsFromFolder(
    assetFolder
) {

    if (
        !validateCloudinaryConfig()
    ) {

        throw new Error(
            'Cloudinary is not configured.'
        );

    }


    /* ==================================================
       CHECK CACHE
    ================================================== */

    const cached =
        assetFolderCache.get(
            assetFolder
        );


    const now =
        Date.now();


    if (
        cached &&
        now - cached.timestamp <
        ASSET_CACHE_TTL
    ) {

        return cached.resources;

    }


    /* ==================================================
       PREVENT DUPLICATE CLOUDINARY REQUESTS
       WHEN MULTIPLE REQUESTS ARRIVE AT ONCE
    ================================================== */

    const existingRequest =
        assetFolderPending.get(
            assetFolder
        );


    if (
        existingRequest
    ) {

        return existingRequest;

    }


    /* ==================================================
       FETCH FROM CLOUDINARY
    ================================================== */

    const request =
        (async () => {

            const resources = [];

            let nextCursor =
                undefined;


            try {

                do {

                    const options = {

                        max_results:
                            500

                    };


                    if (
                        nextCursor
                    ) {

                        options.next_cursor =
                            nextCursor;

                    }


                    const result =
                        await cloudinary.api.resources_by_asset_folder(
                            assetFolder,
                            options
                        );


                    if (
                        Array.isArray(
                            result.resources
                        )
                    ) {

                        resources.push(
                            ...result.resources
                        );

                    }


                    nextCursor =
                        result.next_cursor;

                }

                while (
                    nextCursor
                );


                /* ==========================================
                   STORE RESULT IN CACHE
                ========================================== */

                assetFolderCache.set(

                    assetFolder,

                    {

                        resources:
                            resources,

                        timestamp:
                            Date.now()

                    }

                );


                console.log(
                    `Cloudinary cache refreshed: ${assetFolder} (${resources.length} assets)`
                );


                return resources;

            }

            finally {

                assetFolderPending.delete(
                    assetFolder
                );

            }

        })();


    assetFolderPending.set(
        assetFolder,
        request
    );


    return request;

}


/* ==================================================
   OPTIMIZED CLOUDINARY URL
   VERSION-AWARE
================================================== */

function buildOptimizedCloudinaryUrl(
    resource,
    maxWidth
) {

    if (
        !resource
    ) {

        return null;

    }


    if (
        !resource.public_id
    ) {

        return resource.secure_url || null;

    }


    /* ==========================================
       IMAGE
    ========================================== */

    if (
        resource.resource_type ===
        'image'
    ) {

        return cloudinary.url(
            resource.public_id,
            {

                secure:
                    true,

                resource_type:
                    'image',

                version:
                    resource.version,

                transformation: [

                    {
                        width:
                            maxWidth,

                        crop:
                            'limit'
                    },

                    {
                        quality:
                            'auto'
                    },

                    {
                        fetch_format:
                            'auto'
                    }

                ]

            }
        );

    }


    /* ==========================================
       VIDEO
    ========================================== */

    if (
        resource.resource_type ===
        'video'
    ) {

        return cloudinary.url(
            resource.public_id,
            {

                secure:
                    true,

                resource_type:
                    'video',

                version:
                    resource.version,

                transformation: [

                    {
                        width:
                            maxWidth,

                        crop:
                            'limit'
                    },

                    {
                        quality:
                            'auto'
                    },

                    {
                        fetch_format:
                            'auto'
                    }

                ]

            }

        );

    }


    return resource.secure_url || null;

}


/* ==================================================
   ORIGINAL VERSIONED CLOUDINARY URL
================================================== */

function buildOriginalCloudinaryUrl(
    resource
) {

    if (
        !resource
    ) {

        return null;

    }


    if (
        !resource.public_id
    ) {

        return resource.secure_url || null;

    }


    return cloudinary.url(
        resource.public_id,
        {

            secure:
                true,

            resource_type:
                resource.resource_type,

            version:
                resource.version

        }

    );

}


/* ==================================================
   MEDIA RESPONSE
================================================== */

function formatMedia(
    resources
) {

    return resources

        .map(
            resource => {

                const optimizedUrl =
                    buildOptimizedCloudinaryUrl(
                        resource,

                        resource.resource_type ===
                        'video'
                            ? VIDEO_MAX_WIDTH
                            : GALLERY_IMAGE_MAX_WIDTH
                    );


                const originalUrl =
                    buildOriginalCloudinaryUrl(
                        resource
                    );


                return {

                    url:
                        optimizedUrl,

                    secure_url:
                        optimizedUrl,

                    original_url:
                        originalUrl,

                    public_id:
                        resource.public_id,

                    display_name:
                        resource.display_name,

                    format:
                        resource.format,

                    resource_type:
                        resource.resource_type,

                    bytes:
                        resource.bytes,

                    width:
                        resource.width,

                    height:
                        resource.height,

                    version:
                        resource.version

                };

            }

        )

        .sort(
            (
                first,
                second
            ) => {

                return String(
                    first.display_name ||
                    first.public_id ||
                    ''
                )
                .localeCompare(
                    String(
                        second.display_name ||
                        second.public_id ||
                        ''
                    ),
                    undefined,
                    {

                        numeric:
                            true,

                        sensitivity:
                            'base'

                    }

                );

            }

        );

}


/* ==================================================
   FIND FILE NAME
================================================== */

function getResourceFileName(
    resource
) {

    const displayName =
        String(
            resource.display_name ||
            ''
        )
        .trim();


    const publicId =
        String(
            resource.public_id ||
            ''
        )
        .split('/')
        .pop()
        .trim();


    const format =
        String(
            resource.format ||
            ''
        )
        .trim();


    if (
        displayName
    ) {

        return displayName;

    }


    if (
        publicId
    ) {

        if (
            format &&
            !publicId
                .toLowerCase()
                .endsWith(
                    `.${format.toLowerCase()}`
                )
        ) {

            return `${publicId}.${format}`;

        }


        return publicId;

    }


    return '';

}


/* ==================================================
   ROOT ASSET FINDER
================================================== */

async function getRootAsset(
    filename
) {

    const resources =
        await getAssetsFromFolder(
            CLOUDINARY_ROOT_FOLDER
        );


    const requestedName =
        String(
            filename
        )
        .trim()
        .toLowerCase();


    const requestedBaseName =
        requestedName
            .replace(
                /\.[^.]+$/,
                ''
            );


    const asset =
        resources.find(
            resource => {

                const fileName =
                    getResourceFileName(
                        resource
                    )
                    .toLowerCase();


                const baseName =
                    fileName
                        .replace(
                            /\.[^.]+$/,
                            ''
                        );


                const publicId =
                    String(
                        resource.public_id ||
                        ''
                    )
                    .split('/')
                    .pop()
                    .toLowerCase()
                    .replace(
                        /\.[^.]+$/,
                        ''
                    );


                return (

                    fileName ===
                    requestedName

                    ||

                    baseName ===
                    requestedBaseName

                    ||

                    publicId ===
                    requestedBaseName

                );

            }

        );


    return asset || null;

}


/* ==================================================
   OPTIMIZED HOMEPAGE HERO
   DIRECT IMAGE ENDPOINT
================================================== */

app.get(
    '/optimized/hero-home',
    async (req, res) => {

        try {

            const hero =
                await getRootAsset(
                    ROOT_ASSETS.heroHome
                );


            if (
                !hero
            ) {

                return res
                    .status(404)
                    .send(
                        'Homepage hero image not found.'
                    );

            }


            let requestedWidth =
                Number(
                    req.query.w
                );


            if (
                !Number.isFinite(
                    requestedWidth
                )
            ) {

                requestedWidth =
                    1600;

            }


            const allowedWidths = [

                480,

                768,

                1024,

                1280,

                1600

            ];


            const width =
                allowedWidths.reduce(

                    (
                        closest,
                        current
                    ) => {

                        return Math.abs(
                            current -
                            requestedWidth
                        )
                        <
                        Math.abs(
                            closest -
                            requestedWidth
                        )

                            ? current

                            : closest;

                    },

                    allowedWidths[0]

                );


            const optimizedUrl =
                cloudinary.url(

                    hero.public_id,

                    {

                        secure:
                            true,

                        resource_type:
                            'image',

                        version:
                            hero.version,

                        transformation: [

                            {

                                width:
                                    width,

                                crop:
                                    'limit'

                            },

                            {

                                quality:
                                    'auto'

                            },

                            {

                                fetch_format:
                                    'auto'

                            }

                        ]

                    }

                );


            /*
             * IMPORTANT:
             *
             * We are returning the optimized
             * Cloudinary URL as JSON instead of
             * redirecting the browser with 302.
             */

            res.set(

                'Cache-Control',

                'public, max-age=300'

            );


            return res.json({

                url:
                    optimizedUrl,

                secure_url:
                    optimizedUrl,

                width:
                    width,

                version:
                    hero.version

            });

        }

        catch (
            error
        ) {

            console.error(

                'Optimized hero error:',

                error

            );


            return res

                .status(
                    500
                )

                .json({

                    error:
                        'Unable to load homepage hero.'

                });

        }

    }
);


/* ==================================================
   ROOT ASSET RESPONSE
================================================== */

function formatRootAsset(
    resource
) {

    if (
        !resource
    ) {

        return null;

    }


    const optimizedUrl =
        buildOptimizedCloudinaryUrl(
            resource,
            IMAGE_MAX_WIDTH
        );


    const originalUrl =
        buildOriginalCloudinaryUrl(
            resource
        );


    return {

        url:
            optimizedUrl,

        secure_url:
            optimizedUrl,

        original_url:
            originalUrl,

        public_id:
            resource.public_id,

        display_name:
            resource.display_name,

        format:
            resource.format,

        resource_type:
            resource.resource_type,

        bytes:
            resource.bytes,

        width:
            resource.width,

        height:
            resource.height,

        version:
            resource.version

    };

}


/* ==================================================
   ROOT ASSET API
================================================== */

app.get(
    '/api/root-assets',
    async (req, res) => {

        try {

            const resources =
                await getAssetsFromFolder(
                    CLOUDINARY_ROOT_FOLDER
                );


            return res.json(
                formatMedia(
                    resources
                )
            );

        }

        catch (error) {

            console.error(
                'Root assets error:',
                error
            );


            return res
                .status(500)
                .json({

                    error:
                        'Unable to load root assets.'

                });

        }

    }
);


/* ==================================================
   GENERIC ROOT ASSET API
================================================== */

app.get(
    '/api/root-asset/:filename',
    async (req, res) => {

        try {

            const fileName =
                decodeURIComponent(
                    req.params.filename
                );


            const asset =
                await getRootAsset(
                    fileName
                );


            if (
                !asset
            ) {

                return res
                    .status(404)
                    .json({

                        error:
                            `Root asset not found: ${fileName}`

                    });

            }


            return res.json(
                formatRootAsset(
                    asset
                )
            );

        }

        catch (error) {

            console.error(
                'Root asset lookup error:',
                error
            );


            return res
                .status(500)
                .json({

                    error:
                        'Unable to load root asset.'

                });

        }

    }
);


/* ==================================================
   SITE LOGO
   OPTIMIZED FOR NAVBAR / FOOTER
================================================== */

app.get(
    '/api/site-logo',
    async (req, res) => {

        try {

            const logo =
                await getRootAsset(
                    ROOT_ASSETS.logo
                );


            if (!logo) {

                return res
                    .status(404)
                    .json({

                        error:
                            'Logo not found in Cloudinary.'

                    });

            }


            const optimizedLogoUrl =
                cloudinary.url(
                    logo.public_id,
                    {

                        secure:
                            true,

                        resource_type:
                            'image',

                        version:
                            logo.version,

                        transformation: [

                            {
                                width:
                                    320,

                                height:
                                    160,

                                crop:
                                    'limit'
                            },

                            {
                                quality:
                                    'auto'
                            },

                            {
                                fetch_format:
                                    'auto'
                            }

                        ]

                    }
                );


            /*
             * Versioned Cloudinary URL means
             * the browser can cache this safely.
             */

            res.set(
                'Cache-Control',
                'public, max-age=3600, immutable'
            );


            return res.json({

                url:
                    optimizedLogoUrl,

                secure_url:
                    optimizedLogoUrl,

                original_url:
                    logo.secure_url,

                public_id:
                    logo.public_id,

                display_name:
                    logo.display_name,

                format:
                    logo.format,

                resource_type:
                    logo.resource_type,

                version:
                    logo.version

            });

        }

        catch (error) {

            console.error(
                'Site logo error:',
                error
            );


            return res
                .status(500)
                .json({

                    error:
                        'Unable to load site logo.'

                });

        }

    }
);

/* ==================================================
   GENERIC HERO API HELPER
================================================== */

async function sendHeroAsset(
    filename,
    req,
    res
) {

    try {

        const hero =
            await getRootAsset(
                filename
            );


        if (
            !hero
        ) {

            return res
                .status(404)
                .json({

                    error:
                        `Hero asset not found: ${filename}`

                });

        }


        console.log(
            `Hero found (${filename}):`,
            hero.secure_url
        );


        console.log(
            `Hero version (${filename}):`,
            hero.version
        );


        return res.json(
            formatRootAsset(
                hero
            )
        );

    }

    catch (error) {

        console.error(
            `Hero error (${filename}):`,
            error
        );


        return res
            .status(500)
            .json({

                error:
                    `Unable to load hero asset: ${filename}`

            });

    }

}


/* ==================================================
   HERO ROUTES
================================================== */

app.get(
    '/api/hero-branding',
    (req, res) =>
        sendHeroAsset(
            ROOT_ASSETS.heroBranding,
            req,
            res
        )
);


app.get(
    '/api/hero-commercial',
    (req, res) =>
        sendHeroAsset(
            ROOT_ASSETS.heroCommercial,
            req,
            res
        )
);


app.get(
    '/api/hero-corporate',
    (req, res) =>
        sendHeroAsset(
            ROOT_ASSETS.heroCorporate,
            req,
            res
        )
);


app.get(
    '/api/hero-fashion',
    (req, res) =>
        sendHeroAsset(
            ROOT_ASSETS.heroFashion,
            req,
            res
        )
);


app.get(
    '/api/hero-sports',
    (req, res) =>
        sendHeroAsset(
            ROOT_ASSETS.heroSports,
            req,
            res
        )
);


app.get(
    '/api/hero-wedding',
    (req, res) =>
        sendHeroAsset(
            ROOT_ASSETS.heroWedding,
            req,
            res
        )
);


app.get(
    '/api/hero-pre-wedding',
    (req, res) =>
        sendHeroAsset(
            ROOT_ASSETS.heroPreWedding,
            req,
            res
        )
);


app.get(
    '/api/hero-home',
    (req, res) =>
        sendHeroAsset(
            ROOT_ASSETS.heroHome,
            req,
            res
        )
);


/* ==================================================
   GALLERY PHOTOS
================================================== */

async function getGalleryPhotos(
    galleryKey,
    req,
    res
) {

    const config =
        GALLERY_CONFIG[
            galleryKey
        ];


    try {

        const assetFolder =
            `${CLOUDINARY_ROOT_FOLDER}/` +
            `${config.folder}/photos`;


        console.log(
            `Searching ${config.name} photos in:`,
            assetFolder
        );


        const resources =
            await getAssetsFromFolder(
                assetFolder
            );


        const photos =
            resources.filter(
                resource =>
                    resource.resource_type ===
                    'image'
            );


        console.log(
            `${config.name} photos found:`,
            photos.length
        );


        return res.json(
            formatMedia(
                photos
            )
        );

    }

    catch (error) {

        console.error(
            `${config.name} photos error:`,
            error
        );


        return res
            .status(500)
            .json({

                error:
                    `Unable to load ${config.name} photos.`

            });

    }

}


/* ==================================================
   GALLERY VIDEOS
================================================== */

async function getGalleryVideos(
    galleryKey,
    req,
    res
) {

    const config =
        GALLERY_CONFIG[
            galleryKey
        ];


    try {

        const assetFolder =
            `${CLOUDINARY_ROOT_FOLDER}/` +
            `${config.folder}/videos`;


        console.log(
            `Searching ${config.name} videos in:`,
            assetFolder
        );


        const resources =
            await getAssetsFromFolder(
                assetFolder
            );


        const videos =
            resources.filter(
                resource =>
                    resource.resource_type ===
                    'video'
            );


        console.log(
            `${config.name} videos found:`,
            videos.length
        );


        return res.json(
            formatMedia(
                videos
            )
        );

    }

    catch (error) {

        console.error(
            `${config.name} videos error:`,
            error
        );


        return res
            .status(500)
            .json({

                error:
                    `Unable to load ${config.name} videos.`

            });

    }

}


/* ==================================================
   GALLERY ROUTES
================================================== */

Object.keys(
    GALLERY_CONFIG
)
.forEach(
    galleryKey => {

        /* ==========================================
           PHOTOS
        ========================================== */

        app.get(
            `/api/${galleryKey}-photos`,
            (req, res) => {

                return getGalleryPhotos(
                    galleryKey,
                    req,
                    res
                );

            }
        );


        /* ==========================================
           VIDEOS
        ========================================== */

        app.get(
            `/api/${galleryKey}-videos`,
            (req, res) => {

                return getGalleryVideos(
                    galleryKey,
                    req,
                    res
                );

            }
        );


        /* ==========================================
           HERO
        ========================================== */

        app.get(
            `/api/${galleryKey}-hero`,
            async (req, res) => {

                const heroMap = {

                    branding:
                        ROOT_ASSETS.heroBranding,

                    commercial:
                        ROOT_ASSETS.heroCommercial,

                    corporate:
                        ROOT_ASSETS.heroCorporate,

                    fashion:
                        ROOT_ASSETS.heroFashion,

                    sports:
                        ROOT_ASSETS.heroSports,

                    wedding:
                        ROOT_ASSETS.heroWedding,

                    'pre-wedding':
                        ROOT_ASSETS.heroPreWedding

                };


                const heroFile =
                    heroMap[
                        galleryKey
                    ];


                if (
                    !heroFile
                ) {

                    return res
                        .status(404)
                        .json({

                            error:
                                'Hero configuration not found.'

                        });

                }


                return sendHeroAsset(
                    heroFile,
                    req,
                    res
                );

            }

        );

    }
);


/* ==================================================
   HTML ESCAPE HELPER
================================================== */

function escapeHtml(
    value
) {

    return String(value)

        .replace(
            /&/g,
            '&amp;'
        )

        .replace(
            /</g,
            '&lt;'
        )

        .replace(
            />/g,
            '&gt;'
        )

        .replace(
            /"/g,
            '&quot;'
        )

        .replace(
            /'/g,
            '&#039;'
        );

}


/* ==================================================
   CONTACT FORM - RESEND
================================================== */

app.post(
    '/api/contact',
    async (req, res) => {

        try {

            const {

                name,

                email,

                phone,

                company,

                projectType,

                budget,

                timeline,

                message

            } = req.body;


            /* ==========================================
               VALIDATION
            ========================================== */

            if (

                !name ||

                !email ||

                !phone ||

                !projectType ||

                !budget ||

                !timeline ||

                !message

            ) {

                return res
                    .status(400)
                    .json({

                        success:
                            false,

                        message:
                            'Please fill all required fields.'

                    });

            }


            /* ==========================================
               RESEND API KEY
            ========================================== */

            const apiKey =
                process.env.RESEND_API_KEY;


            if (
                !apiKey
            ) {

                console.error(
                    'RESEND_API_KEY is not configured.'
                );


                return res
                    .status(500)
                    .json({

                        success:
                            false,

                        message:
                            'Email service is not configured.'

                    });

            }


            /* ==========================================
               EMAIL TEXT
            ========================================== */

            const emailText = `

New Project Enquiry

Name:
${name}

Email:
${email}

Phone:
${phone}

Company / Brand:
${company || 'Not provided'}

Project Type:
${projectType}

Estimated Budget:
${budget}

Project Timeline:
${timeline}

Message:
${message}

`;


            /* ==========================================
               EMAIL HTML
            ========================================== */

            const emailHtml = `

                <h2>
                    New Project Enquiry
                </h2>

                <hr>

                <p>
                    <strong>Name:</strong>
                    ${escapeHtml(name)}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${escapeHtml(email)}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${escapeHtml(phone)}
                </p>

                <p>
                    <strong>Company / Brand:</strong>
                    ${escapeHtml(
                        company ||
                        'Not provided'
                    )}
                </p>

                <p>
                    <strong>Project Type:</strong>
                    ${escapeHtml(
                        projectType
                    )}
                </p>

                <p>
                    <strong>Estimated Budget:</strong>
                    ${escapeHtml(
                        budget
                    )}
                </p>

                <p>
                    <strong>Project Timeline:</strong>
                    ${escapeHtml(
                        timeline
                    )}
                </p>

                <h3>
                    Message
                </h3>

                <p>
                    ${
                        escapeHtml(
                            message
                        )
                        .replace(
                            /\n/g,
                            '<br>'
                        )
                    }
                </p>

            `;


            /* ==========================================
               SEND THROUGH RESEND
            ========================================== */

            const response =
                await fetch(
                    'https://api.resend.com/emails',
                    {

                        method:
                            'POST',

                        headers: {

                            'Content-Type':
                                'application/json',

                            'Authorization':
                                `Bearer ${apiKey}`

                        },

                        body:
                            JSON.stringify({

                                from:
                                    'Auren Originals <onboarding@resend.dev>',

                                to:
                                    [
                                        'aurenoriginal@gmail.com'
                                    ],

                                reply_to:
                                    email,

                                subject:
                                    `New Project Enquiry - ${name}`,

                                text:
                                    emailText,

                                html:
                                    emailHtml

                            })

                    }
                );


            const result =
                await response.json();


            /* ==========================================
               RESEND ERROR
            ========================================== */

            if (
                !response.ok
            ) {

                console.error(
                    'Resend API error:',
                    result
                );


                return res
                    .status(502)
                    .json({

                        success:
                            false,

                        message:
                            'Unable to send your enquiry.'

                    });

            }


            /* ==========================================
               SUCCESS
            ========================================== */

            console.log(
                'Contact email sent:',
                result.id
            );


            return res
                .status(200)
                .json({

                    success:
                        true,

                    message:
                        'Message sent successfully.'

                });

        }

        catch (error) {

            console.error(
                'Contact form error:',
                error
            );


            return res
                .status(500)
                .json({

                    success:
                        false,

                    message:
                        'Unable to send your enquiry.'

                });

        }

    }
);


/* ==================================================
   CACHE STATUS
   TEMPORARY PERFORMANCE DIAGNOSTIC
================================================== */

app.get(
    '/api/cache-status',
    (req, res) => {

        const cache = [];


        for (
            const [
                folder,
                value
            ] of assetFolderCache.entries()
        ) {

            cache.push({

                folder:
                    folder,

                assets:
                    value.resources.length,

                ageSeconds:
                    Math.round(
                        (
                            Date.now() -
                            value.timestamp
                        ) / 1000
                    )

            });

        }


        return res.json({

            ttlSeconds:
                ASSET_CACHE_TTL / 1000,

            folders:
                cache

        });

    }
);

/* ==================================================
   SITE LOGO
================================================== */

app.get(
    '/api/site-logo',
    async (req, res) => {

        try {

            const logo =
                await getRootAsset(
                    ROOT_ASSETS.logo
                );


            if (!logo) {

                return res
                    .status(404)
                    .json({

                        error:
                            'Logo not found in Cloudinary.'

                    });

            }


            return res.json(
                formatRootAsset(
                    logo
                )
            );

        }

        catch (error) {

            console.error(
                'Site logo error:',
                error
            );


            return res
                .status(500)
                .json({

                    error:
                        'Unable to load site logo.'

                });

        }

    }
);

/* ==================================================
   CUSTOM 404
================================================== */

app.use(
    (req, res) => {

        return res
            .status(404)
            .sendFile(
                path.join(
                    __dirname,
                    '404.html'
                )
            );

    }
);


/* ==================================================
   SERVER START
================================================== */

app.listen(
    PORT,
    () => {

        console.log(
            `🚀 Server is running! View your site at: http://localhost:${PORT}`
        );

    }
);