import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-32">{children}</main>
      <Footer />
    </div>
  );
}
