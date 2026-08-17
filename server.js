const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const nodemailer = require('nodemailer');

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
   CONTACT FORM EMAIL
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
                        message:
                            'Please fill all required fields.'
                    });

            }


            const transporter =
                nodemailer.createTransport({

                    service:
                        'gmail',

                    auth: {

                        user:
                            process.env.EMAIL_USER,

                        pass:
                            process.env.EMAIL_PASS

                    }

                });


            await transporter.sendMail({

                from:
                    process.env.EMAIL_USER,

                to:
                    process.env.CONTACT_RECEIVER,

                replyTo:
                    email,

                subject:
                    `New Project Enquiry - ${name}`,

                text: `

New Project Enquiry

Name: ${name}
Email: ${email}
Phone: ${phone}
Company / Brand: ${company || 'Not provided'}
Project Type: ${projectType}
Estimated Budget: ${budget}
Project Timeline: ${timeline}

Message:
${message}

                `

            });


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
                'Contact email error:',
                error
            );


            return res
                .status(500)
                .json({
                    success:
                        false,

                    message:
                        'Unable to send your message.'
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

