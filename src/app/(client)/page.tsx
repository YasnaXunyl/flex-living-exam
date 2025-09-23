import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background">
      <div className="text-center space-y-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Exam Living
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/properties">
            <Button size="lg" className="w-full sm:w-auto">
              <Building2 className="mr-2 h-5 w-5" />
              Browse Properties
            </Button>
          </Link>
          <Link href="/manager">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <ShieldCheck className="mr-2 h-5 w-5" />
              Manager Portal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
