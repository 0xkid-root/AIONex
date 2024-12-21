import { Model, Transaction } from '@/types/marketplace';
import { ChartDataPoint } from '@/types/dashboard';

export const mockModels: Model[] = [
  {
    id: 1,
    owner: "0x1234567890abcdef1234567890abcdef12345678",
    metadata: {
      name: "GPT-4 Fine-tuned Model",
      description: "A fine-tuned language model for specialized tasks",
      category: "nlp",
      accuracy: 98,
      parameters: 175000000000,
      framework: "PyTorch"
    },
    price: 1000000000000000000, // 1 ETH in wei
    isListed: true,
    performanceMetrics: "98% accuracy on benchmark tests",
    isValidated: true,
    licenseTerms: "Commercial use allowed"
  },
  {
    id: 2,
    owner: "0x9876543210fedcba9876543210fedcba98765432",
    metadata: {
      name: "YOLO v8 Custom",
      description: "Custom trained object detection model",
      category: "cv",
      accuracy: 95,
      parameters: 25000000,
      framework: "TensorFlow"
    },
    price: 500000000000000000, // 0.5 ETH in wei
    isListed: true,
    performanceMetrics: "95% mAP on COCO dataset",
    isValidated: true,
    licenseTerms: "Research use only"
  },
  // Add more mock models...
];

export const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    type: "purchase",
    amount: 1.0,
    status: "completed",
    timestamp: new Date("2024-03-15T10:30:00"),
    from: "0x1234...5678",
    to: "0x9876...5432",
    hash: "0xabcd...ef01"
  },
  // Add more mock transactions...
];

export const mockMetrics = {
  activeModels: 12,
  computingPower: 85,
  storageUsed: "1.2 TB",
  balance: "1,234 AION"
};

export const mockChartData: ChartDataPoint[] = [
  { date: '2024-03-10', executions: 45, revenue: 1200 },
  { date: '2024-03-11', executions: 52, revenue: 1350 },
  { date: '2024-03-12', executions: 48, revenue: 1280 },
  { date: '2024-03-13', executions: 70, revenue: 1800 },
  { date: '2024-03-14', executions: 65, revenue: 1650 },
  { date: '2024-03-15', executions: 58, revenue: 1500 },
  { date: '2024-03-16', executions: 63, revenue: 1600 }
]; 