# Add your photos here

This folder contains 26 photographs supplied for the Capture 1 Motion portfolio. Add more image files here and put their paths in the `siteContent.portfolio` list in `../script.js`.

## Add a photo to the portfolio

1. Copy your photo into this `photos` folder. Use a simple file name, for example `family-session.jpg`.
2. Open `script.js` and find `siteContent.portfolio`.
3. Add a project object to the list. Set `image` to the path of your photo and update the title, category, label and alt text:

```js
{
  title: "Family by the sea",
  category: "portraits",
  label: "PORTRAITS",
  image: "photos/family-session.jpg",
  alt: "A family walking together by the sea at sunset"
}
```

4. Put a comma after the previous project object, and separate this object from the next one with a comma.
5. Save `script.js` and refresh the page. The photo will appear in the portfolio and open in the larger image viewer.

Available categories are `events`, `portraits`, `documentary`, `brands`, `nature`, and `film`. Write a brief, accurate `alt` description for accessibility. To publish the photos, upload the `photos` folder along with `index.html`, `styles.css`, and `script.js`.

Only use photos you own or have permission to publish.
