"use client";

import { SIDEBAR } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(data));
    }
  }, []);
  return (
    <section className="flex flex-col h-screen  gap-10 mx-4 sm:w-48 sticky top-0 pt-4   ">
      <Image src="/logo.png" alt="logo" width={140} height={140} priority />

      <div className="flex flex-col gap-4">
        {SIDEBAR.slice(0, 4).map((sidebar) => {
          const isActive = pathname.startsWith(sidebar.link);

          return (
            <Link
              key={sidebar?.label}
              href={sidebar?.link}
              className={cn(
                "flex gap-2 items-center pl-4 py-2 rounded-xl transition-colors",
                "hover:bg-sidebar-primary/30",
                isActive &&
                  "bg-primary text-primary-foreground hover:bg-primary",
              )}
            >
              {sidebar?.icon({ style: isActive && "text-white" })}
              <span className="font-medium">{sidebar?.label}</span>
            </Link>
          );
        })}
        <p className="text-gray-500 border-t-1 pt-2 px-4">Thông tin khác</p>
        {SIDEBAR.slice(4).map((sidebar) => {
          const isActive = pathname.startsWith(sidebar.link);

          return (
            <Link
              key={sidebar?.label}
              href={sidebar?.link}
              className={cn(
                "flex gap-2 items-center pl-6 py-2 rounded-xl transition-colors",
                "hover:bg-sidebar-primary/30",
                isActive &&
                  "bg-primary text-primary-foreground hover:bg-primary",
              )}
            >
              {sidebar?.icon({ style: isActive && "text-white" })}
              <span className="font-medium">{sidebar?.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="flex gap-4 items-center mt-auto mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <p className="text-sm font-semibold">NV</p>
        </div>
        <div>
          <b>{user?.userId?.userName}</b>
          <p>{user?.gmail}</p>
        </div>
      </div>
    </section>
  );
}
