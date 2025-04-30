import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/language-context";
import CourseCard from "@/components/courses/course-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";

export default function Courses() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch all courses
  const { data: courses, isLoading } = useQuery({
    queryKey: ["/api/courses"],
  });

  // Filter courses based on search term
  const filteredCourses = courses?.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 bg-light-surface dark:bg-dark-surface">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 font-decorative text-slate-900 dark:text-white">
          {t("islamic_courses")}
        </h1>
        
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder={t("search_courses")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-primary text-white hover:bg-primary-dark">
              <Icons.search className="h-4 w-4 mr-2" /> {t("search")}
            </Button>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary/10">{t("all_courses")}</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary/10">{t("beginner")}</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary/10">{t("intermediate")}</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary/10">{t("advanced")}</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary/10">{t("quran")}</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary/10">{t("hadith")}</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary/10">{t("fiqh")}</Badge>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 flex justify-center">
            <TabsTrigger value="all">{t("all_courses")}</TabsTrigger>
            <TabsTrigger value="trending">{t("trending")}</TabsTrigger>
            <TabsTrigger value="new">{t("new")}</TabsTrigger>
            <TabsTrigger value="free">{t("free")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(6).fill(0).map((_, index) => (
                  <div key={index} className="bg-white dark:bg-dark-card rounded-xl shadow-md h-96 animate-pulse"></div>
                ))}
              </div>
            ) : filteredCourses?.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <Icons.search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">{t("no_courses_found")}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t("no_courses_description")}</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses?.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="trending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses?.slice(0, 3).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses?.slice(0, 3).reverse().map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="free">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses?.filter((_, i) => i % 2 === 0).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
