"use client";

import Image from "next/image";
import { useEffect, useRef, type RefObject } from "react";
import { useMediaQuery } from "../_hooks/useMediaQuery";
import { usePointerFraction } from "../_hooks/usePointerFraction";

const POSTER_SRC = "/hero-poster.jpg";
const VIDEO_SRC = "/hero-scrub.mp4";

// The clip is 124 frames over ~5.17s (24fps). Skip seeks within two frames of
// the current time; fast movement otherwise queues more seeks than the decoder
// can drain.
const MIN_SEEK_DELTA = 1 / 12;

function seekToFraction(video: HTMLVideoElement, fraction: number) {
  if (video.seeking || !Number.isFinite(video.duration)) return;
  const target = fraction * video.duration;
  if (Math.abs(target - video.currentTime) < MIN_SEEK_DELTA) return;
  video.currentTime = target;
}

type Props = {
  /** The element whose width the cursor is measured against. */
  trackRef: RefObject<HTMLElement | null>;
};

export function HeroScrubber({ trackRef }: Props) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const noHover = useMediaQuery("(hover: none)");
  const canScrub = !reducedMotion && !noHover;

  const videoRef = useRef<HTMLVideoElement>(null);
  const fraction = usePointerFraction(trackRef, canScrub);
  const latestFraction = useRef<number | null>(null);

  useEffect(() => {
    latestFraction.current = fraction;
    const video = videoRef.current;
    if (video && fraction !== null) seekToFraction(video, fraction);
  }, [fraction]);

  // A pointermove skipped while a seek was in flight would otherwise leave the
  // frame stale once the cursor stops. Re-apply the latest position when the
  // seek settles, and once metadata (duration) is known.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const catchUp = () => {
      if (latestFraction.current !== null) {
        seekToFraction(video, latestFraction.current);
      }
    };
    video.addEventListener("seeked", catchUp);
    video.addEventListener("loadedmetadata", catchUp);
    return () => {
      video.removeEventListener("seeked", catchUp);
      video.removeEventListener("loadedmetadata", catchUp);
    };
  }, [canScrub]);

  return (
    <div className="absolute inset-0">
      <Image
        src={POSTER_SRC}
        alt="An orange tabby kitten sitting on a sunlit windowsill"
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      {canScrub && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          tabIndex={-1}
          aria-hidden
        />
      )}
    </div>
  );
}
