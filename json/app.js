const db = new PouchDB('posts');
const btn = document.getElementById('submit');
const inputTitle = document.getElementById('title');
const inputContent = document.getElementById('content');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js')
        .then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(function(error) {
            console.log('ServiceWorker registration failed: ', error);
        });
    })
}

btn.addEventListener("click", function () {
    const title = inputTitle.value;
    const content = inputContent.value;

    const post = {
        title: title,
        content: content,
        userId: 1
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => {
        console.log("Network request failed, saving post locally.", err);
        db.post(post).then(() => {
            console.log("Post saved locally in PouchDB.");
        });
    });

    navigator.serviceWorker.ready.then(reg => {
        // la etiqueta 'sync-posts' se usará en el SW
        reg.sync.register('sync-posts');
    });

});