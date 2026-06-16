import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export function WhatsAppButton() {
  const href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hello St Leonards College, I'd like to learn more about your courses.",
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-elegant)] transition hover:scale-[1.03]"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
