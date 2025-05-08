
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
  tafsir?: string;
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
  const [expandedVerse, setExpandedVerse] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const versesPerPage = 10;
  
  const startIndex = (currentPage - 1) * versesPerPage;
  const endIndex = startIndex + versesPerPage;
  const currentVerses = verses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(verses.length / versesPerPage);

  return (
    <Card className="h-full">
      <CardHeader className="bg-primary/10 flex justify-between items-center">
        <CardTitle>
          {isLoading ? (
            <Skeleton className="h-6 w-40 bg-primary/20" />
          ) : (
            (language === "ar" ? surah?.name : surah?.englishName) || t("quran")
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {!isLoading && surah && surah.number !== 9 && (
          <div className="text-center mb-6">
            <p className="text-2xl font-arabic leading-loose text-primary">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        )}

        <div className="space-y-6">
          {isLoading ? (
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
            currentVerses.map((verse) => (
              <div 
                key={verse.id} 
                className="p-4 border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/10 transition duration-150 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="w-8 h-8 flex-shrink-0 inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
                    {verse.number}
                  </span>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setExpandedVerse(expandedVerse === verse.number ? null : verse.number)}
                      className="text-gray-400 hover:text-primary transition duration-150"
                      title={t(expandedVerse === verse.number ? "collapse" : "expand")}
                    >
                      {expandedVerse === verse.number ? (
                        <Icons.chevronUp className="h-4 w-4" />
                      ) : (
                        <Icons.chevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <p className="text-xl font-arabic leading-loose text-right text-slate-800 dark:text-slate-200 mt-4">
                  {verse.text}
                </p>

                {expandedVerse === verse.number && (
                  <div className="mt-4 space-y-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                    <div>
                      <h4 className="font-medium text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {t("translation")}
                      </h4>
                      <p className="text-slate-800 dark:text-slate-200">
                        {verse.translation}
                      </p>
                    </div>
                    {verse.tafsir && (
                      <div>
                        <h4 className="font-medium text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {t("tafsir")}
                        </h4>
                        <p className="text-slate-800 dark:text-slate-200">
                          {verse.tafsir}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {verses.length > 0 && (
          <div className="flex justify-between items-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <Icons.chevronLeft className="mr-2 h-4 w-4" /> {t("previous")}
            </Button>
            <div className="text-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t("verses")} {startIndex + 1}-{Math.min(endIndex, verses.length)} {t("of")} {verses.length}
              </span>
            </div>
            <Button 
              variant="outline" 
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
