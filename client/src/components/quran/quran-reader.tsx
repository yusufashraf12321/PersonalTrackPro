import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";
import { Icons } from "../icons";

interface Verse {
  id: number;
  surahId: number;
  number: number;
  text: string;
  translation: string;
  audioUrl?: string;
}

interface Surah {
  id: number;
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  versesCount: number;
}

interface QuranReaderProps {
  verses?: Verse[];
  isLoading: boolean;
  surah?: Surah;
}

const QuranReader: React.FC<QuranReaderProps> = ({ verses = [], isLoading, surah }) => {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  const versesPerPage = 3;
  
  // Calculate pagination
  const totalPages = verses.length > 0 ? Math.ceil(verses.length / versesPerPage) : 1;
  const currentVerses = verses.slice((currentPage - 1) * versesPerPage, currentPage * versesPerPage);
  
  // Handle audio playback
  const playAudio = (verse: Verse) => {
    if (isPlaying === verse.id) {
      // Stop playing
      setIsPlaying(null);
    } else {
      // Start playing
      setIsPlaying(verse.id);
      if (verse.audioUrl) {
        const audio = new Audio(verse.audioUrl);
        audio.onended = () => setIsPlaying(null);
        audio.play().catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(null);
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader className="bg-primary text-white flex justify-between items-center">
        <CardTitle>
          {isLoading ? (
            <Skeleton className="h-6 w-40 bg-white/20" />
          ) : (
            (language === "ar" ? surah?.name : surah?.englishName) || t("quran")
          )}
        </CardTitle>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-primary-light" title={t("bookmark")}>
            <Icons.bookmark className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-primary-light" title={t("play")}>
            <Icons.play className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-primary-light" title={t("settings")}>
            <Icons.settings className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Bismillah */}
        {!isLoading && surah && (
          <div className="text-center mb-6">
            <p className="text-2xl font-arabic leading-loose text-slate-800 dark:text-slate-200">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              In the name of Allah, the Entirely Merciful, the Especially Merciful.
            </p>
          </div>
        )}
        
        {/* Verses */}
        <div className="space-y-6">
          {isLoading ? (
            // Loading skeletons
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="p-4 border-b border-gray-100 dark:border-gray-800 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex space-x-2">
                    <Skeleton className="w-8 h-8" />
                    <Skeleton className="w-8 h-8" />
                  </div>
                </div>
                <Skeleton className="h-8 w-full mt-4 mb-2" />
                <Skeleton className="h-4 w-full mt-2" />
              </div>
            ))
          ) : (
            // Render verses
            currentVerses.map((verse) => (
              <div 
                key={verse.id} 
                className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/10 transition duration-150 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="w-8 h-8 flex-shrink-0 inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
                    {verse.number}
                  </span>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`text-gray-400 hover:text-primary transition duration-150 ${isPlaying === verse.id ? 'text-primary' : ''}`} 
                      title={t("play")}
                      onClick={() => playAudio(verse)}
                    >
                      {isPlaying === verse.id ? <Icons.pause className="h-4 w-4" /> : <Icons.play className="h-4 w-4" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-400 hover:text-primary transition duration-150" 
                      title={t("share")}
                    >
                      <Icons.share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className={`text-xl font-arabic leading-loose text-right text-slate-800 dark:text-slate-200 mt-4 ${isRtl ? 'rtl' : ''}`}>
                  {verse.text}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  {verse.translation}
                </p>
              </div>
            ))
          )}
        </div>
        
        {/* Pagination */}
        {verses.length > 0 && (
          <div className="flex justify-between items-center mt-8">
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <Icons.chevronLeft className="mr-2 h-4 w-4" /> {t("previous")}
            </Button>
            <div className="text-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t("verses")} {(currentPage - 1) * versesPerPage + 1}-{Math.min(currentPage * versesPerPage, verses.length)} {t("of")} {verses.length}
              </span>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              {t("next")} <Icons.chevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuranReader;
