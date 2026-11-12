import { siteData } from "@/data/siteData";
import WhatsAppIcon from "@/components/WhatsAppIcon";

// Floating chat button, always within reach on phones, with a soft pulse.
export default function WhatsAppButton() {
  return (
    <a
      href={siteData.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with G2 Pharmacy on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-leaf-500 text-navy-950 shadow-[0_12px_30px_-8px_rgba(6,15,46,0.5)] transition-transform duration-300 ease-settle hover:scale-110"
    >
      <span className="ping-ring absolute inset-0 rounded-full bg-leaf-500" aria-hidden="true" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  );
}
