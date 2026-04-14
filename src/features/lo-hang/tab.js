"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PATH from "@/routes/path";
import { Box, File, FileSignature, Ship } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const tabValue = [
  { label: "Tổng quan", name: "tong-quan", icon: <Box /> },
  { label: "Chứng từ", name: "chung-tu", icon: <File /> },
  { label: "Tờ khai hải quan", name: "hai-quan", icon: <FileSignature /> },
  { label: "Thông tin vận chuyển", name: "van-chuyen", icon: <Ship /> },
];
const Tab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const pathname = usePathname();

  const handleClick = (value) => {
    params.set("tab", value);
    router.push(`${pathname}?${params.toString()}`);
  };
  const currentTab = searchParams.get("tab") || "tong-quan";
  return (
    <div>
      {tabValue.map((tab, index) => {
        const isActive = tab.name === currentTab;

        return (
          <Button
            className={cn(
              "bg-white text-black hover:bg-white",
              "hover:underline underline-offset-8 hover:text-primary",
              isActive && "font-bold text-primary underline underline-offset-8",
            )}
            onClick={() => handleClick(tab.name)}
            key={index}
          >
            <div className="flex items-center gap-2">
              <p>{tab.icon}</p>
              <p>{tab.label}</p>
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default Tab;
