'use strict';

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
const toggleButton = () => {
    button.disabled = !button.disabled;
    return;
};

// Passing Joke To VoiceRSS API
const tellMe = (joke) => {
    VoiceRSS.speech({
        key: 'VoiceRSS API Key',
        src: joke,
        hl: 'en-us',
        v: 'Eka',
        c: 'mp3',
        f: '44khz_16bit_stereo',
        b64: true
    });
    return;
};

// Get Jokes From Joke API
const getJokes = async () => {
    let joke = '';
    const apiURL = 'https://v2.jokeapi.dev/joke/Any';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        joke = (data.type === 'single') ? data.joke : `${data.setup} ... ${data.delivery}`;
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        console.log('Fetch Error', error);
    }
    return;
};

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);