"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  prenom: z.string().min(1, "Requis"),
  email: z.string().email("Email invalide"),
  entreprise: z.string().optional(),
  besoin: z.string().min(1, "Requis"),
  budget: z.string().min(1, "Requis"),
  message: z.string().min(10, "10 caractères minimum"),
});

type FormValues = z.infer<typeof schema>;

export interface SelectOption {
  value: string;
  label: string;
}

interface ContactFormProps {
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
  { value: "conseil", label: "Conseil & Transformation" },
  { value: "autre", label: "Autre besoin" },
];

const DEFAULT_BUDGET_OPTIONS: SelectOption[] = [
  { value: "5k-10k", label: "5 000 € – 10 000 €" },
  { value: "10k-50k", label: "10 000 € – 50 000 €" },
  { value: "50k-150k", label: "50 000 € – 150 000 €" },
  { value: "150k+", label: "150 000 € +" },
];

export function ContactForm({
  besoinOptions = DEFAULT_BESOIN_OPTIONS,
  budgetOptions = DEFAULT_BUDGET_OPTIONS,
  ctaLabel = "Envoyer ma demande",
  reassuranceText = (
    <>
      Réponse garantie sous{" "}
      <span className="text-brand-orange-light">24 heures</span>. Confidentialité assurée.
    </>
  ),
  onSubmit,
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <div
      className="relative flex flex-col gap-[30px] items-center py-[50px] px-[51px] rounded-[var(--radius-card)] border border-white/5 backdrop-blur-[20px] w-full max-w-[896px]"
      style={{
        background:
          "linear-gradient(90deg, rgba(38,41,58,0.4) 0%, rgba(38,41,58,0.4) 100%)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <form
        onSubmit={handleSubmit((values) => onSubmit?.(values))}
        className="flex flex-col gap-[30px] items-center w-full"
        noValidate
      >
        {/* Ligne 1 — Prénom + Email */}
        <div className="grid grid-cols-2 gap-x-8 w-full">
          <InputField
            id="prenom"
            label="Prénom"
            placeholder="Jean"
            type="text"
            error={errors.prenom?.message}
            {...register("prenom")}
          />
          <InputField
            id="email"
            label="Email professionnel"
            placeholder="jean@entreprise.com"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        {/* Ligne 2 — Entreprise + Besoin */}
        <div className="grid grid-cols-2 gap-x-8 w-full">
          <InputField
            id="entreprise"
            label="Entreprise"
            placeholder="Nom de votre société"
            type="text"
            error={errors.entreprise?.message}
            {...register("entreprise")}
          />
          <SelectField
            id="besoin"
            label="Votre Besoin"
            placeholder="Choisir un type de projet..."
            options={besoinOptions}
            error={errors.besoin?.message}
            {...register("besoin")}
          />
        </div>

        {/* Ligne 3 — Budget seul (demi-largeur aligné à droite) */}
        <div className="grid grid-cols-2 gap-x-8 w-full">
          <SelectField
            id="budget"
            label="Budget estimé"
            placeholder="Sélectionner un budget"
            options={budgetOptions}
            error={errors.budget?.message}
            {...register("budget")}
          />
          {/* Colonne vide pour conserver l'alignement */}
          <div />
        </div>

        {/* Message */}
        <TextareaField
          id="message"
          label="Votre message"
          placeholder="Décrivez votre projet, vos contraintes, vos délais..."
          error={errors.message?.message}
          {...register("message")}
        />

        {/* Bouton CTA + réassurance */}
        <div className="flex flex-col gap-6 items-center w-full">
          <button
            type="submit"
            className="w-full h-[48px] rounded-[var(--radius-input)] bg-gradient-to-r from-brand-orange-light to-brand-orange font-sans text-[color:var(--color-cta-text-dark)] text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] font-semibold transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
          >
            {ctaLabel}
          </button>

          <p className="font-sans text-text-body-warm text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] text-center whitespace-nowrap">
            {reassuranceText}
          </p>
        </div>
      </form>
    </div>
  );
}

/* ─── InputField ─────────────────────────────────────────────────────────── */

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
}

function InputField({ id, label, placeholder, error, ...props }: InputFieldProps) {
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
      <input
        id={id}
        placeholder={placeholder}
        className="w-full bg-card-bg border border-white/15 rounded-[var(--radius-input)] px-[25px] py-[17px] font-sans text-text-heading text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] placeholder:text-text-light/40 focus:outline-none focus:border-brand-orange/50 hover:border-white/30 transition-colors"
        {...props}
      />
      {error && (
        <p className="px-1 text-brand-orange text-xs font-body">{error}</p>
      )}
    </div>
  );
}

/* ─── SelectField ────────────────────────────────────────────────────────── */

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
  error?: string;
}

function SelectField({ id, label, placeholder, options, error, ...props }: SelectFieldProps) {
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
        <ChevronIcon />
      </div>
      {error && (
        <p className="px-1 text-brand-orange text-xs font-body">{error}</p>
      )}
    </div>
  );
}

/* ─── TextareaField ──────────────────────────────────────────────────────── */

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
}

function TextareaField({ id, label, placeholder, error, ...props }: TextareaFieldProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
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
      <textarea
        id={id}
        placeholder={placeholder}
        rows={5}
        className="w-full bg-card-bg border border-white/15 rounded-[var(--radius-input)] px-[25px] py-[17px] font-sans text-text-heading text-[length:var(--text-nav)] leading-[var(--text-nav--line-height)] placeholder:text-text-light/40 focus:outline-none focus:border-brand-orange/50 hover:border-white/30 transition-colors resize-none"
        {...props}
      />
      {error && (
        <p className="px-1 text-brand-orange text-xs font-body">{error}</p>
      )}
    </div>
  );
}

/* ─── ChevronIcon ────────────────────────────────────────────────────────── */

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
