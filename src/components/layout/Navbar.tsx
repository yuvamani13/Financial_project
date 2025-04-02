
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  ReceiptText, 
  PieChart,
  Settings, 
  Menu, 
  X 
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const links = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/transactions", label: "Transactions", icon: ReceiptText },
    { path: "/categories", label: "Categories", icon: PieChart },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold animate-fade-in">B</div>
            <span className="font-display text-xl font-semibold animate-fade-in">BudgetTrack</span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <link.icon className="w-4 h-4 mr-2" />
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>
      
      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background animate-fade-in">
          <nav className="container flex flex-col gap-4 p-6">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center py-3 text-base font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <link.icon className="w-5 h-5 mr-3" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
