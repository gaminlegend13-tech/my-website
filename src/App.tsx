import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Branches from "@/components/Branches";
import CEO from "@/components/CEO";
import Products from "@/components/Products";
import Donations from "@/components/Donations";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

function PublicSite() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Branches />
        <CEO />
        <Products />
        <Donations />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function ProtectedAdmin() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <AdminDashboard />;
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedAdmin />} />
        <Route path="/" element={<PublicSite />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
