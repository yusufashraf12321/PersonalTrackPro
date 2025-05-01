import { db } from '../server/db';
import { users, surahs, verses, hadithCollections, hadiths, courses, topics, discussions, prayerTimes } from '../shared/schema';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import ws from 'ws';
import path from 'path';

async function main() {
  console.log('Creating database schema...');
  
  try {
    // Push schema to database
    await db.execute(/* sql */`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        full_name TEXT,
        profile_image TEXT,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS surahs (
        id SERIAL PRIMARY KEY,
        number INTEGER NOT NULL,
        name TEXT NOT NULL,
        english_name TEXT NOT NULL,
        english_name_translation TEXT NOT NULL,
        revelation_type TEXT NOT NULL,
        verses_count INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS verses (
        id SERIAL PRIMARY KEY,
        surah_id INTEGER NOT NULL REFERENCES surahs(id),
        number INTEGER NOT NULL,
        text TEXT NOT NULL,
        translation TEXT NOT NULL,
        audio_url TEXT
      );

      CREATE TABLE IF NOT EXISTS hadith_collections (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        english_name TEXT NOT NULL,
        description TEXT NOT NULL,
        total_hadiths INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS hadiths (
        id SERIAL PRIMARY KEY,
        collection_id INTEGER NOT NULL REFERENCES hadith_collections(id),
        number INTEGER NOT NULL,
        text TEXT NOT NULL,
        translation TEXT NOT NULL,
        chapter TEXT,
        grade TEXT
      );

      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        level TEXT NOT NULL,
        duration TEXT NOT NULL,
        image_url TEXT,
        instructor_id INTEGER NOT NULL,
        rating REAL,
        review_count INTEGER,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS topics (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        posts_count INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS discussions (
        id SERIAL PRIMARY KEY,
        topic_id INTEGER NOT NULL REFERENCES topics(id),
        user_id INTEGER NOT NULL REFERENCES users(id),
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        status TEXT NOT NULL,
        comments_count INTEGER NOT NULL,
        views_count INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS prayer_times (
        id SERIAL PRIMARY KEY,
        date TEXT NOT NULL,
        location TEXT NOT NULL,
        fajr TEXT NOT NULL,
        dhuhr TEXT NOT NULL,
        asr TEXT NOT NULL,
        maghrib TEXT NOT NULL,
        isha TEXT NOT NULL
      );
    `);

    console.log('Database schema created successfully!');
    
    // أضف بيانات أولية
    console.log('Adding sample data...');
    await addSampleData();
    
    console.log('Sample data added successfully!');
    
  } catch (error) {
    console.error('Error creating database schema:', error);
    process.exit(1);
  }
}

async function addSampleData() {
  // إضافة بعض السور
  await db.insert(surahs).values([
    {
      number: 1,
      name: "الفاتحة",
      englishName: "Al-Fatihah",
      englishNameTranslation: "The Opening",
      revelationType: "Meccan",
      versesCount: 7
    },
    {
      number: 2,
      name: "البقرة",
      englishName: "Al-Baqarah",
      englishNameTranslation: "The Cow",
      revelationType: "Medinan",
      versesCount: 286
    },
    {
      number: 3,
      name: "آل عمران",
      englishName: "Ali 'Imran",
      englishNameTranslation: "Family of Imran",
      revelationType: "Medinan",
      versesCount: 200
    },
    {
      number: 4,
      name: "النساء",
      englishName: "An-Nisa",
      englishNameTranslation: "The Women",
      revelationType: "Medinan",
      versesCount: 176
    },
    {
      number: 5,
      name: "المائدة",
      englishName: "Al-Ma'idah",
      englishNameTranslation: "The Table Spread",
      revelationType: "Medinan",
      versesCount: 120
    }
  ]).onConflictDoNothing();

  // الحصول على معرفات السور المضافة
  const surahsResult = await db.select().from(surahs);
  
  // إضافة بعض الآيات لسورة الفاتحة
  if (surahsResult.length > 0) {
    const surahId = surahsResult[0].id;
    
    await db.insert(verses).values([
      {
        surahId,
        number: 1,
        text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        translation: "[All] praise is [due] to Allah, Lord of the worlds -",
        audioUrl: "https://verses.quran.com/Abdul_Basit_Murattal_64kbps/001001.mp3"
      },
      {
        surahId,
        number: 2,
        text: "الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "The Entirely Merciful, the Especially Merciful,",
        audioUrl: "https://verses.quran.com/Abdul_Basit_Murattal_64kbps/001002.mp3"
      },
      {
        surahId,
        number: 3,
        text: "مَالِكِ يَوْمِ الدِّينِ",
        translation: "Sovereign of the Day of Recompense.",
        audioUrl: "https://verses.quran.com/Abdul_Basit_Murattal_64kbps/001003.mp3"
      }
    ]).onConflictDoNothing();
  }
  
  // إضافة مجموعات الأحاديث
  await db.insert(hadithCollections).values([
    {
      name: "صحيح البخاري",
      englishName: "Sahih Bukhari",
      description: "A collection of hadith compiled by Imam Muhammad al-Bukhari",
      totalHadiths: 7563
    },
    {
      name: "صحيح مسلم",
      englishName: "Sahih Muslim",
      description: "A collection of hadith compiled by Muslim ibn al-Hajjaj",
      totalHadiths: 7500
    },
    {
      name: "الأربعون النووية",
      englishName: "40 Hadith Nawawi",
      description: "A collection of forty hadith compiled by Imam Nawawi",
      totalHadiths: 42
    }
  ]).onConflictDoNothing();
  
  // إضافة بعض الدورات
  await db.insert(courses).values([
    {
      title: "Fundamentals of Quran Recitation",
      description: "Learn proper tajweed rules and perfect your Quranic recitation with expert guidance.",
      level: "Beginner",
      duration: "8 weeks",
      imageUrl: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      instructorId: 1,
      rating: 4.5,
      reviewCount: 128
    },
    {
      title: "Foundations of Islamic Jurisprudence",
      description: "Understand the principles of fiqh and how Islamic rulings are derived from primary sources.",
      level: "Intermediate",
      duration: "10 weeks",
      imageUrl: "https://images.unsplash.com/photo-1565791380709-49e529c8b073?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      instructorId: 2,
      rating: 4.0,
      reviewCount: 95
    },
    {
      title: "The Life of Prophet Muhammad (PBUH)",
      description: "Explore the life, character, and teachings of the Prophet Muhammad (peace be upon him).",
      level: "All Levels",
      duration: "6 weeks",
      imageUrl: "https://images.unsplash.com/photo-1602595888274-061532e9638d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      instructorId: 3,
      rating: 4.9,
      reviewCount: 215
    }
  ]).onConflictDoNothing();
  
  // إضافة المواضيع
  await db.insert(topics).values([
    {
      name: "Quran Interpretation",
      description: "Discussions about Quranic verses and their interpretations",
      icon: "book-open",
      postsCount: 245
    },
    {
      name: "Prayer & Worship",
      description: "Questions about salah and other acts of worship",
      icon: "pray",
      postsCount: 182
    },
    {
      name: "Islamic Laws",
      description: "Discussions about fiqh and Shariah rulings",
      icon: "balance-scale",
      postsCount: 156
    },
    {
      name: "Family & Relationships",
      description: "Marriage, parenting, and family dynamics in Islam",
      icon: "heart",
      postsCount: 134
    },
    {
      name: "Islamic History",
      description: "Historical events and figures in Islamic history",
      icon: "history",
      postsCount: 98
    }
  ]).onConflictDoNothing();
  
  // إضافة بيانات للمستخدمين
  await db.insert(users).values([
    {
      username: "ahmed_123",
      password: "$2b$10$XDxPCGJsC6VnrFOXTxGszeJ9ZH0QxqF9h0nLCH6zMjy33yDhqV5T2", // مشفر لـ "password123"
      email: "ahmed@example.com",
      fullName: "Ahmed Mohamed",
      profileImage: null,
      createdAt: new Date()
    },
    {
      username: "sarah_89",
      password: "$2b$10$XDxPCGJsC6VnrFOXTxGszeJ9ZH0QxqF9h0nLCH6zMjy33yDhqV5T2", // مشفر لـ "password123"
      email: "sarah@example.com",
      fullName: "Sarah Khan",
      profileImage: null,
      createdAt: new Date()
    },
    {
      username: "omar_j",
      password: "$2b$10$XDxPCGJsC6VnrFOXTxGszeJ9ZH0QxqF9h0nLCH6zMjy33yDhqV5T2", // مشفر لـ "password123"
      email: "omar@example.com",
      fullName: "Omar Javed",
      profileImage: null,
      createdAt: new Date()
    }
  ]).onConflictDoNothing();
  
  // الحصول على بيانات المستخدمين والمواضيع للاستخدام في المناقشات
  const usersResult = await db.select().from(users);
  const topicsResult = await db.select().from(topics);
  
  if (usersResult.length > 0 && topicsResult.length > 0) {
    // إضافة بعض المناقشات
    await db.insert(discussions).values([
      {
        topicId: topicsResult[1].id, // Prayer & Worship
        userId: usersResult[0].id, 
        title: "How do I correctly perform the Witr prayer?",
        content: "I'm confused about the correct method to perform Witr prayer. Should I make the intention for three rakah together or separate one from two? Also, when should I recite the Qunut supplication?",
        status: "answered",
        commentsCount: 8,
        viewsCount: 76,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        topicId: topicsResult[2].id, // Islamic Laws
        userId: usersResult[1].id,
        title: "What is the Islamic perspective on investing in stocks?",
        content: "I want to start investing but I'm not sure about what types of stocks are permissible in Islam. How can I identify whether a company follows Shariah-compliant practices? Are there specific sectors to avoid?",
        status: "discussion",
        commentsCount: 12,
        viewsCount: 103,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        topicId: topicsResult[0].id, // Quran Interpretation
        userId: usersResult[2].id,
        title: "Understanding the concept of 'Taqwa' in the Quran",
        content: "The Quran frequently mentions 'Taqwa', often translated as 'God-consciousness' or 'piety'. Can someone explain the deeper meaning of this concept and how it should manifest in our daily lives?",
        status: "knowledge",
        commentsCount: 15,
        viewsCount: 142,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      }
    ]).onConflictDoNothing();
  }
  
  // إضافة أوقات الصلاة
  await db.insert(prayerTimes).values([
    {
      date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
      location: "London, United Kingdom",
      fajr: "04:23",
      dhuhr: "12:45",
      asr: "16:24",
      maghrib: "20:04",
      isha: "21:35"
    }
  ]).onConflictDoNothing();
}

main();