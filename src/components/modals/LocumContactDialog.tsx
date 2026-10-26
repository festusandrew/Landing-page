import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { RecruitmentDialog } from "../RecruitmentDialog";

const STEPS = ["Your details", "Your request", "Review your enquiry"] as const;
const field = "mt-2 block w-full";
const Required = () => <span className="text-[var(--recruit-brand)]">*</span>;

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
  const set = (key: keyof typeof form, value: string) => setForm(previous => ({ ...previous, [key]: value }));

  return (
    <RecruitmentDialog onClose={onClose} tone="green" eyebrow="Locum enquiry" title={complete ? "A clearer conversation starts here." : "Let’s talk about what you need."} description="Your people, your setting and the support you’re looking for." steps={STEPS} currentStep={complete ? STEPS.length : step} completeLabel="Enquiry complete">
      {complete ? (
        <div className="space-y-6 py-4 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[var(--recruit-tint)] text-[var(--recruit-brand)]"><Check className="size-7" /></span>
          <h2 className="text-2xl">Thanks, {form.name}.</h2>
          <p role="status" className="text-sm leading-7 text-[var(--recruit-muted)]">Here’s what you shared with us: {form.topic.toLowerCase()} in {form.region}.</p>
          <button type="button" onClick={onClose} className="w-full bg-[var(--recruit-brand)] px-5 py-3 text-white">Back to MployUs Locums</button>
        </div>
      ) : (
        <form onSubmit={event => { event.preventDefault(); if (step < 2) setStep(step + 1); else setComplete(true); }} className="space-y-5">
          {form.topic === "Permanent hiring" && <div className="rounded-xl bg-[#f8eef5] p-4 text-sm leading-6">Permanent vacancies are managed by MployUs and posted on the recruitment site, separate from locum shifts.<Link to="/recruitment-service?recruitment-enquiry=permanent" onClick={onClose} className="mt-2 flex items-center gap-2 font-medium text-[#810161]">Contact MployUs Recruitment<ArrowRight size={14} /></Link></div>}
          {step === 0 && <>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">Your name <Required /><input required autoComplete="name" value={form.name} onChange={event => set("name", event.target.value)} placeholder="First and last name" className={field} /></label>
              <label className="block">Email address <Required /><input required type="email" autoComplete="email" value={form.email} onChange={event => set("email", event.target.value)} placeholder="you@organisation.com" className={field} /></label>
            </div>
            <label className="block">Facility / organisation<input autoComplete="organization" value={form.organisation} onChange={event => set("organisation", event.target.value)} placeholder="Optional" className={field} /></label>
          </>}
          {step === 1 && <>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">How can we help?<select value={form.topic} onChange={event => set("topic", event.target.value)} className={field}>{["Locum cover", "Permanent hiring", "Facility account", "Professional registration", "Software walkthrough"].map(topic => <option key={topic}>{topic}</option>)}</select></label>
              <label className="block">Country / region<select value={form.region} onChange={event => set("region", event.target.value)} className={field}>{["Ireland", "Northern Ireland", "England", "Wales", "Scotland"].map(region => <option key={region}>{region}</option>)}</select></label>
            </div>
            <label className="block">Tell us a little more <Required /><textarea required rows={4} value={form.message} onChange={event => set("message", event.target.value)} placeholder="Profession, care setting, dates or anything we should know…" className={`${field} px-4 py-3`} /></label>
            <label className="block">Preferred conversation date<input type="date" min={new Date().toISOString().slice(0, 10)} value={form.date} onChange={event => set("date", event.target.value)} className={field} /></label>
          </>}
          {step === 2 && <>
            <dl className="grid gap-4 rounded-xl bg-[var(--recruit-paper)] p-4 text-sm sm:grid-cols-2">{[["Name", form.name], ["Email", form.email], ["Organisation", form.organisation || "Not specified"], ["Region", form.region], ["Support", form.topic], ["Preferred date", form.date || "Not specified"]].map(([label, value]) => <div key={label}><dt className="text-xs text-[#6a7282]">{label}</dt><dd className="mt-1 break-words">{value}</dd></div>)}</dl>
            <p className="rounded-xl bg-[var(--recruit-tint)] p-4 text-sm leading-6">{form.message}</p>
          </>}
          <div className="flex items-center gap-3 pt-1">
            {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1 px-2 py-3 text-sm text-[#6a7282] hover:text-[var(--recruit-brand)]"><ChevronLeft className="size-4" />Back</button>}
            <button key={`locum-${step}`} type="submit" className="flex flex-1 items-center justify-center gap-2 bg-[var(--recruit-brand)] px-5 py-3 text-white">{step === 2 ? "Send enquiry" : "Continue"}<ArrowRight className="size-4" /></button>
          </div>
        </form>
      )}
    </RecruitmentDialog>
  );
}
