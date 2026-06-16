export const SITE = {
  name: "St Leonards College",
  shortName: "St Leonards",
  tagline: "Learn Without Limits",
  description:
    "St Leonards College delivers world-class online education, tuition, professional training and certification programs for students worldwide.",
  email: "info@stleonardscollege.ac",
  phone: "+254 700 000 000",
  whatsapp: "254700000000",
  address: "Online · Serving students worldwide",
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/online-tuition", label: "Online Tuition" },
  { to: "/live-classes", label: "Live Classes" },
  { to: "/admissions", label: "Admissions" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;
