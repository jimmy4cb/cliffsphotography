# Capture 1 Motion

A responsive, framework-free portfolio and booking-enquiry website. Open `index.html` in a browser to preview it. The images and project descriptions currently shown are illustrative samples, not verified Capture 1 Motion work.

## Edit the website

- **Logo and brand name:** update the two `.wordmark` blocks in `index.html`. The CSS-drawn mark can be replaced with an image or SVG there.
- **New photos:** put image files in the [`photos/`](./photos/) folder, then add an entry to the `siteContent.portfolio` list in `script.js` using its path (for example, `photos/my-new-photo.jpg`). The [`photos/README.md`](./photos/README.md) has the step-by-step instructions and a copyable example. Use images you own or have permission to publish.
- **Portfolio:** edit the `siteContent.portfolio` list in `script.js`. Each item has a title, filter category (`events`, `portraits`, `documentary`, `brands`, or `film`), display label, image path and descriptive alt text. Add an item to add a gallery card; remove one to remove it.
- **Contact and social links:** set verified values in `siteContent.contact` in `script.js`. Use a full URL for `instagram`, an email address for `email`, and an international phone number for `phone` / `whatsapp` (digits and country code). Unset values are not displayed.
- **Services, about text and testimonials:** edit the matching sections in `index.html`. Replace the owner note with an accurate biography and add only genuine client quotes approved for publication.
- **Service packages and booking steps:** edit the four package cards and the “How booking works” steps in the Services section of `index.html`. The enquiry buttons select the matching service automatically.
- **Colors and typography:** change the CSS custom properties near the top of `styles.css`.
- **Page title and sharing preview:** change the title, description and Open Graph tags in the `<head>` of `index.html`.

## Enquiries and privacy

The form currently validates entries in the browser and displays a demonstration message; it does **not** send, save, or confirm a booking. Submissions are booking requests, not confirmed bookings. The form includes a basic honeypot field, but client-side checks alone are not spam protection.

Before collecting real enquiries, connect the form to a trusted server-side booking endpoint and email provider. Validate and rate-limit submissions on the server, protect credentials there (never in browser code), configure delivery notifications, and publish an appropriate privacy notice explaining what personal information is collected, why, and how long it is kept. Use HTTPS when deployed. Until a working endpoint and verified contact details are configured, the site clearly identifies the form as a demo; no owner contact channel is invented.

## Preview and publish

1. Open `index.html` locally in a modern browser. The remote sample images and web fonts require an internet connection.
2. Replace every sample image, sample project and owner note with verified content before launch.
3. Add at least one verified contact method in `script.js`; connect and test the enquiry backend before treating submissions as live.
4. Publish `index.html`, `styles.css`, and `script.js` together to a static web host with HTTPS enabled. No build step or package installation is required.

The page uses native HTML dialog, form validation, responsive layouts and reduced-motion preferences. Portfolio photos use lazy loading; the hero image is prioritized for initial display.
