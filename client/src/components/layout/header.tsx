import { useState } from "react";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { Search, User, Users, Building2, Calendar, DollarSign, FileText, TrendingUp, GraduationCap, Briefcase } from "lucide-react";
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
                  <Users className="text-white h-6 w-6" />
                </div>
                <span className="text-2xl font-bold font-decorative text-primary">HR System</span>
              </a>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <a className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition duration-150">
                Dashboard
              </a>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary p-0">
                  <Users className="mr-1 h-4 w-4" />
                  Employees <Icons.chevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/employees">
                  <DropdownMenuItem className="cursor-pointer">
                    <Users className="mr-2 h-4 w-4" />
                    Employee Directory
                  </DropdownMenuItem>
                </Link>
                <Link href="/departments">
                  <DropdownMenuItem className="cursor-pointer">
                    <Building2 className="mr-2 h-4 w-4" />
                    Departments
                  </DropdownMenuItem>
                </Link>
                <Link href="/attendance">
                  <DropdownMenuItem className="cursor-pointer">
                    <Calendar className="mr-2 h-4 w-4" />
                    Attendance
                  </DropdownMenuItem>
                </Link>
                <Link href="/performance-reviews">
                  <DropdownMenuItem className="cursor-pointer">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Performance Reviews
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary p-0">
                  <DollarSign className="mr-1 h-4 w-4" />
                  Payroll <Icons.chevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/payroll">
                  <DropdownMenuItem className="cursor-pointer">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Payroll Management
                  </DropdownMenuItem>
                </Link>
                <Link href="/leave-management">
                  <DropdownMenuItem className="cursor-pointer">
                    <FileText className="mr-2 h-4 w-4" />
                    Leave Management
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary p-0">
                  <GraduationCap className="mr-1 h-4 w-4" />
                  Development <Icons.chevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/training">
                  <DropdownMenuItem className="cursor-pointer">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Training Programs
                  </DropdownMenuItem>
                </Link>
                <Link href="/performance-reviews">
                  <DropdownMenuItem className="cursor-pointer">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Performance Reviews
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary p-0">
                  <Briefcase className="mr-1 h-4 w-4" />
                  Recruitment <Icons.chevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href="/recruitment">
                  <DropdownMenuItem className="cursor-pointer">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Job Postings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer">
                  <Users className="mr-2 h-4 w-4" />
                  Applications
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Calendar className="mr-2 h-4 w-4" />
                  Interviews
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                  <span className="hidden sm:inline-block mr-1">Account</span>
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Sign Out
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
