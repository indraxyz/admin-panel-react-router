import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/signout";
import { useAuthContext } from "~/contexts/auth.context";

export function meta(_args: Route.MetaArgs) {
  return [{ title: "Sign Out" }, { name: "robots", content: "noindex" }];
}

export default function SignOut() {
  const { signOut } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    signOut();
    navigate("/");
  }, [signOut, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Signing out...</p>
    </div>
  );
}
