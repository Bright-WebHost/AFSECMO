import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import SectorsGrid from "@/components/home/SectorsGrid";
import ContactSection from "@/components/home/contactsection";
// NEW: Import the global scroll tracker
import GlobalScrollTracker from "@/components/ui/GlobalScrollTracker";

export const metadata = {
  title: "AFSECMO Group | Industrial Services & Logistics",
  description:
    "AFSECMO Group delivers engineering, strategy, and delivery services for industrial clients — precision, safety, and operational excellence across mining, energy, construction and logistics.",
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0F1B2E]">
      
      {/* NEW: The global scroll animation tracker. 
        It sits fixed on the right edge of the screen tying the whole page together.
      */}
      <GlobalScrollTracker />

      {/* Your sections, which all contain their own internal scroll animations */}
      <Hero
        headline={
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            AFSECMO Group
          </h1>
        }
      />
      <SectorsGrid />
      <ServicesGrid />
      <ContactSection/>
      
    </main>
  );
}