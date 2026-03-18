import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-screen-2xl w-full ">{children}</main>
      <Footer />
    </>
  );
}
