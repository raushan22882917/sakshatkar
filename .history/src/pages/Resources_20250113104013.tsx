import { useState } from "react";
import { PracticeModeCard } from "@/components/PracticeModeCard";
import { Code } from "lucide-react";

export default function Resources() {
  const [activeTab, setActiveTab] = useState("Reading Material");

  const resources = {
    "Reading Material": [
      {
        title: "AI-Assisted DevOps",
        description: "Learn about DevOps concepts with AI support.",
        icon: Code,
        route: "/devops-practice",
        image: "https://www.amplework.com/wp-content/uploads/2022/07/DevOps-with-AI.png",
      },
      {
        title: "Machine Learning",
        description: "Guide you for interviews to increase hiring chances.",
        icon: Code,
        route: "/ml-practice",
        image: "https://www.amplework.com/wp-content/uploads/2022/07/DevOps-with-AI.png",
      },
    ],
    "Interview Material": [
      {
        title: "Top 50 DevOps Questions",
        description: "Prepare for DevOps interviews with these top questions.",
        icon: Code,
        route: "/interview/devops-questions",
        image: "https://via.placeholder.com/300x200.png?text=DevOps+Interview+Questions",
      },
      {
        title: "Machine Learning Interview Tips",
        description: "Ace your ML interviews with expert tips and tricks.",
        icon: Code,
        route: "/interview/ml-tips",
        image: "https://via.placeholder.com/300x200.png?text=ML+Interview+Tips",
      },
    ],
    Article: [
      {
        title: "The Future of DevOps",
        description: "Explore how DevOps is evolving in the AI-driven world.",
        icon: Code,
        route: "/articles/future-devops",
        image: "https://via.placeholder.com/300x200.png?text=Future+of+DevOps",
      },
      {
        title: "Understanding Neural Networks",
        description: "Dive deep into the basics of neural networks and their applications.",
        icon: Code,
        route: "/articles/neural-networks",
        image: "https://via.placeholder.com/300x200.png?text=Neural+Networks",
      },
    ],
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Resources</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        {Object.keys(resources).map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {resources[activeTab].map((resource) => (
          <PracticeModeCard key={resource.title} {...resource} />
        ))}
      </div>
    </div>
  );
}
