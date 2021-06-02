module.exports = {
  lintOnSave: false,
  pwa: {
    name: "JDR Ynovant",
    assetsVersion: "0.1",
    themeColor: "#4DBA87",
    appleMobileWebAppCapable: "yes",
    iconsPath: {
      faviconSVG: './favicon.ico',
      favicon32: 'assets/icons/favicon-32x32.png',
      favicon16: 'assets/icons/favicon-16x16.png',
      appleTouchIcon: 'assets/icons/apple-touch-icon.png',
      maskIcon: 'assets/icons/android-chrome-192x192.png',
      msTileImage: 'assets/icons/android-chrome-192x192.png'
    },
    // configuration de workbox
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: 'src/workers/service-worker.js'
    }
  }
};
