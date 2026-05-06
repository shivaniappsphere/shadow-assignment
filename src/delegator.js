/**
 * Sets up event delegation for a shadow DOM container.
 * This function attaches a shadow root to the container and listens for specified events,
 * retargeting them to provide information about the event path within the shadow DOM.
 *
 * @param {HTMLElement} container - The element to attach the shadow root to
 * @param {string[]} eventTypes - Array of event types to listen for (e.g., ['click', 'input'])
 * @param {function} callback - Function to call with retargeted event data
 * @returns {function} Cleanup function to remove event listeners
 */
export function delegateShadowEvents(container, eventTypes, callback) {
    // Validate input
    if (!container) {
        throw new Error('Container element is required');
    }

    // Attach shadow root in closed mode for encapsulation
    const shadowRoot = container.attachShadow({ mode: 'closed' });

    // Create an internal button for triggering events (useful for testing)
    const triggerButton = document.createElement('button');
    triggerButton.textContent = 'Trigger Event';
    triggerButton.id = 'internal-btn';
    shadowRoot.appendChild(triggerButton);

    // Event handler that processes and retargets events from the shadow DOM
    function handleShadowEvent(event) {
        // Only process events of the specified types
        if (!eventTypes.includes(event.type)) {
            return;
        }

        // Ignore non-composed events (events that don't bubble through shadow boundaries)
        if (!event.composed) {
            console.warn('Non-composed event ignored:', event.type);
            return;
        }

        // Build the event path within the shadow DOM
        const fullPath = event.composedPath();
        const shadowPath = [];

        for (const node of fullPath) {
            // Stop when we reach the container element
            if (node === container) {
                break;
            }

            // Only include element nodes with their identifying info
            if (node instanceof Element) {
                shadowPath.push({
                    tag: node.tagName.toLowerCase(),
                    id: node.id || null,
                    class: node.className || null
                });
            }
        }

        // Call the callback with the retargeted event data
        callback({
            type: event.type,
            timeStamp: event.timeStamp,
            path: shadowPath
        });
    }

    // Attach event listeners to the container for each event type
    // Use capture phase to catch events before they bubble
    eventTypes.forEach(eventType => {
        container.addEventListener(eventType, handleShadowEvent, true);
    });

    // Return cleanup function to remove listeners when no longer needed
    return () => {
        eventTypes.forEach(eventType => {
            container.removeEventListener(eventType, handleShadowEvent, true);
        });
    };
}