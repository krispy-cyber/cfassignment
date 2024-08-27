export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Check if the path matches the /secure/${COUNTRY} route
    if (path.startsWith("/secure/")) {
      // Extract the country code from the URL
      const COUNTRY = path.split("/")[2];

      // Fetch the flag asset from the R2 bucket
      const flag = await env.FLAGS.get(`${COUNTRY}.png`);

      if (flag) {
        // Serve the flag image with the appropriate content type
        return new Response(flag.body, {
          headers: { 'Content-Type': 'image/png' },
        });
      } else {
        // Handle the case where the flag is not found
        return new Response("Flag not found", { status: 404 });
      }
    }

    // Handle non-secure routes or other routes
    return new Response("Not Found", { status: 404 });
  },
};
