import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, Link } from "react-router-dom";

// Define navigation link type
interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean; // For sections vs routes
}

const navLinks: NavLink[] = [
  { label: "About", href: "#about", isExternal: false },
  { label: "Who It's For", href: "#audience", isExternal: false },
  { label: "Chapters", href: "#chapters", isExternal: false },
  { label: "Author", href: "#author", isExternal: false },
  { label: "Login", href: "/login", isExternal: false },
  { label: "Contact", href: "/contact", isExternal: false },
  { label: "Media & Speaking", href: "/media", isExternal: false },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation - supports both hash links and routes
  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false);

    // Check if it's a hash link (section on same page)
    if (href.startsWith("#")) {
      // If not on home page, navigate to home first
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation then scroll
        setTimeout(() => {
          scrollToSection(href);
        }, 100);
      } else {
        scrollToSection(href);
      }
    } else {
      // It's a route, use navigate
      navigate(href);
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 group"
          >
            <span className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-xl transition-transform group-hover:scale-105">
              B
            </span>
            <span className="font-display font-semibold text-sm sm:text-base tracking-wide text-foreground transition transform duration-300 hover:-translate-y-1">
              BEYOND THE CURE
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-bounce"></span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigation(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary hover:border-b-2 border-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="hero"
              size="sm"
              onClick={() => handleNavigation("#buy")}
            >
              Buy the Book
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavigation(link.href)}
                  className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}

           <div className="px-4 pt-2">
                <Button
                  variant="hero"
                  size="sm"
                  className="w-full"
                  onClick={() => handleNavigation("#buy")}
                >
                  Buy the Book
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;