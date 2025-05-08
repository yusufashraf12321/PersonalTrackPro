
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/language-context';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Icons } from './icons';

const PrayerTimes: React.FC = () => {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            const data = await response.json();
            setLocation(data.display_name);
          } catch (error) {
            console.error('Error getting location:', error);
            setLocation('London, United Kingdom');
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocation('London, United Kingdom');
        }
      );
    } else {
      setLocation('London, United Kingdom');
    }
  }, []);

  const { data: prayerTimes, isLoading } = useQuery({
    queryKey: ['/api/prayer-times', { location }],
    queryFn: async () => {
      if (!location) return null;
      const res = await fetch(`/api/prayer-times?location=${encodeURIComponent(location)}`);
      if (!res.ok) throw new Error('Failed to fetch prayer times');
      return res.json();
    },
    enabled: !!location,
  });

  if (isLoading || !prayerTimes) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('todays_prayer_times')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((prayer) => (
            <div key={prayer} className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary text-white">
        <CardTitle className="flex items-center">
          <Icons.clock className="mr-2 h-5 w-5" />
          {t('todays_prayer_times')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {Object.entries(prayerTimes.times).map(([prayer, time], index) => (
          <div 
            key={prayer}
            className={`flex justify-between items-center p-4 prayer-time ${
              index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''
            }`}
          >
            <div className="flex items-center">
              <span className={`text-primary font-medium ${isRtl ? 'ml-2' : 'mr-2'}`}>
                {t(prayer)}
              </span>
            </div>
            <span className="font-mono">{time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PrayerTimes;
