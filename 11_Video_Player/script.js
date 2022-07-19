const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //

const showPlayIcon = () => {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
};

const togglePlay = (e) => {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    } else {
        video.pause();
        showPlayIcon();
    }
    return;
};

// On Video End, Show Play Icon
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// Calculate Display Time Format
const displayTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = (seconds > 9) ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
};

// Update Progress Bar as Video Plays
const updateProgress = (e) => {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
    return;
};

// Click To Seek Within The Video
const setProgress = (e) => {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
    return;
};


// Volume Controls --------------------------- //

let lastVolume = 1;

// Volume Bar
const changeVolume = (e) => {
    let volume = e.offsetX / volumeRange.offsetWidth;
    // Rounding Volume Up or Down
    if (volume < 0.1) volume = 0;
    if (volume > 0.9) volume = 1;

    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;

    // Chnage Icon Depending on Volume
    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-down');
    } else if (volume === 0) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-off');
    }
    lastVolume = volume;
    return;
};

// Mute/Unmute
const toggleMute = (e) => {
    volumeIcon.className = '';
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fa-solid', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.add('fa-solid', 'fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
    }
    return;
};



// Change Playback Speed -------------------- //

const changeSpeed = (e) => {
    video.playbackRate = speed.value;
    return;
}



// Fullscreen ------------------------------- //


// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);