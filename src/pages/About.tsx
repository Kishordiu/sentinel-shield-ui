import { Shield, Lock, Eye, Fingerprint, Network, RefreshCw } from "lucide-react";

const principles = [
  { icon: Shield, title: "Zero-Trust by Default", desc: "Every device session requires cryptographic verification. No device is trusted implicitly, even within the internal network perimeter." },
  { icon: Lock, title: "End-to-End Encryption", desc: "All device communication uses TLS 1.3 with certificate pinning. Data at rest is encrypted with AES-256-GCM." },
  { icon: Eye, title: "Continuous Monitoring", desc: "Behavioral analysis detects anomalies in real-time. Compromised devices are automatically isolated." },
  { icon: Fingerprint, title: "Hardware-Backed Auth", desc: "Admin actions require physical hardware verification (fingerprint or NFC), preventing remote privilege escalation." },
  { icon: Network, title: "Micro-Segmentation", desc: "Each device operates within its own network segment. Lateral movement between devices is blocked by default." },
  { icon: RefreshCw, title: "Self-Healing Response", desc: "Autonomous remediation rolls back firmware, revokes certificates, and restores devices to known-good states." },
];

const About = () => (
  <div className="py-16 md:py-24">
    <div className="container mx-auto max-w-4xl">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground">
          <Shield className="h-3.5 w-3.5" />
          Security Architecture
        </div>
        <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">How We Protect Your Devices</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Our autonomous zero-trust architecture combines hardware verification, AI-powered threat detection, and self-healing response systems.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((p) => (
          <div key={p.title} className="rounded-xl border bg-card p-5 shadow-card">
            <div className="mb-3 inline-flex rounded-lg bg-accent p-2">
              <p.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">{p.title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl border bg-card p-8 shadow-card">
        <h2 className="mb-4 text-xl font-bold text-foreground">Compliance & Certifications</h2>
        <p className="text-sm text-muted-foreground">
          The system is designed to meet NIST IoT Cybersecurity Framework guidelines, IEC 62443 industrial security standards, and GDPR data protection requirements. Hardware verification modules are FIPS 140-2 Level 2 compliant.
        </p>
      </div>
    </div>
  </div>
);

export default About;
