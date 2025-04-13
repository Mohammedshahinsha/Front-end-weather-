import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import LocationSearch from "@/components/location-search";
import CurrentWeather from "@/components/dashboard/current-weather";
import ForecastSection from "@/components/dashboard/forecast-section";
import WeatherHighlights from "@/components/dashboard/weather-highlights";
import { useWeather } from "@/hooks/use-weather";
import { format } from "date-fns";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [location, setLocation] = useState("New York");
  const { 
    weather, 
    forecast, 
    isLoading, 
    error, 
    refetch 
  } = useWeather(location);
  
  const formattedDate = format(new Date(), "EEEE, MMMM d, yyyy");

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setLocation(query);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onLogout={onLogout} />
      
      <main className="flex-grow bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Weather Dashboard</h1>
            <p className="text-gray-600 mt-1">{formattedDate}</p>
          </div>

          {/* Location Search */}
          <div className="mb-6">
            <LocationSearch onSearch={handleSearch} />
          </div>

          {/* Weather Information Container */}
          <div id="weather-container">
            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <p className="mt-4 text-gray-600">Loading weather data...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <Alert variant="destructive" className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <AlertCircle className="h-6 w-6 text-red-500" />
                <AlertTitle>Unable to load weather data</AlertTitle>
                <AlertDescription>
                  {error.message || "Please check your connection and try again."}
                </AlertDescription>
                <Button 
                  variant="destructive" 
                  className="mt-4 px-4 py-2"
                  onClick={() => refetch()}
                >
                  Try Again
                </Button>
              </Alert>
            )}

            {/* Weather Content */}
            {!isLoading && !error && weather && (
              <div className="space-y-6">
                <CurrentWeather location={location} weather={weather} />
                <ForecastSection forecast={forecast} />
                <WeatherHighlights weather={weather} />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white py-4 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Weather Dashboard © {new Date().getFullYear()} | Powered by OpenWeather API
          </p>
        </div>
      </footer>
    </div>
  );
}
