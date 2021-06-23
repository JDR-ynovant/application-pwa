if ("workbox" in self) {
  console.log(`Workbox is loaded`);
  self.workbox.precaching.precacheAndRoute(self.__precacheManifest);
} else {
  console.log(`Workbox didn't load`);
}

self.addEventListener("push", (event) => {
  console.log("[Service Worker] Push Received.");
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = "Candy-Fight";
  const options = {
    body: event.data.text(),
    icon: "/assets/img/licorne.png",
    badge: "/assets/img/licorne.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

const handleNewSubscription = async (user) => {
  const subscription = await self.registration.pushManager.getSubscription();

  if (!subscription) {
    return;
  }

  const request = {
    method: "POST",
    headers: {
      "X-User": user.id,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subscription: subscription }),
  };

  return fetch("https://candy-fight.marmog.cloud/api/subscribe", request);
};

self.addEventListener("message", (event) => {
  switch (event.data.kind) {
    case "subscription":
      return handleNewSubscription(event.data.user);
  }
});
