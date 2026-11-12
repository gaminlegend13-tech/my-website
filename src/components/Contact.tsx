import { useState } from "react";
import { Mail, MapPin, Send, AlertCircle, ArrowUpRight, Facebook, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Rise from "@/components/Rise";
import { siteData } from "@/data/siteData";

const channels = [
  { icon: WhatsAppIcon, label: "WhatsApp", value: siteData.phone, href: siteData.whatsappLink, external: true },
  { icon: Phone, label: "Call us", value: siteData.phone, href: `tel:${siteData.phoneLink}` },
  { icon: Mail, label: "Email", value: siteData.email, href: `mailto:${siteData.email}` },
  { icon: Facebook, label: "Facebook", value: "Follow G2 Pharmacy", href: siteData.facebookUrl, external: true },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Load the database client only when someone actually sends a message.
      const { supabase } = await import("@/lib/supabase");
      const { error: insertError } = await supabase
        .from("contact_messages")
        .insert({ name: form.name, email: form.email, message: form.message });
      if (insertError) throw insertError;

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-navy-900 py-24 text-white lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Rise text="Let's talk." className="sign text-[19vw] text-white sm:text-[13vw] lg:text-[8.6vw] xl:text-[8.2rem]" />

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          {/* Ways to reach us */}
          <div className="lg:col-span-5">
            <p className="reveal max-w-md text-lg leading-relaxed text-navy-200">
              Retail customer, wholesale partner or hospital — our team is ready
              to help. WhatsApp is the fastest way to reach us.
            </p>

            <ul className="mt-8 space-y-1.5">
              {channels.map(({ icon: Icon, label, value, href, external }, i) => (
                <li key={label} className={`reveal reveal-delay-${Math.min(i, 3)}`}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group relative isolate flex items-center gap-4 overflow-hidden rounded-full p-2 pr-5 ring-1 ring-white/10"
                  >
                    {/* Green fill that sweeps across the row on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 origin-left scale-x-0 rounded-full bg-leaf-400 transition-transform duration-500 ease-swift group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-leaf-400 transition-colors duration-300 group-hover:bg-navy-950">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-navy-300 transition-colors duration-300 group-hover:text-navy-950/70">{label}</span>
                      <span className="block truncate font-semibold text-white transition-colors duration-300 group-hover:text-navy-950">{value}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 -translate-x-2 text-navy-950 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
              <li className="reveal reveal-delay-3 flex items-center gap-4 rounded-full p-2 pr-5">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-leaf-400">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-navy-300">Head office</span>
                  <span className="font-semibold text-white">{siteData.headOffice}</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="reveal reveal-delay-1 lg:col-span-7">
            <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 text-navy-950 sm:rounded-[2.75rem] sm:p-10">
              <h3 className="text-2xl font-bold sm:text-3xl">Send us a message</h3>
              <p className="mt-2 text-navy-950/60">We'll get back to you as soon as possible.</p>

              {submitted && (
                <div role="status" className="mt-6 flex items-center gap-3 rounded-2xl bg-leaf-100 px-4 py-3 text-sm font-semibold text-leaf-900">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" opacity="0.3" />
                    <path d="M7.5 12.5l3 3 6-6.5" className="draw-check" />
                  </svg>
                  Message sent. Thank you — we'll reply soon.
                </div>
              )}

              {error && (
                <div role="alert" className="mt-6 flex items-center gap-3 rounded-2xl bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="mb-1.5 block text-sm font-semibold">Your name</label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="field"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-1.5 block text-sm font-semibold">Your email</label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="field"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-message" className="mb-1.5 block text-sm font-semibold">Message</label>
                  <textarea
                    id="c-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="field resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
              </div>

              <button type="submit" disabled={submitting} className="btn-navy group mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                {submitting ? "Sending..." : "Send message"}
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
