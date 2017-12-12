// Get all the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const rangeButtons = player.querySelectorAll('.player__slider');

//Flag Variables

// Event Listners
video.addEventListener('click', playPauseVideo);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

toggle.addEventListener('click', playPauseVideo);

rangeButtons.forEach(b => b.addEventListener('mousemove', handleRangeUpdate));
rangeButtons.forEach(b => b.addEventListener('change', handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click', moveVideo);
progress.addEventListener('mousemove', (e) => mouseDown && moveVideo(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

skipButtons.forEach(b => b.addEventListener('click', skip));

// Functions
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function moveVideo(e) {
    const time = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = time;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function playPauseVideo() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}