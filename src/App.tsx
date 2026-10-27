import { lazy, Suspense, useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Branches from "@/components/Branches";
import CEO from "@/components/CEO";
import Products from "@/components/Products";
import Donations from "@/components/Donations";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// The staff pages (and the database/router code they need) are loaded only
// when someone opens #/login or #/admin, so regular visitors never download them.
const AdminApp = lazy(() => import("./AdminApp"));

const isAdminHash = () => /^#\/(login|admin)/.test(window.location.hash);

function PublicSite() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Branches />
        <CEO />
        <Products />
        <Donations />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  const [admin, setAdmin] = useState(isAdminHash);

  useEffect(() => {
    const onHashChange = () => setAdmin(isAdminHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (admin) {
    return (
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-navy-950">
            <p className="text-navy-200">Loading...</p>
          </div>
        }
      >
        <AdminApp />
      </Suspense>
    );
  }

  return <PublicSite />;
}
