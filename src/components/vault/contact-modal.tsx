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
import { Loader2, Send, Check, AlertCircle } from "lucide-react";
import { sendContactUsEmail } from "@/lib/send_email";

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
      // console.log(email, title, phone, description)
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
                Description
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