import './shared/breakpoints';
import Mq from './util/mq';
import Scroll from './components/pageScroll';
import Toggle from './components/toggle';
import SlickCarousel from './components/slickCarousel';
import Video from './components/video';

// Import components
$(document).ready(() => {
  try {
    document.createEvent('TouchEvent');
    $('body').addClass('touch');
  } catch (e) {
    // nothing
  }
  Mq.init();
  Scroll.init();
  Toggle.init();
  $('[data-carousel]').map((i, mod) => {
    const slick = new SlickCarousel(mod);
    slick.init();
  });
  $('[data-video]').map((i, mod) => {
    const video = new Video(mod);
    video.init();
  });
});
