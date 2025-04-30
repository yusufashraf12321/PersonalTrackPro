import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/language-context";
import { getCurrentDate } from "@/lib/utils";

interface PrayerTime {
  id: number;
  date: string;
  location: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

const PrayerTimes: React.FC = () => {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  
  // Get current location and date for prayer times query
  const location = "London, United Kingdom"; // Default location
  const date = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
  
  // Fetch prayer times
  const { data: prayerTimes, isLoading } = useQuery({
    queryKey: ["/api/prayer-times", { location, date }],
    queryFn: async () => {
      const res = await fetch(`/api/prayer-times?location=${encodeURIComponent(location)}&date=${date}`);
      if (!res.ok) throw new Error("Failed to fetch prayer times");
      return res.json();
    },
  });

  return (
    <section className="py-12 bg-gray-50 dark:bg-dark-surface/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-decorative">{t("todays_prayer_times")}</h2>
          <p className="text-slate-600 dark:text-slate-400">
            {isLoading ? (
              <Skeleton className="h-5 w-48 mx-auto" />
            ) : (
              <>
                {location} | {getCurrentDate()}
              </>
            )}
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {isLoading ? (
            // Loading skeletons
            Array(5).fill(0).map((_, index) => (
              <Card key={index} className="prayer-time">
                <CardContent className="p-4 text-center">
                  <Skeleton className="h-6 w-16 mx-auto mb-2" />
                  <Skeleton className="h-8 w-20 mx-auto" />
                </CardContent>
              </Card>
            ))
          ) : (
            // Render prayer times
            prayerTimes && (
              <>
                <PrayerTimeCard name={t("fajr")} time={prayerTimes.fajr} />
                <PrayerTimeCard name={t("dhuhr")} time={prayerTimes.dhuhr} />
                <PrayerTimeCard name={t("asr")} time={prayerTimes.asr} />
                <PrayerTimeCard name={t("maghrib")} time={prayerTimes.maghrib} />
                <PrayerTimeCard name={t("isha")} time={prayerTimes.isha} />
              </>
            )
          )}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="link" className="text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary transition duration-150">
            {t("set_location")}
          </Button>
        </div>
      </div>
    </section>
  );
};

// Prayer time card component
const PrayerTimeCard: React.FC<{ name: string; time: string }> = ({ name, time }) => (
  <Card className="prayer-time">
    <CardContent className="p-4 text-center">
      <h3 className="text-lg font-medium text-slate-900 dark:text-white">{name}</h3>
      <p className="text-xl font-bold text-primary">{time}</p>
    </CardContent>
  </Card>
);

export default PrayerTimes;
