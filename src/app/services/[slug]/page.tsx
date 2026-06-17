import Link from "next/link";
import { getServiceBySlug } from "@/data/services";
import type { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";

// Awwwards-grade per-service metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: "Service Not Found — Phantom Logistics" };
  }
  return {
    title: `${service.title} — Phantom Logistics`,
    description: service.longDescription.slice(0, 155) + "…",
    openGraph: {
      title: `${service.title} | Phantom Logistics`,
      description: service.longDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-coal text-paper px-6">
        <div className="text-center">
          <p className="kicker text-red mb-3">SERVICE NOT FOUND</p>
          <h1 className="display text-6xl mb-6">That lane doesn’t exist yet.</h1>
          <Link href="/services" className="btn btn-red px-10 py-4 inline-block">
            BACK TO ALL SERVICES
          </Link>
        </div>
      </div>
    );
  }

  // Hand off to the heavily animated client component (GSAP heaven)
  return <ServiceDetailClient service={service} />;
}
