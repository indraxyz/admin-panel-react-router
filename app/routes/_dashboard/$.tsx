import { Link } from "react-router";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function DashboardNotFound() {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <FileQuestion className="text-muted-foreground h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription className="text-base">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
