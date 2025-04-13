import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Weather data types
export interface WeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  description: string;
  wind_speed: number;
  wind_deg: number;
  wind_direction: string;
  visibility: number;
  pressure: number;
  uv_index: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastData {
  date: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

// Get wind direction from degrees
const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

// Use weather hook for fetching weather data
export function useWeather(city: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['/api/weather', city],
    enabled: !!city,
  });
  
  return {
    weather: data?.current,
    forecast: data?.forecast,
    isLoading,
    error,
    refetch,
  };
}
