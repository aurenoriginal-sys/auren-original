const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
const PORT = 3000;

app.use(cors());

/* ==================================================
   SERVE HTML, IMAGES, VIDEOS, COMPONENTS, ETC.
================================================== */

app.use(express.static(path.join(__dirname)));


/* ==================================================
   WEDDING PHOTOS
================================================== */

app.get('/api/wedding-photos', (req, res) => {

    const directoryPath = path.join(
        __dirname,
        'images',
        'wedding',
        'photos'
    );

    fs.readdir(directoryPath, (err, files) => {

        if (err) {

            console.error(
                'Could not scan wedding photos:',
                err
            );

            return res.status(500).json({
                error:
                    'Unable to scan wedding photos folder.'
            });
        }

        const images = files.filter(file =>
            /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
        );

        console.log(
            'Wedding photos found:',
            images
        );

        res.json(images);
    });
});


/* ==================================================
   WEDDING VIDEOS
================================================== */

app.get('/api/wedding-videos', (req, res) => {

    const directoryPath = path.join(
        __dirname,
        'images',
        'wedding',
        'videos'
    );

    fs.readdir(directoryPath, (err, files) => {

        if (err) {

            console.error(
                'Could not scan wedding videos:',
                err
            );

            return res.status(500).json({
                error:
                    'Unable to scan wedding videos folder.'
            });
        }

        const videos = files.filter(file =>
            /\.(mp4|webm|ogg|mov)$/i.test(file)
        );

        console.log(
            'Wedding videos found:',
            videos
        );

        res.json(videos);
    });
});


/* ==================================================
   PRE-WEDDING PHOTOS
================================================== */

app.get('/api/pre-wedding-photos', (req, res) => {

    const directoryPath = path.join(
        __dirname,
        'images',
        'pre-wedding',
        'photos'
    );

    fs.readdir(directoryPath, (err, files) => {

        if (err) {

            console.error(
                'Could not scan pre-wedding photos:',
                err
            );

            return res.status(500).json({
                error:
                    'Unable to scan pre-wedding photos folder.'
            });
        }

        const images = files.filter(file =>
            /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
        );

        console.log(
            'Pre-wedding photos found:',
            images
        );

        res.json(images);
    });
});


/* ==================================================
   PRE-WEDDING VIDEOS
================================================== */

app.get('/api/pre-wedding-videos', (req, res) => {

    const directoryPath = path.join(
        __dirname,
        'images',
        'pre-wedding',
        'videos'
    );

    fs.readdir(directoryPath, (err, files) => {

        if (err) {

            console.error(
                'Could not scan pre-wedding videos:',
                err
            );

            return res.status(500).json({
                error:
                    'Unable to scan pre-wedding videos folder.'
            });
        }

        const videos = files.filter(file =>
            /\.(mp4|webm|ogg|mov)$/i.test(file)
        );

        console.log(
            'Pre-wedding videos found:',
            videos
        );

        res.json(videos);
    });
});


/* ==================================================
   FASHION PHOTOS
================================================== */

app.get('/api/fashion-photos', (req, res) => {

    const directoryPath = path.join(
        __dirname,
        'images',
        'fashion',
        'photos'
    );

    fs.readdir(directoryPath, (err, files) => {

        if (err) {

            console.error(
                'Could not scan fashion photos:',
                err
            );

            return res.status(500).json({
                error:
                    'Unable to scan fashion photos folder.'
            });
        }

        const images = files.filter(file =>
            /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
        );

        console.log(
            'Fashion photos found:',
            images
        );

        res.json(images);
    });
});


/* ==================================================
   FASHION VIDEOS
================================================== */

app.get('/api/fashion-videos', (req, res) => {

    const directoryPath = path.join(
        __dirname,
        'images',
        'fashion',
        'videos'
    );

    fs.readdir(directoryPath, (err, files) => {

        if (err) {

            console.error(
                'Could not scan fashion videos:',
                err
            );

            return res.status(500).json({
                error:
                    'Unable to scan fashion videos folder.'
            });
        }

        const videos = files.filter(file =>
            /\.(mp4|webm|ogg|mov)$/i.test(file)
        );

        console.log(
            'Fashion videos found:',
            videos
        );

        res.json(videos);
    });
});

/* ==================================================
   SPORTS PHOTOS
================================================== */

app.get('/api/sports-photos', (req, res) => {

    const directoryPath = path.join(
        __dirname,
        'images',
        'sports',
        'photos'
    );

    fs.readdir(directoryPath, (err, files) => {

        if (err) {

            console.error(
                'Could not scan sports photos:',
                err
            );

            return res.status(500).json({
                error:
                    'Unable to scan sports photos folder.'
            });
        }

        const images = files.filter(file =>
            /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
        );

        console.log(
            'Sports photos found:',
            images
        );

        res.json(images);
    });
});


/* ==================================================
   SPORTS VIDEOS
================================================== */

app.get('/api/sports-videos', (req, res) => {

    const directoryPath = path.join(
        __dirname,
        'images',
        'sports',
        'videos'
    );

    fs.readdir(directoryPath, (err, files) => {

        if (err) {

            console.error(
                'Could not scan sports videos:',
                err
            );

            return res.status(500).json({
                error:
                    'Unable to scan sports videos folder.'
            });
        }

        const videos = files.filter(file =>
            /\.(mp4|webm|ogg|mov)$/i.test(file)
        );

        console.log(
            'Sports videos found:',
            videos
        );

        res.json(videos);
    });
});

/* ==================================================
   CORPORATE PHOTOS
================================================== */

app.get('/api/corporate-photos', (req, res) => {

    const directoryPath = path.join(
        __dirname,
        'images',
        'corporate',
        'photos'
    );

    fs.readdir(directoryPath, (err, files) => {

        if (err) {

            console.error(
                'Could not scan corporate photos:',
                err
            );

            return res.status(500).json({
                error:
                    'Unable to scan corporate photos folder.'
            });
        }

        const images = files.filter(file =>
            /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
        );

        console.log(
            'Corporate photos found:',
            images
        );

        res.json(images);
    });
});


/* ==================================================
   CORPORATE VIDEOS
================================================== */

app.get('/api/corporate-videos', (req, res) => {

    const directoryPath = path.join(
        __dirname,
        'images',
        'corporate',
        'videos'
    );

    fs.readdir(directoryPath, (err, files) => {

        if (err) {

            console.error(
                'Could not scan corporate videos:',
                err
            );

            return res.status(500).json({
                error:
                    'Unable to scan corporate videos folder.'
            });
        }

        const videos = files.filter(file =>
            /\.(mp4|webm|ogg|mov)$/i.test(file)
        );

        console.log(
            'Corporate videos found:',
            videos
        );

        res.json(videos);
    });
});

/* ==================================================
   COMMERCIAL PHOTOS
================================================== */

app.get('/api/commercial-photos', (req, res) => {

    const directoryPath = path.join(
        __dirname,
        'images',
        'commercial',
        'photos'
    );

    fs.readdir(directoryPath, (err, files) => {

        if (err) {

            console.error(
                'Could not scan commercial photos:',
                err
            );

            return res.status(500).json({
                error:
                    'Unable to scan commercial photos folder.'
            });
        }

        const images = files.filter(file =>
            /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
        );

        console.log(
            'Commercial photos found:',
            images
        );

        res.json(images);
    });
});


/* ==================================================
   COMMERCIAL VIDEOS
================================================== */

app.get('/api/commercial-videos', (req, res) => {

    const directoryPath = path.join(
        __dirname,
        'images',
        'commercial',
        'videos'
    );

    fs.readdir(directoryPath, (err, files) => {

        if (err) {

            console.error(
                'Could not scan commercial videos:',
                err
            );

            return res.status(500).json({
                error:
                    'Unable to scan commercial videos folder.'
            });
        }

        const videos = files.filter(file =>
            /\.(mp4|webm|ogg|mov)$/i.test(file)
        );

        console.log(
            'Commercial videos found:',
            videos
        );

        res.json(videos);
    });
});

/* ==================================================
   BRANDING PHOTOS
================================================== */

app.get('/api/branding-photos', (req, res) => {

    const directoryPath = path.join(
        __dirname,
        'images',
        'branding',
        'photos'
    );

    fs.readdir(directoryPath, (err, files) => {

        if (err) {

            console.error(
                'Could not scan branding photos:',
                err
            );

            return res.status(500).json({
                error:
                    'Unable to scan branding photos folder.'
            });
        }

        const images = files.filter(file =>
            /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
        );

        console.log(
            'Branding photos found:',
            images
        );

        res.json(images);

    });

});


/* ==================================================
   BRANDING VIDEOS
================================================== */

app.get('/api/branding-videos', (req, res) => {

    const directoryPath = path.join(
        __dirname,
        'images',
        'branding',
        'videos'
    );

    fs.readdir(directoryPath, (err, files) => {

        if (err) {

            console.error(
                'Could not scan branding videos:',
                err
            );

            return res.status(500).json({
                error:
                    'Unable to scan branding videos folder.'
            });
        }

        const videos = files.filter(file =>
            /\.(mp4|webm|ogg|mov)$/i.test(file)
        );

        console.log(
            'Branding videos found:',
            videos
        );

        res.json(videos);

    });

});

/* ==================================================
   START SERVER
================================================== */
// Your existing routes
// Your existing API code
// Your existing static-file setup

/* ==================================================
   HTML ESCAPE HELPER
================================================== */

function escapeHtml(value) {

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

                        success: false,

                        message:
                            'Please fill all required fields.'

                    });

            }


            /* ==========================================
               RESEND API KEY
            ========================================== */

            const apiKey =
                process.env.RESEND_API_KEY;


            if (!apiKey) {

                console.error(
                    'RESEND_API_KEY is not configured.'
                );

                return res
                    .status(500)
                    .json({

                        success: false,

                        message:
                            'Email service is not configured.'

                    });

            }


            /* ==========================================
               EMAIL CONTENT
            ========================================== */

            const emailText = `

New Project Enquiry

Name: ${name}

Email: ${email}

Phone: ${phone}

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
                        company || 'Not provided'
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
                    ${escapeHtml(message)
                        .replace(
                            /\n/g,
                            '<br>'
                        )}
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

                                /*
                                 * Temporary Resend sender.
                                 * Later, after verifying
                                 * aurenoriginal.in,
                                 * change this to:
                                 *
                                 * hello@aurenoriginal.in
                                 */

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

                        success: false,

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

                    success: true,

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

                    success: false,

                    message:
                        'Unable to send your enquiry.'

                });

        }

    }
);


/* ==================================================
   YOUR EXISTING SERVER START
================================================== */

app.listen(PORT, () => {

    console.log(
        `🚀 Server is running! View your site at: http://localhost:${PORT}`
    );

});

