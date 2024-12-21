import { useState } from 'react';
import { useAI } from '@/contexts/AIContext';
import { Workflow, WorkflowStep } from '@/types/platform';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';

export function AIWorkspace() {
  const { agents, workflows, createWorkflow } = useAI();
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId === 'agents' && destination.droppableId === 'workflow') {
      // Add agent to workflow
      if (!selectedAgents.includes(draggableId)) {
        setSelectedAgents([...selectedAgents, draggableId]);
      }
    } else if (source.droppableId === 'workflow' && destination.droppableId === 'workflow') {
      // Reorder agents in workflow
      const items = Array.from(selectedAgents);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setSelectedAgents(items);
    }
  };

  const handleCreateWorkflow = async () => {
    if (!workflowName || !workflowDescription || selectedAgents.length === 0) {
      toast({
        title: "Invalid Workflow",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const workflow: Workflow = {
        id: `workflow-${Date.now()}`,
        name: workflowName,
        description: workflowDescription,
        creator: 'current-user-address',
        status: 'active',
        steps: selectedAgents.map((agentId, index) => ({
          id: `step-${index}`,
          agentId,
          action: 'execute',
          inputs: {},
          outputs: {},
          status: 'pending'
        }))
      };

      await createWorkflow(workflow);
      toast({
        title: "Success",
        description: "Workflow created successfully",
        variant: "success",
      });

      // Reset form
      setWorkflowName('');
      setWorkflowDescription('');
      setSelectedAgents([]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create workflow",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Workspace</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Available Agents</h2>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="agents">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {agents.map((agent, index) => (
                    <Draggable
                      key={agent.id}
                      draggableId={agent.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-4 bg-white rounded-lg shadow"
                        >
                          <h3 className="font-medium">{agent.name}</h3>
                          <p className="text-sm text-gray-600">{agent.description}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Workflow Builder</h2>
          {/* Workflow builder implementation */}
        </div>
      </div>
    </div>
  );
} 