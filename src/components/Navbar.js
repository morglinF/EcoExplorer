// Navbar.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Home, Heart, Info, Menu, X } from 'lucide-react';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Favorites', path: '/favorites', icon: Heart },
    { name: 'About', path: '/about', icon: Info }
    
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-10 backdrop-blur-lg border-b border-white border-opacity-20 shadow-2xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-bold text-sm">🌿</span>
              </motion.div>
              <h1 className="text-white font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                EcoExplorer
              </h1>
            </Link>
          </motion.div>


          {/* Desktop Menu */}
          <motion.div 
            className="hidden md:flex items-center space-x-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Link 
                    to={item.path} 
                    className="flex items-center space-x-2 text-slate-200 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white hover:bg-opacity-10 backdrop-blur-sm border border-transparent hover:border-white hover:border-opacity-20 group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-white hover:text-blue-200 focus:outline-none p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300"
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`md:hidden overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="bg-slate-900 bg-opacity-20 backdrop-blur-lg border-t border-white border-opacity-10">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Link 
                  to={item.path} 
                  className="flex items-center space-x-3 text-slate-200 hover:text-white px-6 py-4 text-sm font-medium transition-all duration-300 hover:bg-white hover:bg-opacity-10 border-l-4 border-transparent hover:border-blue-400"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.nav>
  );
}