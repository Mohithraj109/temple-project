self.addEventListener("install",e=>{
 e.waitUntil(
  caches.open("ticket").then(c=>{
   return c.addAll([
    "./",
    "./index.html",
    "./settings.html",
    "./report.html",
    "./app.js",
    "./db.js",
    "./settings.js",
    "./report.js",
    "./style.css",
    "./en.json",
    "./ta.json"
   ]);
  })
 );
});

self.addEventListener("fetch",e=>{
 e.respondWith(
  caches.match(e.request).then(r=>{
   return r || fetch(e.request);
  })
 );
});
