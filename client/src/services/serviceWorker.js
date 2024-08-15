// the service worker to add an auth token to all image requests
self.addEventListener('fetch', function(event) {
    console.log('fetch worker: ',event.request.url)
    // if (event.request.url.startsWith(self.location.origin + '/images')){
    //     const newRequest = new Request(event.request, {
    //         headers: {"Authorization": "Bearer XXX-my-token"},
    //         mode: "cors"
    //     });
    //     return fetch(newRequest);
    // }else{
    //     return fetch(event.request);
    // }
})

