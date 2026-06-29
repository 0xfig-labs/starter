import { Route, Routes } from "react-router";

import { appRoutes } from "@/app/navigation";
import { DefaultLayout } from "@/layouts/default";
import { NotFoundPage } from "@/pages/not-found";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        {appRoutes.map((route) => (
          <Route
            key={route.path}
            index={route.path === "/"}
            path={route.path === "/" ? undefined : route.path.slice(1)}
            element={route.element}
          />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
