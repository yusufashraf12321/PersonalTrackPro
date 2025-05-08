import { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import { useLanguage } from "@/contexts/language-context";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { language } = useLanguage();
  const isRtl = language === "ar";

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.documentElement.classList.toggle("rtl", isRtl);
    document.documentElement.classList.toggle("ltr", !isRtl);
  }, [language, isRtl]);

  return (
    <div className={`min-h-screen flex flex-col ${isRtl ? 'rtl font-arabic' : 'ltr'}`}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
