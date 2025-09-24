import Link from "next/link";

import { Building2, Home, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/manager",
  },
  {
    title: "Properties",
    icon: Building2,
    href: "/manager/properties",
  },
  {
    title: "Reviews",
    icon: Users,
    href: "/manager/reviews",
  },
];

interface ManagerLayoutProps {
  children: React.ReactNode;
}

export default function ManagerLayout({ children }: ManagerLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 border-r bg-card">
        <div className="p-6">
          <h1 className="text-xl font-bold">Flex Living</h1>
          <p className="text-sm text-muted-foreground">Manager Portal</p>
        </div>
        <Separator />
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <Link href={item.href}>
                      <Icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <header className="border-b">
          <div className="flex h-16 items-center px-6">
            <h2 className="text-lg font-semibold">Manager Dashboard</h2>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
