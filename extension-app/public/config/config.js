const APP_CONFIG = {};
Object.defineProperties(APP_CONFIG,
  {
    API_ROOT_URL: {
      value: `https://${window.location.host}/template`,
      writable: false,
    },
    LINK_PREFIX: {
      value: '/template/app',
      writable: false,
    },
    APP_ROOT_URL: {
      value: '/',
      writable: false,
    },
    APP_ID: {
      value: 'templateapp',
      writable: false,
    },
    APP_TITLE: {
      value: 'Template',
      writable: false,
    },
    APP_NAV_BAR_TITLE: {
      value: 'Template',
      writable: false,
    },
    APP_ICON_NAME: {
      value: 'favicon.svg',
      writable: false,
    },
  });

window.APP_CONFIG = APP_CONFIG;
