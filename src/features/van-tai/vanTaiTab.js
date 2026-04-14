"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Box, Container } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VanTaiTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleChangeTab = (tab) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    router.push(`?${params.toString()}`);
  };
  const currentTab = searchParams.get("tab") || "noi-dia";
  return (
    <div className="flex items-center gap-4 bg-white py-2 px-4">
      <Button
        className={cn(
          "bg-white text-primary hover:bg-white",
          currentTab === "noi-dia"
            ? " underline underline-offset-8 font-bold"
            : "",
        )}
        onClick={() => handleChangeTab("noi-dia")}
      >
        <Box />
        Vận tải nội địa
      </Button>
      <Button
        className={cn(
          "bg-white text-primary hover:bg-white",
          currentTab === "hang-tau"
            ? " underline underline-offset-8 font-bold"
            : "",
        )}
        onClick={() => handleChangeTab("hang-tau")}
      >
        <Container />
        Hãng tàu
      </Button>
    </div>
  );
}
