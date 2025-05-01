import { 
  User, InsertUser, 
  Surah, InsertSurah,
  Verse, InsertVerse,
  HadithCollection, InsertHadithCollection,
  Hadith, InsertHadith,
  Course, InsertCourse,
  Topic, InsertTopic,
  Discussion, InsertDiscussion,
  PrayerTime, InsertPrayerTime
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quran methods
  getAllSurahs(): Promise<Surah[]>;
  getSurahById(id: number): Promise<Surah | undefined>;
  getVersesBySurahId(surahId: number): Promise<Verse[]>;
  
  // Hadith methods
  getAllHadithCollections(): Promise<HadithCollection[]>;
  getHadithCollectionById(id: number): Promise<HadithCollection | undefined>;
  getHadithsByCollectionId(collectionId: number): Promise<Hadith[]>;
  
  // Course methods
  getAllCourses(): Promise<Course[]>;
  getCourseById(id: number): Promise<Course | undefined>;
  
  // Community methods
  getAllTopics(): Promise<Topic[]>;
  getTopicById(id: number): Promise<Topic | undefined>;
  getDiscussionsByTopicId(topicId: number): Promise<Discussion[]>;
  getRecentDiscussions(): Promise<Discussion[]>;
  
  // Prayer Times methods
  getPrayerTimes(date: string, location: string): Promise<PrayerTime | undefined>;
}

import { db } from "./db";
import { users, surahs, verses, hadithCollections, hadiths, courses, topics, discussions, prayerTimes } from "@shared/schema";
import { eq, desc, sql } from "drizzle-orm";

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Quran methods
  async getAllSurahs(): Promise<Surah[]> {
    return db.select().from(surahs).orderBy(surahs.number);
  }

  async getSurahById(id: number): Promise<Surah | undefined> {
    const [surah] = await db.select().from(surahs).where(eq(surahs.id, id));
    return surah || undefined;
  }

  async getVersesBySurahId(surahId: number): Promise<Verse[]> {
    return db.select().from(verses).where(eq(verses.surahId, surahId)).orderBy(verses.number);
  }

  // Hadith methods
  async getAllHadithCollections(): Promise<HadithCollection[]> {
    return db.select().from(hadithCollections);
  }

  async getHadithCollectionById(id: number): Promise<HadithCollection | undefined> {
    const [collection] = await db.select().from(hadithCollections).where(eq(hadithCollections.id, id));
    return collection || undefined;
  }

  async getHadithsByCollectionId(collectionId: number): Promise<Hadith[]> {
    return db.select().from(hadiths).where(eq(hadiths.collectionId, collectionId));
  }

  // Course methods
  async getAllCourses(): Promise<Course[]> {
    return db.select().from(courses);
  }

  async getCourseById(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }

  // Community methods
  async getAllTopics(): Promise<Topic[]> {
    return db.select().from(topics);
  }

  async getTopicById(id: number): Promise<Topic | undefined> {
    const [topic] = await db.select().from(topics).where(eq(topics.id, id));
    return topic || undefined;
  }

  async getDiscussionsByTopicId(topicId: number): Promise<Discussion[]> {
    return db.select()
      .from(discussions)
      .where(eq(discussions.topicId, topicId))
      .orderBy(desc(discussions.createdAt));
  }

  async getRecentDiscussions(): Promise<Discussion[]> {
    return db.select()
      .from(discussions)
      .orderBy(desc(discussions.createdAt))
      .limit(10);
  }

  // Prayer Times methods
  async getPrayerTimes(date: string, location: string): Promise<PrayerTime | undefined> {
    const [prayerTime] = await db.select()
      .from(prayerTimes)
      .where(sql`${prayerTimes.date} = ${date} AND ${prayerTimes.location} = ${location}`);
    return prayerTime || undefined;
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private surahs: Map<number, Surah>;
  private verses: Map<number, Verse[]>;
  private hadithCollections: Map<number, HadithCollection>;
  private hadiths: Map<number, Hadith[]>;
  private courses: Map<number, Course>;
  private topics: Map<number, Topic>;
  private discussions: Map<number, Discussion[]>;
  private prayerTimes: Map<string, PrayerTime>;
  
  private currentUserId: number;
  private currentSurahId: number;
  private currentVerseId: number;
  private currentHadithCollectionId: number;
  private currentHadithId: number;
  private currentCourseId: number;
  private currentTopicId: number;
  private currentDiscussionId: number;
  private currentPrayerTimeId: number;

  constructor() {
    this.users = new Map();
    this.surahs = new Map();
    this.verses = new Map();
    this.hadithCollections = new Map();
    this.hadiths = new Map();
    this.courses = new Map();
    this.topics = new Map();
    this.discussions = new Map();
    this.prayerTimes = new Map();
    
    this.currentUserId = 1;
    this.currentSurahId = 1;
    this.currentVerseId = 1;
    this.currentHadithCollectionId = 1;
    this.currentHadithId = 1;
    this.currentCourseId = 1;
    this.currentTopicId = 1;
    this.currentDiscussionId = 1;
    this.currentPrayerTimeId = 1;
    
    this.initializeData();
  }
  
  private initializeData() {
    // Initialize with some sample data
    
    // Add sample surahs
    this.addSurah({
      number: 1,
      name: "الفاتحة",
      englishName: "Al-Fatihah",
      englishNameTranslation: "The Opening",
      revelationType: "Meccan",
      versesCount: 7
    });
    
    this.addSurah({
      number: 2,
      name: "البقرة",
      englishName: "Al-Baqarah",
      englishNameTranslation: "The Cow",
      revelationType: "Medinan",
      versesCount: 286
    });
    
    this.addSurah({
      number: 3,
      name: "آل عمران",
      englishName: "Ali 'Imran",
      englishNameTranslation: "Family of Imran",
      revelationType: "Medinan",
      versesCount: 200
    });
    
    this.addSurah({
      number: 4,
      name: "النساء",
      englishName: "An-Nisa",
      englishNameTranslation: "The Women",
      revelationType: "Medinan",
      versesCount: 176
    });
    
    this.addSurah({
      number: 5,
      name: "المائدة",
      englishName: "Al-Ma'idah",
      englishNameTranslation: "The Table Spread",
      revelationType: "Medinan",
      versesCount: 120
    });
    
    // Add sample verses for Surah Al-Fatihah
    this.addVerse({
      surahId: 1,
      number: 1,
      text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      translation: "[All] praise is [due] to Allah, Lord of the worlds -",
      audioUrl: "https://verses.quran.com/Abdul_Basit_Murattal_64kbps/001001.mp3"
    });
    
    this.addVerse({
      surahId: 1,
      number: 2,
      text: "الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "The Entirely Merciful, the Especially Merciful,",
      audioUrl: "https://verses.quran.com/Abdul_Basit_Murattal_64kbps/001002.mp3"
    });
    
    this.addVerse({
      surahId: 1,
      number: 3,
      text: "مَالِكِ يَوْمِ الدِّينِ",
      translation: "Sovereign of the Day of Recompense.",
      audioUrl: "https://verses.quran.com/Abdul_Basit_Murattal_64kbps/001003.mp3"
    });
    
    // Add sample hadith collections
    this.addHadithCollection({
      name: "صحيح البخاري",
      englishName: "Sahih Bukhari",
      description: "A collection of hadith compiled by Imam Muhammad al-Bukhari",
      totalHadiths: 7563
    });
    
    this.addHadithCollection({
      name: "صحيح مسلم",
      englishName: "Sahih Muslim",
      description: "A collection of hadith compiled by Muslim ibn al-Hajjaj",
      totalHadiths: 7500
    });
    
    this.addHadithCollection({
      name: "الأربعون النووية",
      englishName: "40 Hadith Nawawi",
      description: "A collection of forty hadith compiled by Imam Nawawi",
      totalHadiths: 42
    });
    
    // Add sample courses
    this.addCourse({
      title: "Fundamentals of Quran Recitation",
      description: "Learn proper tajweed rules and perfect your Quranic recitation with expert guidance.",
      level: "Beginner",
      duration: "8 weeks",
      imageUrl: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      instructorId: 1,
      rating: 45, // 4.5 out of 5
      reviewCount: 128
    });
    
    this.addCourse({
      title: "Foundations of Islamic Jurisprudence",
      description: "Understand the principles of fiqh and how Islamic rulings are derived from primary sources.",
      level: "Intermediate",
      duration: "10 weeks",
      imageUrl: "https://images.unsplash.com/photo-1565791380709-49e529c8b073?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      instructorId: 2,
      rating: 40, // 4.0 out of 5
      reviewCount: 95
    });
    
    this.addCourse({
      title: "The Life of Prophet Muhammad (PBUH)",
      description: "Explore the life, character, and teachings of the Prophet Muhammad (peace be upon him).",
      level: "All Levels",
      duration: "6 weeks",
      imageUrl: "https://images.unsplash.com/photo-1602595888274-061532e9638d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      instructorId: 3,
      rating: 49, // 4.9 out of 5
      reviewCount: 215
    });
    
    // Add sample topics
    this.addTopic({
      name: "Quran Interpretation",
      description: "Discussions about Quranic verses and their interpretations",
      icon: "book-open",
      postsCount: 245
    });
    
    this.addTopic({
      name: "Prayer & Worship",
      description: "Questions about salah and other acts of worship",
      icon: "pray",
      postsCount: 182
    });
    
    this.addTopic({
      name: "Islamic Laws",
      description: "Discussions about fiqh and Shariah rulings",
      icon: "balance-scale",
      postsCount: 156
    });
    
    this.addTopic({
      name: "Family & Relationships",
      description: "Marriage, parenting, and family dynamics in Islam",
      icon: "heart",
      postsCount: 134
    });
    
    this.addTopic({
      name: "Islamic History",
      description: "Historical events and figures in Islamic history",
      icon: "history",
      postsCount: 98
    });
    
    // Add sample discussions
    this.addDiscussion({
      topicId: 2,
      userId: 1,
      title: "How do I correctly perform the Witr prayer?",
      content: "I'm confused about the correct method to perform Witr prayer. Should I make the intention for three rakah together or separate one from two? Also, when should I recite the Qunut supplication?",
      status: "answered",
      commentsCount: 8,
      viewsCount: 76,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    });
    
    this.addDiscussion({
      topicId: 3,
      userId: 2,
      title: "What is the Islamic perspective on investing in stocks?",
      content: "I want to start investing in the stock market but I'm unsure about what's permissible in Islam. Are there specific criteria for halal investments? How do I avoid companies that deal with interest or prohibited activities?",
      status: "discussion",
      commentsCount: 15,
      viewsCount: 124,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
    });
    
    this.addDiscussion({
      topicId: 1,
      userId: 3,
      title: "Understanding the concept of Tawakkul (reliance on Allah)",
      content: "I'm trying to understand the balance between having Tawakkul (reliance on Allah) and taking necessary actions. How do we rely on Allah while still making appropriate efforts in our daily lives?",
      status: "knowledge",
      commentsCount: 23,
      viewsCount: 205,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
    });
    
    // Add sample prayer times
    this.addPrayerTime({
      date: new Date().toISOString().split('T')[0],
      location: "London, United Kingdom",
      fajr: "3:45 AM",
      dhuhr: "1:05 PM",
      asr: "5:22 PM",
      maghrib: "9:18 PM",
      isha: "10:45 PM"
    });
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...userData, 
      id, 
      createdAt: new Date(),
      fullName: userData.fullName ?? null,
      profileImage: userData.profileImage ?? null 
    };
    this.users.set(id, user);
    return user;
  }
  
  // Quran methods
  async getAllSurahs(): Promise<Surah[]> {
    return Array.from(this.surahs.values());
  }
  
  async getSurahById(id: number): Promise<Surah | undefined> {
    return this.surahs.get(id);
  }
  
  async getVersesBySurahId(surahId: number): Promise<Verse[]> {
    return this.verses.get(surahId) || [];
  }
  
  // Hadith methods
  async getAllHadithCollections(): Promise<HadithCollection[]> {
    return Array.from(this.hadithCollections.values());
  }
  
  async getHadithCollectionById(id: number): Promise<HadithCollection | undefined> {
    return this.hadithCollections.get(id);
  }
  
  async getHadithsByCollectionId(collectionId: number): Promise<Hadith[]> {
    return this.hadiths.get(collectionId) || [];
  }
  
  // Course methods
  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }
  
  async getCourseById(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }
  
  // Community methods
  async getAllTopics(): Promise<Topic[]> {
    return Array.from(this.topics.values());
  }
  
  async getTopicById(id: number): Promise<Topic | undefined> {
    return this.topics.get(id);
  }
  
  async getDiscussionsByTopicId(topicId: number): Promise<Discussion[]> {
    return this.discussions.get(topicId) || [];
  }
  
  async getRecentDiscussions(): Promise<Discussion[]> {
    // Combine all discussions from all topics and sort by creation date
    const allDiscussions: Discussion[] = [];
    this.discussions.forEach(topicDiscussions => {
      allDiscussions.push(...topicDiscussions);
    });
    
    return allDiscussions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  // Prayer Times methods
  async getPrayerTimes(date: string, location: string): Promise<PrayerTime | undefined> {
    const key = `${date}_${location}`;
    return this.prayerTimes.get(key);
  }
  
  // Helper methods to add data
  private addSurah(data: InsertSurah): Surah {
    const id = this.currentSurahId++;
    const surah: Surah = { ...data, id };
    this.surahs.set(id, surah);
    this.verses.set(id, []);
    return surah;
  }
  
  private addVerse(data: InsertVerse): Verse {
    const id = this.currentVerseId++;
    const verse: Verse = { 
      ...data, 
      id,
      audioUrl: data.audioUrl ?? null
    };
    
    const surahVerses = this.verses.get(data.surahId) || [];
    surahVerses.push(verse);
    this.verses.set(data.surahId, surahVerses);
    
    return verse;
  }
  
  private addHadithCollection(data: InsertHadithCollection): HadithCollection {
    const id = this.currentHadithCollectionId++;
    const collection: HadithCollection = { ...data, id };
    this.hadithCollections.set(id, collection);
    this.hadiths.set(id, []);
    return collection;
  }
  
  private addHadith(data: InsertHadith): Hadith {
    const id = this.currentHadithId++;
    const hadith: Hadith = { 
      ...data, 
      id,
      chapter: data.chapter ?? null,
      grade: data.grade ?? null
    };
    
    const collectionHadiths = this.hadiths.get(data.collectionId) || [];
    collectionHadiths.push(hadith);
    this.hadiths.set(data.collectionId, collectionHadiths);
    
    return hadith;
  }
  
  private addCourse(data: InsertCourse): Course {
    const id = this.currentCourseId++;
    const course: Course = { ...data, id, createdAt: new Date() };
    this.courses.set(id, course);
    return course;
  }
  
  private addTopic(data: { name: string, description?: string, icon?: string, postsCount: number }): Topic {
    const id = this.currentTopicId++;
    const topic: Topic = { id, name: data.name, description: data.description || null, icon: data.icon || null, postsCount: data.postsCount };
    this.topics.set(id, topic);
    this.discussions.set(id, []);
    return topic;
  }
  
  private addDiscussion(data: { topicId: number, userId: number, title: string, content: string, status: string, commentsCount: number, viewsCount: number, createdAt: Date }): Discussion {
    const id = this.currentDiscussionId++;
    const discussion: Discussion = { 
      id, 
      topicId: data.topicId, 
      userId: data.userId, 
      title: data.title, 
      content: data.content, 
      status: data.status, 
      commentsCount: data.commentsCount, 
      viewsCount: data.viewsCount, 
      createdAt: data.createdAt 
    };
    
    const topicDiscussions = this.discussions.get(data.topicId) || [];
    topicDiscussions.push(discussion);
    this.discussions.set(data.topicId, topicDiscussions);
    
    return discussion;
  }
  
  private addPrayerTime(data: InsertPrayerTime): PrayerTime {
    const id = this.currentPrayerTimeId++;
    const prayerTime: PrayerTime = { ...data, id };
    const key = `${data.date}_${data.location}`;
    this.prayerTimes.set(key, prayerTime);
    return prayerTime;
  }
}

// Uncomment below to use in-memory storage (for development)
// export const storage = new MemStorage();

// Use database storage
export const storage = new DatabaseStorage();
