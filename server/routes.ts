import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Quran API routes
  app.get("/api/surahs", async (req, res) => {
    try {
      const surahs = await storage.getAllSurahs();
      res.json(surahs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch surahs" });
    }
  });

  app.get("/api/surahs/:id", async (req, res) => {
    try {
      const surahId = parseInt(req.params.id);
      if (isNaN(surahId)) {
        return res.status(400).json({ message: "Invalid surah ID" });
      }
      
      const surah = await storage.getSurahById(surahId);
      if (!surah) {
        return res.status(404).json({ message: "Surah not found" });
      }
      
      res.json(surah);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch surah" });
    }
  });

  app.get("/api/surahs/:id/verses", async (req, res) => {
    try {
      const surahId = parseInt(req.params.id);
      if (isNaN(surahId)) {
        return res.status(400).json({ message: "Invalid surah ID" });
      }
      
      const verses = await storage.getVersesBySurahId(surahId);
      res.json(verses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch verses" });
    }
  });

  // Hadith API routes
  app.get("/api/hadith-collections", async (req, res) => {
    try {
      const collections = await storage.getAllHadithCollections();
      res.json(collections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hadith collections" });
    }
  });

  app.get("/api/hadith-collections/:id", async (req, res) => {
    try {
      const collectionId = parseInt(req.params.id);
      if (isNaN(collectionId)) {
        return res.status(400).json({ message: "Invalid collection ID" });
      }
      
      const collection = await storage.getHadithCollectionById(collectionId);
      if (!collection) {
        return res.status(404).json({ message: "Hadith collection not found" });
      }
      
      res.json(collection);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hadith collection" });
    }
  });

  app.get("/api/hadith-collections/:id/hadiths", async (req, res) => {
    try {
      const collectionId = parseInt(req.params.id);
      if (isNaN(collectionId)) {
        return res.status(400).json({ message: "Invalid collection ID" });
      }
      
      const hadiths = await storage.getHadithsByCollectionId(collectionId);
      res.json(hadiths);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hadiths" });
    }
  });

  // Courses API routes
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      if (isNaN(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
      }
      
      const course = await storage.getCourseById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  // Community API routes
  app.get("/api/topics", async (req, res) => {
    try {
      const topics = await storage.getAllTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topics" });
    }
  });

  app.get("/api/topics/:id/discussions", async (req, res) => {
    try {
      const topicId = parseInt(req.params.id);
      if (isNaN(topicId)) {
        return res.status(400).json({ message: "Invalid topic ID" });
      }
      
      const discussions = await storage.getDiscussionsByTopicId(topicId);
      res.json(discussions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch discussions" });
    }
  });

  app.get("/api/discussions", async (req, res) => {
    try {
      const discussions = await storage.getRecentDiscussions();
      res.json(discussions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch discussions" });
    }
  });

  // Prayer Times API
  app.get("/api/prayer-times", async (req, res) => {
    try {
      const location = req.query.location as string || "London, United Kingdom";
      const date = req.query.date as string || new Date().toISOString().split('T')[0];
      
      const prayerTimes = await storage.getPrayerTimes(date, location);
      res.json(prayerTimes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prayer times" });
    }
  });

  // Users API routes
  app.post("/api/users", async (req, res) => {
    try {
      const user = await storage.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
