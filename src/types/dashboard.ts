export interface ChartDataPoint {
  date: string;
  executions: number;
  revenue: number;
}

export interface ActivityChartProps {
  data: ChartDataPoint[];
}

export interface DashboardMetrics {
  totalEarnings: number;
  activeModels: number;
  totalSales: number;
  averageRating: number;
}
import { LucideIcon } from 'lucide-react';

export interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
}

export interface ActivityLog {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: Date;
  metadata: Record<string, any>;
}

export type ActivityType = 
  | 'model_listed'
  | 'model_sold'
  | 'model_updated'
  | 'payment_received'
  | 'payment_sent'; 