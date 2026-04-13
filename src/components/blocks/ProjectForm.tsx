"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  besoin: z.string().min(1, "Requis"),
  budget: z.string().min(1, "Requis"),
});

type FormValues = z.infer<typeof schema>;

export interface SelectOption {
  value: string;
  label: string;
}

interface ProjectFormProps {
  besoinOptions?: SelectOption[];
  budgetOptions?: SelectOption[];
  ctaLabel?: string;
  reassuranceText?: React.ReactNode;
  onSubmit?: (values: FormValues) => void;
}

const DEFAULT_BESOIN_OPTIONS: SelectOption[] = [
  { value: "agent-ia", label: "Conception d'agent IA" },
  { value: "audit-code", label: "Audit de code" },
  { value: "migration-cloud", label: "Migration Cloud" },
  { value: "infra-scalable", label: "Infrastructure Scalable" },
];

const DEFAULT_BUDGET_OPTIONS: SelectOption[] = [
  { value: "5k-10k", label: "5 000 € - 10 000 €" },
  { value: "10k-50k", label: "10 000 € - 50 000 €" },
  { value: "50k-150k", label: "50 000 € - 150 000 €" },
  { value: "150k+", label: "150 000 € +" },
];

export function ProjectForm({
  besoinOptions = DEFAULT_BESOIN_OPTIONS,
  budgetOptions = DEFAULT_BUDGET_OPTIONS,
  ctaLabel = "Partager mon projet !",
  reassuranceText = (
    <>
      Réponse garantie sous{" "}
      <span className="text-brand-orange-light">24 heures</span>. Confidentialité assurée.
    </>
  ),
  onSubmit,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <div
      className="relative flex flex-col gap-[30px] items-center justify-end py-[50px] px-[51px] rounded-[var(--radius-card)] border border-white/5 backdrop-blur-[20px] w-[896px]"
      style={{
        background:
          "linear-gradient(90deg, rgba(38,41,58,0.4) 0%, rgba(38,41,58,0.4) 100%)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Grille 2 colonnes — dropdowns */}
      <form
        onSubmit={handleSubmit((values) => onSubmit?.(values))}
        className="flex flex-col gap-[30px] items-center w-full"
        noValidate
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 w-full">
          <SelectField
            id="besoin"
            label="Votre Besoin"
            placeholder="Choisir un agent IA..."
            options={besoinOptions}
            error={errors.besoin?.message}
            {...register("besoin")}
          />
          <SelectField
            id="budget"
            label="Votre Budget"
            placeholder="Sélectionner un budget"
            options={budgetOptions}
            error={errors.budget?.message}
            {...register("budget")}
          />
        </div>

        {/* Bouton CTA */}
        <div className="flex flex-col gap-6 items-center w-full">
          <button
            type="submit"
            className="w-full h-[40px] rounded-[var(--radius-input)] bg-gradient-to-r from-brand-orange-light to-brand-orange font-sans text-[color:var(--color-cta-text-dark)] text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] transition-opacity hover:opacity-90"
          >
            {ctaLabel}
          </button>

          {/* Texte de réassurance */}
          <p className="font-sans text-text-body-warm text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] text-center whitespace-nowrap">
            {reassuranceText}
          </p>
        </div>
      </form>
    </div>
  );
}

/* ─── SelectField ──────────────────────────────────────────────────────────── */

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
  error?: string;
}

function SelectField({
  id,
  label,
  placeholder,
  options,
  error,
  ...props
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={id}
        className="px-1 font-sans font-semibold text-badge-blue uppercase tracking-widest"
        style={{
          fontSize: "var(--text-label)",
          lineHeight: "var(--text-label--line-height)",
        }}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className="w-full appearance-none bg-card-bg border border-white/15 rounded-[var(--radius-input)] px-[25px] py-[17px] font-sans text-text-heading text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] cursor-pointer focus:outline-none focus:border-brand-orange/50 hover:border-white/30 transition-colors"
          defaultValue=""
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Chevron custom */}
        <ChevronIcon />
      </div>
      {error && (
        <p className="px-1 text-brand-orange text-xs font-body">{error}</p>
      )}
    </div>
  );
}

function ChevronIcon() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[25px] top-1/2 -translate-y-1/2"
    >
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L6 6.5L11 1"
          stroke="#DFE1F8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
