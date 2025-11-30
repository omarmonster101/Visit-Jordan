
export interface WeatherData {
  temp: number;
  condition: string;
}

export const fetchSiteWeather = async (lat: number, lng: number): Promise<WeatherData | null> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    );
    const data = await response.json();
    
    if (data.current_weather) {
      return {
        temp: data.current_weather.temperature,
        condition: getWeatherCondition(data.current_weather.weathercode)
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch weather", error);
    return null;
  }
};

const getWeatherCondition = (code: number): string => {
  if (code === 0) return 'Clear sky';
  if (code < 4) return 'Partly cloudy';
  if (code < 50) return 'Fog';
  if (code < 60) return 'Drizzle';
  if (code < 70) return 'Rain';
  if (code < 80) return 'Snow';
  return 'Showers';
};
