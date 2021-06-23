/* eslint-disable no-console */

import { register } from "register-service-worker";

function subscribe() {
  navigator.serviceWorker.ready
    .then(function (registration) {
      const vapidPublicKey =
        "BJfEHGrPVwd1KGexvxv7fzlGi7eV2au_kZNrfvpMz73vDBH24duEvaIGKvhCH_28hPJ47ueX_bdxGk3kUNk3kv0";

      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });
    })
    .catch((err) => console.error(err));
}

function invokeServiceWorkerUpdateFlow(registration) {
  if (registration.waiting) {
    // let waiting Service Worker know it should became active
    registration.waiting.postMessage({ kind: "update" });
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  register(`${process.env.BASE_URL}service-worker.js`, {
    async ready(registration) {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );

      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscribe();
      }
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound(registration) {
      if (registration.installing) {
        registration.installing.addEventListener("statechange", () => {
          if (registration.waiting) {
            if (navigator.serviceWorker.controller) {
              invokeServiceWorkerUpdateFlow(registration);
            } else {
              // otherwise it's the first install, nothing to do
              console.log("Service Worker initialized for the first time");
            }
          }
        });
      }
    },
    updated() {
      console.log("New content is available; please refresh.");
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });
}
