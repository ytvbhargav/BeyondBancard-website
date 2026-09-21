import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The Beyond Bancard logo, taken from the live site (D-059). Only a black lockup
 * is published, so the white files in `public/brand` are knockouts of it: they
 * lose the blue in the mark, and the client still owes a reversed original
 * (CONFIRM). Below 380px only the mark shows, so the header still fits the
 * compact "Apply now" and the menu button.
 */
export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <Link
      href="/"
      aria-label="Beyond Bancard home"
      className={cn("group/logo inline-flex min-h-11 min-w-11 items-center rounded-sm", className)}
    >
      <Image
        src={dark ? "/brand/beyond-bancard-mark-white.png" : "/brand/beyond-bancard-mark.png"}
        alt=""
        width={175}
        height={201}
        priority
        className="h-8 w-auto min-[380px]:hidden"
      />
      <Image
        src={dark ? "/brand/beyond-bancard-logo-white.png" : "/brand/beyond-bancard-logo.webp"}
        alt=""
        width={312}
        height={42}
        priority
        className="hidden h-6 w-auto min-[380px]:block sm:h-7"
      />
    </Link>
  );
}
