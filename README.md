# SuperWeather

SuperWeather is a modern, responsive weather application built with Ionic 8 and Angular 20. It provides real-time weather information, detailed forecasts, and location-based data with a premium UI/UX.

## 🚀 Features

- **Real-time Weather**: Get current weather conditions for any location.
- **Detailed Forecasts**: Hourly and daily forecasts with temperature, humidity, wind speed, and more.
- **Location-based Services**: Automatic weather updates based on your current geolocation.
- **Search Functionality**: Search for any city worldwide to get instant weather data.
- **Unit Conversion**: Toggle between Metric and Imperial units.
- **Responsive Design**: Optimized for both mobile and desktop environments.

## 🛠 Tech Stack

- **Framework**: [Ionic 8](https://ionicframework.com/) + [Angular 20](https://angular.io/)
- **Mobile Platform**: [Capacitor 8](https://capacitorjs.com/) for native mobile features.
- **Styling**: Vanilla CSS and SCSS, following the **Atomic Design** system.
- **State Management**: Reactive programming using [RxJS](https://rxjs.dev/).
- **API**: Integration with OpenWeatherMap (or similar weather data provider).

## 🎨 Design

The UI/UX design for this project is maintained in Figma:
- **Figma Design**: [SuperWeather Design](https://www.figma.com/design/3W0ILR9vDpFUxc704Qkv7y/SuperWeather?node-id=67-608&t=Oa9oxnm8dtCRCak7-1)

## 📂 Project Structure

The project follows a modular structure organized by responsibility:

- `src/app/core`: Core configurations, interceptors, and application-wide guards.
- `src/app/pages`: Main view components (e.g., Home page).
- `src/app/services`: External API service integrations:
  - `weather.service.ts`: Handles all weather data fetching.
  - `geocoding.service.ts`: Manages city search and coordinate conversion.
  - `translation.service.ts`: Handles application internationalization.
- `src/app/ui`: UI Design System following Atomic Design:
  - `atoms`: Basic UI elements (buttons, inputs, icons).
  - `molecules`: Combinations of atoms (forecast cards, search bar).
  - `organisms`: Complex UI blocks (forecast details section).
  - `templates`: Page-level layout structures.
- `src/app/shared`: Shared interfaces, models, pipes, and utility functions.
- `src/app/pipes`: Custom Angular pipes for data formatting.

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Ionic CLI](https://ionicframework.com/docs/cli)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd SuperWeather
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Development Server

Run the application locally:
```bash
ionic serve
```
The app will be available at `http://localhost:8100/`.

## 🏗 Methodology

- **Atomic Design**: We use Atomic Design to create a scalable and maintainable UI system. This allows components to be easily reused across the application.
- **Reactive Workflow**: All data flows are handled reactively using RxJS observables, ensuring a smooth and responsive user experience.
- **Typescript**: Strict typing is used throughout the project to ensure code quality and maintainability.
