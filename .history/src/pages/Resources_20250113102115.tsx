import { PracticeModeCard } from "@/components/PracticeModeCard";
import { Code } from "lucide-react";

export default function Resources() {
  const resources = [
    {
      title: "AI-Assisted DevOps",
      description: "Practice DevOps concepts with the support of AI tools.",
      icon: Code,
      route: "/devops-practice",
      image: "https://www.amplework.com/wp-content/uploads/2022/07/DevOps-with-AI.png",
    },

    {
      title: "Machine Learning",
      description: "  Guide you for interview and get a better chance to get hired.",
      icon: Code,
      route: "/ml-practice",
      image: "https://www.amplework.com/wp-content/uploads/2022/07/DevOps-with-AI.png",
    },
  ];

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Resources</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <PracticeModeCard key={resource.title} {...resource} />
        ))}
      </div>
    </div>
  );
}