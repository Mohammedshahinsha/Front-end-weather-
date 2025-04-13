import { Card, CardContent } from "@/components/ui/card";
import { WeatherData } from "@/hooks/use-weather";
import { 
  Cloud, 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Droplets, 
  Eye, 
  Sun, 
  Thermometer, 
  Wind 
} from "lucide-react";

interface CurrentWeatherProps {
  location: string;
  weather: WeatherData;
}

// Function to return the appropriate weather icon based on the weather condition
const getWeatherIcon = (condition: string) => {
  const iconProps = { className: "text-primary text-5xl" };
  
  if (condition.includes("clear")) return <Sun {...iconProps} />;
  if (condition.includes("cloud")) return <Cloud {...iconProps} />;
  if (condition.includes("rain")) return <CloudRain {...iconProps} />;
  if (condition.includes("drizzle")) return <CloudDrizzle {...iconProps} />;
  if (condition.includes("thunderstorm")) return <CloudLightning {...iconProps} />;
  if (condition.includes("snow")) return <CloudSnow {...iconProps} />;
  if (condition.includes("mist") || condition.includes("fog")) return <CloudFog {...iconProps} />;
  
  // Default icon
  return <Sun {...iconProps} />;
};

export default function CurrentWeather({ location, weather }: CurrentWeatherProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{location}</h2>
            <p className="text-gray-600 mt-1">{weather.description}</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            {getWeatherIcon(weather.description.toLowerCase())}
            <span className="text-4xl font-bold text-gray-800 ml-2">{Math.round(weather.temp)}°C</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Thermometer className="text-gray-600 h-6 w-6" />
            <span className="mt-1 text-sm text-gray-600">Feels Like</span>
            <span className="font-medium text-gray-800">{Math.round(weather.feels_like)}°C</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Droplets className="text-gray-600 h-6 w-6" />
            <span className="mt-1 text-sm text-gray-600">Humidity</span>
            <span className="font-medium text-gray-800">{weather.humidity}%</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Wind className="text-gray-600 h-6 w-6" />
            <span className="mt-1 text-sm text-gray-600">Wind</span>
            <span className="font-medium text-gray-800">{weather.wind_speed} km/h</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <Eye className="text-gray-600 h-6 w-6" />
            <span className="mt-1 text-sm text-gray-600">Visibility</span>
            <span className="font-medium text-gray-800">{(weather.visibility / 1000).toFixed(1)} km</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
