# Browser Runtime Assignment

A comprehensive demonstration of advanced browser runtime techniques including Shadow DOM event delegation, optimized style batching, and reliable telemetry transmission with fallback strategies.

## 🚀 Features

### Task 1: Event Delegator 🧩
- **Closed Shadow DOM**: Encapsulated component with hidden internal structure
- **Safe Event Retargeting**: Captures and processes events from within the shadow boundary
- **Event Path Logging**: Displays detailed event information including DOM path and metadata

### Task 2: Style Batching 🎨
- **Computed Style Extraction**: Efficiently reads styling information from target elements
- **requestAnimationFrame Optimization**: Batches DOM writes for smooth performance
- **Animated Display**: Staggered reveal animation with highlight effects

### Task 3: Telemetry 📡
- **sendBeacon API**: Modern, reliable telemetry transmission for analytics
- **Fetch Fallback**: Graceful degradation when sendBeacon is unavailable
- **Payload Size Management**: Automatic size checking and method selection

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and modern DOM APIs
- **CSS3**: Responsive design with animations and gradients
- **Vanilla JavaScript (ES6+)**: Modern JavaScript with modules
- **Shadow DOM**: Component encapsulation
- **Beacon API**: Reliable data transmission
- **Fetch API**: HTTP requests with keepalive

## 📁 Project Structure

```
shadow-assignment/
├── index.html          # Main demo page
├── demo.js            # Demo orchestration script
├── README.md          # This file
└── src/
    ├── delegator.js   # Shadow DOM event delegation
    ├── styleBatch.js  # Style extraction and animation
    └── telemetry.js   # Telemetry transmission
```

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open `index.html`** in a modern web browser
3. **Interact with the demo**:
   - Click the shadow host area to see event delegation in action
   - Click "Run Extraction" to see style batching with animation
   - Click "Send Telemetry" to test data transmission

## 🎯 Key Concepts Demonstrated

- **Event Propagation**: Understanding composed vs non-composed events
- **Performance Optimization**: Separating reads and writes with rAF
- **Progressive Enhancement**: Using modern APIs with fallbacks
- **Component Encapsulation**: Shadow DOM for clean architecture
- **Animation Timing**: Staggered animations for visual appeal

## 🌐 Browser Support

Requires a modern browser with support for:
- ES6 Modules
- Shadow DOM (v1)
- Beacon API
- Fetch API
- requestAnimationFrame

Tested in Chrome, Firefox, Safari, and Edge.

## 📝 Notes

- All code is written in vanilla JavaScript - no frameworks required
- Styles are responsive and work on mobile devices
- Telemetry endpoint uses httpbin.org for demonstration purposes
- Shadow DOM is used in "closed" mode for maximum encapsulation

## 🤝 Contributing

This is an educational assignment demonstrating browser runtime concepts. Feel free to explore and modify the code to learn more about these techniques!