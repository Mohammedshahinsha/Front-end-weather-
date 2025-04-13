import { Card, CardContent } from "@/components/ui/card";
import { ForecastData } from "@/hooks/use-weather";
import { format } from "date-fns";
import { 
  Cloud, 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Sun 
} from "lucide-react";

interface ForecastSectionProps {
  forecast: ForecastData[];
}

// Function to return the appropriate weather icon based on the weather condition
const getWeatherIcon = (condition: string) => {
  const iconProps = { className: "text-primary text-3xl" };
  
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

export default function ForecastSection({ forecast }: ForecastSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <p className="font-medium text-gray-800">{format(new Date(day.date), "EEE, MMM d")}</p>
              <div className="flex items-center justify-between mt-2">
                {getWeatherIcon(day.description.toLowerCase())}
                <span className="text-xl font-bold text-gray-800">{Math.round(day.temp)}°C</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{day.description}</p>
              <div className="flex justify-between mt-3 text-sm">
                <span className="text-gray-600">Min: {Math.round(day.temp_min)}°C</span>
                <span className="text-gray-600">Max: {Math.round(day.temp_max)}°C</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
