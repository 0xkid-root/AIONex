import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Network, Cpu, Shield } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from './ui/button';

export function Hero() {
  const featuresRef = useRef(null);
  useScrollAnimation(featuresRef);

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Decentralized AI Compute Network
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100">
            Buy and sell unused computing power for AI model training on a secure, decentralized network
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-indigo-600 hover:bg-indigo-50"
            >
              Share Computing Power
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20"
            >
              Access Compute Resources
            </Button>
          </div>
        </motion.div>

        <div ref={featuresRef} className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Network className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Decentralized Marketplace</h3>
            <p className="text-indigo-100">Connect directly with compute providers and consumers through our P2P network</p>
          </motion.div>
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Cpu className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Optimized Infrastructure</h3>
            <p className="text-indigo-100">Purpose-built for AI/ML workloads with support for popular frameworks</p>
          </motion.div>
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Shield className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Transparent</h3>
            <p className="text-indigo-100">Built on Avalanche blockchain with end-to-end encryption</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}