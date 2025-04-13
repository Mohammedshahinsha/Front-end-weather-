import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import { useState } from "react";

// Custom hook for application state
function useAuthState() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  
  return { isAuthenticated, login, logout };
}

function AppRouter({ isAuthenticated, login, logout }: { 
  isAuthenticated: boolean; 
  login: () => void; 
  logout: () => void; 
}) {
  return (
    <Switch>
      <Route path="/" component={() => (
        isAuthenticated ? <Dashboard onLogout={logout} /> : <Login onLogin={login} />
      )} />
      <Route path="/dashboard" component={() => (
        isAuthenticated ? <Dashboard onLogout={logout} /> : <Login onLogin={login} />
      )} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { isAuthenticated, login, logout } = useAuthState();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRouter isAuthenticated={isAuthenticated} login={login} logout={logout} />
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
