const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
const showLoader = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
    return;
};

// Hide Loading
const removeLoader = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
    return;
};

// Show New Quote
const newQuote = () => {
    // Show Loader On New Quote Button Click
    showLoader();

    // Pick A Random Quote From apiQuotes Array
    const { author, text } = apiQuotes[Math.floor(apiQuotes.length * Math.random())];

    // Append Quote Text and Author To HTML
    if (text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = `${text}`;

    // If author is blank append Unknown
    authorText.textContent = `- ${author || 'Unknown'}`;

    // Hide Loader
    removeLoader();
    return;
};

// Get Quotes From API
const getQuotes = async () => {
    // Show Loader On First Time Fetching
    showLoader();

    const apiURL = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here 
        console.log(error);
    }
    return;
};

// Tweet Quote
const tweetQuote = () => {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
    return;
};

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();