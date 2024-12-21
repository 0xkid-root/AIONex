import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AIAgent, WorkflowNode, WorkflowEdge } from '@/types/agents';

interface AgentWorkflowBuilderProps {
  agent: AIAgent;
}

export function AgentWorkflowBuilder({ agent }: AgentWorkflowBuilderProps) {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [edges, setEdges] = useState<WorkflowEdge[]>([]);

  const addNode = (type: string) => {
    const newNode: WorkflowNode = {
      id: `node-${nodes.length + 1}`,
      type,
      position: { x: 100, y: 100 },
      data: { label: `${type} Node` }
    };
    setNodes([...nodes, newNode]);
  };

  const removeNode = (nodeId: string) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    setEdges(edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Workflow Builder</h2>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => addNode('input')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Input
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addNode('process')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Process
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addNode('output')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Output
          </Button>
        </div>
      </div>

      <div className="relative h-[500px] border rounded-lg">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            drag
            dragMomentum={false}
            className="absolute bg-white rounded-lg shadow-sm border p-4"
            style={{
              left: node.position.x,
              top: node.position.y,
              width: 200
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{node.data.label}</span>
              <button
                onClick={() => removeNode(node.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex justify-center">
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 