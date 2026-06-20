export const SITE = {
  name: "St Leonards College",
  shortName: "St Leonards",
  tagline: "Learn Without Limits",
  description:
    "St Leonards College delivers world-class online education, tuition, professional training and certification programs for students worldwide.",
  email: "leonardnzivu21@gmail.com",
  phone: "+254 740184075",
  whatsapp: "254769103592",
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
