import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  {
    name: 'CPU',
    value: 75,
    fill: '#4f46e5'
  },
  {
    name: 'Memory',
    value: 60,
    fill: '#06b6d4'
  },
  {
    name: 'GPU',
    value: 85,
    fill: '#8b5cf6'
  }
];

export function ResourceUsage() {
  const chartRef = useRef(null);

  useEffect(() => {
    gsap.from(chartRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div ref={chartRef} className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Resource Usage</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="80%"
            barSize={10}
            data={data}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
            />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}