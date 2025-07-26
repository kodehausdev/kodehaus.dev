
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4">
      <AlertTriangle className="h-24 w-24 text-destructive mb-6" />
      <h1 className="text-5xl font-headline font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild size="lg">
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  );
}
