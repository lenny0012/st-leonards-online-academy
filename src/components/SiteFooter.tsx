import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import crest from "@/assets/crest.png";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-[color:var(--navy)] text-[color:var(--navy-foreground)]">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img src={crest} alt="" width={44} height={44} className="h-11 w-11" />
            <div>
              <div className="font-display text-lg font-semibold">{SITE.name}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--gold)]">
                {SITE.tagline}
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm text-white/70">
            {SITE.description}
          </p>
          <div className="mt-6 space-y-2 text-sm text-white/80">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-[color:var(--gold)]" /> {SITE.email}</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[color:var(--gold)]" /> {SITE.phone}</div>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider text-[color:var(--gold)]">Learn</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link to="/courses" className="hover:text-white">All Courses</Link></li>
            <li><Link to="/online-tuition" className="hover:text-white">Online Tuition</Link></li>
            <li><Link to="/live-classes" className="hover:text-white">Live Classes</Link></li>
            <li><Link to="/admissions" className="hover:text-white">Admissions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider text-[color:var(--gold)]">College</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog & News</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider text-[color:var(--gold)]">Legal</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"><Linkedin className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div>© {year} {SITE.name}. All rights reserved.</div>
          <div>Built for learners everywhere.</div>
        </div>
      </div>
    </footer>
  );
}
