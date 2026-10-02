"use client";

import { useRef } from "react";
import { HeroScrubber } from "./HeroScrubber";
import { SiteNav } from "./SiteNav";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative h-svh min-h-[560px] w-full overflow-hidden bg-ink"
    >
      <HeroScrubber trackRef={sectionRef} />

      {/* Broad atmospheric scrim: static, bottom-up. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/45 to-ink/0 to-60%"
      />

      <SiteNav />

      <div className="hero-type absolute bottom-[clamp(96px,13vh,140px)] left-6 right-6 z-10 sm:left-[50px] sm:right-auto">
        <div aria-hidden className="text-scrim" />
        <div className="relative">
          <h1 className="hero-headline font-display font-bold tracking-[-0.01em] text-paper">
            <span className="block">A companion</span>
            <span className="block">worth waiting for</span>
          </h1>
          <p className="hero-subhead mt-1 text-paper">
            Reserve your kitten from our litter.
          </p>
          <a
            href="#kittens"
            className="mt-8 inline-flex items-center rounded-full bg-paper px-7 py-4 text-lg font-medium text-ink transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper md:text-xl"
          >
            See available kittens
          </a>
        </div>
      </div>

      <a
        href="#kittens"
        aria-label="Scroll to available kittens"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-paper/80 transition-colors hover:text-paper"
      >
        <span className="flex h-9 w-[22px] justify-center rounded-full border-[1.5px] border-current pt-1.5">
          <span className="h-2 w-[3px] rounded-full bg-current motion-safe:animate-bounce" />
        </span>
      </a>
    </section>
  );
}
