"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SIDEBAR } from "@/constants/sidebar";
import { usePathname } from "next/navigation";

export function BreadcrumbComponent() {
  const pathName = usePathname();
  const segments = pathName.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const route = SIDEBAR.find((sidebar) => sidebar.link === `/${segment}`);

    const label =
      route?.label ||
      (segment === "chinh-sua"
        ? "Chỉnh sửa"
        : segment === "tao-moi"
        ? "Tạo mới"
        : "Chi tiết");
    return {
      href,
      label,
    };
  });
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={index} className="flex items-center gap-2">
            <BreadcrumbItem>
              {breadcrumb.href === pathName ? (
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={breadcrumb.href}>
                  {breadcrumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
