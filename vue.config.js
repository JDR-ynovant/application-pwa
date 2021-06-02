module.exports = {
  lintOnSave: false,
  pwa: {
    name: "CandiFight",
    assetsVersion: "0.1",
    themeColor: "#4DBA87",
    appleMobileWebAppCapable: "yes",
    manifestOptions: {
      icons: [
        {
          "src": "favicons/android-chrome-192x192.png",
          "sizes": "192x192"
        },
        {
          "src": "favicons/android-chrome-512x512.png",
          "sizes": "512x512"
        },
        {
          "src": "favicons/apple-touch-icon.png",
          "sizes": "180x180"
        },
        {
          "src": "favicons/favicon-16x16.png",
          "sizes": "16x16"
        },
        {
          "src": "favicons/favicon-32x32.png",
          "sizes": "32x32"
        },
      ]
    },
    // configuration de workbox
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: 'src/workers/service-worker.js'
    }
  }
};
