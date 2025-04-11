const staticMoneyPM = 'money-pro-max-site-v1';
const assets = [
    "/AddTransaction.html",
    "/AddTransaction.js",
    "/dataprocess.js",
    "/index.html",
    "/manifest.json",
    "/Profit and loss.html",
    "/Saving_goal_reward.html",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticMoneyPM).then(cache => {
            cache.addAll(assets);
        })
    )
})

self.addEventListener('fetch', (fetchEvent) => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then((res) => {
            return res || fetch(fetchEvent.request);
        })
    );
});