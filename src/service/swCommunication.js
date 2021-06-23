const postMessage = function (payload) {
  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(payload);
    return true;
  } else {
    return false;
  }
};

export { postMessage };
