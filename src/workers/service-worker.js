if ("workbox" in self) {
  console.log(`Workbox is loaded`);
  self.workbox.precaching.precacheAndRoute(self.__precacheManifest);
} else {
  console.log(`Workbox didn't load`);
}
