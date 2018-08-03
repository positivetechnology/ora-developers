import _ from 'underscore';

export default class Animate {
  constructor(props) {
    let defaults = {
      component: '[data-animate-scroll]',
      items: 'section',
      animationTime: 1000,
      delay: 250,
      loadDelay: 250,
      easing: 'ease',
      mobile: false
    };
    this.settings = Object.assign(defaults, props);
    this._public = {
      activeIndex: 1,
      prevTime: 0,
      position: 0,
      pageLength: $(this.settings.items).length
    };
    this.init = this.init.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.move = this.move.bind(this);
    this.init();
  }

  bindEvents() {
    $(this.settings.items).map((i, item) => {
      $(item).attr('data-index', i + 1);
      // $(item).css({
      //   'position': 'relative',
      //   'top': `${i}00%`,
      //   'left': '0px'
      // });
    });

    const scrollFunc = _.debounce((delta) => this.onScroll(delta), 50, true);

    $(document).bind('mousewheel DOMMouseScroll wheel scroll', (e) => {
      var delta;

      switch (e.type) {
      case 'wheel':
        delta = e.originalEvent.deltaY < 0 ? 1 : -1;
        break;
      default:
        delta = e.originalEvent.wheelDelta;
      }

      scrollFunc(delta);
    });

    // Touch
    var touchStart;
    $(document).bind('touchstart', (e) => {
      touchStart = e.originalEvent.touches[0].clientY;
    });

    $(document).bind('touchend', (e) => {
      var touchEnd = e.originalEvent.changedTouches[0].clientY;
      if (touchStart > touchEnd + 50) {
        scrollFunc(-1);
      } else if (touchStart < touchEnd - 50) {
        scrollFunc(1);
      }
    });

    setTimeout(() => { $('body').removeClass('scroll-loading'); }, this.settings.loadDelay);
  }

  onScroll(delta) {
    let timeNow = new Date().getTime();

    if ($('[data-header]').hasClass('is-open') || (timeNow - this._public.prevTime) < (this.settings.animationTime + this.settings.delay) || (this._public.activeIndex === 1 && delta > 0) || (this._public.activeIndex === this._public.pageLength && delta < 0)) {
      return;
    }

    if (delta < 0) {
      this.move('down');
    } else {
      this.move('up');
    }

    this._public.prevTime = timeNow;
  }

  move(direction, index, animate) {
    const animationTime = typeof animate !== 'undefined' ? animate : this.settings.animationTime;

    console.log(animationTime);

    $('[data-header]').removeClass('is-open');

    if (this._public.pageLength < index) {
      return;
    }

    if (direction === 'down') {
      this._public.position = this._public.position - 100;
      this._public.activeIndex++;
    } else if (direction === 'up') {
      this._public.position = this._public.position + 100;
      this._public.activeIndex--;
    } else if (typeof index !== 'undefined') {
      let position = parseInt(`-${index - 1}00`, 10);
      this._public.position = position;
      this._public.activeIndex = index;
    }

    $(this.settings.items).removeClass('active');
    $(`[data-index="${this._public.activeIndex}"`).addClass('active');
    $('body')[0].className = $('body')[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
    $('body').addClass('viewing-page-' + this._public.activeIndex);

    // $(this.settings.component).css({
    //   '-webkit-transform': 'translate3d(0, ' + this._public.position + '%, 0)',
    //   '-webkit-transition': 'all ' + animationTime + 'ms ' + this.settings.easing,
    //   '-moz-transform': 'translate3d(0, ' + this._public.position + '%, 0)',
    //   '-moz-transition': 'all ' + animationTime + 'ms ' + this.settings.easing,
    //   '-ms-transform': 'translate3d(0, ' + this._public.position + '%, 0)',
    //   '-ms-transition': 'all ' + animationTime + 'ms ' + this.settings.easing,
    //   'transform': 'translate3d(0, ' + this._public.position + '%, 0)',
    //   'transition': 'all ' + animationTime + 'ms ' + this.settings.easing
    // });

    $.event.trigger({
      type: 'scrollChange',
      index: this._public.activeIndex
    });
  }

  init() {
    if ($(this.settings.component).length <= 0) return;
    this.bindEvents();
  }
}
