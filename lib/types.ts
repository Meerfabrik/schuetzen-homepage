// Navigation
export interface NavChild {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

// News
export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  date: string;
  image?: string;
  excerpt: string;
  content: string;
}

// Kontaktformular
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormStatus = "idle" | "loading" | "success" | "error";
