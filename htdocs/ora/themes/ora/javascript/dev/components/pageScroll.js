import _ from 'underscore';
// import AnimateScroll from './animateScroll';

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
    this.animateTop = this.animateTop.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.lazyLoad = this.lazyLoad.bind(this);
    this.loadImages = this.loadImages.bind(this);
    this.getActiveMq = this.getActiveMq.bind(this);
    this.getClosestIndex = this.getClosestIndex.bind(this);
  }

  bindEvents() {
    const _this = this;
    const $elem = $(this.sel.component);
    const $link = $(this.sel.link);
    const location = window.location.hash;

    window.onpopstate = () => {
      const url = window.location.hash;
      const index = $(`[data-url='${url}']`).data('index');
      if (index) {
        // this.animateTop(index);
      } else {
        // this.animateTop(1);
      }
    };

    // $(window).on('hashchange', (e) => {
    //   console.log(e);
    //   const url = window.location.hash;
    //   const index = $(`[data-url='${url}']`).data('index');
    //   if (index) {
    //     this.animateTop(index);
    //   } else {
    //     this.animateTop(1);
    //   }
    // });

    $elem.find('[data-section]').map((i, item) => {
      $(item).attr('data-index', i + 1);
    });

    $(document).on('mousewheel DOMMouseScroll wheel scroll', _.debounce(() => {
      // let windowTop = $(window).scrollTop() + ($(window).height() / 2);
      const $sections = $('[data-section]');
      let windowBottom = $(window).scrollTop() + $(window).height();
      let sections = [];

      for (let section of $sections) {
        let top = $(section).offset().top;
        let height = $(section).height();
        // let middle = top + height / 2;
        let bottom = top + height;
        // console.log('windowBottom: ', windowBottom, 'divBottom: ', bottom);
        sections.push({elem: section, position: bottom});
      }

      const active = this.getClosestIndex(windowBottom, sections);
      const index = $(active.elem).data('index');

      _this.updateUrl(index);
      _this.lazyLoad(index);
      this._public.activeIndex = index;
    }, 50, false));

    $(window).on('resize', _.debounce(() => {
      this.loadImages(this._public.activeIndex);
    }, 10));

    const currentIndex = this.getIndex();

    // if scroll hasn't moved trigger lazyLoad
    if (typeof currentIndex === 'undefined') {
      this.lazyLoad(1);
    } else {
      this.lazyLoad(currentIndex);
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

      $('[data-header]').removeClass('is-open');

      this.updateUrl(index);
      this.animateTop(index);
    });

    if (location.length > 0) {
      const index = this.getIndex();
      this.animateTop(index);
    }
  }

  animateTop(index) {
    const $section = $(this.sel.component).find(`[data-index="${index}"]`);
    $('html, body').animate({
      scrollTop: $section.offset().top
    }, 700);
  }

  getIndex() {
    let url = window.location.hash;
    const $section = $(this.sel.component).find(`[data-url="${url}"]`);
    const index = $section.data('index');
    return index;
  }

  updateUrl(index) {
    const $section = $(this.sel.component).find(`[data-index="${index}"]`);
    let url = $section.data('url');
    url = typeof url !== 'undefined' ? url : '';

    window.location.hash = url;

    // window.history.pushState({}, document.title, url);

    // if (window.location.hash === '') {
    //   const cleanUrl = location.protocol + '//' + location.host + location.pathname;
    //   window.history.replaceState({}, document.title, cleanUrl);
    // }

    $('body')[0].className = $('body')[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
    $('body').addClass('viewing-page-' + index);
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

  getClosestIndex(windowPos, array) {
    var i = 0;
    var minDiff = 1000;
    var ans;
    for (i in array) {
      if (array.hasOwnProperty(i)) {
        var m = Math.abs(windowPos - array[i].position);
        if (m < minDiff) {
          minDiff = m;
          ans = array[i];
        }
      }
    }
    return ans;
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
