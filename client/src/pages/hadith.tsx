import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/language-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/icons";

export default function Hadith() {
  const { t } = useLanguage();
  const [selectedCollection, setSelectedCollection] = useState<number>(1);

  // Fetch all hadith collections
  const { data: collections, isLoading: isLoadingCollections } = useQuery({
    queryKey: ["/api/hadith-collections"],
  });
  
  // Fetch hadiths for selected collection
  const { data: hadiths, isLoading: isLoadingHadiths } = useQuery({
    queryKey: ["/api/hadith-collections", selectedCollection, "hadiths"],
    queryFn: async () => {
      const res = await fetch(`/api/hadith-collections/${selectedCollection}/hadiths`);
      if (!res.ok) throw new Error("Failed to fetch hadiths");
      return res.json();
    },
  });

  return (
    <div className="py-12 bg-light-surface dark:bg-dark-surface">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 font-decorative text-slate-900 dark:text-white">
          {t("hadith_collections")}
        </h1>
        
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="collections" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="collections">{t("collections")}</TabsTrigger>
              <TabsTrigger value="search">{t("search")}</TabsTrigger>
              <TabsTrigger value="topics">{t("topics")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="collections">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Collections List */}
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader className="bg-primary text-white">
                      <CardTitle>{t("hadith_collections")}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {isLoadingCollections ? (
                        Array(3).fill(0).map((_, i) => (
                          <div key={i} className="p-4 border-b border-gray-100 dark:border-gray-800">
                            <Skeleton className="h-6 w-full mb-2" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        ))
                      ) : (
                        collections?.map((collection) => (
                          <Button
                            key={collection.id}
                            variant="ghost"
                            onClick={() => setSelectedCollection(collection.id)}
                            className={`w-full justify-between p-4 rounded-none border-b border-gray-100 dark:border-gray-800 ${
                              selectedCollection === collection.id ? "bg-gray-50 dark:bg-gray-800" : ""
                            }`}
                          >
                            <span className="font-medium">{collection.englishName}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{collection.totalHadiths}</span>
                          </Button>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                {/* Hadiths List */}
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader className="bg-primary text-white flex flex-row justify-between items-center">
                      <CardTitle>
                        {isLoadingCollections ? (
                          <Skeleton className="h-6 w-40 bg-white/20" />
                        ) : (
                          collections?.find(c => c.id === selectedCollection)?.englishName
                        )}
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="secondary">
                          <Icons.filter className="h-4 w-4 mr-1" /> {t("filter")}
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Icons.bookOpen className="h-4 w-4 mr-1" /> {t("chapters")}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="mb-4">
                        <Input
                          placeholder={`${t("search_in")} ${
                            collections?.find(c => c.id === selectedCollection)?.englishName || ""
                          }`}
                          className="w-full"
                        />
                      </div>

                      {isLoadingHadiths ? (
                        Array(5).fill(0).map((_, i) => (
                          <div key={i} className="mb-6 p-4 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex justify-between mb-2">
                              <Skeleton className="h-5 w-20" />
                              <Skeleton className="h-5 w-16" />
                            </div>
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                          </div>
                        ))
                      ) : (
                        hadiths?.map((hadith) => (
                          <div key={hadith.id} className="mb-6 p-4 border-b border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/10">
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">{t("hadith_number")}: {hadith.number}</span>
                              {hadith.grade && (
                                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                                  {hadith.grade}
                                </span>
                              )}
                            </div>
                            
                            <div className="mb-4">
                              <p className="text-xl font-arabic text-right mb-2 leading-loose text-slate-800 dark:text-slate-200">
                                {hadith.text}
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {hadith.translation}
                              </p>
                            </div>
                            
                            <div className="flex justify-end space-x-2">
                              <Button size="sm" variant="ghost">
                                <Icons.share className="h-4 w-4 mr-1" /> {t("share")}
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Icons.bookmark className="h-4 w-4 mr-1" /> {t("bookmark")}
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="search">
              <Card>
                <CardContent className="py-6">
                  <h2 className="text-2xl font-bold mb-6 text-center">{t("search_hadith")}</h2>
                  <div className="max-w-2xl mx-auto">
                    <div className="flex gap-2 mb-8">
                      <Input placeholder={t("search_hadith_placeholder")} className="flex-1" />
                      <Button>
                        <Icons.search className="h-4 w-4 mr-2" /> {t("search")}
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-slate-600 dark:text-slate-400">{t("advanced_search_hint")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="topics">
              <Card>
                <CardContent className="py-6">
                  <h2 className="text-2xl font-bold mb-6 text-center">{t("hadith_by_topic")}</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {["prayer", "fasting", "zakat", "hajj", "marriage", "business", "good_manners", "knowledge", "dhikr"].map((topic) => (
                      <Button 
                        key={topic} 
                        variant="outline" 
                        className="h-auto py-6 text-center justify-center flex-col gap-2 hover:border-primary hover:text-primary transition-colors"
                      >
                        <Icons.bookOpen className="h-8 w-8 mb-2" />
                        <span className="font-medium">{t(topic)}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
