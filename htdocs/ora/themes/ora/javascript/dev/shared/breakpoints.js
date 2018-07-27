// Bootstrap sizes as js objects

window.pjs = window.pjs || {};
window.pjs.breakpoints = {
  'screen': 'only screen',
  'landscape': 'only screen and (orientation: landscape)',
  'portrait': 'only screen and (orientation: portrait)',
  'xs-up': 'only screen',
  'xs-only': 'only screen and (max-width: 767px)',
  'sm-up': 'only screen and (min-width:768px)',
  'sm-down': 'only screen and (max-width:991px)',
  'sm-only': 'only screen and (min-width:768px) and (max-width:991px)',
  'md-up': 'only screen and (min-width:992px)',
  'md-down': 'only screen and (max-width:1199px)',
  'md-only': 'only screen and (min-width:992px) and (max-width:1199px)',
  'lg-up': 'only screen and (min-width:1200px)',
  'lg-only': 'only screen and (min-width:1200px) and (max-width:99999999px)'
};
