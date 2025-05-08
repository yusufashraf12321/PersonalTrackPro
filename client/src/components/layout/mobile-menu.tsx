import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/language-context";
import { Icons } from "../icons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useLanguage();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (id: string) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden pb-4">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Link href="/">
          <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
            {t("home")}
          </a>
        </Link>
        
        <button
          className="flex justify-between w-full px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => toggleSubmenu("quran-submenu")}
        >
          {t("quran")}
          <Icons.chevronDown className="h-4 w-4" />
        </button>
        
        <div className={`${openSubmenu === "quran-submenu" ? "block" : "hidden"} pl-4`}>
          <Link href="/quran">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              {t("read_quran")}
            </a>
          </Link>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
            {t("listen_recitations")}
          </a>
          <Link href="/tafsir">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              {t("tafsir")}
            </a>
          </Link>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
            {t("memorization_tools")}
          </a>
        </div>
        
        <button
          className="flex justify-between w-full px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => toggleSubmenu("hadith-submenu")}
        >
          {t("hadith")}
          <Icons.chevronDown className="h-4 w-4" />
        </button>
        
        <div className={`${openSubmenu === "hadith-submenu" ? "block" : "hidden"} pl-4`}>
          <Link href="/hadith">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              {t("sahih_bukhari")}
            </a>
          </Link>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
            {t("sahih_muslim")}
          </a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
            {t("40_hadith_nawawi")}
          </a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
            {t("all_collections")}
          </a>
        </div>
        
        <Link href="/courses">
          <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
            {t("courses")}
          </a>
        </Link>
        
        <Link href="/community">
          <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
            {t("community")}
          </a>
        </Link>
        
        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
          {t("about")}
        </a>
      </div>
    </div>
  );
}
