export interface AIModel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  useCase: string;
  features: string[];
}

export const aiModels: AIModel[] = [
  {
    id: 'nexus-llm-v1',
    name: 'Nexus-Intelligence v1',
    tagline: 'Enterprise-grade domain adaptation.',
    description: 'A high-performance foundational model fine-tuned specifically for parsing and extracting structured telemetry from unstructured enterprise ecosystems.',
    useCase: 'Best for automated financial forecasting, semantic search over proprietary text, and compliance auditing.',
    features: ['128k Context Window', 'RLHF Fine-tuned', 'Sub-millisecond latency tracking']
  }
];