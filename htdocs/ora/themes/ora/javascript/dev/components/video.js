
class Video {
  constructor(props) {
    this.init = this.init.bind(this);
    this.playPause = this.playPause.bind(this);
    this.sel = {
      button: $(props).find('[data-video-btn]'),
      video: $(props).find('[data-video-video]')
    };
  }

  init() {
    this.sel.button.on('click', (e) => {
      e.preventDefault();
      this.sel.video.toggleClass('is-active');
      this.playPause(this.sel.video[0]);
    });
  }

  playPause(video) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}

export default Video;
