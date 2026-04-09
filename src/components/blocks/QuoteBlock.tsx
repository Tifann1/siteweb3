export interface QuoteBlockProps {
  quote: string;
  attribution?: string;
}

export function QuoteBlock({
  quote,
  attribution = "Strategic Vision 2025",
}: QuoteBlockProps) {
  return (
    <div
      className="flex flex-col gap-6 items-start w-full p-[41px] rounded-[var(--radius-input)] bg-card-bg border border-white/5 backdrop-blur-[10px]"
      style={{
        boxShadow:
          "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)",
      }}
    >
      <p
        className="font-sans font-bold text-text-heading"
        style={{ fontSize: "32px", lineHeight: "32px" }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-4">
        <div className="h-px w-12 bg-brand-orange-light shrink-0" />
        {attribution && (
          <span
            className="font-body font-normal text-[#94a3b8] uppercase tracking-[1px]"
            style={{ fontSize: "13px" }}
          >
            {attribution}
          </span>
        )}
      </div>
    </div>
  );
}
