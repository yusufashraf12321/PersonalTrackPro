import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/language-context';
import { Skeleton } from './ui/skeleton';

const PrayerTimes: React.FC = () => {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    // Request location permission and get coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Convert coordinates to location name using reverse geocoding
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            const data = await response.json();
            setLocation(data.display_name);
          } catch (error) {
            console.error('Error getting location:', error);
            setLocation('London, United Kingdom'); // Fallback location
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocation('London, United Kingdom'); // Fallback location
        }
      );
    } else {
      setLocation('London, United Kingdom'); // Fallback location
    }
  }, []);

  // Fetch prayer times
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
      <section className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{t('todays_prayer_times')}</h2>
        <div className="space-y-4">
          {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((prayer) => (
            <div key={prayer} className="flex justify-between items-center">
              <p className="text-gray-600 dark:text-gray-400">{t(prayer)}</p>
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{t('todays_prayer_times')}</h2>
      <div className="space-y-4">
        {Object.entries(prayerTimes.times).map(([prayer, time]) => (
          <div key={prayer} className="flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">{t(prayer)}</p>
            <p className="font-medium">{time}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrayerTimes;