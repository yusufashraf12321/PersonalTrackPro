import { useState } from "react";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { Search, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileMenu from "./mobile-menu";
import { Icons } from "../icons";

export default function Header() {
  const { language, t } = useLanguage();
  const isRtl = language === "ar";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-50 bg-white dark:bg-dark-surface shadow-md ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <div className="rounded-full bg-primary w-10 h-10 flex items-center justify-center mr-2">
                  <Icons.moon className="text-white h-6 w-6" />
                </div>
                <span className="text-2xl font-bold font-decorative text-primary">Abrar</span>
              </a>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <a className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition duration-150">
                {t("home")}
              </a>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary p-0">
                  {t("quran")} <Icons.chevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/quran">
                  <DropdownMenuItem className="cursor-pointer">
                    {t("read_quran")}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer">
                  {t("listen_recitations")}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  {t("tafsir")}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  {t("memorization_tools")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary p-0">
                  {t("hadith")} <Icons.chevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/hadith">
                  <DropdownMenuItem className="cursor-pointer">
                    {t("sahih_bukhari")}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer">
                  {t("sahih_muslim")}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  {t("40_hadith_nawawi")}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  {t("all_collections")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link href="/courses">
              <a className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition duration-150">
                {t("courses")}
              </a>
            </Link>
            
            <Link href="/community">
              <a className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition duration-150">
                {t("community")}
              </a>
            </Link>
            
            <a href="#" className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition duration-150">
              {t("about")}
            </a>
          </nav>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Search button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            
            {/* Language Toggle */}
            <LanguageToggle />
            
            {/* Dark mode toggle */}
            <ThemeToggle />
            
            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary">
                  <span className="hidden sm:inline-block mr-1">{t("account")}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  {t("profile")}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  {t("my_progress")}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  {t("bookmarks")}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  {t("settings")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  {t("sign_out")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icons.menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      </div>
    </header>
  );
}
