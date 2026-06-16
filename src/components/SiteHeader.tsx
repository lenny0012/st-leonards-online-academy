import { Link } from "@tanstack/react-router";
import { Menu, X, Moon, Sun, LogOut, LayoutDashboard, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import crest from "@/assets/crest.png";
import { NAV, SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem("slc-theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefers;
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("slc-theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={crest} alt="" width={36} height={36} className="h-9 w-9 shrink-0" />
          <div className="leading-tight min-w-0">
            <div className="font-display text-base font-semibold tracking-tight truncate">
              {SITE.shortName} <span className="text-accent">College</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {SITE.tagline}
            </div>
          </div>
        </Link>

        <nav className="ml-auto hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-md border border-border text-foreground/80 hover:bg-secondary"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden sm:grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-accent text-sm font-semibold border border-accent/30">
                  {(user.user_metadata?.full_name ?? user.email ?? "U").toString().charAt(0).toUpperCase()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile"><UserIcon className="mr-2 h-4 w-4" />Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/auth">Sign in</Link>
            </Button>
          )}
          <Button asChild variant="gold" size="sm" className="hidden sm:inline-flex">
            <Link to="/admissions">Apply Now</Link>
          </Button>
          <button
            type="button"
            aria-label="Menu"
            className="lg:hidden grid h-9 w-9 place-items-center rounded-md border border-border"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-x grid gap-1 py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-secondary"
                activeProps={{ className: "text-accent bg-secondary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-secondary">Dashboard</Link>
                <Link to="/profile" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-secondary">Profile</Link>
                <button onClick={() => { signOut(); setOpen(false); }} className="rounded-md px-3 py-2.5 text-left text-sm font-medium hover:bg-secondary">Sign out</button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-secondary">Sign in</Link>
            )}
            <Button asChild variant="gold" className="mt-2">
              <Link to="/admissions" onClick={() => setOpen(false)}>Apply Now</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
