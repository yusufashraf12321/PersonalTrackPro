import React, { createContext, useContext, useState, useEffect } from "react";

// Supported languages
type Language = "en" | "ar" | "fr";

// Translation dictionary
const translations: Record<string, Record<string, string>> = {
  // Header
  home: {
    en: "Home",
    ar: "الرئيسية",
    fr: "Accueil"
  },
  quran: {
    en: "Quran",
    ar: "القرآن",
    fr: "Coran"
  },
  hadith: {
    en: "Hadith",
    ar: "الحديث",
    fr: "Hadith"
  },
  courses: {
    en: "Courses",
    ar: "الدورات",
    fr: "Cours"
  },
  community: {
    en: "Community",
    ar: "المجتمع",
    fr: "Communauté"
  },
  about: {
    en: "About",
    ar: "عن أبرار",
    fr: "À propos"
  },
  account: {
    en: "Account",
    ar: "الحساب",
    fr: "Compte"
  },
  profile: {
    en: "Profile",
    ar: "الملف الشخصي",
    fr: "Profil"
  },
  my_progress: {
    en: "My Progress",
    ar: "تقدمي",
    fr: "Mes progrès"
  },
  bookmarks: {
    en: "Bookmarks",
    ar: "المفضلة",
    fr: "Favoris"
  },
  sign_out: {
    en: "Sign out",
    ar: "تسجيل الخروج",
    fr: "Déconnexion"
  },

  // Quran menu
  read_quran: {
    en: "Read Quran",
    ar: "قراءة القرآن",
    fr: "Lire le Coran"
  },
  listen_recitations: {
    en: "Listen to Recitations",
    ar: "الاستماع إلى التلاوات",
    fr: "Écouter des récitations"
  },
  tafsir: {
    en: "Tafsir",
    ar: "التفسير",
    fr: "Tafsir"
  },
  memorization_tools: {
    en: "Memorization Tools",
    ar: "أدوات الحفظ",
    fr: "Outils de mémorisation"
  },

  // Hadith menu
  sahih_bukhari: {
    en: "Sahih Bukhari",
    ar: "صحيح البخاري",
    fr: "Sahih Bukhari"
  },
  sahih_muslim: {
    en: "Sahih Muslim",
    ar: "صحيح مسلم",
    fr: "Sahih Muslim"
  },
  "40_hadith_nawawi": {
    en: "40 Hadith Nawawi",
    ar: "الأربعون النووية",
    fr: "40 Hadith Nawawi"
  },
  all_collections: {
    en: "All Collections",
    ar: "جميع المجموعات",
    fr: "Toutes les collections"
  },

  // Home page
  hero_title: {
    en: "Begin Your Journey of Knowledge and Faith",
    ar: "ابدأ رحلتك في العلم والإيمان",
    fr: "Commencez votre voyage de connaissance et de foi"
  },
  hero_description: {
    en: "Discover the wisdom of Islam through interactive learning, authentic resources, and a supportive community.",
    ar: "اكتشف حكمة الإسلام من خلال التعلم التفاعلي، والموارد الأصيلة، ومجتمع داعم.",
    fr: "Découvrez la sagesse de l'Islam grâce à un apprentissage interactif, des ressources authentiques et une communauté solidaire."
  },
  start_learning: {
    en: "Start Learning",
    ar: "ابدأ التعلم",
    fr: "Commencer à apprendre"
  },
  browse_courses: {
    en: "Browse Courses",
    ar: "تصفح الدورات",
    fr: "Parcourir les cours"
  },
  comprehensive_learning: {
    en: "Comprehensive Learning Experience",
    ar: "تجربة تعليمية شاملة",
    fr: "Expérience d'apprentissage complète"
  },
  features_description: {
    en: "Explore the depths of Islamic knowledge through our carefully crafted platform designed for seekers at all levels.",
    ar: "استكشف أعماق المعرفة الإسلامية من خلال منصتنا المصممة بعناية للباحثين في جميع المستويات.",
    fr: "Explorez les profondeurs du savoir islamique grâce à notre plateforme soigneusement conçue pour les chercheurs de tous niveaux."
  },
  quran_study: {
    en: "Quran Study",
    ar: "دراسة القرآن",
    fr: "Étude du Coran"
  },
  quran_study_description: {
    en: "Read, listen, and understand the Holy Quran with translation and tafsir in multiple languages.",
    ar: "اقرأ، واستمع، وافهم القرآن الكريم مع الترجمة والتفسير بلغات متعددة.",
    fr: "Lisez, écoutez et comprenez le Saint Coran avec traduction et tafsir en plusieurs langues."
  },
  hadith_collections: {
    en: "Hadith Collections",
    ar: "مجموعات الحديث",
    fr: "Collections de Hadith"
  },
  hadith_collections_description: {
    en: "Access verified hadith from authentic sources with explanations and category-based navigation.",
    ar: "الوصول إلى الأحاديث الموثقة من مصادر أصيلة مع شروحات وتنقل على أساس الفئات.",
    fr: "Accédez à des hadiths vérifiés provenant de sources authentiques avec des explications et une navigation par catégorie."
  },
  structured_courses: {
    en: "Structured Courses",
    ar: "دورات منظمة",
    fr: "Cours structurés"
  },
  structured_courses_description: {
    en: "Follow step-by-step learning paths created by qualified scholars to deepen your understanding.",
    ar: "اتبع مسارات التعلم خطوة بخطوة التي أنشأها علماء مؤهلون لتعميق فهمك.",
    fr: "Suivez des parcours d'apprentissage étape par étape créés par des savants qualifiés pour approfondir votre compréhension."
  },
  community_support: {
    en: "Community Support",
    ar: "دعم المجتمع",
    fr: "Soutien communautaire"
  },
  community_support_description: {
    en: "Connect with fellow learners, ask questions, and participate in moderated discussions.",
    ar: "تواصل مع زملائك المتعلمين، واطرح الأسئلة، وشارك في المناقشات الموجهة.",
    fr: "Connectez-vous avec d'autres apprenants, posez des questions et participez à des discussions modérées."
  },
  todays_prayer_times: {
    en: "Today's Prayer Times",
    ar: "أوقات الصلاة اليوم",
    fr: "Heures de prière d'aujourd'hui"
  },
  set_location: {
    en: "Set your location for accurate prayer times",
    ar: "حدد موقعك للحصول على أوقات صلاة دقيقة",
    fr: "Définissez votre emplacement pour des heures de prière précises"
  },
  fajr: {
    en: "Fajr",
    ar: "الفجر",
    fr: "Fajr"
  },
  dhuhr: {
    en: "Dhuhr",
    ar: "الظهر",
    fr: "Dhuhr"
  },
  asr: {
    en: "Asr",
    ar: "العصر",
    fr: "Asr"
  },
  maghrib: {
    en: "Maghrib",
    ar: "المغرب",
    fr: "Maghrib"
  },
  isha: {
    en: "Isha",
    ar: "العشاء",
    fr: "Isha"
  },
  explore_quran: {
    en: "Explore the Holy Quran",
    ar: "استكشف القرآن الكريم",
    fr: "Explorez le Saint Coran"
  },
  quran_section_description: {
    en: "Read, listen, and understand with interactive tools",
    ar: "اقرأ واستمع وافهم بأدوات تفاعلية",
    fr: "Lisez, écoutez et comprenez avec des outils interactifs"
  },
  view_all_features: {
    en: "View all features",
    ar: "عرض جميع الميزات",
    fr: "Voir toutes les fonctionnalités"
  },
  surah_list: {
    en: "Surah List",
    ar: "قائمة السور",
    fr: "Liste des sourates"
  },
  search_surah: {
    en: "Search surah...",
    ar: "ابحث عن سورة...",
    fr: "Rechercher une sourate..."
  },
  verses: {
    en: "verses",
    ar: "آيات",
    fr: "versets"
  },
  view_all_surahs: {
    en: "View all 114 Surahs",
    ar: "عرض جميع السور الـ 114",
    fr: "Voir les 114 sourates"
  },
  featured_courses: {
    en: "Featured Courses",
    ar: "الدورات المميزة",
    fr: "Cours en vedette"
  },
  courses_description: {
    en: "Learn from qualified scholars through structured courses designed to deepen your understanding of Islam.",
    ar: "تعلم من علماء مؤهلين من خلال دورات منظمة مصممة لتعميق فهمك للإسلام.",
    fr: "Apprenez auprès de savants qualifiés grâce à des cours structurés conçus pour approfondir votre compréhension de l'Islam."
  },
  enroll_now: {
    en: "Enroll Now",
    ar: "سجل الآن",
    fr: "Inscrivez-vous maintenant"
  },
  view_all_courses: {
    en: "View All Courses",
    ar: "عرض جميع الدورات",
    fr: "Voir tous les cours"
  },
  join_community: {
    en: "Join Our Community",
    ar: "انضم إلى مجتمعنا",
    fr: "Rejoignez notre communauté"
  },
  community_description: {
    en: "Connect with fellow learners, ask questions, and participate in moderated discussions to enhance your learning journey.",
    ar: "تواصل مع زملائك المتعلمين، واطرح الأسئلة، وشارك في المناقشات الموجهة لتعزيز رحلة تعلمك.",
    fr: "Connectez-vous avec d'autres apprenants, posez des questions et participez à des discussions modérées pour améliorer votre parcours d'apprentissage."
  },
  popular_topics: {
    en: "Popular Topics",
    ar: "المواضيع الشائعة",
    fr: "Sujets populaires"
  },
  posts: {
    en: "posts",
    ar: "منشورات",
    fr: "publications"
  },
  view_all_topics: {
    en: "View All Topics",
    ar: "عرض جميع المواضيع",
    fr: "Voir tous les sujets"
  },
  recent_discussions: {
    en: "Recent Discussions",
    ar: "المناقشات الأخيرة",
    fr: "Discussions récentes"
  },
  new_question: {
    en: "New Question",
    ar: "سؤال جديد",
    fr: "Nouvelle question"
  },
  view_all_discussions: {
    en: "View All Discussions",
    ar: "عرض جميع المناقشات",
    fr: "Voir toutes les discussions"
  },
  cta_title: {
    en: "Begin Your Journey of Knowledge Today",
    ar: "ابدأ رحلة المعرفة اليوم",
    fr: "Commencez votre voyage de connaissance aujourd'hui"
  },
  cta_description: {
    en: "Join thousands of learners on Abrar to deepen your understanding of Islam and connect with a supportive community.",
    ar: "انضم إلى آلاف المتعلمين على أبرار لتعميق فهمك للإسلام والتواصل مع مجتمع داعم.",
    fr: "Rejoignez des milliers d'apprenants sur Abrar pour approfondir votre compréhension de l'Islam et vous connecter avec une communauté solidaire."
  },
  create_account: {
    en: "Create Free Account",
    ar: "إنشاء حساب مجاني",
    fr: "Créer un compte gratuit"
  },
  explore_resources: {
    en: "Explore Resources",
    ar: "استكشف الموارد",
    fr: "Explorer les ressources"
  },

  // Footer
  footer_description: {
    en: "Abrar is a comprehensive Islamic learning platform providing authentic knowledge through interactive courses, Quran study tools, and a supportive community.",
    ar: "أبرار هي منصة تعليمية إسلامية شاملة توفر معرفة أصيلة من خلال دورات تفاعلية، وأدوات دراسة القرآن، ومجتمع داعم.",
    fr: "Abrar est une plateforme d'apprentissage islamique complète offrant des connaissances authentiques à travers des cours interactifs, des outils d'étude du Coran et une communauté solidaire."
  },
  quick_links: {
    en: "Quick Links",
    ar: "روابط سريعة",
    fr: "Liens rapides"
  },
  resources: {
    en: "Resources",
    ar: "موارد",
    fr: "Ressources"
  },
  blog: {
    en: "Blog",
    ar: "المدونة",
    fr: "Blog"
  },
  webinars: {
    en: "Webinars",
    ar: "الندوات عبر الإنترنت",
    fr: "Webinaires"
  },
  ebooks: {
    en: "E-Books",
    ar: "الكتب الإلكترونية",
    fr: "Livres électroniques"
  },
  podcasts: {
    en: "Podcasts",
    ar: "البودكاست",
    fr: "Podcasts"
  },
  faqs: {
    en: "FAQs",
    ar: "الأسئلة الشائعة",
    fr: "FAQs"
  },
  support: {
    en: "Support",
    ar: "الدعم",
    fr: "Support"
  },
  stay_updated: {
    en: "Stay Updated",
    ar: "ابق على اطلاع",
    fr: "Restez informé"
  },
  newsletter_description: {
    en: "Subscribe to our newsletter for weekly insights and updates.",
    ar: "اشترك في نشرتنا الإخبارية للحصول على رؤى وتحديثات أسبوعية.",
    fr: "Abonnez-vous à notre newsletter pour des aperçus et des mises à jour hebdomadaires."
  },
  your_email: {
    en: "Your email address",
    ar: "عنوان بريدك الإلكتروني",
    fr: "Votre adresse e-mail"
  },
  subscribe: {
    en: "Subscribe",
    ar: "اشترك",
    fr: "S'abonner"
  },
  all_rights_reserved: {
    en: "All rights reserved.",
    ar: "جميع الحقوق محفوظة.",
    fr: "Tous droits réservés."
  },
  privacy_policy: {
    en: "Privacy Policy",
    ar: "سياسة الخصوصية",
    fr: "Politique de confidentialité"
  },
  terms_of_service: {
    en: "Terms of Service",
    ar: "شروط الخدمة",
    fr: "Conditions d'utilisation"
  },
  cookie_policy: {
    en: "Cookie Policy",
    ar: "سياسة ملفات تعريف الارتباط",
    fr: "Politique de cookies"
  },

  // Hadith page
  collections: {
    en: "Collections",
    ar: "المجموعات",
    fr: "Collections"
  },
  search: {
    en: "Search",
    ar: "بحث",
    fr: "Recherche"
  },
  topics: {
    en: "Topics",
    ar: "المواضيع",
    fr: "Sujets"
  },
  filter: {
    en: "Filter",
    ar: "تصفية",
    fr: "Filtrer"
  },
  chapters: {
    en: "Chapters",
    ar: "الأبواب",
    fr: "Chapitres"
  },
  search_in: {
    en: "Search in",
    ar: "بحث في",
    fr: "Rechercher dans"
  },
  hadith_number: {
    en: "Hadith Number",
    ar: "رقم الحديث",
    fr: "Numéro du Hadith"
  },
  share: {
    en: "Share",
    ar: "مشاركة",
    fr: "Partager"
  },
  bookmark: {
    en: "Bookmark",
    ar: "إضافة للمفضلة",
    fr: "Marquer"
  },
  search_hadith: {
    en: "Search Hadith",
    ar: "البحث في الأحاديث",
    fr: "Rechercher des Hadiths"
  },
  search_hadith_placeholder: {
    en: "Enter keywords to search hadiths...",
    ar: "أدخل كلمات للبحث في الأحاديث...",
    fr: "Entrez des mots-clés pour rechercher des hadiths..."
  },
  advanced_search_hint: {
    en: "Use advanced search options for more precise results",
    ar: "استخدم خيارات البحث المتقدمة للحصول على نتائج أكثر دقة",
    fr: "Utilisez les options de recherche avancée pour des résultats plus précis"
  },
  hadith_by_topic: {
    en: "Hadith by Topic",
    ar: "الأحاديث حسب الموضوع",
    fr: "Hadith par sujet"
  },
  prayer: {
    en: "Prayer",
    ar: "الصلاة",
    fr: "Prière"
  },
  fasting: {
    en: "Fasting",
    ar: "الصيام",
    fr: "Jeûne"
  },
  zakat: {
    en: "Zakat",
    ar: "الزكاة",
    fr: "Zakat"
  },
  hajj: {
    en: "Hajj",
    ar: "الحج",
    fr: "Hajj"
  },
  marriage: {
    en: "Marriage",
    ar: "الزواج",
    fr: "Mariage"
  },
  business: {
    en: "Business",
    ar: "التجارة",
    fr: "Affaires"
  },
  good_manners: {
    en: "Good Manners",
    ar: "حسن الخلق",
    fr: "Bonnes manières"
  },
  knowledge: {
    en: "Knowledge",
    ar: "العلم",
    fr: "Connaissance"
  },
  dhikr: {
    en: "Dhikr",
    ar: "الذكر",
    fr: "Dhikr"
  },
  
  // Courses page
  islamic_courses: {
    en: "Islamic Courses",
    ar: "الدورات الإسلامية",
    fr: "Cours islamiques"
  },
  search_courses: {
    en: "Search courses...",
    ar: "البحث في الدورات...",
    fr: "Rechercher des cours..."
  },
  all_courses: {
    en: "All Courses",
    ar: "جميع الدورات",
    fr: "Tous les cours"
  },
  beginner: {
    en: "Beginner",
    ar: "مبتدئ",
    fr: "Débutant"
  },
  intermediate: {
    en: "Intermediate",
    ar: "متوسط",
    fr: "Intermédiaire"
  },
  advanced: {
    en: "Advanced",
    ar: "متقدم",
    fr: "Avancé"
  },
  fiqh: {
    en: "Fiqh",
    ar: "الفقه",
    fr: "Fiqh"
  },
  trending: {
    en: "Trending",
    ar: "رائج",
    fr: "Tendance"
  },
  new: {
    en: "New",
    ar: "جديد",
    fr: "Nouveau"
  },
  free: {
    en: "Free",
    ar: "مجاني",
    fr: "Gratuit"
  },
  no_courses_found: {
    en: "No Courses Found",
    ar: "لم يتم العثور على دورات",
    fr: "Aucun cours trouvé"
  },
  no_courses_description: {
    en: "Try adjusting your search or filter to find what you're looking for.",
    ar: "حاول تعديل البحث أو التصفية للعثور على ما تبحث عنه.",
    fr: "Essayez d'ajuster votre recherche ou votre filtre pour trouver ce que vous cherchez."
  },
  
  // Community page
  discussions: {
    en: "Discussions",
    ar: "المناقشات",
    fr: "Discussions"
  },
  ask_question: {
    en: "Ask Question",
    ar: "اطرح سؤالاً",
    fr: "Poser une question"
  },
  scholars: {
    en: "Scholars",
    ar: "العلماء",
    fr: "Savants"
  },
  search_discussions: {
    en: "Search discussions...",
    ar: "البحث في المناقشات...",
    fr: "Rechercher des discussions..."
  },
  ask_new_question: {
    en: "Ask a New Question",
    ar: "اطرح سؤالاً جديداً",
    fr: "Poser une nouvelle question"
  },
  question_title: {
    en: "Question Title",
    ar: "عنوان السؤال",
    fr: "Titre de la question"
  },
  question_title_placeholder: {
    en: "Enter a concise title for your question",
    ar: "أدخل عنوانًا موجزًا لسؤالك",
    fr: "Entrez un titre concis pour votre question"
  },
  select_topic: {
    en: "Select Topic",
    ar: "اختر موضوعًا",
    fr: "Sélectionner un sujet"
  },
  question_details: {
    en: "Question Details",
    ar: "تفاصيل السؤال",
    fr: "Détails de la question"
  },
  question_details_placeholder: {
    en: "Provide more details about your question...",
    ar: "قدم المزيد من التفاصيل حول سؤالك...",
    fr: "Fournissez plus de détails sur votre question..."
  },
  submit_question: {
    en: "Submit Question",
    ar: "إرسال السؤال",
    fr: "Soumettre la question"
  },
  our_scholars: {
    en: "Our Scholars",
    ar: "علماؤنا",
    fr: "Nos savants"
  },
  view_profile: {
    en: "View Profile",
    ar: "عرض الملف الشخصي",
    fr: "Voir le profil"
  },

  // Tafsir page
  quran_tafsir: {
    en: "Quran Tafsir",
    ar: "تفسير القرآن",
    fr: "Tafsir du Coran"
  },
  select_verse_for_tafsir: {
    en: "Select a verse to view its tafsir",
    ar: "اختر آية لعرض تفسيرها",
    fr: "Sélectionnez un verset pour voir son tafsir"
  },
  of: {
    en: "of",
    ar: "من",
    fr: "de"
  },
  previous: {
    en: "Previous",
    ar: "السابق",
    fr: "Précédent"
  },
  next: {
    en: "Next",
    ar: "التالي",
    fr: "Suivant"
  },
  play: {
    en: "Play",
    ar: "تشغيل",
    fr: "Jouer"
  },
  settings_general: {
    en: "Settings",
    ar: "الإعدادات",
    fr: "Paramètres"
  },
  settings_account: {
    en: "Account Settings",
    ar: "إعدادات الحساب",
    fr: "Paramètres du compte"
  },
  settings_application: {
    en: "App Settings",
    ar: "إعدادات التطبيق",
    fr: "Paramètres de l'application"
  },
  settings_preferences: {
    en: "Preferences",
    ar: "التفضيلات",
    fr: "Préférences"
  }
};

// Context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Load preferred language from localStorage or default to English
    const savedLanguage = localStorage.getItem("preferred-language") as Language;
    return savedLanguage || "en";
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("preferred-language", language);
    
    // Update document direction based on language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation missing for: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key]["en"] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
