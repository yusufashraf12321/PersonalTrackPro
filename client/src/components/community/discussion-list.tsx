import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-context";
import { Icons } from "../icons";

interface Discussion {
  id: number;
  topicId: number;
  userId: number;
  title: string;
  content: string;
  status: string;
  commentsCount: number;
  viewsCount: number;
  createdAt: string;
}

interface DiscussionListProps {
  discussions?: Discussion[];
  isLoading: boolean;
}

const DiscussionList: React.FC<DiscussionListProps> = ({ discussions = [], isLoading }) => {
  const { t } = useLanguage();

  // Get status badge config
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "answered":
        return {
          bg: "bg-green-100 dark:bg-green-900/30",
          text: "text-green-600 dark:text-green-400",
          icon: <Icons.checkCircle className="mr-1 h-3 w-3" />,
          label: t("answered")
        };
      case "discussion":
        return {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          text: "text-blue-600 dark:text-blue-400",
          icon: <Icons.messageCircle className="mr-1 h-3 w-3" />,
          label: t("discussion")
        };
      case "knowledge":
        return {
          bg: "bg-purple-100 dark:bg-purple-900/30",
          text: "text-purple-600 dark:text-purple-400",
          icon: <Icons.book className="mr-1 h-3 w-3" />,
          label: t("knowledge")
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-900/30",
          text: "text-gray-600 dark:text-gray-400",
          icon: <Icons.help className="mr-1 h-3 w-3" />,
          label: status
        };
    }
  };

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div>
      {isLoading ? (
        // Loading skeletons
        Array(3).fill(0).map((_, index) => (
          <div key={index} className="p-4 border-b border-gray-100 dark:border-gray-800 mb-4">
            <div className="flex justify-between mb-2">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <div className="flex justify-between mt-4">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full mr-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex space-x-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        ))
      ) : discussions.length === 0 ? (
        // Empty state
        <div className="text-center py-8">
          <Icons.messageSquare className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">{t("no_discussions")}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
            {t("no_discussions_description")}
          </p>
          <Button className="bg-primary text-white">
            <Icons.plus className="mr-2 h-4 w-4" /> {t("new_question")}
          </Button>
        </div>
      ) : (
        // Render discussions
        <>
          {discussions.map((discussion) => {
            const statusBadge = getStatusBadge(discussion.status);
            
            return (
              <div key={discussion.id} className="p-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex justify-between">
                  <h4 className="text-lg font-medium text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary transition duration-150 cursor-pointer">
                    {discussion.title}
                  </h4>
                  <Badge variant="outline" className={`${statusBadge.bg} ${statusBadge.text} text-xs px-2 py-1 rounded-full flex items-center`}>
                    {statusBadge.icon} {statusBadge.label}
                  </Badge>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                  {discussion.content}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <img 
                      src={`https://i.pravatar.cc/150?img=${discussion.userId + 10}`} 
                      alt="User" 
                      className="w-8 h-8 rounded-full mr-3 object-cover" 
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {["Ahmed M.", "Sarah K.", "Omar J."][discussion.userId - 1]}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-slate-500 dark:text-slate-500">
                      {formatRelativeTime(discussion.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-sm text-slate-500 dark:text-slate-500">
                      <Icons.messageSquare className="mr-1 h-4 w-4" /> {discussion.commentsCount}
                    </span>
                    <span className="flex items-center text-sm text-slate-500 dark:text-slate-500">
                      <Icons.eye className="mr-1 h-4 w-4" /> {discussion.viewsCount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="mt-4 text-center">
            <Button variant="link" className="text-primary hover:text-primary-dark transition duration-150">
              {t("view_all_discussions")} <Icons.arrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DiscussionList;
