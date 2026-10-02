"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "Kittens", href: "#kittens" },
  { label: "Our Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const ctaClass =
  "items-center justify-center rounded-full bg-ink px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="absolute inset-x-4 top-4 z-20 md:inset-x-8 md:top-8 xl:left-[165px] xl:right-[165px] xl:top-12">
      <nav
        aria-label="Main"
        className="flex h-[60px] items-center justify-between rounded-full bg-white pl-6 pr-2 shadow-[0_4px_24px_rgba(17,17,17,0.08)] backdrop-blur-md supports-[backdrop-filter]:bg-white/85 md:h-[68px] md:pl-8 md:pr-2.5"
      >
        <Link
          href="/"
          className="font-display text-[22px] font-bold tracking-tight text-ink"
        >
          KittyShop
        </Link>

        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[17px] text-ink transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#reserve" className={`${ctaClass} hidden md:inline-flex`}>
          Reserve a Kitten
        </a>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden
          >
            {open ? (
              <path d="M5 5l12 12M17 5L5 17" />
            ) : (
              <path d="M3 7h16M3 15h16" />
            )}
          </svg>
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="mt-2 rounded-3xl bg-white p-3 shadow-[0_4px_24px_rgba(17,17,17,0.08)] md:hidden"
      >
        <ul>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-[17px] text-ink hover:bg-black/5"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#reserve"
          onClick={() => setOpen(false)}
          className={`${ctaClass} mt-2 flex w-full`}
        >
          Reserve a Kitten
        </a>
      </div>
    </header>
  );
}
