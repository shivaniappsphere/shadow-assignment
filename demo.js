// Import utility functions from our modules
import { delegateShadowEvents } from './src/delegator.js';
import { processStyleThiefBatch } from './src/styleBatch.js';
import { transmitTelemetryOrFallback } from './src/telemetry.js';

// ================================
// TASK 1: Shadow DOM Event Delegation
// Demonstrates how events from within a shadow DOM can be captured and logged
// ================================

// Get references to the shadow host and log container
const shadowHost = document.getElementById('shadow-host');
const eventLog = document.getElementById('log');

// Set up event delegation for click events on the shadow host
delegateShadowEvents(shadowHost, ['click'], (eventData) => {
    // Create a new div to display the event information
    const logEntry = document.createElement('div');
    logEntry.textContent = JSON.stringify(eventData, null, 2); // Pretty-print JSON

    // Add the new entry to the top of the log
    eventLog.prepend(logEntry);
});

// ================================
// TASK 2: Style Extraction and Animation
// Extracts styles from target elements and creates animated copies
// ================================

// Get references to the style processing button and related elements
const styleButton = document.getElementById('runStyleBtn');
const styleTargets = document.querySelectorAll('.target');
const styleOutput = document.getElementById('style-output');

// Handle click on the style button
styleButton.onclick = () => {
    // Process the style batch and display animated copies
    processStyleThiefBatch(styleTargets, styleOutput);
};

// ================================
// TASK 3: Telemetry Transmission
// Demonstrates sending telemetry data with fallback mechanisms
// ================================

// Get references to the telemetry button and status display
const telemetryButton = document.getElementById('sendTelemetryBtn');
const telemetryStatus = document.getElementById('telemetry-status');

// Handle click on the telemetry button
telemetryButton.onclick = () => {
    // Create a sample telemetry payload
    const telemetryPayload = {
        event: 'click',
        timestamp: Date.now()
    };

    // Attempt to transmit the telemetry data
    const transmissionResult = transmitTelemetryOrFallback(
        telemetryPayload,
        'https://httpbin.org/post'
    );

    // Update the status display with transmission details
    telemetryStatus.innerHTML = `
        <strong>Transmission Details:</strong><br>
        Size: ${transmissionResult.size} bytes<br>
        Method: ${transmissionResult.method}<br>
        Status: ${transmissionResult.status}
    `;
};