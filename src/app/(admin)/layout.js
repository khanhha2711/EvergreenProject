import NavAdmin from "@/components/layout/navAdmin";
import Sidebar from "@/components/layout/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full pt-2">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <NavAdmin />
        <main className="flex-1 p-4 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
