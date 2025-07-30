import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/language-context";
import { Icons } from "../icons";
import { Users, Building2, Calendar, DollarSign, FileText, TrendingUp, GraduationCap, Briefcase } from "lucide-react";

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
            Dashboard
          </a>
        </Link>
        
        <button
          className="flex justify-between w-full px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => toggleSubmenu("employees-submenu")}
        >
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Employees
          </div>
          <Icons.chevronDown className="h-4 w-4" />
        </button>
        
        <div className={`${openSubmenu === "employees-submenu" ? "block" : "hidden"} pl-4`}>
          <Link href="/employees">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <Users className="mr-2 h-4 w-4 inline" />
              Employee Directory
            </a>
          </Link>
          <Link href="/departments">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <Building2 className="mr-2 h-4 w-4 inline" />
              Departments
            </a>
          </Link>
          <Link href="/attendance">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <Calendar className="mr-2 h-4 w-4 inline" />
              Attendance
            </a>
          </Link>
          <Link href="/performance-reviews">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <TrendingUp className="mr-2 h-4 w-4 inline" />
              Performance Reviews
            </a>
          </Link>
        </div>
        
        <button
          className="flex justify-between w-full px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => toggleSubmenu("payroll-submenu")}
        >
          <div className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            Payroll
          </div>
          <Icons.chevronDown className="h-4 w-4" />
        </button>
        
        <div className={`${openSubmenu === "payroll-submenu" ? "block" : "hidden"} pl-4`}>
          <Link href="/payroll">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <DollarSign className="mr-2 h-4 w-4 inline" />
              Payroll Management
            </a>
          </Link>
          <Link href="/leave-management">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <FileText className="mr-2 h-4 w-4 inline" />
              Leave Management
            </a>
          </Link>
        </div>
        
        <button
          className="flex justify-between w-full px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => toggleSubmenu("development-submenu")}
        >
          <div className="flex items-center">
            <GraduationCap className="mr-2 h-4 w-4" />
            Development
          </div>
          <Icons.chevronDown className="h-4 w-4" />
        </button>
        
        <div className={`${openSubmenu === "development-submenu" ? "block" : "hidden"} pl-4`}>
          <Link href="/training">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <GraduationCap className="mr-2 h-4 w-4 inline" />
              Training Programs
            </a>
          </Link>
          <Link href="/performance-reviews">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <TrendingUp className="mr-2 h-4 w-4 inline" />
              Performance Reviews
            </a>
          </Link>
        </div>
        
        <button
          className="flex justify-between w-full px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => toggleSubmenu("recruitment-submenu")}
        >
          <div className="flex items-center">
            <Briefcase className="mr-2 h-4 w-4" />
            Recruitment
          </div>
          <Icons.chevronDown className="h-4 w-4" />
        </button>
        
        <div className={`${openSubmenu === "recruitment-submenu" ? "block" : "hidden"} pl-4`}>
          <Link href="/recruitment">
            <a className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
              <Briefcase className="mr-2 h-4 w-4 inline" />
              Job Postings
            </a>
          </Link>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
            <Users className="mr-2 h-4 w-4 inline" />
            Applications
          </a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
            <Calendar className="mr-2 h-4 w-4 inline" />
            Interviews
          </a>
        </div>
      </div>
    </div>
  );
}
