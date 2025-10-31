import { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Nav() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 100);
      
      // Close mobile menu when scrolling
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#project", label: "Projects" },
    { href: "#skill", label: "Skills" },
    { href: "#testimonial", label: "Testimony" },
    { href: "#contact", label: "Contact" }
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`${
          isSticky ? "fixed top-0 left-0 w-full z-50 shadow-md bg-white" : "relative"
        } transition-all duration-300 px-4 md:px-6 py-3`}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center gap-6 text-blue-500 font-semibold">
          {navItems.map((item) => (
            <a 
              key={item.href}
              href={item.href} 
              className="text-lg rounded-md px-2 hover:scale-110 hover:bg-white transition"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          <div className="text-blue-700 font-bold text-xl">
            DPDEV
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-transparent text-blue-700 p-2 rounded-md hover:bg-gray-100 transition z-50 relative"
          >
            {isMobileMenuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown - Only show when not sticky or when menu is open */}
        {(!isSticky || isMobileMenuOpen) && (
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden z-50 relative ${
              isMobileMenuOpen 
                ? "max-h-80 opacity-100" 
                : "max-h-0 opacity-0"
            } ${isSticky ? "absolute top-full left-0 w-full bg-white shadow-md" : ""}`}
          >
            <div className="flex flex-col space-y-2 pt-4 pb-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="text-blue-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition text-center relative z-50"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay - Lower z-index than menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}