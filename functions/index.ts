import type { ExecutionContext } from "npm:@cloudflare/workers-types";

/**
 * Injects `nonce` attribute into script and style tags to enable CSP.
 */
export async function onRequest(context: ExecutionContext) {

    const response: Response = await context.next();
    const nonce = crypto.randomUUID();

    // Remove the CSP header if the response is a 304
    if (response.status === 304) {
        // This will cause the browser to reuse the CSP header from the cached response
        response.headers.delete('Content-Security-Policy');
        return response;
    }

    let html: string | null = await response.text();

    if (html.trim() === '') {
        html = null;
    } else {
        // Add nonce to script and style tags that require it
        html = html.replace(/<script(.*?)>/g, `<script$1 nonce="${nonce}">`);
        html = html.replace(/<style>(.*?)>/g, `<style$1 nonce="${nonce}">`);
    }

    const newResponse = new Response(html, response);

    const cspHeader = response.headers.get('Content-Security-Policy');

    if (cspHeader === null)
        return response;

    const newCSPHeader = addNonceToCSPHeader(cspHeader, nonce);

    newResponse.headers.set('Content-Security-Policy', newCSPHeader);

    return newResponse;
}

/**
 * Adds a nonce to a CSP header
 */
function addNonceToCSPHeader(cspHeader: string, nonce: string) {
    const csp = cspHeader.split(';');
    return csp.map((directive) => {
        if (directive.includes('script-src') || directive.includes('style-src')) {
            return `${directive} 'nonce-${nonce}'`;
        }
        return directive;
    }).join(';');
}
