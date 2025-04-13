import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

// Weather data schema
export const weatherData = pgTable("weather_data", {
  id: serial("id").primaryKey(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  temperature: integer("temperature").notNull(),
  weather_condition: text("weather_condition").notNull(),
  timestamp: integer("timestamp").notNull(),
  user_id: integer("user_id").notNull(),
});

export const insertWeatherDataSchema = createInsertSchema(weatherData).pick({
  city: true,
  country: true,
  temperature: true,
  weather_condition: true,
  timestamp: true,
  user_id: true,
});

// Weather search history schema
export const searchHistory = pgTable("search_history", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull(),
  query: text("query").notNull(),
  timestamp: integer("timestamp").notNull(),
});

export const insertSearchHistorySchema = createInsertSchema(searchHistory).pick({
  user_id: true,
  query: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertWeatherData = z.infer<typeof insertWeatherDataSchema>;
export type WeatherData = typeof weatherData.$inferSelect;

export type InsertSearchHistory = z.infer<typeof insertSearchHistorySchema>;
export type SearchHistory = typeof searchHistory.$inferSelect;

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export type LoginData = z.infer<typeof loginSchema>;
