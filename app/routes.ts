import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("signin", "routes/_auth/signin.tsx"),
  route("signup", "routes/_auth/signup.tsx"),
  route("signout", "routes/_auth/signout.tsx"),
  layout("routes/_dashboard/_layout.tsx", [
    route("dashboard", "routes/_dashboard/_index.tsx"),
    route("settings", "routes/_dashboard/settings.tsx"),
    route("account", "routes/_dashboard/account.tsx"),
  ]),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
