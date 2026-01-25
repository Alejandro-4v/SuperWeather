export const WEATHER_BACKGROUNDS: Record<string, string> = {
    // Clear sky
    '01d': 'clear-day.jpeg',
    '01n': 'clear-night.jpeg',

    // Clouds (few, scattered, broken)
    '02d': 'cloudy-day.jpeg',
    '02n': 'cloudy-night.jpeg',
    '03d': 'cloudy-day.jpeg',
    '03n': 'cloudy-night.jpeg',
    '04d': 'cloudy-day.jpeg',
    '04n': 'cloudy-night.jpeg',

    // Rain (shower, rain)
    '09d': 'rain-day.jpeg',
    '09n': 'rain-night.jpeg',
    '10d': 'rain-day.jpeg',
    '10n': 'rain-night.jpeg',

    // Thunderstorm
    '11d': 'day-thunderstorm.jpeg',
    '11n': 'night-thunderstorm.jpeg',

    // Snow
    '13d': 'snow-day.jpeg',
    '13n': 'snow-night.jpeg',

    // Mist/Atmosphere
    '50d': 'mist-day.jpeg',
    '50n': 'mist-night.jpeg'
};

export const DEFAULT_BACKGROUND = 'clear-day.jpeg';
export const BACKGROUND_BASE_PATH = 'assets/weather-backgrounds/';
