// Navbar.js
import { useState } from 'react';
import Home from './Home';
import { motion } from "framer-motion";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <motion.div className="flex-shrink-0"
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
         
          >
            <h1 className="text-white font-bold text-2xl">EcoExplorer</h1>
          </motion.div>


          {/* Desktop Menu */}
          <motion.div className="hidden md:flex space-x-4"
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
         
          >
            <a href="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="/about" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="/explore" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Explore</a>
            <a href="/contact" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-white hover:text-gray-400 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500">
          <a href="/" className="block text-white px-4 py-2 hover:bg-blue-700">Home</a>
          <a href="/about" className="block text-white px-4 py-2 hover:bg-blue-700">About</a>
          <a href="/explore" className="block text-white px-4 py-2 hover:bg-blue-700">Explore</a>
          <a href="/contact" className="block text-white px-4 py-2 hover:bg-blue-700">Contact</a>
        </div>
      )}
    </nav>
  );
}