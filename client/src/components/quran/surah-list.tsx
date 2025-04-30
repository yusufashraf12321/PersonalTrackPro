import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";
import { Icons } from "../icons";

interface Surah {
  id: number;
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  versesCount: number;
}

interface SurahListProps {
  surahs?: Surah[];
  isLoading: boolean;
  onSelectSurah?: (id: number) => void;
  selectedSurah?: number;
}

const SurahList: React.FC<SurahListProps> = ({ 
  surahs = [], 
  isLoading, 
  onSelectSurah,
  selectedSurah
}) => {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter surahs based on search query
  const filteredSurahs = surahs.filter(surah => 
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.name.includes(searchQuery) ||
    surah.number.toString().includes(searchQuery)
  );
  
  // Display first 5 surahs if no onSelectSurah prop is provided (homepage view)
  const displaySurahs = onSelectSurah ? filteredSurahs : filteredSurahs.slice(0, 5);

  return (
    <Card>
      <CardHeader className="bg-primary text-white">
        <CardTitle>{t("surah_list")}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder={t("search_surah")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-surface dark:text-white text-sm"
            dir={isRtl ? "rtl" : "ltr"}
          />
          <Icons.search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="mt-4 max-h-80 overflow-y-auto">
          {isLoading ? (
            // Loading skeletons
            Array(5).fill(0).map((_, index) => (
              <div key={index} className="p-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Skeleton className="w-8 h-8 rounded-full mr-3" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))
          ) : (
            // Render surahs
            displaySurahs.map((surah) => (
              <div 
                key={surah.id}
                className={`p-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark-surface/80 transition duration-150 cursor-pointer flex justify-between items-center ${
                  selectedSurah === surah.id ? "bg-gray-50 dark:bg-dark-surface/80" : ""
                }`}
                onClick={() => onSelectSurah && onSelectSurah(surah.id)}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm mr-3">
                    {surah.number}
                  </span>
                  <span className="text-slate-800 dark:text-slate-200">
                    {language === "ar" ? surah.name : surah.englishName}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">
                    {surah.versesCount} {t("verses")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        
        {!onSelectSurah && ( // Only show "View all" button on homepage
          <div className="mt-4 text-center">
            <Button variant="link" className="text-primary hover:text-primary-dark transition duration-150">
              {t("view_all_surahs")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SurahList;
