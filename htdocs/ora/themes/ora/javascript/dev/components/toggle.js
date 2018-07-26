
class Toggle {
  constructor() {
    this.sel = {
      component: '[data-toggle]',
      toggle: '[data-toggle-toggle]'
    };
    this.init = this.init.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
  }

  bindEvents() {
    // const evName = !$('body').hasClass('touch') ? 'click' : 'mouseover mouseout';
    const $elem = $(this.sel.component);
    const $toggle = $elem.find(this.sel.toggle);
    $toggle.on('click', (e) => {
      e.preventDefault();
      $elem.toggleClass('is-open');
    });
  }

  init() {
    if ($(this.sel.component).length <= 0) return;
    this.bindEvents();
  }
}

export default new Toggle();
