import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("signin", "routes/_auth/signin.tsx"),
  route("signup", "routes/_auth/signup.tsx"),
  route("signout", "routes/_auth/signout.tsx"),
  route("dashboard", "routes/_dashboard/_layout.tsx", [
    index("routes/_dashboard/_index.tsx"),
    route("account", "routes/_dashboard/account.tsx"),
    route("settings", "routes/_dashboard/settings.tsx"),
    route("*", "routes/_dashboard/$.tsx"),
  ]),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
