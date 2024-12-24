import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

const Navbar = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: 'Trade', href: '#trade' },
    { label: 'Marketplace', href: '#marketplace' },
    { label: 'Resources', href: '#resources' },
  ];

  useEffect(() => {
    const arrow = arrowRef.current;
    const dropdown = dropdownRef.current;

    if (!arrow || !dropdown) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(arrow, {
      rotation: 180,
      duration: 0.3,
      ease: 'power2.out',
    }).to(dropdown, {
      height: 'auto',
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    }, '-=0.2');

    const handleHover = () => tl.play();
    const handleLeave = () => tl.reverse();

    const navItem = dropdown.parentElement;
    navItem?.addEventListener('mouseenter', handleHover);
    navItem?.addEventListener('mouseleave', handleLeave);

    return () => {
      navItem?.removeEventListener('mouseenter', handleHover);
      navItem?.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          AIONex
        </motion.div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          {menuItems.map((item, index) => (
            <div key={item.label} className="relative group">
              <a
                href={item.href}
                className="text-white/80 hover:text-white flex items-center space-x-1 py-2"
              >
                <span>{item.label}</span>
                <div ref={arrowRef} className="transform transition-transform">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </a>
              
              {/* Dropdown */}
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 w-48 opacity-0 h-0 overflow-hidden"
              >
                <div className="mt-2 py-2 bg-black/50 backdrop-blur-xl rounded-lg border border-white/10">
                  <a href="#" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">
                    Option 1
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">
                    Option 2
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10">
                    Option 3
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connect Wallet Button */}
        <Button
          variant="outline"
          className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      </div>
    </motion.nav>
  );
};

export default Navbar;