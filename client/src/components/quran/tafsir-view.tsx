import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";
import { Icons } from "../icons";

interface TafsirViewProps {
  verse?: {
    id: number;
    surahId: number;
    number: number;
    text: string;
    translation: string;
  };
  tafsir?: {
    id: number;
    text: string;
    source: string;
    author: string;
  }[];
  isLoading: boolean;
}

const TafsirView: React.FC<TafsirViewProps> = ({ verse, tafsir = [], isLoading }) => {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";

  return (
    <Card>
      <CardHeader className="bg-primary text-white flex justify-between items-center">
        <CardTitle>
          {t("tafsir")}
        </CardTitle>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-primary-light" title={t("share")}>
            <Icons.share className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-primary-light" title={t("bookmark")}>
            <Icons.bookmark className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : verse ? (
          <>
            {/* Verse Section */}
            <div className="mb-6 p-4 bg-secondary/5 rounded-lg">
              <p className={`text-xl font-arabic leading-loose text-right text-slate-800 dark:text-slate-200 ${isRtl ? 'rtl' : ''}`}>
                {verse.text}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                {verse.translation}
              </p>
            </div>

            {/* Tafsir Section */}
            <div className="space-y-6">
              {tafsir.map((interpretation) => (
                <div key={interpretation.id} className="p-4 border border-gray-100 dark:border-gray-800 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-slate-900 dark:text-white">
                      {interpretation.author}
                    </h3>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {interpretation.source}
                    </span>
                  </div>
                  <p className={`text-slate-700 dark:text-slate-300 leading-relaxed ${isRtl ? 'rtl' : ''}`}>
                    {interpretation.text}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <Icons.book className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">{t("select_verse_for_tafsir")}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TafsirView;