import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SurahList from "@/components/quran/surah-list";
import TafsirView from "@/components/quran/tafsir-view";
import { useLanguage } from "@/contexts/language-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

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

interface Tafsir {
  id: number;
  text: string;
  source: string;
  author: string;
}

export default function Tafsir() {
  const { t } = useLanguage();
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);

  // Fetch all surahs
  const { data: surahs, isLoading: isLoadingSurahs } = useQuery<Surah[]>({
    queryKey: ["/api/surahs"],
  });
  
  // Fetch verses for selected surah
  const { data: verses, isLoading: isLoadingVerses } = useQuery<Verse[]>({
    queryKey: ["/api/surahs", selectedSurah, "verses"],
    queryFn: async () => {
      const res = await fetch(`/api/surahs/${selectedSurah}/verses`);
      if (!res.ok) throw new Error("Failed to fetch verses");
      return res.json();
    },
  });

  // Fetch tafsir for selected verse
  const { data: tafsir, isLoading: isLoadingTafsir } = useQuery<Tafsir[]>({
    queryKey: ["/api/tafsir", selectedSurah, selectedVerse],
    queryFn: async () => {
      if (!selectedVerse) return null;
      const res = await fetch(`/api/tafsir/${selectedSurah}/${selectedVerse}`);
      if (!res.ok) throw new Error("Failed to fetch tafsir");
      return res.json();
    },
    enabled: !!selectedVerse,
  });

  return (
    <div className="py-12 bg-light-surface dark:bg-dark-surface min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 font-decorative text-slate-900 dark:text-white">
          {t("quran_tafsir")}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Surah List */}
          <div className="lg:col-span-3">
            <SurahList 
              surahs={surahs} 
              isLoading={isLoadingSurahs} 
              onSelectSurah={(id) => {
                setSelectedSurah(id);
                setSelectedVerse(null);
              }}
              selectedSurah={selectedSurah}
            />
          </div>
          
          {/* Verses List */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="font-medium text-lg">
                  {surahs?.find((s: Surah) => s.id === selectedSurah)?.name || t("verses")}
                </h2>
              </div>
              <div className="p-2 max-h-[600px] overflow-y-auto">
                {isLoadingVerses ? (
                  <div className="p-4 text-center">
                    <Icons.circle className="h-6 w-6 animate-spin mx-auto" />
                  </div>
                ) : verses?.map((verse) => (
                  <Button
                    key={verse.id}
                    variant="ghost"
                    className={`w-full justify-start text-left mb-1 ${
                      selectedVerse === verse.number ? 'bg-primary/10 text-primary' : ''
                    }`}
                    onClick={() => setSelectedVerse(verse.number)}
                  >
                    <span className="w-8 inline-block">{verse.number}</span>
                    <span className="truncate">{verse.text.slice(0, 30)}...</span>
                  </Button>
                ))}
              </div>
            </Card>
          </div>
          
          {/* Tafsir View */}
          <div className="lg:col-span-6">
            <TafsirView 
              verse={verses?.find((v) => v.number === selectedVerse)}
              tafsir={tafsir}
              isLoading={isLoadingTafsir}
            />
          </div>
        </div>
      </div>
    </div>
  );
}