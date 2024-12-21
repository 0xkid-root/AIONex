import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Settings, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AgentWorkflowBuilder } from '@/components/agents/AgentWorkflowBuilder';
import { AgentMonitoringDashboard } from '@/components/agents/AgentMonitoringDashboard';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { useAgent } from '@/hooks/useAgent';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export function AgentWorkspacePage() {
  const { agentId } = useParams();
  const { agent, isLoading } = useAgent(agentId);
  const [isRunning, setIsRunning] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!agent) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Agent Not Found</h2>
        <p className="text-gray-600">The requested agent could not be found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{agent.name}</h1>
          <p className="text-gray-600">{agent.description}</p>
        </div>
        <div className="flex gap-4">
          <Button
            size="lg"
            variant={isRunning ? "outline" : "default"}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? (
              <>
                <Pause className="h-5 w-5 mr-2" />
                Pause Agent
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Start Agent
              </>
            )}
          </Button>
          <Button size="lg" variant="outline">
            <Settings className="h-5 w-5 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AgentWorkflowBuilder agent={agent} />
          <AgentMonitoringDashboard agent={agent} />
        </div>
        <div>
          <NotificationCenter />
        </div>
      </div>

      {isRunning && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 right-8 bg-green-50 p-4 rounded-lg shadow-lg border border-green-200"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75" />
              <div className="relative rounded-full bg-green-500 h-3 w-3" />
            </div>
            <div>
              <p className="font-medium text-green-800">Agent is Running</p>
              <p className="text-sm text-green-600">Processing tasks...</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 