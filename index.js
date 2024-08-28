export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Check if the path matches the /secure/${COUNTRY} route
    if (path.startsWith("/secure/")) {
      // Extract the country code from the URL and convert it to lowercase
      const COUNTRY = path.split("/")[2].toLowerCase();

      // Fetch the flag asset from the R2 bucket named "flag-images"
      const flag = await env.FLAGS.get(`${COUNTRY}.png`);

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
    const headers = request.headers;
    const EMAIL = headers.get('cf-access-authenticated-user-email') || 'Not Available';
    const COUNTRY = headers.get('cf-ipcountry') || 'Unknown';
    const TIMESTAMP = new Date().toISOString();
    const responseBody = `
      ${EMAIL} authenticated at ${TIMESTAMP} from 
      <a href="${url.origin}/secure/${COUNTRY.toLowerCase()}">
        ${COUNTRY}
      </a>
    `;
    return new Response(responseBody, {
      headers: { 'Content-Type': 'text/html' }
    });
  },
};
