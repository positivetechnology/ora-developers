import _ from 'underscore';

class Mq {
  constructor() {
    this.init = this.init.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.checkMedia = this.checkMedia.bind(this);
    this._public = {};
    this._public.timeout = false;
    this._public.breakpoints = pjs.breakpoints;
  }

  bindEvents() {
    window.pjs = window.pjs || {};
    pjs.mqs = [];
    // const debounce = 300;

    $(window).on('resize', _.debounce(() => {
      this.checkMedia();
    }, 100));

    // $(window).on('resize', () => {
    //   this.checkMedia();
    //   // if (this._public.timeout === false) {
    //   // this._public.timeout = setTimeout(this.checkMedia(), debounce);
    //   // }
    // });

    this.checkMedia();
  }

  checkMedia() {
    this._public.timeout = false;
    let newMqs = [];

    for (var mqName in this._public.breakpoints) {
      if (this._public.breakpoints.hasOwnProperty(mqName)) {
        let mq = this._public.breakpoints[mqName];
        if (Modernizr.mq(mq)) {
          newMqs.push(mqName);
        }
      }
    }

    let added = _.difference(newMqs, pjs.mqs);
    let removed = _.difference(pjs.mqs, newMqs);
    if (added.length !== 0 || removed.length !== 0) {
      $(window).trigger('mq:change', [added, removed, newMqs]);
    }

    pjs.mqs = newMqs;
  }

  init() {
    this.bindEvents();
  }
}

export default new Mq();
