import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { useQuery } from "@tanstack/react-query";
import FeatureCard from "@/components/feature-card";
import PrayerTimes from "@/components/prayer-times";
import SurahList from "@/components/quran/surah-list";
import QuranReader from "@/components/quran/quran-reader";
import CourseCard from "@/components/courses/course-card";
import TopicList from "@/components/community/topic-list";
import DiscussionList from "@/components/community/discussion-list";

interface Surah {
  id: number;
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  versesCount: number;
}

interface Verse {
  id: number;
  surahId: number;
  number: number;
  text: string;
  translation: string;
  audioUrl?: string;
}

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

interface Topic {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
  postsCount: number;
}

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

export default function Home() {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  
  // Fetch courses with type
  const { data: courses, isLoading: isLoadingCourses } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });
  
  // Fetch surahs with type
  const { data: surahs, isLoading: isLoadingSurahs } = useQuery<Surah[]>({
    queryKey: ["/api/surahs"],
  });
  
  // Fetch verses with type
  const { data: verses, isLoading: isLoadingVerses } = useQuery<Verse[]>({
    queryKey: ["/api/surahs/1/verses"],
  });
  
  // Fetch topics with type
  const { data: topics, isLoading: isLoadingTopics } = useQuery<Topic[]>({
    queryKey: ["/api/topics"],
  });
  
  // Fetch discussions with type
  const { data: discussions, isLoading: isLoadingDiscussions } = useQuery<Discussion[]>({
    queryKey: ["/api/discussions"],
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-dark to-primary py-20 lg:py-24">
        <div className="absolute inset-0 geometric-pattern"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 font-decorative">
              {t("hero_title")}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {t("hero_description")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-opacity-95 transition duration-200">
                {t("start_learning")}
              </Button>
              <Button size="lg" className="bg-secondary text-white hover:bg-secondary-dark transition duration-200">
                {t("browse_courses")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-light-surface dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white font-decorative">{t("comprehensive_learning")}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t("features_description")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon="book-open" 
              title={t("quran_study")} 
              description={t("quran_study_description")} 
            />
            <FeatureCard 
              icon="message-square" 
              title={t("hadith_collections")} 
              description={t("hadith_collections_description")} 
            />
            <FeatureCard 
              icon="graduation-cap" 
              title={t("structured_courses")} 
              description={t("structured_courses_description")} 
            />
            <FeatureCard 
              icon="users" 
              title={t("community_support")} 
              description={t("community_support_description")} 
            />
          </div>
        </div>
      </section>

      {/* Prayer Times Section */}
      <PrayerTimes />

      {/* Quran Section */}
      <section className="py-16 bg-light-surface dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-decorative mb-2">{t("explore_quran")}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">{t("quran_section_description")}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/quran">
                <a className="text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary transition duration-150 font-medium flex items-center">
                  {t("view_all_features")} <span className="ml-1">→</span>
                </a>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Surah List */}
            <div className="lg:col-span-2">
              <SurahList surahs={surahs} isLoading={isLoadingSurahs} />
            </div>
            
            {/* Quran Reader */}
            <div className="lg:col-span-3">
              <QuranReader verses={verses} isLoading={isLoadingVerses} />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-surface/30 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-decorative mb-4">{t("featured_courses")}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              {t("courses_description")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingCourses ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white dark:bg-dark-card rounded-xl shadow-md h-96 animate-pulse"></div>
              ))
            ) : (
              courses?.slice(0, 3).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            )}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/courses">
              <Button variant="outline" size="lg" className="bg-white dark:bg-dark-card text-primary hover:shadow-lg transition duration-200">
                {t("view_all_courses")} <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-decorative mb-4">{t("join_community")}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              {t("community_description")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Topics/Categories */}
            <div className="lg:col-span-1">
              <TopicList topics={topics} isLoading={isLoadingTopics} />
            </div>
            
            {/* Recent Discussions */}
            <div className="lg:col-span-2">
              <DiscussionList discussions={discussions} isLoading={isLoadingDiscussions} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-decorative">{t("cta_title")}</h2>
            <p className="text-xl text-white/90 mb-8">
              {t("cta_description")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-opacity-95 transition duration-200">
                {t("create_account")}
              </Button>
              <Button size="lg" className="bg-secondary text-white hover:bg-secondary-dark transition duration-200">
                {t("explore_resources")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
