// Listen for messages from clients.
self.addEventListener("message", function(event) {
    // Get all the connected clients and forward the message along.
    const promise = self.clients.matchAll().then(function(clientList) {
        clientList.forEach(function(client) {
            client.postMessage(event.data);
        });
    });

    // If event.waitUntil is defined, use it to extend the
    // lifetime of the Service Worker.
    if (event.waitUntil) {
        event.waitUntil(promise);
    }
});

// Immediately claim any new clients. This is not needed to send messages, but
// makes for a better demo experience since the user does not need to refresh.
self.addEventListener("activate", function(event) {
    event.waitUntil(self.clients.claim());
});
