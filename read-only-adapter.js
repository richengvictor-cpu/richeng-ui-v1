(function () {
  function load() {
    return window.__RICHENG_UI_READONLY_MANIFEST__ || null;
  }

  function hasManifest() {
    return Boolean(load());
  }

  window.RichengReadOnlyAdapter = {
    load,
    hasManifest,
  };
})();
