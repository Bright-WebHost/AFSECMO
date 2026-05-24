import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  width?: number;
  height?: number;
};

export default function BrandLogo({
  className = "h-full w-auto object-contain",
  width = 240,
  height = 60,
}: BrandLogoProps) {
  return (
    <Image
      src="/afsecmo-logo.svg"
      alt="AFSECMO"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}