// All the business details shown on the website live here.
// Images are names of files in /public/img, e.g. "branch1" -> branch1-640.webp / branch1-1000.webp.

const establishedYear = 2008;

export const siteData = {
  name: "G2 Pharmacy",
  establishedYear,
  yearsOfService: new Date().getFullYear() - establishedYear,
  email: "g2pharmacy@yahoo.com",
  phone: "077 8641667",
  phoneLink: "+231778641667",
  whatsappLink: "https://wa.me/231778641667",
  location: "Monrovia, Liberia",
  headOffice: "Elwa Junction, Monrovia, Liberia",
  facebookUrl: "https://www.facebook.com/profile.php?id=61577927575802",

  heroImageAlt: "Inside a G2 Pharmacy store, with fully stocked shelves of medicines",
  aboutImageAlt: "Pharmacist selecting medication from a pharmacy shelf",

  services: [
    {
      icon: "Pill",
      title: "Retail Pharmacy",
      description:
        "Walk-in customers can purchase pharmaceutical drugs and medical supplies directly from any of our retail branches across Monrovia.",
      image: "retail",
    },
    {
      icon: "Package",
      title: "Wholesale Distribution",
      description:
        "We supply pharmaceutical drugs and medical supplies in bulk to clinics, pharmacies, and medical facilities throughout Liberia.",
      image: "warehouse",
    },
    {
      icon: "Stethoscope",
      title: "Hospital Supplies",
      description:
        "Comprehensive hospital supply services — from medical consumables to equipment — ensuring healthcare facilities stay fully stocked.",
      image: "supply",
    },
  ],

  branches: [
    {
      name: "Head Office",
      location: "Elwa Junction, Monrovia, Liberia",
      type: "Retail",
      image: "headoffice",
      isHeadOffice: true,
    },
    {
      name: "Branch One",
      location: "SD Cooper Road, Monrovia, Liberia",
      type: "Retail",
      image: "branch1",
    },
    {
      name: "Branch Two",
      location: "Elwa Junction, Monrovia, Liberia",
      type: "Wholesale",
      image: "branch2",
    },
    {
      name: "Branch Three",
      location: "Beside JFK Hospital, Sinkor, Monrovia, Liberia",
      type: "Retail",
      image: "branch3",
    },
    {
      name: "Branch Four",
      location: "Red Light, Parker Paint Junction, Monrovia, Liberia",
      type: "Wholesale & Retail",
      image: "branch4",
    },
  ],

  ceo: {
    name: "Jitendra K Harchandani",
    title: "Founder & CEO",
    image: "ceo",
    bio: "Jitendra K Harchandani founded G2 Pharmacy in 2008 with a vision to make quality pharmaceutical drugs and medical supplies accessible to every community in Liberia. Under his leadership, G2 Pharmacy has grown from a single location to five branches across Monrovia, serving both retail customers and wholesale partners. His commitment to reliability, affordability, and community impact continues to drive the company forward.",
  },

  productImages: ["product1", "product2", "product3", "product4", "product5", "product6"],

  donations: [
    {
      title: "Community Health Outreach",
      description:
        "G2 Pharmacy has donated essential medicines and medical supplies to local clinics and community health programs across Monrovia.",
      image: "donation1",
    },
    {
      title: "Medical Supply Donations",
      description:
        "We regularly contribute medical supplies to hospitals and healthcare centers, supporting those who cannot afford essential care.",
      image: "donation2",
    },
    {
      title: "Volunteer & Aid Programs",
      description:
        "Our team actively participates in volunteer initiatives, distributing food and medicine to communities in need throughout Liberia.",
      image: "donation3",
    },
  ],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Branches", href: "#branches" },
  { label: "Leadership", href: "#ceo" },
  { label: "Products", href: "#products" },
  { label: "Giving back", href: "#donations" },
  { label: "Contact", href: "#contact" },
];

export const mapsLink = (place: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`G2 Pharmacy ${place}`)}`;
