import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'People', path: '/people' },
    { name: 'Publications', path: '/books' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Affiliations', path: '/affiliations' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300${
          isScrolled ? 'py-2 shadow-md backdrop-blur-md' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <div className="mr-2">
                  <Icon
                    icon="tabler:brain"
                    className={`h-8 w-8 transition-colors duration-300 ${
                      isScrolled ? 'text-tiffany-blue' : 'text-white'
                    }`}
                  />
                </div>
                <span
                  className={`font-raleway text-xl font-medium transition-colors duration-300 ${
                    isScrolled ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  NeuroExed
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-1 md:flex">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.path !== '/' &&
                    location.pathname.startsWith(link.path));

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? isScrolled
                          ? 'text-tiffany-blue'
                          : 'text-white'
                        : isScrolled
                        ? 'text-gray-700 hover:text-tiffany-blue'
                        : 'text-gray-200 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className={`absolute inset-x-0 bottom-0 h-0.5${
                          isScrolled ? 'bg-tiffany-blue' : 'bg-white'
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Icon
                icon={isMobileMenuOpen ? 'tabler:x' : 'tabler:menu-2'}
                className={`h-6 w-6 transition-colors duration-300 ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 border-t bg-white shadow-lg md:hidden"
          >
            <div className="p-4">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const isActive =
                    location.pathname === link.path ||
                    (link.path !== '/' &&
                      location.pathname.startsWith(link.path));

                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`rounded-md px-4 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-tiffany-blue/10 text-tiffany-blue'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
