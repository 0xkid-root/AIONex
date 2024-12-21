import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { date: 'Jan', earnings: 4000 },
  { date: 'Feb', earnings: 3000 },
  { date: 'Mar', earnings: 5000 },
  { date: 'Apr', earnings: 2780 },
  { date: 'May', earnings: 1890 },
  { date: 'Jun', earnings: 2390 },
  { date: 'Jul', earnings: 3490 }
];

export function EarningsChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    gsap.from(chartRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div ref={chartRef} className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Earnings History</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#4f46e5"
              fillOpacity={1}
              fill="url(#colorEarnings)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}