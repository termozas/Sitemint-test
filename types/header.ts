import type { ReactNode } from 'react';

export interface HeaderContentItem {
  href: string;
  title: string;
  description: string;
}

export interface HeaderMainContent extends HeaderContentItem {
  icon: ReactNode;
}

export interface HeaderContent {
  main?: HeaderMainContent;
  items: HeaderContentItem[];
}

export interface HeaderItem {
  href?: string;
  label?: string;
  trigger?: string;
  content?: HeaderContent;
}
