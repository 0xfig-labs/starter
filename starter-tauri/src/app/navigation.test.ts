import { describe, expect, it } from "vitest";

import { appRoutes, mainNav, pageTitles } from "./navigation";

describe("navigation", () => {
  it("keeps routes, titles, and nav in sync", () => {
    expect(appRoutes.map((route) => route.path)).toEqual(["/", "/notes", "/settings"]);
    expect(mainNav).toHaveLength(appRoutes.length);
    expect(pageTitles["/notes"]).toBe("Notes");
  });
});
