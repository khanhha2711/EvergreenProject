import { BreadcrumbComponent } from "../navigation/breadcrumb";

export default function NavAdmin() {
  return (
    <section className="p-4 sticky top-0 z-50 bg-white">
      <div>
        <BreadcrumbComponent />
      </div>
    </section>
  );
}
