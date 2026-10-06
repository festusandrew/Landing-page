import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CalendarDays, Check, HeartPulse, LockKeyhole, ShieldCheck, X } from "lucide-react";

type LocumDialogProps = {
  open?: boolean;
  onClose: () => void;
  title: string;
  description: string;
  headline: string;
  steps?: readonly string[];
  currentStep?: number;
  image?: string;
  closeLabel?: string;
  children: ReactNode;
};

export function LocumDialog({ open = true, onClose, title, description, headline, steps = [], currentStep = 0, image, closeLabel = "Close dialog", children }: LocumDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={nextOpen => { if (!nextOpen) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[120] bg-[#12271e]/55 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[121] grid max-h-[92dvh] w-[calc(100%-24px)] max-w-[940px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[28px] bg-white font-['DM_Sans',sans-serif] text-[#24332d] outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none md:grid-cols-[270px_minmax(0,1fr)]">
          <aside className="hidden bg-[#e7f0e9] md:block">
            <div className="sticky top-0 flex min-h-[min(650px,92dvh)] flex-col p-8">
              <p className="flex items-center gap-2 text-lg font-semibold">mployus<span className="text-[11px] font-normal text-[#368B62]">locums.</span></p>
              <div className="mb-8 mt-11"><span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/75"><HeartPulse className="h-5 w-5 text-[#368B62]" /></span><p className="whitespace-pre-line text-[31px] font-medium leading-[1.12] tracking-[-0.02em]">{headline}</p></div>
              {image ? <img src={image} alt="Healthcare professional in uniform" className="mb-7 h-44 w-full rounded-2xl object-cover object-[center_25%]" /> : steps.length > 0 ? (
                <ol className="space-y-5" aria-label="Your progress">{steps.map((label, index) => <li key={label} aria-current={index === currentStep ? "step" : undefined} className={`flex items-center gap-3 text-xs ${index === currentStep ? "font-semibold text-[#24332d]" : "text-[#73877a]"}`}><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] ${index <= currentStep ? "bg-[#368B62] text-white" : "bg-white/70"}`}>{index < currentStep ? <Check className="h-3.5 w-3.5" /> : String(index + 1).padStart(2, "0")}</span>{label}</li>)}</ol>
              ) : <div className="space-y-3"><div className="flex items-center gap-2 rounded-xl bg-white/70 p-3 text-xs text-[#53685b]"><CalendarDays className="h-4 w-4 text-[#368B62]" />A little more freedom.</div><div className="flex items-center gap-2 rounded-xl bg-white/70 p-3 text-xs text-[#53685b]"><ShieldCheck className="h-4 w-4 text-[#368B62]" />A more considered next step.</div></div>}
              <div className="mt-auto pt-10"><p className="flex items-center gap-2 text-[10px] text-[#53685b]"><LockKeyhole className="h-3 w-3" />Ireland & UK · country-aware flows</p><p className="mt-2 text-[9px] leading-5 text-[#829388]">Design preview. Live account services and submissions are not connected.</p></div>
            </div>
          </aside>
          <div className="min-w-0 bg-white [&_h2]:font-medium [&_h3]:font-medium [&_input]:border-black/5 [&_select]:border-black/5 [&_textarea]:border-black/5 [&_input:focus]:border-black/5 [&_select:focus]:border-black/5 [&_textarea:focus]:border-black/5 [&_input:focus]:shadow-none [&_select:focus]:shadow-none [&_textarea:focus]:shadow-none [&_.bg-slate-50]:bg-[#f5f8f6] [&_.bg-green-50]:bg-[#edf4ef]">
            <header className="sticky top-0 z-20 border-b border-black/5 bg-white/95 px-6 py-6 backdrop-blur-sm sm:px-7">
              <div className="mb-4 flex items-center justify-between gap-4"><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#368B62]">MployUs Locums · Your next step</p><Dialog.Close aria-label={closeLabel} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f2f6f3] text-[#67786d] transition-colors hover:bg-[#e4eee7] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-black/5"><X className="h-4 w-4" /></Dialog.Close></div>
              <Dialog.Title className="text-[27px] font-medium leading-tight tracking-[-0.02em] sm:text-[30px]">{title}</Dialog.Title>
              <Dialog.Description className="mt-2 text-xs leading-6 text-slate-500">{description}</Dialog.Description>
              {steps.length > 0 && <div className="mt-4 md:hidden"><p className="mb-2 text-[10px] font-medium text-[#53685b]">Step {Math.min(currentStep + 1, steps.length)} of {steps.length} · {steps[Math.min(currentStep, steps.length - 1)]}</p><div aria-hidden="true" className="flex gap-1.5">{steps.map((label, index) => <span key={label} className={`h-1 flex-1 rounded-full ${index <= currentStep ? "bg-[#368B62]" : "bg-[#edf2ee]"}`} />)}</div></div>}
            </header>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
