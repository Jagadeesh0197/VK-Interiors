import { Heart } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto flex h-16 items-center justify-center px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm">
          &copy; {currentYear} VK Interiors | Designed with{" "}
          <Heart className="mx-1 inline-block h-4 w-4 fill-red-500 text-red-500" />
          using Firebase
        </p>
      </div>
    </footer>
  );
}
