import { pgTable, text, serial, integer, boolean, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  fullName: text("full_name"),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Surahs (Chapters of Quran)
export const surahs = pgTable("surahs", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull(),
  name: text("name").notNull(),
  englishName: text("english_name").notNull(),
  englishNameTranslation: text("english_name_translation").notNull(),
  revelationType: text("revelation_type").notNull(),
  versesCount: integer("verses_count").notNull(),
});

export const insertSurahSchema = createInsertSchema(surahs).omit({
  id: true,
});

// Verses (Ayahs of Quran)
export const verses = pgTable("verses", {
  id: serial("id").primaryKey(),
  surahId: integer("surah_id").notNull(),
  number: integer("number").notNull(),
  text: text("text").notNull(),
  translation: text("translation").notNull(),
  audioUrl: text("audio_url"),
});

export const insertVerseSchema = createInsertSchema(verses).omit({
  id: true,
});

// Hadith Collections
export const hadithCollections = pgTable("hadith_collections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  englishName: text("english_name").notNull(),
  description: text("description").notNull(),
  totalHadiths: integer("total_hadiths").notNull(),
});

export const insertHadithCollectionSchema = createInsertSchema(hadithCollections).omit({
  id: true,
});

// Hadiths
export const hadiths = pgTable("hadiths", {
  id: serial("id").primaryKey(),
  collectionId: integer("collection_id").notNull(),
  number: integer("number").notNull(),
  text: text("text").notNull(),
  translation: text("translation").notNull(),
  chapter: text("chapter"),
  grade: text("grade"),
});

export const insertHadithSchema = createInsertSchema(hadiths).omit({
  id: true,
});

// Courses
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  level: text("level").notNull(), // beginner, intermediate, advanced
  duration: text("duration").notNull(), // e.g., "8 weeks"
  imageUrl: text("image_url"),
  instructorId: integer("instructor_id").notNull(),
  rating: integer("rating"),
  reviewCount: integer("review_count"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
});

// Community Topics
export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon"),
  postsCount: integer("posts_count").default(0).notNull(),
});

export const insertTopicSchema = createInsertSchema(topics).omit({
  id: true,
  postsCount: true,
});

// Community Discussions/Questions
export const discussions = pgTable("discussions", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id").notNull(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  status: text("status").notNull(), // answered, discussion, knowledge
  commentsCount: integer("comments_count").default(0).notNull(),
  viewsCount: integer("views_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDiscussionSchema = createInsertSchema(discussions).omit({
  id: true,
  commentsCount: true,
  viewsCount: true,
  createdAt: true,
});

// Prayer Times
export const prayerTimes = pgTable("prayer_times", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  location: text("location").notNull(),
  fajr: text("fajr").notNull(),
  dhuhr: text("dhuhr").notNull(),
  asr: text("asr").notNull(),
  maghrib: text("maghrib").notNull(),
  isha: text("isha").notNull(),
});

export const insertPrayerTimeSchema = createInsertSchema(prayerTimes).omit({
  id: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Surah = typeof surahs.$inferSelect;
export type InsertSurah = z.infer<typeof insertSurahSchema>;

export type Verse = typeof verses.$inferSelect;
export type InsertVerse = z.infer<typeof insertVerseSchema>;

export type HadithCollection = typeof hadithCollections.$inferSelect;
export type InsertHadithCollection = z.infer<typeof insertHadithCollectionSchema>;

export type Hadith = typeof hadiths.$inferSelect;
export type InsertHadith = z.infer<typeof insertHadithSchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Topic = typeof topics.$inferSelect;
export type InsertTopic = z.infer<typeof insertTopicSchema>;

export type Discussion = typeof discussions.$inferSelect;
export type InsertDiscussion = z.infer<typeof insertDiscussionSchema>;

export type PrayerTime = typeof prayerTimes.$inferSelect;
export type InsertPrayerTime = z.infer<typeof insertPrayerTimeSchema>;
