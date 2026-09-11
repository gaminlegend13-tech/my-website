import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { siteData } from "@/data/siteData";
import { supabase } from "@/lib/supabase";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const { error: insertError } = await supabase
      .from("contact_messages")
      .insert({ name: form.name, email: form.email, message: form.message });

    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong. Please try again or call us directly.");
      return;
    }

    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
            Get In Touch
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Have a question about our products or services? We'd love to hear
            from you.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* Contact info */}
          <div className="reveal space-y-6">
            <h3 className="font-display text-2xl font-bold text-slate-900">
              Reach Out to Us
            </h3>
            <p className="text-base leading-relaxed text-slate-600">
              Whether you're a retail customer, a wholesale partner, or a
              hospital looking for supplies, our team is ready to help. Reach
              out through any of the channels below.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${siteData.email}`}
                className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Email</p>
                  <p className="text-base font-semibold text-slate-900">{siteData.email}</p>
                </div>
              </a>

              <a
                href={siteData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-medium text-slate-400">
                    Phone
                    <WhatsAppIcon className="h-4 w-4 text-green-600" />
                  </p>
                  <p className="text-base font-semibold text-slate-900">{siteData.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Head Office</p>
                  <p className="text-base font-semibold text-slate-900">
                    Elwa Junction, Monrovia, Liberia
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="reveal reveal-delay-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200/60"
            >
              <h3 className="font-display text-2xl font-bold text-slate-900">
                Send Us a Message
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Fill out the form and we'll get back to you as soon as possible.
              </p>

              {submitted && (
                <div className="mt-6 flex items-center gap-3 rounded-xl bg-success-50 px-4 py-3 text-sm font-medium text-success-700">
                  <CheckCircle2 className="h-5 w-5" />
                  Thank you! Your message has been sent.
                </div>
              )}

              {error && (
                <div className="mt-6 flex items-center gap-3 rounded-xl bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
                  <AlertCircle className="h-5 w-5" />
                  {error}
                </div>
              )}

              <div className="mt-6 space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-primary-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send Message"}
                  <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
