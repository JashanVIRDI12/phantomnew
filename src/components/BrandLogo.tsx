import Image from "next/image";
import Link from "next/link";

export const LOGO_SRC = "/phantom-logo.png";

type BrandLogoProps = {
  href?: string;
  /** Display height in px — width scales from the logo aspect ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
};

/** Official Phantom Logistics lockup (mark + wordmark). */
export default function BrandLogo({
  href = "/",
  height = 48,
  className = "",
  priority = false,
}: BrandLogoProps) {
  const width = Math.round(height * (4507 / 3077));

  const img = (
    <Image
      src={LOGO_SRC}
      alt="Phantom Logistics"
      width={width}
      height={height}
      priority={priority}
      className="h-full w-auto object-contain"
      style={{ height, width: "auto" }}
    />
  );

  if (!href) {
    return <span className={`inline-flex items-center ${className}`.trim()}>{img}</span>;
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center ${className}`.trim()}
      aria-label="Phantom Logistics — home"
    >
      {img}
    </Link>
  );
}
