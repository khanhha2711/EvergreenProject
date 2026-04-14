import { Skeleton } from "@/components/ui/skeleton";
import KhachHangTableContainer from "@/features/khach-hang/khachHangTableContainer";
import { Suspense } from "react";

export default async function KhachHang({ searchParams }) {
  return (
    <div className="container mx-auto h-full">
      <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
        <KhachHangTableContainer searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
