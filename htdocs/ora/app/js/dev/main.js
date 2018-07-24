var App  = {
  init: function init() {
    try {
      document.createEvent('TouchEvent');
      $('body').addClass('touch');
    } catch (e) {
      // nothing
    }
    $(window).trigger('init.App');
    console.log('test');
  }
};

$(document).ready(App.init);
