import type { Surah, Verse, Course, Topic, Discussion, PrayerTime } from '../shared/schema';

class Storage {
  private surahs: Map<number, Surah> = new Map();
  private verses: Map<number, Verse[]> = new Map();
  private courses: Course[] = [];
  private topics: Topic[] = [];
  private discussions: Discussion[] = [];
  private prayerTimes: Map<string, PrayerTime> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Add sample data
    this.surahs.set(1, {
      number: 1,
      name: "الفاتحة",
      englishName: "Al-Fatiha",
      versesCount: 7
    });

    this.verses.set(1, [
      {
        surahId: 1,
        number: 1,
        text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "In the name of Allah, the Most Gracious, the Most Merciful"
      }
    ]);

    this.courses.push({
      id: 1,
      title: "أساسيات تلاوة القرآن",
      description: "تعلم أساسيات التجويد والتلاوة",
      instructor: "الشيخ أحمد",
      duration: "8 أسابيع",
      level: "مبتدئ",
      image: "/courses/quran-basics.jpg"
    });
  }

  async getAllSurahs(): Promise<Surah[]> {
    return Array.from(this.surahs.values());
  }

  async getSurahById(id: number): Promise<Surah | null> {
    return this.surahs.get(id) || null;
  }

  async getVersesBySurahId(surahId: number): Promise<Verse[]> {
    return this.verses.get(surahId) || [];
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courses;
  }

  async getAllTopics(): Promise<Topic[]> {
    return this.topics;
  }

  async getRecentDiscussions(): Promise<Discussion[]> {
    return this.discussions;
  }

  async getPrayerTimes(date: string, location: string): Promise<PrayerTime> {
    const key = `${date}_${location}`;
    let prayerTime = this.prayerTimes.get(key);

    if (!prayerTime) {
      prayerTime = {
        date,
        location,
        times: {
          fajr: "04:30",
          sunrise: "06:00",
          dhuhr: "12:00",
          asr: "15:30",
          maghrib: "18:00",
          isha: "19:30"
        }
      };
      this.prayerTimes.set(key, prayerTime);
    }

    return prayerTime;
  }
}

export const storage = new Storage();