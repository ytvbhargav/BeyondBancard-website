import Image from "next/image";

/**
 * The hero's card terminal: the client's photograph of the device, held in the
 * hand, with the same entrance the drawn terminal had — it rises and turns in
 * as the headline settles.
 *
 * Nothing is laid over its screen. The underwriting example is told by the
 * glass bar below it, which is the one place on the page carrying the live
 * status; the device is here to be the object, not a second telling of it.
 *
 * Decorative: the alt is empty because the bar beside it says everything the
 * photograph says.
 */
export function HeroDevicePhoto() {
  return (
    <div className="hero-photo">
      <Image
        src="/home/terminal.webp"
        alt=""
        width={1543}
        height={846}
        priority
        sizes="(min-width: 64rem) 52rem, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}
