import './shared/breakpoints';
import Mq from './util/mq';
import Scroll from './components/pageScroll';
import Toggle from './components/toggle';
import Carousel from './components/carousel';

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
  Carousel.init();
});
