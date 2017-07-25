const player = document.querySelector('.player');
const video = player.querySelector('video');
const progress = player.querySelector('.progress');
const playedProgress = player.querySelector('.progress__filled');
const playPauseButton = player.querySelector('.toggle');
const playSlider = player.querySelectorAll('.player__slider');
const skips = player.querySelectorAll('[data-skip]');

playPauseButton.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);
skips.forEach(a => a.addEventListener('click', skip));

playSlider.forEach(a=>a.addEventListener('change', sliderControl));

let mDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e)=> mDown && scrub(e));
progress.addEventListener('mousedown', () => mDown = true);
progress.addEventListener('mouseup',  () => mDown = false);

function scrub(e) {
  const s = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = s;
  console.log(s);
}
function sliderControl() {
  video[this.name] = this.value;
}
function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}
function updateProgress() {
  const percent = `${(this.currentTime/this.duration)*100}%`;
   playedProgress.style.width = percent;
   playedProgress.style.flexBasis = percent;
}
function togglePlay(e) {
  if(video.paused) video.play();
  else video.pause();
  updateButton();
}
function updateButton(){
  playPauseButton.innerText = video.paused? '►' : '❚ ❚';
}
