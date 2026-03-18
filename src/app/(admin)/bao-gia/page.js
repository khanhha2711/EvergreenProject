import { Skeleton } from "@/components/ui/skeleton";
import BaoGiaTableContainer from "@/features/bao-gia/baoGiaTableContainer";
import { Suspense } from "react";

export default async function BaoGia({ searchParams }) {
  return (
    <div className="container mx-auto py-4 h-full">
      <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
        <BaoGiaTableContainer searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
