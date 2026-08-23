/* ==================================================
   AUREN ORIGINALS
   CONTACT PAGE JAVASCRIPT
================================================== */


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


        if (!response.ok) {

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


        if (!container) {

            throw new Error(
                `Container not found: #${elementId}`
            );

        }


        container.innerHTML =
            html;


        return true;

    }

    catch (error) {

        console.error(
            `Component loading error (${url}):`,
            error
        );


        return false;

    }

}


/* ==================================================
   LOAD SITE CONFIG SCRIPT
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
                '/js/site-config.js?v=3';


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
   LOAD NAVBAR
================================================== */

const navbarLoaded =
    loadComponent(
        'components/navbar.html',
        'navbar-container'
    );


/* ==================================================
   LOAD FOOTER
================================================== */

const footerLoaded =
    loadComponent(
        'components/footer.html',
        'footer-container'
    );


/* ==================================================
   LOAD SCROLL TO TOP
================================================== */

const scrollTopLoaded =
    loadComponent(
        'components/scroll-to-top.html',
        'scroll-to-top-container'
    );


/* ==================================================
   LOAD FINAL CTA
================================================== */

const finalCtaLoaded =
    loadComponent(
        'components/cta-buttons.html',
        'final-cta-buttons'
    );


/* ==================================================
   INITIALIZE SHARED SITE
================================================== */

async function initializeSite() {

    try {

        const [
            navbarReady,
            footerReady,
            scrollTopReady,
            finalCtaReady
        ] =
            await Promise.all([
                navbarLoaded,
                footerLoaded,
                scrollTopLoaded,
                finalCtaLoaded
            ]);


        if (
            !navbarReady
            ||
            !footerReady
            ||
            !scrollTopReady
            ||
            !finalCtaReady
        ) {

            throw new Error(
                'One or more Contact shared components failed to load.'
            );

        }


        await loadSiteConfigScript();


        await window.AurenSite.initialize();


        document
            .querySelectorAll(
                '.nav-links a[data-page="contact"], .mobile-nav-links a[data-page="contact"]'
            )
            .forEach(
                link => {

                    link.classList.add(
                        'active'
                    );

                }
            );


        console.log(
            'Contact site initialized.'
        );

    }

    catch (error) {

        console.error(
            'Contact site initialization error:',
            error
        );

    }

}


/* ==================================================
   LOAD CONTACT DATA
================================================== */

async function loadContactContent() {

    try {

        const response =
            await fetch(
                '/data/contact.json',
                {
                    cache:
                        'no-store'
                }
            );


        if (!response.ok) {

            throw new Error(
                `Contact content request failed: HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        if (
            !data
            ||
            typeof data !== 'object'
        ) {

            throw new Error(
                'Invalid Contact page configuration.'
            );

        }


        renderHero(
            data.hero
        );


        renderForm(
            data.form
        );


        renderReach(
            data.reach
        );


        renderFaq(
            data.faq
        );


        renderProcess(
            data.process
        );


        renderFinalCta(
            data.finalCta
        );


        renderBackgroundAsset(
            data.assets
        );


        console.log(
            'Contact content loaded.'
        );

    }

    catch (error) {

        console.error(
            'Contact content loading error:',
            error
        );

    }

}


/* ==================================================
   HERO
================================================== */

function renderHero(
    hero
) {

    if (
        !hero
    ) {

        return;

    }


    const title =
        document.querySelector(
            '.contact-hero h1'
        );


    const description =
        document.querySelector(
            '.contact-hero-copy'
        );


    const button =
        document.querySelector(
            '.hero-start-button'
        );


    if (
        title
    ) {

        title.innerHTML = `

            ${hero.title}

            <span>
                ${hero.highlight}
            </span>

        `;

    }


    if (
        description
    ) {

        description.textContent =
            hero.description;

    }


    if (
        button
    ) {

        button.textContent =
            hero.buttonLabel;

        button.href =
            hero.buttonHref;

    }

}


/* ==================================================
   FORM
================================================== */

function createFieldAttributes(
    field
) {

    const required =
        field.required
            ? ' required'
            : '';


    const autocomplete =
        field.autocomplete
            ? ` autocomplete="${field.autocomplete}"`
            : '';


    return `
        ${required}
        ${autocomplete}
    `;

}


function renderForm(
    form
) {

    if (
        !form
        ||
        !form.fields
    ) {

        return;

    }


    const label =
        document.querySelector(
            '.form-intro .section-label'
        );


    const title =
        document.querySelector(
            '.form-intro h2'
        );


    const description =
        document.querySelector(
            '.form-intro-copy'
        );


    const formElement =
        document.getElementById(
            'contact-form'
        );


    if (
        label
    ) {

        label.textContent =
            form.label;

    }


    if (
        title
    ) {

        title.textContent =
            form.title;

    }


    if (
        description
    ) {

        description.textContent =
            form.description;

    }


    if (
        !formElement
    ) {

        return;

    }


    const fields =
        form.fields;


    const name =
        document.getElementById(
            'name'
        );


    const email =
        document.getElementById(
            'email'
        );


    const phone =
        document.getElementById(
            'phone'
        );


    const company =
        document.getElementById(
            'company'
        );


    const projectType =
        document.getElementById(
            'projectType'
        );


    const budget =
        document.getElementById(
            'budget'
        );


    const timeline =
        document.getElementById(
            'timeline'
        );


    const message =
        document.getElementById(
            'message'
        );


    applyInputField(
        name,
        fields.name
    );


    applyInputField(
        email,
        fields.email
    );


    applyInputField(
        phone,
        fields.phone
    );


    applyInputField(
        company,
        fields.company
    );


    applyTextArea(
        message,
        fields.message
    );


    applySelectField(
        projectType,
        fields.projectType
    );


    applySelectField(
        budget,
        fields.budget
    );


    applySelectField(
        timeline,
        fields.timeline
    );


    const submitButton =
        document.getElementById(
            'submit-button'
        );


    if (
        submitButton
    ) {

        submitButton.textContent =
            form.submitLabel;

    }

}


function applyInputField(
    element,
    field
) {

    if (
        !element
        ||
        !field
    ) {

        return;

    }


    element.type =
        field.type;


    element.placeholder =
        field.placeholder;


    element.required =
        Boolean(
            field.required
        );


    if (
        field.autocomplete
    ) {

        element.autocomplete =
            field.autocomplete;

    }

}


function applyTextArea(
    element,
    field
) {

    if (
        !element
        ||
        !field
    ) {

        return;

    }


    element.placeholder =
        field.placeholder;


    element.required =
        Boolean(
            field.required
        );

}


function applySelectField(
    element,
    field
) {

    if (
        !element
        ||
        !field
    ) {

        return;

    }


    element.innerHTML = `

        <option value="">
            ${field.placeholder}
        </option>

        ${field.options
            .map(
                option => `

                    <option
                        value="${option}"
                    >
                        ${option}
                    </option>

                `
            )
            .join('')
        }

    `;


    element.required =
        Boolean(
            field.required
        );

}


/* ==================================================
   REACH
================================================== */

function renderReach(
    reach
) {

    if (
        !reach
        ||
        !Array.isArray(
            reach.items
        )
    ) {

        return;

    }


    const label =
        document.querySelector(
            '.reach-header .section-label'
        );


    const title =
        document.querySelector(
            '.reach-title'
        );


    const grid =
        document.getElementById(
            'reach-grid'
        );


    if (
        label
    ) {

        label.textContent =
            reach.label;

    }


    if (
        title
    ) {

        title.textContent =
            reach.title;

    }


    if (
        !grid
    ) {

        return;

    }


    grid.innerHTML =
        reach.items
            .map(
                item => {

                    const content =
                        item.type === 'link'
                            ? `
                                <a
                                    href="${item.href}"
                                    class="reach-value reach-link"
                                >
                                    ${item.value}
                                </a>
                              `
                            :
                        item.type === 'external'
                            ? `
                                <a
                                    href="${item.href}"
                                    class="reach-value reach-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ${item.value}
                                </a>
                              `
                            : `
                                <p
                                    class="reach-value small"
                                >
                                    ${item.value}
                                </p>
                              `;


                    return `

                        <div
                            class="reach-item reveal"
                        >

                            <p
                                class="reach-item-label"
                            >
                                ${item.label}
                            </p>

                            ${content}

                        </div>

                    `;

                }
            )
            .join('');

}


/* ==================================================
   FAQ
================================================== */

function renderFaq(
    faq
) {

    if (
        !faq
        ||
        !Array.isArray(
            faq.items
        )
    ) {

        return;

    }


    const label =
        document.querySelector(
            '.faq-heading .section-label'
        );


    const title =
        document.querySelector(
            '.faq-heading h2'
        );


    const list =
        document.getElementById(
            'faq-list'
        );


    if (
        label
    ) {

        label.textContent =
            faq.label;

    }


    if (
        title
    ) {

        title.textContent =
            faq.title;

    }


    if (
        !list
    ) {

        return;

    }


    list.innerHTML =
        faq.items
            .map(
                item => `

                    <div
                        class="faq-item reveal"
                    >

                        <button
                            type="button"
                            class="faq-question"
                        >

                            <span>
                                ${item.question}
                            </span>


                            <span
                                class="faq-icon"
                            >
                                +
                            </span>

                        </button>


                        <div
                            class="faq-answer"
                        >

                            ${item.answer}

                        </div>

                    </div>

                `
            )
            .join('');


    initializeFaq();

}


/* ==================================================
   PROCESS
================================================== */

function renderProcess(
    process
) {

    if (
        !process
        ||
        !Array.isArray(
            process.items
        )
    ) {

        return;

    }


    const title =
        document.querySelector(
            '.process-title'
        );


    const list =
        document.getElementById(
            'process-list'
        );


    if (
        title
    ) {

        title.textContent =
            process.title;

    }


    if (
        !list
    ) {

        return;

    }


    list.innerHTML =
        process.items
            .map(
                item => `

                    <div
                        class="process-item reveal"
                    >

                        <button
                            type="button"
                            class="process-question"
                        >

                            <span
                                class="process-number"
                            >
                                ${item.number}
                            </span>


                            <span
                                class="process-name"
                            >
                                ${item.name}
                            </span>


                            <span
                                class="process-plus"
                            >
                                +
                            </span>

                        </button>


                        <div
                            class="process-answer"
                        >

                            ${item.answer}

                        </div>

                    </div>

                `
            )
            .join('');


    initializeProcessAccordion();

}


/* ==================================================
   FINAL CTA
================================================== */

function renderFinalCta(
    cta
) {

    if (
        !cta
    ) {

        return;

    }


    const title =
        document.querySelector(
            '.final-cta h2'
        );


    const description =
        document.querySelector(
            '.final-cta-copy'
        );


    if (
        title
    ) {

        title.innerHTML = `

            ${cta.title}

            <span>
                ${cta.highlight}
            </span>

        `;

    }


    if (
        description
    ) {

        description.textContent =
            cta.description;

    }

}


/* ==================================================
   CONTACT BACKGROUND
================================================== */

async function renderBackgroundAsset(
    assets
) {

    if (
        !assets
        ||
        !assets.background
    ) {

        return;

    }


    const image =
        document.getElementById(
            'contact-background-image'
        );


    if (
        !image
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `/api/root-asset/${encodeURIComponent(assets.background.filename)}`,
                {
                    cache:
                        'no-store'
                }
            );


        if (
            !response.ok
        ) {

            throw new Error(
                `Contact background request failed: HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        if (
            data
            &&
            data.secure_url
        ) {

            image.src =
                data.secure_url;


            image.alt =
                assets.background.alt;

        }

    }

    catch (error) {

        console.error(
            'Contact background loading error:',
            error
        );

    }

}


/* ==================================================
   CONTACT FORM SUBMISSION
================================================== */

function initializeContactForm() {

    const contactForm =
        document.getElementById(
            'contact-form'
        );


    const submitButton =
        document.getElementById(
            'submit-button'
        );


    const formStatus =
        document.getElementById(
            'form-status'
        );


    if (
        !contactForm
        ||
        !submitButton
        ||
        !formStatus
    ) {

        return;

    }


    contactForm.addEventListener(
        'submit',
        async event => {

            event.preventDefault();


            submitButton.disabled =
                true;


            submitButton.textContent =
                'Sending...';


            formStatus.textContent =
                '';


            const formData =
                new FormData(
                    contactForm
                );


            const data = {

                name:
                    formData.get(
                        'name'
                    ),

                email:
                    formData.get(
                        'email'
                    ),

                phone:
                    formData.get(
                        'phone'
                    ),

                company:
                    formData.get(
                        'company'
                    ),

                projectType:
                    formData.get(
                        'projectType'
                    ),

                budget:
                    formData.get(
                        'budget'
                    ),

                timeline:
                    formData.get(
                        'timeline'
                    ),

                message:
                    formData.get(
                        'message'
                    )

            };


            try {

                const response =
                    await fetch(
                        '/api/contact',
                        {

                            method:
                                'POST',

                            headers: {

                                'Content-Type':
                                    'application/json'

                            },

                            body:
                                JSON.stringify(
                                    data
                                )

                        }
                    );


                let result =
                    {};


                try {

                    result =
                        await response.json();

                }

                catch {

                    result =
                        {};

                }


                if (
                    !response.ok
                ) {

                    throw new Error(
                        result.message
                        ||
                        'Unable to submit form.'
                    );

                }


                if (
                    typeof gtag ===
                    'function'
                ) {

                    gtag(
                        'event',
                        'generate_lead'
                    );

                }


                window.location.href =
                    'thank-you.html';

            }

            catch (error) {

                console.error(
                    'Contact form error:',
                    error
                );


                formStatus.textContent =
                    'Something went wrong. Please try again.';


                submitButton.disabled =
                    false;


                submitButton.textContent =
                    'Submit';

            }

        }
    );

}


/* ==================================================
   FAQ ACCORDION
================================================== */

function initializeFaq() {

    document
        .querySelectorAll(
            '.faq-question'
        )
        .forEach(
            question => {

                question.addEventListener(
                    'click',
                    () => {

                        const item =
                            question.closest(
                                '.faq-item'
                            );


                        const wasActive =
                            item.classList.contains(
                                'active'
                            );


                        document
                            .querySelectorAll(
                                '.faq-item'
                            )
                            .forEach(
                                other => {

                                    other.classList.remove(
                                        'active'
                                    );

                                }
                            );


                        if (
                            !wasActive
                        ) {

                            item.classList.add(
                                'active'
                            );

                        }

                    }
                );

            }
        );

}


/* ==================================================
   PROCESS ACCORDION
================================================== */

function initializeProcessAccordion() {

    document
        .querySelectorAll(
            '.process-question'
        )
        .forEach(
            question => {

                question.addEventListener(
                    'click',
                    () => {

                        const item =
                            question.closest(
                                '.process-item'
                            );


                        const wasActive =
                            item.classList.contains(
                                'active'
                            );


                        document
                            .querySelectorAll(
                                '.process-item'
                            )
                            .forEach(
                                other => {

                                    other.classList.remove(
                                        'active'
                                    );

                                }
                            );


                        if (
                            !wasActive
                        ) {

                            item.classList.add(
                                'active'
                            );

                        }

                    }
                );

            }
        );

}


/* ==================================================
   REVEAL OBSERVER
================================================== */

function initializeRevealObserver() {

    const revealElements =
        document.querySelectorAll(
            '.reveal'
        );


    if (
        !revealElements.length
    ) {

        return;

    }


    if (
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches
    ) {

        revealElements.forEach(
            element => {

                element.classList.add(
                    'visible'
                );

            }
        );


        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                'visible'
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {

                threshold:
                    0.10

            }
        );


    revealElements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* ==================================================
   INITIALIZE CONTACT PAGE
================================================== */

async function initializeContactPage() {

    await loadContactContent();


    initializeContactForm();


    initializeRevealObserver();


    console.log(
        'Contact page initialized.'
    );

}


/* ==================================================
   START
================================================== */

initializeSite()
    .then(
        initializeContactPage
    )
    .catch(
        error => {

            console.error(
                'Contact initialization failed:',
                error
            );

        }
    );