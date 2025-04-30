import React from "react";

// Import Lucide icons for consistency
import {
  Sun,
  Moon,
  Menu,
  ChevronDown,
  Search,
  User,
  Globe,
  ArrowRight,
  BookOpen,
  MessageSquare,
  GraduationCap,
  Users,
  Settings,
  Share2,
  Bookmark,
  Play,
  Pause,
  Star,
  Check,
  CheckCircle,
  MessageCircle,
  Book,
  Circle,
  Hash,
  Heart,
  Clock,
  Eye,
  Plus,
  Send,
  Filter,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ChevronLeft,
  ChevronRight,
  HelpCircle
} from "lucide-react";

// Create custom icons that aren't in Lucide
const StarFilled = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const StarHalf = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    {...props}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    <path fill="none" d="M12 2v15.77l6.18 3.25-1.18-6.88 5-4.87-6.91-1.01L12 2z" />
  </svg>
);

// Prayer icon
const Pray = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2a2 2 0 0 0-2 2c0 1.1.9 2 2 2 1.1 0 2-.9 2-2 0-1.1-.9-2-2-2z" />
    <path d="M14.5 6h-5a2 2 0 0 0-1.7 3.05l5.7 7.95a2 2 0 0 0 3.4-2.1L13.5 8" />
    <path d="M9 11.5c0 .85.35 1.7 1 2.29V22" />
  </svg>
);

// Balance Scale icon
const BalanceScale = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3v3" />
    <path d="M5.2 10h13.6" />
    <path d="M5.2 10c0 1.66 1.48 3 3.3 3s3.3-1.34 3.3-3" />
    <path d="M12.2 10c0 1.66 1.48 3 3.3 3s3.3-1.34 3.3-3" />
    <path d="M4 19h16" />
    <path d="M12 13v6" />
  </svg>
);

// History icon
const History = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z" />
    <path d="M12 8v4l3 3" />
  </svg>
);

// Crescent Moon icon for logo
const CrescentMoon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
  </svg>
);

// Combine all icons
export const Icons = {
  sun: Sun,
  moon: Moon,
  crescentMoon: CrescentMoon,
  menu: Menu,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  search: Search,
  user: User,
  globe: Globe,
  arrowRight: ArrowRight,
  bookOpen: BookOpen,
  messageSquare: MessageSquare,
  graduationCap: GraduationCap,
  users: Users,
  settings: Settings,
  share: Share2,
  bookmark: Bookmark,
  play: Play,
  pause: Pause,
  star: Star,
  starFilled: StarFilled,
  starHalf: StarHalf,
  check: Check,
  checkCircle: CheckCircle,
  messageCircle: MessageCircle,
  book: Book,
  circle: Circle,
  hash: Hash,
  heart: Heart,
  clock: Clock,
  eye: Eye,
  plus: Plus,
  send: Send,
  filter: Filter,
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  pray: Pray,
  balanceScale: BalanceScale,
  history: History,
  help: HelpCircle,
};
