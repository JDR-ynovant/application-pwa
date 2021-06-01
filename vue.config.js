module.exports = {
  lintOnSave: false,
  pwa: {
    name: "JDR Ynovant",
    assetsVersion: "0.1",
    themeColor: "#4DBA87",
    appleMobileWebAppCapable: "yes",
    iconPaths: {
      favicon32: '',
      favicon16: '',
      appleTouchIcon: '',
      maskIcon: '',
      msTileImage: ''
    },
    // configuration de workbox
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: 'src/workers/service-worker.js'
    }
  }
};
