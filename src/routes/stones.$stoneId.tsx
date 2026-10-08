import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { getStone, type Stone } from "@/data/stones";
import { useVault } from "@/lib/vault-store";
import { ImageGallery } from "@/page/stone/ImageGallery";
import { StoneDetails } from "@/page/stone/StoneDetails";
import { CertificateModal } from "@/page/stone/CertificateModal";
import { ComparableStones } from "@/page/stone/ComparableStones";
import type { QuotationFormData } from "@/components/vault/quotation-form";

export const Route = createFileRoute("/stones/$stoneId")({
  loader: ({ params }): { stone: Stone } => {
    const stone = getStone(params.stoneId);
    if (!stone) throw notFound();
    return { stone };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Stone unavailable — Rhea Ceylon" }, { name: "robots", content: "noindex" }],
      };
    }
    const { stone } = loaderData;
    const title = `${stone.name} — Natural ${stone.type} | Rhea Ceylon`;
    const description = `100% natural ${stone.color} ${stone.type.toLowerCase()} from ${stone.country} (Ceylon). Independently certified, full origin & treatment disclosure. Request a quotation from Rhea Ceylon.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: StoneDetail,
});

function StoneDetail() {
  const { stone } = Route.useLoaderData() as { stone: Stone };
  const { addToQuotation, removeFromQuotation, quotationIds, wishlist, toggleWishlist } = useVault();
  const [angle, setAngle] = useState(0);
  const [cert, setCert] = useState(false);
  const inQuotation = quotationIds.includes(stone.id);

  function handleAddToQuotation(data: QuotationFormData) {
    addToQuotation(data);
  }

  function handleRemoveFromQuotation() {
    removeFromQuotation(stone.id);
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-1.5" aria-label="Breadcrumb">
        <Link to="/browse" search={{ type: undefined }} className="rule-label transition-colors hover:text-brass">
          Browse
        </Link>
        <ChevronRight className="size-3 text-muted-foreground opacity-50" />
        <span className="rule-label text-pearl">{stone.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <ImageGallery
          images={stone.images}
          alt={stone.alt}
          angle={angle}
          onAngleChange={setAngle}
        />
        <StoneDetails
          stone={stone}
          inQuotation={inQuotation}
          onAddToQuotation={handleAddToQuotation}
          onRemoveFromQuotation={handleRemoveFromQuotation}
        />
      </div>

      <ComparableStones currentStone={stone} />

      <CertificateModal
        open={cert}
        stone={stone}
        onClose={() => setCert(false)}
      />
    </div>
  );
}

