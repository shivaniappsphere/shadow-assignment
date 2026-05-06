/**
 * Processes a batch of target elements to extract their styles and create animated copies.
 * This function extracts text content and computed styles from target elements,
 * then creates new elements with those styles and animates them into view.
 *
 * @param {NodeList|Array} targets - Collection of elements to extract styles from
 * @param {HTMLElement} container - Container element to append the styled copies to
 * @returns {Promise} Promise that resolves when the animation setup is complete
 */
export function processStyleThiefBatch(targets, container) {
    // Extract styles from each target element
    const extractedStyles = Array.from(targets).map(element => {
        const computedStyles = getComputedStyle(element);

        return {
            text: element.textContent,
            fontSize: computedStyles.fontSize,
            color: computedStyles.color,
            borderRadius: computedStyles.borderRadius
        };
    });

    // Return a promise that resolves after DOM manipulation and animation setup
    return new Promise(resolve => {
        // Use requestAnimationFrame to ensure DOM is ready for manipulation
        requestAnimationFrame(() => {
            // Create a document fragment for efficient DOM insertion
            const fragment = document.createDocumentFragment();
            const createdElements = [];

            // Create a new div for each extracted style
            extractedStyles.forEach(styleData => {
                const newDiv = document.createElement('div');

                // Set the text content with a "Copy:" prefix
                newDiv.textContent = `Copy: ${styleData.text}`;

                // Apply the extracted styles
                newDiv.style.fontSize = styleData.fontSize;
                newDiv.style.color = styleData.color;
                newDiv.style.borderRadius = styleData.borderRadius;

                // Add to fragment and track created elements
                fragment.appendChild(newDiv);
                createdElements.push(newDiv);
            });

            // Clear container and append all new elements at once
            container.innerHTML = '';
            container.appendChild(fragment);

            // Animate the elements with staggered timing
            createdElements.forEach((element, index) => {
                setTimeout(() => {
                    // Add show class to make element visible
                    element.classList.add('show');
                    // Add highlight class for initial emphasis
                    element.classList.add('highlight');

                    // Remove highlight after animation duration
                    setTimeout(() => {
                        element.classList.remove('highlight');
                    }, 800);

                }, index * 120); // Stagger animations by 120ms
            });

            // Resolve the promise once setup is complete
            resolve();
        });
    });
}