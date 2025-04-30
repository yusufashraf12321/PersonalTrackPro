import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";
import { Icons } from "../icons";

interface Topic {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
  postsCount: number;
}

interface TopicListProps {
  topics?: Topic[];
  isLoading: boolean;
  onSelectTopic?: (id: number) => void;
  selectedTopic?: number | null;
}

const TopicList: React.FC<TopicListProps> = ({ 
  topics = [], 
  isLoading, 
  onSelectTopic,
  selectedTopic 
}) => {
  const { t } = useLanguage();

  // Get icon component based on icon name
  const getIconComponent = (iconName: string | null) => {
    if (!iconName) return Icons.hash;
    
    switch (iconName) {
      case "book-open":
        return Icons.bookOpen;
      case "pray":
        return Icons.pray;
      case "balance-scale":
        return Icons.balanceScale;
      case "heart":
        return Icons.heart;
      case "history":
        return Icons.history;
      default:
        return Icons.hash;
    }
  };

  return (
    <Card>
      <CardHeader className="bg-primary text-white">
        <CardTitle>{t("popular_topics")}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-3">
          {isLoading ? (
            // Loading skeletons
            Array(5).fill(0).map((_, index) => (
              <li key={index} className="p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Skeleton className="h-6 w-6 mr-3 rounded-full" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
              </li>
            ))
          ) : (
            // Render topics
            topics.map((topic) => {
              const IconComponent = getIconComponent(topic.icon);
              
              return (
                <li 
                  key={topic.id}
                  className={`p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150 cursor-pointer flex justify-between items-center ${
                    selectedTopic === topic.id ? "bg-gray-50 dark:bg-gray-800" : ""
                  }`}
                  onClick={() => onSelectTopic && onSelectTopic(topic.id)}
                >
                  <div className="flex items-center">
                    <IconComponent className="text-primary h-5 w-5" />
                    <span className="ml-3 text-slate-800 dark:text-slate-200">{topic.name}</span>
                  </div>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                    {topic.postsCount} {t("posts")}
                  </span>
                </li>
              );
            })
          )}
        </ul>
        <div className="mt-4 text-center">
          <Button variant="link" className="text-primary hover:text-primary-dark transition duration-150">
            {t("view_all_topics")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopicList;
