import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { locale: string; sector: string };
};

const validSectors = ["mining", "oil-gas", "construction", "logistics"];

export default function SectorPage({ params }: Props) {
  const { sector, locale } = params;

  if (!validSectors.includes(sector)) {
    return notFound();
  }

  // Minimal template — expand with real content later
  return (
    <div className="min-h-screen bg-white px-6 py-20 font-sans">
      <div className="mx-auto max-w-4xl">
        <Link href={`/${locale}/sectors`} className="text-sm text-gray-600 hover:text-orange-600">
          ← Back to sectors
        </Link>

        <h1 className="mt-6 text-4xl font-light text-gray-900">{sector.replace(/-/g, " ")}</h1>
        <p className="mt-4 text-lg text-gray-700">
          Overview content for the {sector} sector. Replace this with real CMS or i18n-driven content.
        </p>
      </div>
    </div>
  );
}
