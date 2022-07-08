const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteURLEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

// Show Modal, Focus on Input
const showModal = (e) => {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
    return;
};

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', (e) => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal) ? modal.classList.remove('show-modal') : false);

// Validate Form
const validate = (nameValue, urlValue) => {
    const expression = /http?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);

    if (!nameValue || !urlValue) {
        alert('Submit Values For Both Fields');
        return false;
    }

    if (!urlValue.match(regex)) {
        alert('Please Provide Valid URL');
        return false;
    }

    // Valid
    return true;
};

// Handle Data From Form
const storeBookmark = (e) => {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteURLEl.value;

    if (!urlValue.includes('http://')) {
        urlValue = `http://${urlValue}`;
    }

    if (!validate(nameValue, urlValue)) {
        return false;
    }

    
};

// Event Listeners
bookmarkForm.addEventListener('submit', storeBookmark);