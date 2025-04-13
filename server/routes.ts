import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema } from "@shared/schema";
import axios from "axios";
import { z } from "zod";

// Access the OpenWeatherMap API key from environment variables
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || "demo_key";
const OPENWEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

// Function to convert wind degrees to direction
const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.post("/api/login", async (req: Request, res: Response) => {
    try {
      // Validate request body against login schema
      const validatedData = loginSchema.parse(req.body);
      
      // Check if user exists
      const user = await storage.getUserByEmail(validatedData.email);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Check if password matches
      if (user.password !== validatedData.password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Return success response with user data
      return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Weather API endpoint
  app.get("/api/weather", async (req: Request, res: Response) => {
    try {
      const { city } = req.query;
      
      if (!city || typeof city !== 'string') {
        return res.status(400).json({ message: "City parameter is required" });
      }
      
      // Get current weather data
      const currentWeatherResponse = await axios.get(`${OPENWEATHER_API_URL}/weather`, {
        params: {
          q: city,
          units: 'metric',
          appid: OPENWEATHER_API_KEY
        }
      });
      
      const currentData = currentWeatherResponse.data;
      
      // Get UV Index data using OneCall API (requires lat & lon)
      const { lat, lon } = currentData.coord;
      const oneCallResponse = await axios.get(`${OPENWEATHER_API_URL}/onecall`, {
        params: {
          lat,
          lon,
          units: 'metric',
          exclude: 'minutely,hourly',
          appid: OPENWEATHER_API_KEY
        }
      });
      
      // Get 5-day forecast data
      const forecastResponse = await axios.get(`${OPENWEATHER_API_URL}/forecast`, {
        params: {
          q: city,
          units: 'metric',
          appid: OPENWEATHER_API_KEY
        }
      });
      
      // Process 5-day forecast (taking one reading per day)
      const forecastData = forecastResponse.data;
      const dailyForecasts: any[] = [];
      
      // Get one forecast entry per day (at noon)
      const processedDates = new Set();
      forecastData.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toISOString().split('T')[0];
        if (!processedDates.has(date)) {
          processedDates.add(date);
          dailyForecasts.push({
            date: item.dt * 1000,
            temp: item.main.temp,
            temp_min: item.main.temp_min,
            temp_max: item.main.temp_max,
            description: item.weather[0].description
          });
        }
      });
      
      // Limit to 5 days
      const fiveDayForecast = dailyForecasts.slice(0, 5);
      
      // Format current weather data
      const current = {
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        temp_min: currentData.main.temp_min,
        temp_max: currentData.main.temp_max,
        humidity: currentData.main.humidity,
        description: currentData.weather[0].description,
        wind_speed: currentData.wind.speed,
        wind_deg: currentData.wind.deg,
        wind_direction: getWindDirection(currentData.wind.deg),
        visibility: currentData.visibility,
        pressure: currentData.main.pressure,
        uv_index: oneCallResponse.data.current.uvi,
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset
      };
      
      // Return combined data
      return res.status(200).json({
        current,
        forecast: fiveDayForecast
      });
    } catch (error) {
      console.error('Weather API error:', error);
      return res.status(500).json({ 
        message: "Error fetching weather data",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
