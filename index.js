export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    // Check if the path matches the /secure/${COUNTRY} route
    if (path.startsWith("/secure/")) {
      // Extract the country code from the URL
      const COUNTRY = path.split("/")[2];

      // Fetch the flag asset from the R2 bucket
      // const flag = await env.MY_R2_BUCKET.get(`${COUNTRY}.png`);
      const flag = await FLAGS.get(`${COUNTRY}.png`);

      if (flag) {
        // Serve the flag image with the appropriate content type
        return new Response(flag.body, {
          headers: { 'Content-Type': 'image/png' }
        });
      } else {
        // Handle the case where the flag is not found
        return new Response("Flag not found", { status: 404 });
      }
    }
    // Default route handling for other paths (e.g., the main authentication response)
    // Extract headers and other info
    const headers = request.headers;
    const EMAIL = headers.get('cf-access-authenticated-user-email') || 'Not Available';
    const COUNTRY = headers.get('cf-ipcountry') || 'Unknown';
    const TIMESTAMP = new Date().toISOString();
    // Construct the main response with the HTML link to the country-specific route
    const responseBody = `
      ${EMAIL} authenticated at ${TIMESTAMP} from 
      <a href="https://tunnel.yourwebsite.com/secure/${COUNTRY}">
        ${COUNTRY}
      </a>
    `;
    // Serve the main response as HTML
    return new Response(responseBody, {
      headers: { 'Content-Type': 'text/html' }
    });
  },
};
