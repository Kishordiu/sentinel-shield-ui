import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";

export const AppLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={`flex-1 ${isAuthenticated ? "pb-20 md:pb-0" : ""}`}>
        <Outlet />
      </main>
      {isAuthenticated && <BottomNav />}
      <Footer />
    </div>
  );
};
