import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";
import { Icons } from "../icons";

interface Verse {
  id?: number;
  surahId: number;
  number: number;
  text: string;
  translation: string;
  tafsir?: string;
}

interface Surah {
  id?: number;
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
  const [expandedVerse, setExpandedVerse] = useState<number | null>(null);

  return (
    <Card className="h-full">
      <CardHeader className="bg-primary/10">
        <CardTitle>
          {isLoading ? (
            <Skeleton className="h-6 w-40 bg-primary/20" />
          ) : (
            (language === "ar" ? surah?.name : surah?.englishName) || t("quran")
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <Skeleton className="h-6 w-full" />
              </div>
            ))
          ) : (
            verses.map((verse) => (
              <div key={verse.number} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="w-8 h-8 flex-shrink-0 inline-flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    {verse.number}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setExpandedVerse(expandedVerse === verse.number ? null : verse.number)}
                  >
                    {expandedVerse === verse.number ? (
                      <Icons.chevronUp className="h-4 w-4" />
                    ) : (
                      <Icons.chevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <p className="text-xl font-arabic text-right mt-4">{verse.text}</p>

                {expandedVerse === verse.number && (
                  <div className="mt-4 space-y-4 border-t pt-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">{t("translation")}</h4>
                      <p>{verse.translation}</p>
                    </div>
                    {verse.tafsir && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">{t("tafsir")}</h4>
                        <p>{verse.tafsir}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuranReader;