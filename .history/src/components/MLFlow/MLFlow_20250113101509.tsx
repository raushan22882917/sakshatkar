import React from 'react';
import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './MLFlow.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Introduction to Machine Learning', subTopics: ['Definition', 'Types', 'Applications'] },
    position: { x: 500, y: 50 },
    className: 'flow-node'
  },
  {
    id: '2',
    data: { label: 'Mathematics for ML', subTopics: ['Linear Algebra', 'Probability', 'Statistics', 'Calculus'] },
    position: { x: 300, y: 200 },
    className: 'flow-node'
  },
  {
    id: '3',
    data: { label: 'Programming for ML', subTopics: ['Python Basics', 'NumPy', 'Pandas', 'Scikit-learn'] },
    position: { x: 700, y: 200 },
    className: 'flow-node'
  },
  {
    id: '4',
    data: { label: 'Data Preprocessing', subTopics: ['Data Cleaning', 'Feature Engineering', 'Scaling'] },
    position: { x: 300, y: 400 },
    className: 'flow-node'
  },
  {
    id: '5',
    data: { label: 'Algorithms', subTopics: ['Linear Regression', 'Decision Trees', 'SVM', 'Neural Networks'] },
    position: { x: 700, y: 400 },
    className: 'flow-node'
  },
  {
    id: '6',
    data: { label: 'Deep Learning', subTopics: ['CNNs', 'RNNs', 'GANs', 'Transfer Learning'] },
    position: { x: 500, y: 600 },
    className: 'flow-node'
  },
  {
    id: '7',
    data: { label: 'Model Evaluation', subTopics: ['Metrics', 'Cross-Validation'] },
    position: { x: 300, y: 800 },
    className: 'flow-node'
  },
  {
    id: '8',
    type: 'output',
    data: { label: 'Deployment', subTopics: ['APIs', 'Model Monitoring'] },
    position: { x: 700, y: 800 },
    className: 'flow-node'
  }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, type: 'smoothstep', style: { stroke: 'gray', strokeDasharray: '5,5' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, type: 'smoothstep', style: { stroke: 'gray', strokeDasharray: '5,5' } },
  { id: 'e2-4', source: '2', target: '4', animated: true, type: 'smoothstep', style: { stroke: 'gray', strokeDasharray: '5,5' } },
  { id: 'e3-5', source: '3', target: '5', animated: true, type: 'smoothstep', style: { stroke: 'gray', strokeDasharray: '5,5' } },
  { id: 'e4-6', source: '4', target: '6', animated: true, type: 'smoothstep', style: { stroke: 'gray', strokeDasharray: '5,5' } },
  { id: 'e5-7', source: '5', target: '7', animated: true, type: 'smoothstep', style: { stroke: 'gray', strokeDasharray: '5,5' } },
  { id: 'e6-8', source: '6', target: '8', animated: true, type: 'smoothstep', style: { stroke: 'gray', strokeDasharray: '5,5' } }
];

const nodeTypes = {
  default: FlowNode,
  input: FlowNode,
  output: FlowNode
};

const MLFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = React.useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="relative" style={{ width: '100%', height: '800px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default MLFlow;
