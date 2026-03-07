import { Shield } from "lucide-react";

export const Footer = () => (
  <footer className="border-t bg-card py-8" role="contentinfo">
    <div className="container flex flex-col items-center gap-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between md:text-left">
      <div className="flex items-center gap-2">
        <Shield className="h-4 w-4 text-primary" />
        <span>© {new Date().getFullYear()} ZeroTrust IoT. All rights reserved.</span>
      </div>
      <div className="flex gap-4">
        <a href="/about" className="hover:text-foreground transition-colors">Security</a>
        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
      </div>
    </div>
  </footer>
);
