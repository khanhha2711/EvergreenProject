import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Evergreen",
  description: "Logistic",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vn">
      <body className={`${roboto.variable} font-sans antialiased`}>
        <Toaster richColors position="bottom-center" />
        {children}
      </body>
    </html>
  );
}
