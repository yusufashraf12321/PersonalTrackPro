import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description,
  className 
}) => {
  // Get the icon component based on the icon name
  const IconComponent = getIconComponent(icon);

  return (
    <Card className={cn("islamic-card hover:shadow-lg transition duration-200", className)}>
      <CardContent className="p-6">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <IconComponent className="text-primary text-xl h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
      </CardContent>
    </Card>
  );
};

// Helper function to map icon names to icon components
function getIconComponent(iconName: string) {
  switch (iconName) {
    case "book-open":
      return Icons.bookOpen;
    case "message-square":
      return Icons.messageSquare;
    case "graduation-cap":
      return Icons.graduationCap;
    case "users":
      return Icons.users;
    default:
      return Icons.circle;
  }
}

export default FeatureCard;
