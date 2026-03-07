import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Cpu, Lock, Zap, ChevronRight } from "lucide-react";

const features = [
  { icon: Shield, title: "Zero-Trust Architecture", desc: "Every device must continuously verify its identity. No implicit trust." },
  { icon: Cpu, title: "Autonomous Defense", desc: "AI-powered threat detection isolates compromised devices in milliseconds." },
  { icon: Lock, title: "Hardware Verification", desc: "Fingerprint and NFC-based admin actions prevent unauthorized access." },
  { icon: Zap, title: "Real-time Monitoring", desc: "Live dashboards with status tracking across your entire IoT fleet." },
];

const Landing = () => (
  <div className="flex flex-col">
    {/* Hero */}
    <section className="relative overflow-hidden bg-primary px-4 py-20 text-primary-foreground md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(213,100%,50%,0.3),transparent_60%)]" />
      <div className="container relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium">
          <Shield className="h-3.5 w-3.5" />
          Autonomous IoT Security
        </div>
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Self-Defending IoT<br />Infrastructure
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
          Protect every connected device with zero-trust verification, autonomous threat response, and hardware-backed authentication.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link to="/signup">Get Started <ChevronRight className="ml-1 h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-2xl font-bold text-foreground sm:text-3xl">
          Built for Critical Infrastructure
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover">
              <div className="mb-4 inline-flex rounded-lg bg-accent p-2.5">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="border-t bg-secondary py-16">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Ready to secure your IoT fleet?</h2>
        <p className="mb-8 text-muted-foreground">Start with a free account and onboard your first device in minutes.</p>
        <Button size="lg" asChild>
          <Link to="/signup">Create Account <ChevronRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  </div>
);

export default Landing;
