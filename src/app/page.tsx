import { redirect } from "next/navigation";

export const metadata = {
  title: "AFSECMO Group | Industrial Services & Logistics",
  description:
    "AFSECMO Group delivers engineering, strategy, and delivery services for industrial clients — precision, safety, and operational excellence across mining, energy, construction and logistics.",
};

export default function Home() {
  redirect("/en");
}