import { getUser } from "@/actions/userAction";
import NavAdmin from "@/components/layout/navAdmin";
import Sidebar from "@/components/layout/sidebar";

export default async function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <NavAdmin />
        <main className="flex-1  bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
