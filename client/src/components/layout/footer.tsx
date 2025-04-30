import { Link } from "wouter";
import { useLanguage } from "@/contexts/language-context";
import { Icons } from "../icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/">
              <a className="flex items-center mb-4">
                <div className="rounded-full bg-primary w-10 h-10 flex items-center justify-center mr-2">
                  <Icons.moon className="text-white h-6 w-6" />
                </div>
                <span className="text-2xl font-bold font-decorative text-white">Abrar</span>
              </a>
            </Link>
            <p className="text-slate-400 mb-4">
              {t("footer_description")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition duration-150">
                <Icons.facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition duration-150">
                <Icons.twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition duration-150">
                <Icons.instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition duration-150">
                <Icons.youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("quick_links")}</h3>
            <ul className="space-y-2">
              <li><Link href="/"><a className="text-slate-400 hover:text-white transition duration-150">{t("home")}</a></Link></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition duration-150">{t("about")}</a></li>
              <li><Link href="/courses"><a className="text-slate-400 hover:text-white transition duration-150">{t("courses")}</a></Link></li>
              <li><Link href="/quran"><a className="text-slate-400 hover:text-white transition duration-150">{t("quran")}</a></Link></li>
              <li><Link href="/hadith"><a className="text-slate-400 hover:text-white transition duration-150">{t("hadith")}</a></Link></li>
              <li><Link href="/community"><a className="text-slate-400 hover:text-white transition duration-150">{t("community")}</a></Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("resources")}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition duration-150">{t("blog")}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition duration-150">{t("webinars")}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition duration-150">{t("ebooks")}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition duration-150">{t("podcasts")}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition duration-150">{t("faqs")}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition duration-150">{t("support")}</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("stay_updated")}</h3>
            <p className="text-slate-400 mb-4">{t("newsletter_description")}</p>
            <form className="space-y-2">
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder={t("your_email")} 
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white pr-20"
                />
                <Button 
                  type="submit" 
                  className="absolute right-1 top-1 px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-150"
                >
                  {t("subscribe")}
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Abrar. {t("all_rights_reserved")}
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-slate-500 hover:text-white text-sm transition duration-150">{t("privacy_policy")}</a>
            <a href="#" className="text-slate-500 hover:text-white text-sm transition duration-150">{t("terms_of_service")}</a>
            <a href="#" className="text-slate-500 hover:text-white text-sm transition duration-150">{t("cookie_policy")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
