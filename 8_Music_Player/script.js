const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progrssContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
    {
        name: "jacinto-1",
        displayName: "Electric Chill Machine",
        artist: "Jacinto Design"
    },
    {
        name: "jacinto-2",
        displayName: "Seven Nation Army (Remix)",
        artist: "Jacinto Design"
    },
    {
        name: "jacinto-3",
        displayName: "Goodnight, Disco Queen",
        artist: "Jacinto Design"
    },
    {
        name: "metric-1",
        displayName: "Front Row (Remix)",
        artist: "Metric/Jacinto Design"
    },
];

// Check if Playing
let isPlaying = false;

// Play
const playSong = () => {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
    return;
};

const pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
    return;
};

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
const loadSong = (song) => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
    return;
};

// Current Song
let songIndex = 0;

// Previous Song
const prevSong = (e) => {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
    return;
};

// Previous Song
const nextSong = (e) => {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
    return;
};

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
const updateProgressBar = (e) => {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;

        // Update Porgress Bar Width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate Display For Duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Delay Switching Duration Element To Avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate Display For Current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
};

// Set Progress Bar
const setProgressBar = (e) => {
    const width = e.srcElement.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
};

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progrssContainer.addEventListener('click', setProgressBar);