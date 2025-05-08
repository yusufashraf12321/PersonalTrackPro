import type { Surah, Verse, Course, Topic, Discussion, PrayerTime } from '../shared/schema';

const QURAN_API_BASE = 'https://api.quran.com/api/v4';

export const storage = {
  getAllSurahs: async () => {
    const response = await fetch(`${QURAN_API_BASE}/chapters`);
    const data = await response.json();
    return data.chapters.map((chapter: any) => ({
      number: chapter.id,
      name: chapter.name_arabic,
      englishName: chapter.name_simple,
      englishNameTranslation: chapter.translated_name.name,
      revelationType: chapter.revelation_place,
      versesCount: chapter.verses_count
    }));
  },

  getSurahById: async (id: number) => {
    const response = await fetch(`${QURAN_API_BASE}/chapters/${id}`);
    const data = await response.json();
    const chapter = data.chapter;
    return {
      number: chapter.id,
      name: chapter.name_arabic,
      englishName: chapter.name_simple,
      englishNameTranslation: chapter.translated_name.name,
      revelationType: chapter.revelation_place,
      versesCount: chapter.verses_count
    };
  },

  getVersesBySurahId: async (id: number) => {
    const response = await fetch(`${QURAN_API_BASE}/verses/by_chapter/${id}?language=en&words=true&translations=131`);
    const data = await response.json();
    return data.verses.map((verse: any) => ({
      surahId: id,
      number: verse.verse_number,
      text: verse.text_uthmani,
      translation: verse.translations[0].text,
      audioUrl: `https://verses.quran.com/${verse.audio?.url}`
    }));
  },

  getAllCourses: async () => {
    //Implementation for Courses if needed.  Placeholder remains for future implementation.
    return [];
  },

  getAllTopics: async () => {
    //Implementation for Topics if needed. Placeholder remains for future implementation.
    return [];
  },

  getRecentDiscussions: async () => {
    //Implementation for Discussions if needed. Placeholder remains for future implementation.
    return [];
  },

  getPrayerTimes: async (date: string, location: string): Promise<PrayerTime> => {
    //Implementation for Prayer Times if needed. Placeholder remains for future implementation.
    return {date, location, times: {fajr: "", sunrise: "", dhuhr: "", asr: "", maghrib: "", isha: ""}};
  }
};