import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "../icons";
import { useLanguage } from "@/contexts/language-context";
import { formatRating } from "@/lib/utils";

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  imageUrl: string;
  instructorId: number;
  rating?: number;
  reviewCount?: number;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { t } = useLanguage();
  
  // Calculate rating stars
  const rating = course.rating ? formatRating(course.rating) : 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Get level badge color
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-primary/10 text-primary dark:bg-primary-dark/30 dark:text-primary-light";
      case "intermediate":
        return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
      case "advanced":
        return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="h-48 overflow-hidden">
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="mb-3 flex items-center">
          <Badge variant="outline" className={`px-2 py-1 text-xs font-medium ${getLevelColor(course.level)}`}>
            {t(course.level.toLowerCase())}
          </Badge>
          <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">{course.duration}</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{course.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">{course.description}</p>
        
        <div className="flex items-center mb-4">
          <img 
            src={`https://i.pravatar.cc/150?img=${course.instructorId + 10}`} 
            alt="Instructor" 
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {["Sheikh Ahmad Hassan", "Dr. Yusuf Abdullah", "Dr. Aisha Rahman"][course.instructorId - 1]}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {["Certified Qari", "Islamic Scholar", "Islamic Historian"][course.instructorId - 1]}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="flex items-center text-sm text-amber-500">
            {[...Array(5)].map((_, i) => (
              <React.Fragment key={i}>
                {i < fullStars && <Icons.starFilled className="h-4 w-4" />}
                {i === fullStars && hasHalfStar && <Icons.starHalf className="h-4 w-4" />}
                {(i > fullStars || (i === fullStars && !hasHalfStar)) && <Icons.star className="h-4 w-4" />}
              </React.Fragment>
            ))}
            <span className="ml-1 text-slate-600 dark:text-slate-400">
              {rating.toFixed(1)} ({course.reviewCount})
            </span>
          </span>
          <Button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-150">
            {t("enroll_now")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
