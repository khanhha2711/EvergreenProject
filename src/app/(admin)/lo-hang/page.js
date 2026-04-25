import { Skeleton } from "@/components/ui/skeleton";
import LoHangTableContainer from "@/features/lo-hang/loHangTableContainer";
import { Suspense } from "react";

export default async function LoHang({ searchParams }) {
  return (
    <div className="container h-full">
      <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
        <LoHangTableContainer searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
