import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SurahList from "@/components/quran/surah-list";
import QuranReader from "@/components/quran/quran-reader";
import { useLanguage } from "@/contexts/language-context";

export default function Quran() {
  const { t } = useLanguage();
  const [selectedSurah, setSelectedSurah] = useState<number>(1);

  // Fetch all surahs
  const { data: surahs, isLoading: isLoadingSurahs } = useQuery({
    queryKey: ["/api/surahs"],
  });
  
  // Fetch verses for selected surah
  const { data: verses, isLoading: isLoadingVerses } = useQuery({
    queryKey: ["/api/surahs", selectedSurah, "verses"],
    queryFn: async () => {
      if (!selectedSurah) return [];
      const res = await fetch(`/api/surahs/${selectedSurah}/verses`);
      if (!res.ok) throw new Error("Failed to fetch verses");
      return res.json();
    },
    enabled: !!selectedSurah
  });

  return (
    <div className="py-12 bg-light-surface dark:bg-dark-surface">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 font-decorative text-slate-900 dark:text-white">
          {t("quran")}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Surah List */}
          <div className="lg:col-span-2">
            <SurahList 
              surahs={surahs} 
              isLoading={isLoadingSurahs} 
              onSelectSurah={(id) => setSelectedSurah(id)}
              selectedSurah={selectedSurah}
            />
          </div>
          
          {/* Quran Reader */}
          <div className="lg:col-span-3">
            <QuranReader 
              verses={verses} 
              isLoading={isLoadingVerses} 
              surah={surahs?.find(s => s.id === selectedSurah)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
