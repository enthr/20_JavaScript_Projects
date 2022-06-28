const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let imageCount = 5;
const apiKey = 'UNSPLASH_API_KEY';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imageCount}`;

// Check if All Images Were Loaded
const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        imageCount = 30;
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imageCount}`;
    }
    return;
};

// Create Elements for Link and Photos To Add To DOM
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run Function For Each Object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> element to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        // Create <img> for Photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        // Event Listener, Check When Each is Finished Loading
        img.addEventListener('load', imageLoaded);

        // Put <img> insie <a>, Then Put it inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
    return;
};

// Get Photos From Unsplash API
const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        return;
    } catch (error) {
        // Catch Error Here
        console.log(error);
    }
};

// Check TO See if Scrolling Near Bottom of Page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
    return;
});

// On Load
getPhotos();