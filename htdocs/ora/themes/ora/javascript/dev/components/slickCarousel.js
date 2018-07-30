
class SlickCarousel {
  constructor(props) {
    this.sel = {
      component: props
    };
    this.defaults = {
      draggable: true
    };
    this.settings = Object.assign(this.defaults, $(props).data('carousel'));
    this.init = this.init.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.renderCount = this.renderCount.bind(this);
  }

  bindEvents() {
    const $elem = $(this.sel.component);
    const $items = $elem.find('[data-carousel-items]');
    const $prev = $elem.find('[data-carousel-arrow-prev]');
    const $next = $elem.find('[data-carousel-arrow-next]');

    $items.on('init beforeChange', (event, slick, currentSlide, nextSlide) => {
      this.renderCount(typeof nextSlide !== 'number' ? 1 : nextSlide + 1, slick.slideCount);
    });

    $items.slick(this.settings);

    $prev.on('click', () => {
      $items.slick('slickPrev');
    });

    $next.on('click', () => {
      $items.slick('slickNext');
    });
  }

  renderCount(currentIndex, totalItems) {
    const $elem = $(this.sel.component);
    $elem.find('[data-carousel-count]').html(`${currentIndex} / ${totalItems}`);
  }

  init() {
    if ($(this.sel.component).length <= 0) return;
    this.bindEvents();
  }
}

export default SlickCarousel;
