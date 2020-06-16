import { ReactNode } from "react";

declare global {
  interface Window {
    GA_INITIALIZED: boolean;
  }
}

export interface ArticleNavProps extends HasVerAndLang {
  previous: NavObject
  next: NavObject
}

export interface CLinkProps extends HasChildren {
  href: string
}

export interface CodeBlockProps {
  language: string
  value: string
}

export interface ContentProps extends HasVerAndLang {
  page: string
}

export interface HeaderProps {
  showingNav: boolean
  setShowingNav: (showingNav: boolean) => void
}

export interface HeadingProps extends HasChildren, HasLevel {
  children: ReactNode[]
}

export interface NavFolderProps extends HasVerAndLang, HasTheme, HasNav, HasLevel {
  name: string
  current: any
  parentExpanded: boolean
}

export interface LayoutProps extends HasChildren, HasTheme {
  current: NavObject
  showingNav: boolean
  setShowingNav: (showingNav: boolean) => void
}

export interface NavItemProps extends HasVerAndLang, HasNav {
  path: string
  selected: boolean
  level: number
}

export interface NavObject {
  key: string
  value: string
}

export interface PageProps extends HasVerAndLang, HasTheme, HasVerLang {
  previous: NavObject
  current: NavObject
  next: NavObject
  navs: object
  page: string
}

export interface PageQuery extends HasVerAndLang {
  slug: string[]
}

export interface SearchPageQuery extends HasVerAndLang{
  search: string
}

export interface SearchProps extends HasVerAndLang, HasTheme, HasVerLang {
  navs: object
  search: string
}

export interface SearchResults {
  count: number,
  totalCount: number,
  results: any[]
}

export interface SideNavProps {
  version?: string
  lang?: string
  navs?: any
  current?: NavObject
  verlang?: any
  stub: boolean
  showingNav: boolean
}

export interface TableCellProps extends HasChildren {
  isHeader: boolean
}

export interface Theme {
  pageTheme: string
  hljsStyle: string
}

export interface VerLangsProps extends HasVerAndLang, HasVerLang {
  stub: boolean
  current: NavObject
}

export interface HasChildren {
  children: ReactNode | ReactNode[]
}

export interface HasVerAndLang {
  version: string
  lang: string
}

export interface HasVerLang {
  verlang: any
}

export interface HasTheme {
  theme: Theme
}

export interface HasNav {
  nav: any
}

export interface HasLevel {
  level: number
}