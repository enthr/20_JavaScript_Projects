const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt To Select A Media Stream, Pass To Video Element, Then Play
const selectMediaStream = async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
            return;
        };
    } catch (error) {
        // Catch Error Here
        console.log('Error: ', error);
    }
    return;
};

button.addEventListener('click', async () => {
    // Disable Button
    button.disabled = true;

    // Start Picture in Picture
    await videoElement.requestPictureInPicture();

    // Reset Button
    button.disabled = false;
});

// On Load
selectMediaStream();