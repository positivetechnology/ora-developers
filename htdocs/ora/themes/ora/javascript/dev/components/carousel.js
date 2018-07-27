
class Carousel {
  constructor() {
    this.sel = {
      component: '[data-carousel]'
    };
    this.init = this.init.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.renderCount = this.renderCount.bind(this);
  }

  bindEvents() {
    const $elem = $(this.sel.component);

    $elem.carousel({
      interval: 500000
    });

    let currentIndex = $elem.find('.carousel-item.active').data('carousel-item');

    this.renderCount(currentIndex);

    $elem.on('slide.bs.carousel', (e) => {
      currentIndex = this.getIndex(e.direction);
      this.renderCount(currentIndex);
    });
  }

  getIndex(dir) {
    // Annoying but necessary if you want to display the count as soon as the carousel moves.
    const $elem = $(this.sel.component);
    const totalItems = $elem.find('[data-carousel-item]').length;
    const $activeBeforeSlide = $elem.find('.carousel-item.active');
    let direction = dir === 'left' ? 'next' : 'prev';
    let index = null;

    if (direction === 'prev') {
      index = $activeBeforeSlide.prev().data('carousel-item') === undefined ? totalItems : $activeBeforeSlide.prev().data('carousel-item');
    } else {
      index = $activeBeforeSlide.next().data('carousel-item') === undefined ? 1 : $activeBeforeSlide.next().data('carousel-item');
    }

    return index;
  }

  renderCount(currentIndex) {
    const $elem = $(this.sel.component);
    let totalItems = $elem.find('[data-carousel-item]').length;
    $elem.find('[data-carousel-count]').html(`${currentIndex} / ${totalItems}`);
  }

  init() {
    if ($(this.sel.component).length <= 0) return;
    this.bindEvents();
  }
}

export default new Carousel();
