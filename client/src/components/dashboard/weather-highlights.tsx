import { Card, CardContent } from "@/components/ui/card";
import { WeatherData } from "@/hooks/use-weather";
import { format } from "date-fns";
import { 
  Sun, 
  Sunset, 
  Wind, 
  Droplets 
} from "lucide-react";

interface WeatherHighlightsProps {
  weather: WeatherData;
}

export default function WeatherHighlights({ weather }: WeatherHighlightsProps) {
  // Function to get UV index description
  const getUVIndexDescription = (uv: number) => {
    if (uv <= 2) return "Low";
    if (uv <= 5) return "Moderate";
    if (uv <= 7) return "High";
    if (uv <= 10) return "Very High";
    return "Extreme";
  };

  // Function to get UV index color and width
  const getUVIndexColorAndWidth = (uv: number) => {
    if (uv <= 2) return { color: "bg-green-500", width: "w-2/12" };
    if (uv <= 5) return { color: "bg-amber-500", width: "w-5/12" };
    if (uv <= 7) return { color: "bg-orange-500", width: "w-7/12" };
    if (uv <= 10) return { color: "bg-red-500", width: "w-9/12" };
    return { color: "bg-purple-600", width: "w-full" };
  };

  // Format sunrise and sunset times
  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const uvColor = getUVIndexColorAndWidth(weather.uv_index);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Highlights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5">
            <h4 className="text-gray-600 font-medium">UV Index</h4>
            <div className="mt-2 flex items-center">
              <Sun className="text-amber-500 h-8 w-8" />
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-800">{weather.uv_index}</p>
                <p className="text-sm text-gray-600">{getUVIndexDescription(weather.uv_index)}</p>
              </div>
            </div>
            <div className="mt-4 bg-gray-200 h-2 rounded-full">
              <div className={`${uvColor.color} h-2 rounded-full ${uvColor.width}`}></div>
            </div>
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h4 className="text-gray-600 font-medium">Sunrise & Sunset</h4>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <Sun className="text-amber-500 h-6 w-6" />
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Sunrise</p>
                  <p className="text-lg font-semibold text-gray-800">{formatTime(weather.sunrise)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Sunset className="text-amber-700 h-6 w-6" />
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Sunset</p>
                  <p className="text-lg font-semibold text-gray-800">{formatTime(weather.sunset)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h4 className="text-gray-600 font-medium">Wind</h4>
            <div className="mt-2 flex items-center">
              <Wind className="text-blue-500 h-8 w-8" />
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-800">{weather.wind_speed} km/h</p>
                <p className="text-sm text-gray-600">Direction: {weather.wind_direction}</p>
              </div>
            </div>
            <div className="mt-4 relative h-32 w-32 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
              <div 
                className="absolute w-1 h-12 bg-blue-500 origin-bottom rounded-t-full" 
                style={{ 
                  bottom: '50%', 
                  left: '50%', 
                  transform: `translateX(-50%) rotate(${weather.wind_deg}deg)` 
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-gray-600">{weather.wind_speed}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h4 className="text-gray-600 font-medium">Humidity</h4>
            <div className="mt-2 flex items-center">
              <Droplets className="text-blue-500 h-8 w-8" />
              <div className="ml-3">
                <p className="text-2xl font-bold text-gray-800">{weather.humidity}%</p>
                <p className="text-sm text-gray-600">
                  {weather.humidity < 30 
                    ? "Low" 
                    : weather.humidity < 70 
                      ? "Normal" 
                      : "High"}
                </p>
              </div>
            </div>
            <div className="mt-4 bg-gray-200 h-2 rounded-full">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${weather.humidity}%` }}
              ></div>
            </div>
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
