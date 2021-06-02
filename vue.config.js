module.exports = {
  lintOnSave: false,
  pwa: {
    name: "JDR Ynovant",
    assetsVersion: "0.1",
    themeColor: "#4DBA87",
    appleMobileWebAppCapable: "yes",
    iconsPath: {
      faviconSVG: './favicon.ico',
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/android-chrome-192x192.png',
      msTileImage: 'img/icons/android-chrome-192x192.png'
    },
    // configuration de workbox
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: 'src/workers/service-worker.js'
    }
  }
};
