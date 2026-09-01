/**
 * Real rows from a real capture: fixtures/bundles/react-sample.zip in raider_cli.
 * Sizes are the actual captured byte counts. Nothing here is illustrative.
 */
export interface PlateRow {
  nav: number;
  method: string;
  path: string;
  status: number;
  kind: "document" | "script" | "api" | "preflight";
  bytes: number;
}

export const CAPTURE_ROWS: PlateRow[] = [
  {
    nav: 1,
    method: "GET",
    path: "/",
    status: 200,
    kind: "document",
    bytes: 213,
  },
  {
    nav: 1,
    method: "GET",
    path: "/assets/index-B6zGc9AK.js",
    status: 200,
    kind: "script",
    bytes: 205039,
  },
  {
    nav: 1,
    method: "OPTIONS",
    path: "/api/login",
    status: 204,
    kind: "preflight",
    bytes: 0,
  },
  {
    nav: 1,
    method: "POST",
    path: "/api/login",
    status: 200,
    kind: "api",
    bytes: 405,
  },
  {
    nav: 1,
    method: "OPTIONS",
    path: "/api/me",
    status: 204,
    kind: "preflight",
    bytes: 0,
  },
  {
    nav: 1,
    method: "GET",
    path: "/api/me",
    status: 200,
    kind: "api",
    bytes: 184,
  },
  {
    nav: 2,
    method: "GET",
    path: "/users",
    status: 200,
    kind: "document",
    bytes: 213,
  },
  {
    nav: 2,
    method: "GET",
    path: "/assets/Users-CqHBajCK.js",
    status: 200,
    kind: "script",
    bytes: 345,
  },
  {
    nav: 2,
    method: "GET",
    path: "/api/users",
    status: 200,
    kind: "api",
    bytes: 405,
  },
  {
    nav: 3,
    method: "GET",
    path: "/users/1",
    status: 200,
    kind: "document",
    bytes: 213,
  },
  {
    nav: 3,
    method: "GET",
    path: "/assets/UserDetail-Bg8A-sFR.js",
    status: 200,
    kind: "script",
    bytes: 358,
  },
  {
    nav: 3,
    method: "GET",
    path: "/api/users/1",
    status: 200,
    kind: "api",
    bytes: 129,
  },
  {
    nav: 4,
    method: "GET",
    path: "/stats",
    status: 200,
    kind: "document",
    bytes: 213,
  },
  {
    nav: 4,
    method: "GET",
    path: "/assets/Stats-Vq6xNloI.js",
    status: 200,
    kind: "script",
    bytes: 321,
  },
  {
    nav: 4,
    method: "GET",
    path: "/api/stats",
    status: 200,
    kind: "api",
    bytes: 66,
  },
];

export const NAV_LABELS = ["/", "/users", "/users/:id", "/stats"];
