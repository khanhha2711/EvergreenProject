import { Skeleton } from "@/components/ui/skeleton";
import HopDongTableContainer from "@/features/hop-dong/hopDongTableContainer";
import { Suspense } from "react";

export default async function HopDong({ searchParams }) {
  return (
    <div className="container mx-auto h-full">
      <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
        <HopDongTableContainer searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
