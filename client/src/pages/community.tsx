import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/icons";
import TopicList from "@/components/community/topic-list";
import DiscussionList from "@/components/community/discussion-list";

export default function Community() {
  const { t } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  
  // Fetch all topics
  const { data: topics, isLoading: isLoadingTopics } = useQuery({
    queryKey: ["/api/topics"],
  });
  
  // Fetch discussions
  const { data: discussions, isLoading: isLoadingDiscussions } = useQuery({
    queryKey: ["/api/discussions"],
  });
  
  // Fetch topic-specific discussions when a topic is selected
  const { data: topicDiscussions, isLoading: isLoadingTopicDiscussions } = useQuery({
    queryKey: ["/api/topics", selectedTopic, "discussions"],
    queryFn: async () => {
      if (!selectedTopic) return [];
      const res = await fetch(`/api/topics/${selectedTopic}/discussions`);
      if (!res.ok) throw new Error("Failed to fetch topic discussions");
      return res.json();
    },
    enabled: !!selectedTopic,
  });

  const displayDiscussions = selectedTopic ? topicDiscussions : discussions;
  const isLoadingCurrentDiscussions = selectedTopic ? isLoadingTopicDiscussions : isLoadingDiscussions;

  return (
    <div className="py-12 bg-light-surface dark:bg-dark-surface">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 font-decorative text-slate-900 dark:text-white">
          {t("community")}
        </h1>
        
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="discussions" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="discussions">{t("discussions")}</TabsTrigger>
              <TabsTrigger value="ask">{t("ask_question")}</TabsTrigger>
              <TabsTrigger value="scholars">{t("scholars")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="discussions">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Topics/Categories */}
                <div className="lg:col-span-1">
                  <TopicList 
                    topics={topics} 
                    isLoading={isLoadingTopics} 
                    onSelectTopic={(id) => setSelectedTopic(id)}
                    selectedTopic={selectedTopic}
                  />
                </div>
                
                {/* Discussions */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader className="bg-primary text-white flex flex-row justify-between items-center">
                      <CardTitle>
                        {selectedTopic ? 
                          topics?.find(t => t.id === selectedTopic)?.name || t("discussions") : 
                          t("recent_discussions")}
                      </CardTitle>
                      <Button size="sm" variant="secondary">
                        <Icons.plus className="h-4 w-4 mr-1" /> {t("new_question")}
                      </Button>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="mb-4">
                        <Input placeholder={t("search_discussions")} className="w-full" />
                      </div>
                      
                      <DiscussionList 
                        discussions={displayDiscussions} 
                        isLoading={isLoadingCurrentDiscussions} 
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ask">
              <Card>
                <CardHeader>
                  <CardTitle>{t("ask_new_question")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("question_title")}</label>
                      <Input placeholder={t("question_title_placeholder")} />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("select_topic")}</label>
                      <select className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700">
                        <option value="">{t("select_topic")}</option>
                        {topics?.map((topic) => (
                          <option key={topic.id} value={topic.id}>{topic.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("question_details")}</label>
                      <textarea 
                        className="w-full p-2 border rounded-md min-h-[150px] dark:bg-gray-800 dark:border-gray-700" 
                        placeholder={t("question_details_placeholder")}
                      ></textarea>
                    </div>
                    
                    <div className="pt-4">
                      <Button className="bg-primary text-white hover:bg-primary-dark">
                        <Icons.send className="h-4 w-4 mr-2" /> {t("submit_question")}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="scholars">
              <Card>
                <CardContent className="py-6">
                  <h2 className="text-2xl font-bold mb-6 text-center">{t("our_scholars")}</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((id) => (
                      <Card key={id}>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-4 overflow-hidden">
                              <img 
                                src={`https://i.pravatar.cc/150?img=${id + 10}`} 
                                alt="Scholar" 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <h3 className="font-bold text-lg mb-1">
                              {["Dr. Ahmad Hassan", "Sheikh Muhammad Ali", "Dr. Aisha Rahman", "Sheikh Abdullah Yusuf", "Dr. Fatima Khan", "Sheikh Ibrahim Khalil"][id - 1]}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {["Islamic Law", "Hadith Sciences", "Islamic History", "Quranic Studies", "Islamic Philosophy", "Islamic Jurisprudence"][id - 1]}
                            </p>
                            <Button variant="outline" size="sm">
                              {t("view_profile")}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
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
