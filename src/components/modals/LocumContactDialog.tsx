import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";
import { LocumDialog } from "../LocumDialog";
import { Link } from "react-router";

export function LocumContactDialog({ isOpen, onClose, context = "Locum provision" }: { isOpen: boolean; onClose: () => void; context?: string }) {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", organisation: "", region: "Ireland", topic: "Locum cover", message: "", date: "" });
  useEffect(() => {
    if (isOpen) {
      setStep(0); setComplete(false);
      setForm(previous => ({ ...previous, topic: context.toLowerCase().includes("permanent") ? "Permanent hiring" : context.toLowerCase().includes("registration") ? "Professional registration" : "Locum cover" }));
    }
  }, [isOpen, context]);
  if (!isOpen) return null;
  const field = "mt-2 w-full rounded-2xl border border-black/5 bg-[#f5f8f6] px-4 py-3 text-sm text-[#24332d] outline-none transition-colors focus:bg-[#edf4ef]";
  const set = (key: keyof typeof form, value: string) => setForm(previous => ({ ...previous, [key]: value }));

  return (
    <LocumDialog onClose={onClose} closeLabel="Close Locum enquiry" title={complete ? "A clearer conversation starts here." : "Let’s talk about what you need."} description="Your people, your setting and the support you’re looking for." headline={"A human conversation.\nA considered next step."} steps={["Your details", "Your request", "Review your enquiry"]} currentStep={complete ? 3 : step}>
      <div className="p-7">
        {complete ? <div className="space-y-5 py-6 text-center"><CheckCircle2 className="mx-auto h-12 w-12 text-[#368B62]" /><h3 className="text-2xl font-medium">Your enquiry preview is ready.</h3><p className="text-sm leading-7 text-slate-500">Thanks, {form.name}. This is a design preview: no enquiry has been sent and no meeting is booked. Your preferred date is a preference, not a confirmed appointment.</p><button onClick={onClose} className="w-full rounded-full bg-[#368B62] py-3.5 text-sm font-semibold text-white">Back to MployUs Locums</button></div> : (
          <form onSubmit={event => { event.preventDefault(); if (step < 2) setStep(step + 1); else setComplete(true); }} className="space-y-5">
            {form.topic === "Permanent hiring" && <div className="rounded-xl bg-[#f8eef5] p-4 text-xs leading-6 text-slate-600">Permanent vacancies are managed by MployUs and posted on the recruitment site, separate from locum shifts.<Link to="/recruitment-service?recruitment-enquiry=permanent" onClick={onClose} className="mt-2 flex items-center gap-2 font-semibold text-[#810161]">Contact MployUs Recruitment<ArrowRight size={14} /></Link></div>}
            {step === 0 && <div className="space-y-5"><label className="block text-xs font-medium text-slate-600">Your name<input required autoComplete="name" value={form.name} onChange={event => set("name", event.target.value)} placeholder="First and last name" className={field} /></label><label className="block text-xs font-medium text-slate-600">Email address<input required type="email" autoComplete="email" value={form.email} onChange={event => set("email", event.target.value)} placeholder="you@yourorganisation.com" className={field} /></label><label className="block text-xs font-medium text-slate-600">Facility / organisation (optional)<input autoComplete="organization" value={form.organisation} onChange={event => set("organisation", event.target.value)} placeholder="The people behind your request" className={field} /></label></div>}
            {step === 1 && <div className="space-y-5"><label className="block text-xs font-medium text-slate-600">How can we help?<select value={form.topic} onChange={event => set("topic", event.target.value)} className={field}>{["Locum cover", "Permanent hiring", "Facility account", "Professional registration", "Software walkthrough"].map(topic => <option key={topic}>{topic}</option>)}</select></label><label className="block text-xs font-medium text-slate-600">Country / region<select value={form.region} onChange={event => set("region", event.target.value)} className={field}>{["Ireland", "Northern Ireland", "England", "Wales", "Scotland"].map(region => <option key={region}>{region}</option>)}</select></label><label className="block text-xs font-medium text-slate-600">Tell us a little more<textarea required rows={4} value={form.message} onChange={event => set("message", event.target.value)} placeholder="Profession, care setting, dates or anything we should know…" className={field} /></label><label className="block text-xs font-medium text-slate-600">Preferred conversation date (optional)<input type="date" min={new Date().toISOString().slice(0, 10)} value={form.date} onChange={event => set("date", event.target.value)} className={field} /></label></div>}
            {step === 2 && <div className="space-y-5"><h3 className="text-lg font-medium">Your enquiry, at a glance.</h3><dl className="grid gap-5 rounded-2xl bg-[#f5f8f6] p-5 sm:grid-cols-2">{[["Name", form.name], ["Email", form.email], ["Organisation", form.organisation || "Not specified"], ["Region", form.region], ["Support", form.topic], ["Preferred date", form.date || "Not specified"]].map(([label, value]) => <div key={label}><dt className="text-[10px] text-slate-500">{label}</dt><dd className="mt-1 break-words text-sm">{value}</dd></div>)}</dl><p className="rounded-2xl bg-[#edf4ef] p-5 text-sm leading-7">{form.message}</p><p className="text-xs leading-6 text-slate-500">Preview only. This form does not send personal information to a service or confirm a meeting.</p></div>}
            <div className="flex items-center gap-3 border-t border-black/5 pt-5">{step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1 px-2 py-3 text-xs text-slate-500"><ChevronLeft className="h-3.5 w-3.5" />Back</button>}<button type="submit" className="ml-auto inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#368B62] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#286d4c]">{step === 2 ? "Finish enquiry preview" : "Continue"}<ArrowRight className="h-4 w-4" /></button></div>
          </form>
        )}
      </div>
    </LocumDialog>
  );
}
