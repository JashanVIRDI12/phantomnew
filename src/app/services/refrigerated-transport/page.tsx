import type { Metadata } from "next";
import Link from "next/link";
import { getServiceBySlug } from "@/data/services";
import RefrigeratedClient from "./RefrigeratedClient";

const SLUG = "refrigerated-transport";

export const metadata: Metadata = {
  title: "Refrigerated Transport — The Cold Chain, Unbroken | Phantom Logistics",
  description:
    "Carrier-owned reefers from −40°F to 70°F with 24/7 live thermal monitoring. Live seafood, fresh produce, dairy, pharma and frozen — temperature integrity on every lane.",
  openGraph: {
    title: "Refrigerated Transport | Phantom Logistics",
    description:
      "−40°F to 70°F multi-temp reefers, redundant cooling, and a 24/7 thermal watch. The cold chain, unbroken.",
  },
};

export default function RefrigeratedTransportPage() {
  const service = getServiceBySlug(SLUG);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-coal text-paper px-6">
        <div className="text-center">
          <p className="text-red mb-3 font-mono tracking-[0.24em] text-xs">SERVICE NOT FOUND</p>
          <h1 className="display text-6xl mb-6">That lane doesn’t exist yet.</h1>
          <Link href="/services" className="btn btn-red px-10 py-4 inline-block">
            BACK TO ALL SERVICES
          </Link>
        </div>
      </div>
    );
  }

  return <RefrigeratedClient service={service} />;
}
