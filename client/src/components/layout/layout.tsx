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

  return (
    <div className={`min-h-screen flex flex-col ${isRtl ? 'rtl' : 'ltr'}`}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
