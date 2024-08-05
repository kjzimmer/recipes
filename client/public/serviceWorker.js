// the service worker to add an auth token to all image requests
self.addEventListener('fetch', function(event) {
    console.log('in fetch listener qqq')
    if(event.request.url.indexOf('api/recipes/image')>0){
        console.log('fetch worker image urlqqq: ', event.request.url)

        const newRequest = new Request(event.request, {
            // should use this instead of hard coded token localStorage.getItem('userToken')
            headers: {"Authorization": "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzIwMjE2Mzg5fQ.QA7-bBukr018GkEgxWpnfaQAQBSLpeatdK3-hPdcdGM'},
            mode: "cors"
            // , "Access-Control-Allow-Origin": "http://localhost:5173"
        });
        return fetch(newRequest);
}else{
        return fetch(event.request)
    }
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

