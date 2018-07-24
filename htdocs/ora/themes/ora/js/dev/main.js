// Import components

$(document).ready(() => {
  try {
    document.createEvent('TouchEvent');
    $('body').addClass('touch');
  } catch (e) {
    // nothing
  }
  // Initiate components
});
