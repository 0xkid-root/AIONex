import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

const stats = [
  {
    label: 'Success Rate',
    value: '98.5%',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    label: 'Uptime',
    value: '99.9%',
    icon: Clock,
    color: 'text-blue-600'
  },
  {
    label: 'Failed Jobs',
    value: '0.5%',
    icon: XCircle,
    color: 'text-red-600'
  }
];

export function PerformanceStats() {
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.from(statsRef.current?.children || [], {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Performance Metrics</h2>
      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02 }}
            className="border rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{stat.label}</span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-semibold">{stat.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}