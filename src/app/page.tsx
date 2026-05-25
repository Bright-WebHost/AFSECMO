import { redirect } from "next/navigation";

export const metadata = {
  title: "AFSECMO Group | Industrial Services, Procurement & Logistics in West Africa",
  description:
    "AFSECMO supports mining, oil & gas, construction and industrial operations with procurement, logistics, equipment mobilisation, maintenance and field services from Abidjan.",
};

export default function Home() {
  redirect("/en");
}