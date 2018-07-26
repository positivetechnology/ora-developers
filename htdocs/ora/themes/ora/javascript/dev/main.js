import Scroll from './components/pageScroll';
import Toggle from './components/toggle';
// Import components
$(document).ready(() => {
  try {
    document.createEvent('TouchEvent');
    $('body').addClass('touch');
  } catch (e) {
    // nothing
  }
  Scroll.init();
  Toggle.init();
});
