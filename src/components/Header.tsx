import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Shield, Menu, X, Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const isPublic = ["/", "/about"].includes(location.pathname);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md" role="banner">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-foreground" aria-label="Home">
          <Shield className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline">ZeroTrust IoT</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {isPublic && !isAuthenticated && (
            <>
              <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link to="/about" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
              <Link to="/devices" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Devices</Link>
              <Link to="/onboarding" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Onboard</Link>
              <Link to="/admin" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Admin</Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          {isAuthenticated ? (
            <div className="hidden items-center gap-2 md:flex">
              <span className="text-sm text-muted-foreground">{user?.email}</span>
              <Button variant="ghost" size="icon" onClick={logout} aria-label="Log out">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="hidden gap-2 md:flex">
              <Button variant="ghost" asChild><Link to="/login">Log in</Link></Button>
              <Button asChild><Link to="/signup">Sign up</Link></Button>
            </div>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-card p-4 md:hidden animate-fade-in">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {!isAuthenticated && (
              <>
                <Link to="/" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-accent">Home</Link>
                <Link to="/about" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-accent">About</Link>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-accent">Log in</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-accent">Sign up</Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-accent">Dashboard</Link>
                <Link to="/devices" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-accent">Devices</Link>
                <Link to="/onboarding" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-accent">Onboard</Link>
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-accent">Admin</Link>
                <Link to="/settings" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-accent">Settings</Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="rounded-md px-3 py-2 text-left text-sm text-destructive hover:bg-accent">Log out</button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
