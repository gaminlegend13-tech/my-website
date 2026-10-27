import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Facebook, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Plus from "@/components/Plus";
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
    <section id="contact" className="bg-navy-900 py-24 text-white lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Info */}
        <div className="reveal lg:col-span-5">
          <p className="eyebrow text-navy-200">
            <Plus className="h-3.5 w-3.5 text-leaf-400" />
            07 <span className="text-navy-400">/</span> Contact
          </p>
          <h2 className="mt-4 text-5xl font-bold leading-[1.02] text-white sm:text-6xl">
            Let's talk.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-navy-200">
            Retail customer, wholesale partner or hospital — our team is ready
            to help. WhatsApp is the fastest way to reach us.
          </p>

          <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {channels.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 py-4"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-leaf-400 transition-colors group-hover:bg-leaf-500 group-hover:text-navy-950">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-navy-300">{label}</span>
                    <span className="font-semibold text-white">{value}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 py-4">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-leaf-400">
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
          <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 text-navy-950 sm:p-10">
            <h3 className="text-2xl font-bold sm:text-3xl">Send us a message</h3>
            <p className="mt-2 text-navy-950/55">We'll get back to you as soon as possible.</p>

            {submitted && (
              <div role="status" className="mt-6 flex items-center gap-3 rounded-xl bg-success-50 px-4 py-3 text-sm font-medium text-success-700">
                <CheckCircle2 className="h-5 w-5" />
                Thank you! Your message has been sent.
              </div>
            )}

            {error && (
              <div role="alert" className="mt-6 flex items-center gap-3 rounded-xl bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
                <AlertCircle className="h-5 w-5" />
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
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
