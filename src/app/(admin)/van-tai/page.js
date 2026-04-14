import { Skeleton } from "@/components/ui/skeleton";
import VanTaiTab from "@/features/van-tai/vanTaiTab";
import VanTaiTableContainer from "@/features/van-tai/vanTaiTableContainer";
import { Suspense } from "react";

export default function VanTai({ searchParams }) {
  return (
    <div >
      <div className=''>
        <VanTaiTab />
      </div>
      <div className="container mx-0 h-full ">
        <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
          <VanTaiTableContainer searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
