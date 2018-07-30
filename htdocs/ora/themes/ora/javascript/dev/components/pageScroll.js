import _ from 'underscore';
import AnimateScroll from './animateScroll';

class Scroll {
  constructor() {
    this.sel = {
      component: '[data-scroll]',
      item: '[data-section]',
      link: '[data-scroll-link]'
    };
    this._public = {
      moved: false,
      loadedSections: [],
      activeIndex: 1
    };
    this.init = this.init.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.updateUrl = this.updateUrl.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.lazyLoad = this.lazyLoad.bind(this);
    this.loadImages = this.loadImages.bind(this);
    this.getActiveMq = this.getActiveMq.bind(this);
  }

  bindEvents() {
    const _this = this;
    // const $elem = $(this.sel.component);
    const $link = $(this.sel.link);
    const location = window.location.hash;
    let animationTime = 1000;

    const scroll = new AnimateScroll({
      animationTime: animationTime,
      component: this.sel.component,
      items: this.sel.item
    });

    window.onpopstate = () => {
      const url = window.location.hash;
      const index = $(`[data-url='${url}']`).data('index');
      if (index) {
        scroll.move(null, index);
      } else {
        scroll.move(null, 1);
      }
    };

    $(document).on('scrollChange', (data) => {
      _this.updateUrl(data.index);
      _this.lazyLoad(data.index);
      this._public.activeIndex = data.index;
    });

    $(window).on('resize', _.debounce(() => {
      this.loadImages(this._public.activeIndex);
    }, 100));

    // if scroll hasn't moved trigger lazyLoad
    if (typeof this.getIndex() === 'undefined') {
      this.lazyLoad(1);
    }

    $link.on('click', (e) => {
      e.preventDefault();
      const $target = $(e.delegateTarget);
      let index = $target.data('scroll-link');

      if (index.length === 0 && e.delegateTarget.tagName === 'A') {
        let target = e.delegateTarget.hash;
        index = $(`[data-url="${target}"]`).data('index');
        index = typeof index === 'undefined' ? 1 : index;
      }

      scroll.move(null, index);
    });

    if (location.length > 0) {
      const index = this.getIndex();
      scroll.move(null, index, 0);
    }
  }

  getIndex() {
    let url = window.location.hash;
    const $section = $(this.sel.component).find(`[data-url="${url}"]`);
    const index = $section.data('index');
    return index;
  }

  updateUrl(index) {
    const $section = $(this.sel.component).find(`[data-index="${index}"]`);
    const url = $section.data('url');
    window.location.hash = typeof url !== 'undefined' ? url : '';
    if (window.location.hash === '') {
      const cleanUrl = location.protocol + '//' + location.host + location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }

  lazyLoad(index) {
    const $elem = $(this.sel.component);
    const loadedSections = this._public.loadedSections;
    const sectionLength = $elem.find(this.sel.item).length;
    let beforeIndex = index - 1;
    let afterIndex = index + 1;

    if (loadedSections.indexOf(beforeIndex) < 0 && beforeIndex !== 0) {
      this._public.loadedSections.push(beforeIndex);
      // Load before section images
      this.loadImages(beforeIndex);
    }

    if (loadedSections.indexOf(index) < 0) {
      this._public.loadedSections.push(index);
      // Load active section images
      this.loadImages(index);
    }

    if (loadedSections.indexOf(afterIndex) < 0 && afterIndex <= sectionLength) {
      this._public.loadedSections.push(afterIndex);
      // Load next section images
      this.loadImages(afterIndex);
    }
  }

  loadImages(index) {
    const $elem = $(this.sel.component);
    let $section = $elem.find(`[data-index="${index}"]`);
    const $bgImages = $section.find('[data-lazy-load]');

    $bgImages.map((i, image) => {
      const $image = $(image);
      const type = $image.prop('tagName');
      const src = $image.data('lazy-load');
      let img = src;

      if (typeof src === 'object') {
        let activeMq = this.getActiveMq(window.pjs.mqs, src);

        if (typeof activeMq === 'undefined' && src.default) {
          img = src.default;
        } else {
          img = src[activeMq];
        }
      }

      if (type === 'IMG') {
        $image.attr('src', img);
      } else {
        $image.css('background-image', `url(${img})`);
      }
    });
  }

  getActiveMq(mqs, settingsByMq) {
    return _.last(_.intersection(_.keys(settingsByMq), mqs));
  }

  init() {
    if ($(this.sel.component).length <= 0) return;
    this.bindEvents();
  }
}
export default new Scroll();
