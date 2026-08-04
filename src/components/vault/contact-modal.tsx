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
import { Paperclip, Check } from "lucide-react";

export function ContactModal({ children }: { children: ReactNode }) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" style={{ background: "oklch(0.12 0.015 305)", borderColor: "oklch(1 0 0 / 0.1)" }}>
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-pearl tracking-tight">Contact Us</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Looking for a specific stone? Reach out directly, and our gemologists will assist you.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-5 py-2" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-pearl/80">Title</Label>
            <Input id="title" placeholder="e.g., Sourcing a 3ct Sapphire" className="bg-black/20 border-white/10 text-pearl focus-visible:ring-brass" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-pearl/80">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="bg-black/20 border-white/10 text-pearl focus-visible:ring-brass" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-pearl/80">Contact Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-black/20 border-white/10 text-pearl focus-visible:ring-brass" />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-pearl/80">Description</Label>
            <Textarea
              id="description"
              placeholder="Tell us what you're looking for or your questions..."
              className="min-h-[120px] bg-black/20 border-white/10 text-pearl focus-visible:ring-brass resize-none"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="file" className="cursor-pointer group">
              <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 p-6 transition-all hover:bg-white/5 hover:border-brass/50">
                {fileName ? (
                  <>
                    <Check className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400/90">{fileName}</span>
                  </>
                ) : (
                  <>
                    <Paperclip className="h-5 w-5 text-muted-foreground group-hover:text-brass" />
                    <span className="text-sm text-muted-foreground group-hover:text-pearl transition-colors">Attach reference images or files (optional)</span>
                  </>
                )}
              </div>
            </Label>
            <Input id="file" type="file" className="hidden" onChange={handleFileChange} />
          </div>
          
          <div className="mt-2 flex justify-end">
            <button type="submit" className="facet-sheen btn-gold w-full sm:w-auto">
              Send Message
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
