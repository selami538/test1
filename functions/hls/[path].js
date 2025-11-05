async function handleRequest(request) {
  const parsedUrl = new URL(request.url);
  const targetUrl = "https://esraerolseksi.global.ssl.fastly.net" + parsedUrl.pathname.replace("/stream", "") + parsedUrl.search;

  const response = await fetch(targetUrl, {
    cf: {
      cacheEverything: true,
      cacheTtl: 360  // Cloudflare cache TTLsdsdsnsd
    }
  });

  const newHeaders = new Headers(response.headers);
  newHeaders.delete("set-cookie");
  newHeaders.set("Access-Control-Allow-Origin", "*");

  // Fastly için Cache-Control başlığını set etsdsdfsdfwsdsd

  
  return new Response(response.body, {
    status: response.status,
    headers: newHeaders
  });
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});
