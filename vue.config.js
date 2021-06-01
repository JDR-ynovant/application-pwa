module.exports = {
  lintOnSave: false,
  pwa: {
    name: "JDR Ynovant",
    assetsVersion: "0.1",
    themeColor: "#4DBA87",
    appleMobileWebAppCapable: "yes",
    iconsPath: {
      faviconSVG: 'src/assets/icons/favicon.ico',
      favicon32: 'src/assets/icons/favicon-32x32.png',
      favicon16: 'src/assets/icons/favicon-16x16.png',
      appleTouchIcon: 'src/assets/icons/apple-touch-icon.png',
      maskIcon: 'src/assets/icons/safari-pinned-tab.svg',
      msTileImage: 'src/assets/icons/android-chrome-192x192.png'
    },
    // configuration de workbox
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: 'src/workers/service-worker.js'
    }
  }
};
