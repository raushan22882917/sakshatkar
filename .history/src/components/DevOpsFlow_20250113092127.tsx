import React from 'react';
import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './DevOpsFlow.css'; // Custom CSS file for styling
import FlowNode from './flow/FlowNode';
import SubTopicPanel from './flow/SubTopicPanel';
import { FlowNode as FlowNodeType } from '@/types/flow';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: {
      label: 'DevOps Learning Path',
      subTopics: ['Introduction', 'Overview', 'Career Path'],
      completedSubTopics: [],
    },
    position: { x: 400, y: 0 },
    className: 'flow-node flow-input',
  },
  {
    id: '2',
    data: {
      label: 'Programming Languages',
      subTopics: ['Python', 'JavaScript', 'Go', 'Ruby', 'Shell Scripting'],
      completedSubTopics: [],
    },
    position: { x: 200, y: 100 },
    className: 'flow-node',
  },
  {
    id: '3',
    data: {
      label: 'Operating Systems',
      subTopics: ['Linux', 'Unix', 'Windows Server', 'Process Management', 'File Systems'],
      completedSubTopics: [],
    },
    position: { x: 400, y: 100 },
    className: 'flow-node',
  },
  {
    id: '4',
    data: {
      label: 'Networking Basics',
      subTopics: ['TCP/IP', 'DNS', 'HTTP/HTTPS', 'SSL/TLS', 'Load Balancing'],
      completedSubTopics: [],
    },
    position: { x: 600, y: 100 },
    className: 'flow-node',
  },
  // Remaining nodes...
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, type: 'smoothstep', style: { stroke: '#ff0072', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', animated: true, type: 'smoothstep', style: { stroke: '#00c6ff', strokeWidth: 2 } },
  // Remaining edges...
];

const nodeTypes = {
  default: FlowNode,
  input: FlowNode,
  output: FlowNode,
};

const DevOpsFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = React.useState<FlowNodeType | null>(null);

  const onConnect = React.useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = (_event: React.MouseEvent, node: FlowNodeType) => {
    setSelectedNode(node);
  };

  const handleSubTopicComplete = (nodeId: string, subTopic: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          const completedSubTopics = node.data.completedSubTopics || [];
          const newCompletedSubTopics = completedSubTopics.includes(subTopic)
            ? completedSubTopics.filter((t) => t !== subTopic)
            : [...completedSubTopics, subTopic];

          return {
            ...node,
            data: {
              ...node.data,
              completedSubTopics: newCompletedSubTopics,
            },
            className: `flow-node ${newCompletedSubTopics.length === (node.data.subTopics?.length || 0) ? 'completed' : ''}`,
          };
        }
        return node;
      })
    );
  };

  const handleClosePanel = () => {
    setSelectedNode(null);
  };

  return (
    <div className="devops-flow-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background gap={16} color="#ddd" />
        <Controls />
        <MiniMap
          nodeStrokeColor={(n) => (n.className.includes('completed') ? '#00c6ff' : '#ccc')}
          nodeColor={(n) => (n.className.includes('completed') ? '#00c6ff' : '#fff')}
        />
      </ReactFlow>

      {selectedNode && (
        <SubTopicPanel
          node={selectedNode}
          onComplete={handleSubTopicComplete}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
};

export default DevOpsFlow;
