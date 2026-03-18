"use client";
import Image from "next/image";
import Link from "next/link";
import PATH from "@/routes/path";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function Navbar() {
  const pathName = usePathname();
  const nav = [
    { href: `${PATH.PUBLIC.HOME}`, trang: "Trang chủ" },
    { href: `${PATH.PUBLIC.GIOITHIEU}`, trang: "Giới thiệu" },
    { href: `${PATH.PUBLIC.DICHVU}`, trang: "Dịch vụ" },
    { href: `${PATH.PUBLIC.LIENHE}`, trang: "Liên hệ" },
  ];

  return (
    <nav className="flex min-w-0 w-full max-w-screen-2xl justify-between items-center px-6 py-2">
      <Image src="/logo.png" alt="logo" width={168} height={48} priority />
      <div className="flex items-center gap-8">
        <ul className="flex gap-8">
          {nav.map((item, index) => {
            const isActive = pathName === item.href;
            return (
              <li
                key={index}
                className={cn(
                  "transition-all duration-200 cursor-pointer text-xs sm:text-base",
                  isActive
                    ? "text-accent-foreground font-bold underline underline-offset-8"
                    : "hover:text-accent-foreground font-semibold",
                )}
              >
                <Link href={item.href}>{item.trang}</Link>
              </li>
            );
          })}
        </ul>
        <Button
          className="hover:bg-accent cursor-pointer hover:scale-105 active:scale-95"
          size="lg"
        >
          <Link href={PATH.PUBLIC.LIENHE}>Yêu cầu báo giá</Link>
        </Button>
      </div>
    </nav>
  );
}
