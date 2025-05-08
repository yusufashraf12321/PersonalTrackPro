import type { Surah, Verse, Course, Topic, Discussion, PrayerTime } from '../shared/schema';

// Local storage implementation
export const storage = {
  getAllSurahs: async () => {
    // Return a sample surah list
    return [
      {
        number: 1,
        name: "الفاتحة",
        englishName: "Al-Fatiha",
        englishNameTranslation: "The Opening",
        revelationType: "Meccan",
        versesCount: 7
      }
      // Add more surahs as needed
    ];
  },

  getSurahById: async (id: number) => {
    // Return a sample surah
    return {
      number: 1,
      name: "الفاتحة",
      englishName: "Al-Fatiha",
      englishNameTranslation: "The Opening",
      revelationType: "Meccan",
      versesCount: 7
    };
  },

  getVersesBySurahId: async (id: number) => {
    // Return sample verses
    return [
      {
        surahId: 1,
        number: 1,
        text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful",
        tafsir: "This is the opening verse of the Quran",
      }
      // Add more verses as needed
    ];
  },
};