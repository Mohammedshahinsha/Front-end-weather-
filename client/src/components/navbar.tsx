import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  Moon, 
  Sun, 
  LogOut 
} from "lucide-react";

interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-6 h-6 mr-2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <span className="text-xl font-semibold text-gray-800">Weather Dashboard</span>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="mr-2"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              onClick={onLogout} 
              className="ml-3 text-primary"
            >
              Logout
            </Button>
            <div className="ml-3 relative">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                <span>JD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start px-4"
            >
              Weather Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start px-4" 
              onClick={toggleTheme}
            >
              <span className="flex items-center">
                {isDarkMode ? <Sun className="mr-2 h-5 w-5" /> : <Moon className="mr-2 h-5 w-5" />}
                Toggle Theme
              </span>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start px-4 text-red-500" 
              onClick={onLogout}
            >
              <span className="flex items-center">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
