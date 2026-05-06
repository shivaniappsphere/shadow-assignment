/**
 * Transmits telemetry data to a specified endpoint.
 * Attempts to use the modern sendBeacon API for reliable delivery,
 * falling back to fetch with keepalive if sendBeacon is unavailable or payload is too large.
 *
 * @param {object} payload - The telemetry data to send
 * @param {string} endpoint - The URL endpoint to send data to
 * @returns {object} Status object with transmission details
 */
export function transmitTelemetryOrFallback(payload, endpoint) {
    // Convert payload to JSON string
    const jsonPayload = JSON.stringify(payload);

    // Calculate payload size in bytes
    const payloadSize = new Blob([jsonPayload]).size;

    // Maximum size allowed for sendBeacon (64KB)
    const MAX_BEACON_SIZE = 64 * 1024;

    // Try sendBeacon first if available and payload fits
    if (payloadSize <= MAX_BEACON_SIZE && navigator.sendBeacon) {
        const beaconSent = navigator.sendBeacon(endpoint, jsonPayload);
        if (beaconSent) {
            return {
                status: 'success',
                method: 'sendBeacon',
                size: payloadSize
            };
        }
    }

    // Fallback to fetch with keepalive for guaranteed delivery
    fetch(endpoint, {
        method: 'POST',
        body: jsonPayload,
        keepalive: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Return fallback status (fetch doesn't provide immediate success feedback)
    return {
        status: 'fallback',
        method: 'fetch',
        size: payloadSize
    };
}