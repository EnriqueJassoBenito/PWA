importScripts("https://cdn.jsdelivr.net/npm/pouchdb@9.0.0/dist/pouchdb.min.js");

const db = new PouchDB('posts');

self.addEventListener('sync', (event) => {
    console.log('synchronizing posts... ', event);
    if (event.tag === "sync-posts") {
        event.waitUntil(syncPosts());
    }
})

async function syncPosts() {
    try {
        const registros = await db.allDocs({ include_docs: true });
        console.log("Posts to sync:", registros);
        const post = registros.rows.map((row) => row.doc);
        for (const p of post) {
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify(p),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
        }

    } catch (err) {
        console.log("Error syncing posts: ", err);

    }
}