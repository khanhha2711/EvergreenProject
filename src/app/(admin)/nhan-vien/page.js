import { Skeleton } from "@/components/ui/skeleton";
import NhanVienTableContainer from "@/features/nhan-vien/nhanVienTableContainer";
import { Suspense } from "react";

export default async function KhachHang({ searchParams }) {
  return (
    <div className="container mx-auto h-full">
      <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
        <NhanVienTableContainer searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
