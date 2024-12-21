import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Coins, Server, Lock, BarChart } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const features = [
  {
    icon: Coins,
    title: 'Token Incentives',
    description: 'Earn tokens by sharing your compute resources. Use tokens to access computing power or trade them on supported marketplaces.'
  },
  {
    icon: Server,
    title: 'Smart Job Assignment',
    description: 'Automated matching of compute providers with consumers based on requirements and availability.'
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'End-to-end encryption and trusted execution environments ensure your data and computations remain secure.'
  },
  {
    icon: BarChart,
    title: 'Real-time Analytics',
    description: 'Monitor resource usage, earnings, and job status through comprehensive dashboards.'
  }
];

export function Features() {
  const featuresRef = useRef(null);
  useScrollAnimation(featuresRef);

  return (
    <div className="py-24 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for AI Computing
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to share or access computational resources
          </p>
        </motion.div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex gap-4"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <feature.icon className="h-8 w-8 text-indigo-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}