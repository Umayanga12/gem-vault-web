import { ReactNode, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Send, Check, AlertCircle, Gem } from "lucide-react";
import { sendContactUsEmail } from "@/lib/send_email";

/* ── Shared field label style ────────────────────────────────────────────── */
const fieldLabel: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: "0.625rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "oklch(0.68 0.076 76)",
    marginBottom: "0.375rem",
};

/* ══════════════════════════════════════════════════════════════════════════
   1. ContactModal  (original — for general enquiries)
══════════════════════════════════════════════════════════════════════════ */
export function ContactModal({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setServerError(null);
        setLoading(true);
        try {
            const finalmesage =
                description +
                "\n" +
                "Name: " +
                name +
                "\n" +
                "Phone: " +
                phone +
                "\n" +
                "Email: " +
                email;
            const result = await sendContactUsEmail({
                title,
                email,
                phone,
                message: finalmesage,
            });
            if (result.success) {
                setSent(true);
            } else {
                setServerError(result.error ?? "Failed to send message. Please try again.");
            }
        } catch {
            setServerError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog
            onOpenChange={(open) => {
                if (!open) {
                    setSent(false);
                    setServerError(null);
                }
            }}
        >
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className="sm:max-w-[500px]"
                style={{ background: "oklch(0.12 0.015 305)", borderColor: "oklch(1 0 0 / 0.1)" }}
            >
                <DialogHeader>
                    <DialogTitle className="font-display text-2xl text-pearl tracking-tight">
                        Contact Us
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Looking for a specific stone? Reach out directly, and our gemologists will assist you.
                    </DialogDescription>
                </DialogHeader>

                {sent ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                        <div
                            className="flex size-14 items-center justify-center rounded-full"
                            style={{
                                background: "var(--gradient-gold)",
                                boxShadow: "0 0 24px var(--glow-gold)",
                            }}
                        >
                            <Check className="size-7 text-primary-foreground" strokeWidth={2.5} />
                        </div>
                        <p className="font-display text-lg text-pearl">Message sent!</p>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Thank you for reaching out. We'll respond within one business day.
                        </p>
                    </div>
                ) : (
                    <form className="grid gap-5 py-2" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="modal-title" className="text-pearl/80">
                                Title
                            </Label>
                            <Input
                                id="modal-title"
                                placeholder="e.g., Sourcing a 3ct Sapphire"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="bg-black/20 border-white/10 text-pearl focus-visible:ring-brass"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="modal-email" className="text-pearl/80">
                                    Email
                                </Label>
                                <Input
                                    id="modal-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-black/20 border-white/10 text-pearl focus-visible:ring-brass"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="modal-phone" className="text-pearl/80">
                                    Contact Number
                                </Label>
                                <Input
                                    id="modal-phone"
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="bg-black/20 border-white/10 text-pearl focus-visible:ring-brass"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="modal-name" className="text-pearl/80">
                                Name
                            </Label>
                            <Input
                                id="modal-name"
                                placeholder="e.g., John Doe"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-black/20 border-white/10 text-pearl focus-visible:ring-brass"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="modal-description" className="text-pearl/80">
                                Note (Optional)
                            </Label>
                            <Textarea
                                id="modal-description"
                                placeholder="Tell us what you're looking for or your questions..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="min-h-[120px] bg-black/20 border-white/10 text-pearl focus-visible:ring-brass resize-none"
                            />
                        </div>

                        {serverError && (
                            <div
                                className="flex items-center gap-2 rounded-lg px-4 py-3"
                                style={{
                                    background: "oklch(0.30 0.12 25 / 0.18)",
                                    border: "1px solid oklch(0.55 0.18 25 / 0.40)",
                                    color: "oklch(0.75 0.15 25)",
                                    fontSize: "0.8125rem",
                                }}
                            >
                                <AlertCircle className="size-4 shrink-0" />
                                {serverError}
                            </div>
                        )}

                        <div className="mt-2 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="facet-sheen btn-gold w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="size-4 animate-spin" />
                                ) : (
                                    <Send className="size-4" />
                                )}
                                {loading ? "Sending…" : "Send Message"}
                            </button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

/* ══════════════════════════════════════════════════════════════════════════
   Stone pill – compact, scannable card for one selected stone
══════════════════════════════════════════════════════════════════════════ */
interface StonePillProps {
    index: number;
    name: string;
    details: Record<string, string>;
}

function StonePill({ index, name, details }: StonePillProps) {
    const hasDetails = Object.keys(details).length > 0;
    return (
        <div
            className="flex gap-3 p-3 rounded"
            style={{
                background: "oklch(0.68 0.076 76 / 0.06)",
                border: "1px solid oklch(0.68 0.076 76 / 0.18)",
            }}
        >
            {/* Numbered badge */}
            <div
                className="flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-mono font-bold mt-0.5"
                style={{
                    background: "var(--gradient-gold)",
                    color: "oklch(0.10 0.010 300)",
                }}
            >
                {index}
            </div>

            <div className="flex-1 min-w-0">
                <p
                    className="text-[13px] font-light text-pearl leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    {name}
                </p>

                {hasDetails && (
                    <div
                        className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "oklch(0.72 0.020 85)",
                        }}
                    >
                        {Object.entries(details).map(([label, value]) => (
                            <span key={label}>
                                <span style={{ color: "oklch(0.58 0.050 78)", marginRight: "0.25em" }}>
                                    {label}:
                                </span>
                                {value}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════════════
   2. SendQuotationModal  (controlled — opened by Quotation Basket "Via Email")

   Props:
   - open / onClose : controlled from site-header drawer state
   - stones         : structured array (preferred) OR legacy stoneLines string
   - onSent         : optional callback after successful send
══════════════════════════════════════════════════════════════════════════ */
export interface QuotationStoneEntry {
    name: string;
    details: Record<string, string>;
}

export interface SendQuotationModalProps {
    open: boolean;
    onClose: () => void;
    /** Structured list – preferred. Renders as visual cards. */
    stones?: QuotationStoneEntry[];
    /** Legacy plain-text fallback (used when `stones` is not provided). */
    stoneLines?: string;
    onSent?: () => void;
}

export function SendQuotationModal({
    open,
    onClose,
    stones,
    stoneLines,
    onSent,
}: SendQuotationModalProps) {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");

    const stoneCount = stones?.length ?? 0;

    function resetForm() {
        setName("");
        setEmail("");
        setPhone("");
        setNote("");
        setSent(false);
        setServerError(null);
    }

    function buildEmailBody() {
        const stoneSection = stones
            ? stones
                .map((s, i) => {
                    const detailLines = Object.entries(s.details)
                        .map(([k, v]) => `  ${k.padEnd(12)}: ${v}`)
                        .join("\n");
                    return `${i + 1}. ${s.name}\n${detailLines}`;
                })
                .join("\n\n")
            : (stoneLines ?? "");

        return (
            `Gemstone Quotation Request\n` +
            `──────────────────────────\n` +
            `Selected stones (${stoneCount || "?"}):\n\n${stoneSection}\n\n` +
            (note.trim() ? `Additional note:\n${note.trim()}\n\n` : "") +
            `──────────────────────────\n` +
            `Name:  ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone || "Not provided"}`
        );
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setServerError(null);
        setLoading(true);
        try {
            const result = await sendContactUsEmail({
                title: "Gemstone Quotation Request – Rhea Ceylon",
                name,
                email,
                phone,
                message: buildEmailBody(),
            });

            if (result.success) {
                setSent(true);
                try {
                    setTimeout(() => {
                        localStorage.removeItem("vault_quotation_v1");
                        window.location.reload();
                    }, 5000);
                } catch {
                    // ignore storage access errors
                }
                onSent?.();
            } else {
                setServerError(result.error ?? "Failed to send. Please try again.");
            }
        } catch {
            setServerError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    onClose();
                    setTimeout(resetForm, 300);
                }
            }}
        >
            <DialogContent
                className="flex flex-col gap-0 p-0 sm:max-w-[560px]"
                style={{
                    background: "linear-gradient(160deg, oklch(0.150 0.016 305) 0%, oklch(0.110 0.012 300) 100%)",
                    borderColor: "oklch(0.68 0.076 76 / 0.22)",
                    boxShadow: "0 40px 100px oklch(0 0 0 / 0.75), 0 0 0 1px oklch(0.68 0.076 76 / 0.10)",
                    maxHeight: "92dvh",
                    overflow: "hidden",
                }}
            >
                {/* Gold accent top bar */}
                <div
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-lg z-10"
                    style={{ background: "var(--gradient-gold)" }}
                />

                {/* ── Sticky modal header ── */}
                <div
                    className="sticky top-0 z-10 px-6 pt-6 pb-4 shrink-0"
                    style={{
                        background: "linear-gradient(160deg, oklch(0.150 0.016 305) 0%, oklch(0.130 0.014 303) 100%)",
                        borderBottom: "1px solid oklch(1 0 0 / 0.06)",
                    }}
                >
                    <DialogHeader>
                        <p
                            className="font-mono text-[9px] uppercase tracking-[0.18em] mb-1"
                            style={{ color: "var(--brass)" }}
                        >
                            Send Quotation Request
                        </p>
                        <div className="flex items-center justify-between gap-4">
                            <DialogTitle className="font-display text-xl text-pearl tracking-tight">
                                Request a Quotation via Email
                            </DialogTitle>
                            {stoneCount > 0 && (
                                <span
                                    className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold"
                                    style={{
                                        background: "var(--gradient-gold)",
                                        color: "oklch(0.10 0.010 300)",
                                        letterSpacing: "0.06em",
                                    }}
                                >
                                    <Gem className="size-3" />
                                    {stoneCount} {stoneCount === 1 ? "stone" : "stones"}
                                </span>
                            )}
                        </div>
                        <DialogDescription className="text-muted-foreground text-sm leading-relaxed mt-1">
                            Review your selection below, then fill in your details and we'll send you
                            a personalised quotation.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {sent ? (
                    <div className="flex flex-col items-center justify-center py-14 text-center gap-4 px-6">
                        <div
                            className="flex size-14 items-center justify-center rounded-full"
                            style={{
                                background: "var(--gradient-gold)",
                                boxShadow: "0 0 24px var(--glow-gold)",
                            }}
                        >
                            <Check className="size-7 text-primary-foreground" strokeWidth={2.5} />
                        </div>
                        <p className="font-display text-lg text-pearl">Quotation sent!</p>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Thank you for your enquiry. Our team will review your request and get
                            back to you with a personalised quotation within one business day.
                        </p>
                    </div>
                ) : (
                    /* Scrollable form body */
                    <div className="flex-1 overflow-y-auto">
                        <form className="grid gap-5 px-6 py-5" onSubmit={handleSubmit}>

                            {/* ── Stone preview (scrollable independently) ── */}
                            <div
                                className="rounded"
                                style={{
                                    border: "1px solid oklch(0.68 0.076 76 / 0.20)",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Section header */}
                                <div
                                    className="flex items-center justify-between px-4 py-2.5"
                                    style={{
                                        background: "oklch(0.68 0.076 76 / 0.10)",
                                        borderBottom: "1px solid oklch(0.68 0.076 76 / 0.16)",
                                    }}
                                >
                                    <p style={{ ...fieldLabel, marginBottom: 0 }}>Selected Stones</p>
                                    {stoneCount > 0 && (
                                        <p
                                            className="font-mono text-[10px]"
                                            style={{ color: "var(--brass)" }}
                                        >
                                            {stoneCount} item{stoneCount !== 1 ? "s" : ""}
                                        </p>
                                    )}
                                </div>

                                {/* Stone list – capped height, independently scrollable */}
                                <div
                                    className="overflow-y-auto px-3 py-3 flex flex-col gap-2"
                                    style={{ maxHeight: "220px" }}
                                >
                                    {stones && stones.length > 0 ? (
                                        stones.map((s, i) => (
                                            <StonePill
                                                key={i}
                                                index={i + 1}
                                                name={s.name}
                                                details={s.details}
                                            />
                                        ))
                                    ) : stoneLines ? (
                                        <pre
                                            className="text-[11px] leading-relaxed whitespace-pre-wrap px-1"
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                color: "oklch(0.82 0.020 85)",
                                            }}
                                        >
                                            {stoneLines}
                                        </pre>
                                    ) : (
                                        <p className="text-xs text-muted-foreground py-2 text-center">
                                            No stones selected.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* ── Section divider ── */}
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-px" style={{ background: "oklch(1 0 0 / 0.06)" }} />
                                <span
                                    className="font-mono text-[9px] uppercase tracking-[0.16em]"
                                    style={{ color: "oklch(0.48 0.020 85)" }}
                                >
                                    Your details
                                </span>
                                <div className="flex-1 h-px" style={{ background: "oklch(1 0 0 / 0.06)" }} />
                            </div>

                            {/* Full name */}
                            <div className="grid gap-1.5">
                                <label htmlFor="sq-name" style={fieldLabel}>
                                    Full Name <span style={{ color: "oklch(0.65 0.22 25)" }}>*</span>
                                </label>
                                <Input
                                    id="sq-name"
                                    placeholder="e.g. John Doe"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-black/20 border-white/10 text-pearl focus-visible:ring-brass"
                                />
                            </div>

                            {/* Email + Phone */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="grid gap-1.5">
                                    <label htmlFor="sq-email" style={fieldLabel}>
                                        Email <span style={{ color: "oklch(0.65 0.22 25)" }}>*</span>
                                    </label>
                                    <Input
                                        id="sq-email"
                                        type="email"
                                        placeholder="you@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-black/20 border-white/10 text-pearl focus-visible:ring-brass"
                                    />
                                </div>
                                <div className="grid gap-1.5">
                                    <label htmlFor="sq-phone" style={fieldLabel}>
                                        Contact Number{" "}
                                        <span
                                            style={{
                                                color: "var(--muted-foreground)",
                                                textTransform: "none",
                                                letterSpacing: "0.04em",
                                                fontSize: "0.55rem",
                                            }}
                                        >
                                            optional
                                        </span>
                                    </label>
                                    <Input
                                        id="sq-phone"
                                        type="tel"
                                        placeholder="+1 555 000 0000"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="bg-black/20 border-white/10 text-pearl focus-visible:ring-brass"
                                    />
                                </div>
                            </div>

                            {/* Optional note */}
                            <div className="grid gap-1.5">
                                <label htmlFor="sq-note" style={fieldLabel}>
                                    Additional Note{" "}
                                    <span
                                        style={{
                                            color: "var(--muted-foreground)",
                                            textTransform: "none",
                                            letterSpacing: "0.04em",
                                            fontSize: "0.55rem",
                                        }}
                                    >
                                        optional
                                    </span>
                                </label>
                                <Textarea
                                    id="sq-note"
                                    placeholder="Budget range, certification preference, delivery timeline…"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="min-h-[80px] bg-black/20 border-white/10 text-pearl focus-visible:ring-brass resize-none"
                                />
                            </div>

                            {/* Error */}
                            {serverError && (
                                <div
                                    className="flex items-center gap-2 rounded-lg px-4 py-3"
                                    style={{
                                        background: "oklch(0.30 0.12 25 / 0.18)",
                                        border: "1px solid oklch(0.55 0.18 25 / 0.40)",
                                        color: "oklch(0.75 0.15 25)",
                                        fontSize: "0.8125rem",
                                    }}
                                >
                                    <AlertCircle className="size-4 shrink-0" />
                                    {serverError}
                                </div>
                            )}

                            {/* Submit */}
                            <div className="pt-1 pb-2">
                                <button
                                    type="submit"
                                    id="send-quotation-submit"
                                    disabled={loading}
                                    className="facet-sheen btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <Loader2 className="size-4 animate-spin" />
                                    ) : (
                                        <Send className="size-4" />
                                    )}
                                    {loading ? "Sending…" : "Send Quotation Request"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}