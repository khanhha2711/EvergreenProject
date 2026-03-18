"use client";

import { SIDEBAR } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <section className="flex flex-col h-full gap-10 mx-4 sm:w-48">
      <Image src="/logo.png" alt="logo" width={140} height={140} priority />

      <div className="flex flex-col gap-4">
        {SIDEBAR.map((sidebar) => {
          const isActive = pathname.startsWith(sidebar.link);

          return (
            <Link
              key={sidebar.label}
              href={sidebar.link}
              className={cn(
                "flex gap-2 items-center pl-4 py-2 rounded-xl transition-colors",
                "hover:bg-sidebar-primary/30",
                isActive &&
                  "bg-primary text-primary-foreground hover:bg-primary",
              )}
            >
              {sidebar.icon}
              <span className="font-medium">{sidebar.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
