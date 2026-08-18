const express = require('express');
const cors = require('cors');
const path = require('path');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();

const app = express();


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


app.use(cors());


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
   GALLERY CONFIGURATION
================================================== */

const GALLERY_CONFIG = {

    branding: {
        name: 'Branding',
        folder: 'branding'
    },

    commercial: {
        name: 'Commercial',
        folder: 'commercial'
    },

    corporate: {
        name: 'Corporate',
        folder: 'corporate'
    },

    fashion: {
        name: 'Fashion',
        folder: 'fashion'
    },

    sports: {
        name: 'Sports',
        folder: 'sports'
    },

    wedding: {
        name: 'Wedding',
        folder: 'wedding'
    },

    'pre-wedding': {
        name: 'Pre-Wedding',
        folder: 'pre-wedding'
    }

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
   GET ASSETS FROM AN ASSET FOLDER
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


    const resources = [];

    let nextCursor =
        undefined;


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


    return resources;

}


/* ==================================================
   MEDIA RESPONSE FORMAT
================================================== */

function formatMedia(
    resources
) {

    return resources

        .map(
            resource => {

                return {

                    url:
                        resource.secure_url,

                    secure_url:
                        resource.secure_url,

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
                        resource.height

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
   FIND HERO IMAGE
   HERO IMAGES ARE DIRECTLY INSIDE:
   auren/
================================================== */

async function findHeroImage(
    galleryKey
) {

    const config =
        GALLERY_CONFIG[
            galleryKey
        ];


    const resources =
        await getAssetsFromFolder(
            CLOUDINARY_ROOT_FOLDER
        );


    const expectedHeroName =
        `hero-${config.folder}`;


    console.log(
        `Looking for hero: ${expectedHeroName}`
    );


    const hero =
        resources.find(
            resource => {

                const publicId =
                    String(
                        resource.public_id ||
                        ''
                    )
                    .split('/')
                    .pop()
                    .toLowerCase();


                const displayName =
                    String(
                        resource.display_name ||
                        ''
                    )
                    .toLowerCase();


                return (

                    publicId ===
                    expectedHeroName.toLowerCase()

                    ||

                    displayName
                        .startsWith(
                            expectedHeroName
                                .toLowerCase()
                        )

                );

            }
        );


    if (
        hero
    ) {

        console.log(
            `${config.name} hero found:`,
            hero.secure_url
        );


        return hero;

    }


    console.warn(
        `${config.name} hero not found.`
    );


    return null;

}


/* ==================================================
   GALLERY API ROUTES
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

                const config =
                    GALLERY_CONFIG[
                        galleryKey
                    ];


                try {

                    const hero =
                        await findHeroImage(
                            galleryKey
                        );


                    if (
                        !hero
                    ) {

                        return res
                            .status(404)
                            .json({

                                error:
                                    `${config.name} hero image not found.`

                            });

                    }


                    return res.json({

                        url:
                            hero.secure_url,

                        secure_url:
                            hero.secure_url,

                        public_id:
                            hero.public_id,

                        display_name:
                            hero.display_name

                    });

                }

                catch (error) {

                    console.error(
                        `${config.name} hero error:`,
                        error
                    );


                    return res
                        .status(500)
                        .json({

                            error:
                                `Unable to load ${config.name} hero image.`

                        });

                }

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
                    ${escapeHtml(projectType)}
                </p>

                <p>
                    <strong>Estimated Budget:</strong>
                    ${escapeHtml(budget)}
                </p>

                <p>
                    <strong>Project Timeline:</strong>
                    ${escapeHtml(timeline)}
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