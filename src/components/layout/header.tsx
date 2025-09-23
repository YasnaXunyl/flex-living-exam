// THIS WAS VIBECODED PLEASE IGNORE CODE PRACTICES

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Building2,
  Info,
  BookOpen,
  Mail,
  ChevronDown,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50); // threshold in px
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled ? "bg-[#284E4C] shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-[88px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://lsmvmmgkpbyqhthzdexc.supabase.co/storage/v1/object/public/website/Uploads/Green_V3%20Symbol%20%26%20Wordmark%20(1).png"
              alt="The Flex"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Button
              variant="ghost"
              className={`${
                scrolled ? "text-white" : "text-[#333]"
              } font-medium`}
            >
              <Building2 className="h-4 w-4 mr-2" />
              Landlords
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Link href="/about-us">
              <Button
                variant="ghost"
                className={`${
                  scrolled ? "text-white" : "text-[#333]"
                } font-medium`}
              >
                <Info className="h-4 w-4 mr-2" />
                About Us
              </Button>
            </Link>
            <Link href="/careers">
              <Button
                variant="ghost"
                className={`${
                  scrolled ? "text-white" : "text-[#333]"
                } font-medium`}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Careers
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="ghost"
                className={`${
                  scrolled ? "text-white" : "text-[#333]"
                } font-medium`}
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </Link>
            {/* Language Selector */}
            <Button
              variant="ghost"
              className={`${
                scrolled ? "text-white" : "text-[#333]"
              } font-medium`}
            >
              <span className="flex items-center">
                <span className="pr-4">🇬🇧</span> English
              </span>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            {/* Language */}
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-full border-2 border-transparent ${
                scrolled ? "text-white" : "text-[#333]"
              }`}
            >
              <span className="text-lg">🇬🇧</span>
              <span className="text-xs font-medium ml-1">GB</span>
            </Button>

            {/* Menu Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full border-2 border-transparent ${
                    scrolled ? "text-white" : "text-[#333]"
                  }`}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-4">
                <nav className="flex flex-col space-y-4">
                  <Link href="/about-us">
                    <Button
                      variant="ghost"
                      className="justify-start w-full text-[#333]"
                    >
                      <Info className="h-4 w-4 mr-2" />
                      About Us
                    </Button>
                  </Link>
                  <Link href="/careers">
                    <Button
                      variant="ghost"
                      className="justify-start w-full text-[#333]"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Careers
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="ghost"
                      className="justify-start w-full text-[#333]"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
