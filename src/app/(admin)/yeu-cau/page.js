import { Skeleton } from "@/components/ui/skeleton";
import YeuCauTableContainer from "@/features/yeu-cau/yeuCauTableContainer";
import { Suspense } from "react";

export default function YeuCau({ searchParams }) {
  return (
    <div className="container mx-auto h-full">
      <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
        <YeuCauTableContainer searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
