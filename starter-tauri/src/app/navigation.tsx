import type { ReactNode } from "react";
import { HomeIcon, NotebookTextIcon, PlusIcon, SettingsIcon } from "lucide-react";

import { CounterPage } from "@/pages/counter";
import { DashboardPage } from "@/pages/dashboard";
import { NotesPage } from "@/pages/notes";
import { SettingsPage } from "@/pages/settings";

export type AppRoute = {
  path: string;
  title: string;
  translationKey: string;
  element: ReactNode;
  nav?: {
    icon: ReactNode;
  };
};

export const appRoutes: AppRoute[] = [
  {
    path: "/",
    title: "Dashboard",
    translationKey: "nav.dashboard",
    element: <DashboardPage />,
    nav: { icon: <HomeIcon /> },
  },
  {
    path: "/counter",
    title: "Counter",
    translationKey: "nav.counter",
    element: <CounterPage />,
    nav: { icon: <PlusIcon /> },
  },
  {
    path: "/notes",
    title: "Notes",
    translationKey: "nav.notes",
    element: <NotesPage />,
    nav: { icon: <NotebookTextIcon /> },
  },
  {
    path: "/settings",
    title: "Settings",
    translationKey: "nav.settings",
    element: <SettingsPage />,
    nav: { icon: <SettingsIcon /> },
  },
];

export type MainNavItem = {
  title: string;
  translationKey: string;
  url: string;
  icon: ReactNode;
};

export const mainNav: MainNavItem[] = appRoutes
  .filter((route) => route.nav)
  .map((route) => ({
    title: route.title,
    translationKey: route.translationKey,
    url: route.path,
    icon: route.nav!.icon,
  }));

export const pageTitles = Object.fromEntries(appRoutes.map((route) => [route.path, route.title]));

export const pageTitleKeys = Object.fromEntries(
  appRoutes.map((route) => [route.path, route.translationKey]),
);
