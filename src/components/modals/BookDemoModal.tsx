import React, { useState } from "react"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { DEMO_MODULES, getDemoModuleSelection, type DemoModuleId } from "../../data/demoRequests"
import type { ModalTone } from "../../data/modalTones"
import { RecruitmentDialog } from "../RecruitmentDialog"

interface BookDemoModalProps {
  isOpen: boolean
  onClose: () => void
  initialRole?: string
  initialModule?: string
  tone?: ModalTone
}

const STEPS = ["Your details", "Your organisation", "Preferred time"] as const
const ROLES = [
  ["Care Home Manager", "Care Home Manager / Director"],
  ["Recruitment Agency", "Healthcare Recruitment Agency"],
  ["Locum Healthcare Worker", "Locum Nurse / Healthcare Worker"],
  ["Operations / HR Director", "Operations / HR Director"],
  ["Finance / Compliance Officer", "Finance / Compliance Officer"],
] as const
const STAFF_SIZES = ["1-20 Staff", "20-50 Staff", "50-200 Staff", "200+ Staff"] as const
const TIMES = ["09:00 AM", "10:30 AM", "01:30 PM", "03:00 PM", "04:30 PM"] as const

const field = "mt-2 block w-full"
const selected = "border-[var(--recruit-brand)] bg-[var(--recruit-tint)] text-[var(--recruit-brand)]"
const unselected = "border-black/5 bg-white text-[var(--recruit-ink)]"
const Required = () => <span className="text-[var(--recruit-brand)]">*</span>

export const BookDemoModal: React.FC<BookDemoModalProps> = ({
  isOpen,
  onClose,
  initialRole = "Care Home Manager",
  initialModule = "All Modules",
  tone = "navy",
}) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    orgName: "",
    role: initialRole,
    staffCount: "20-50 Staff",
    modules: getDemoModuleSelection(initialModule),
    preferredDate: new Date().toISOString().split("T")[0],
    preferredTime: "10:30 AM",
  })
  const [prepared, setPrepared] = useState(false)

  if (!isOpen) return null

  const set = <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) =>
    setFormData((previous) => ({ ...previous, [key]: value }))

  const toggleModule = (id: DemoModuleId) =>
    set(
      "modules",
      formData.modules.includes(id)
        ? formData.modules.filter((m) => m !== id)
        : [...formData.modules, id],
    )

  const resetForm = () => {
    setStep(1)
    setPrepared(false)
    onClose()
  }

  return (
    <RecruitmentDialog
      onClose={resetForm}
      tone={tone}
      eyebrow="Demo request"
      title={prepared ? "Thank you." : "See MployUs in action."}
      description={
        prepared
          ? "Here’s a summary of your demo request."
          : "A personal walkthrough, shaped around your team and the way you work."
      }
      steps={STEPS}
      currentStep={prepared ? STEPS.length : step - 1}
      completeLabel="Request complete"
    >
      {prepared ? (
        <div className="space-y-6 py-4 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[var(--recruit-tint)] text-[var(--recruit-brand)]">
            <Check className="size-7" />
          </span>
          <h2 className="text-2xl">Thank you, {formData.fullName || "there"}.</h2>
          <dl className="grid gap-4 rounded-xl bg-[var(--recruit-paper)] p-4 text-left text-sm sm:grid-cols-2">
            {[
              ["Preferred time", `${formData.preferredDate} · ${formData.preferredTime}`],
              ["Organisation", formData.orgName || "Not specified"],
              ["Team size", formData.staffCount],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-[#6a7282]">{label}</dt>
                <dd className="mt-1 break-words">{value}</dd>
              </div>
            ))}
          </dl>
          <button
            type="button"
            onClick={resetForm}
            className="w-full bg-[var(--recruit-brand)] px-5 py-3 text-white"
          >
            Done
          </button>
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (step < STEPS.length) setStep(step + 1)
            else setPrepared(true)
          }}
          className="space-y-5"
        >
          {step === 1 && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  Full name <Required />
                  <input required autoComplete="name" placeholder="Your full name" value={formData.fullName} onChange={(e) => set("fullName", e.target.value)} className={field} />
                </label>
                <label className="block">
                  Work email <Required />
                  <input required type="email" autoComplete="email" placeholder="you@organisation.com" value={formData.email} onChange={(e) => set("email", e.target.value)} className={field} />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  Phone number <Required />
                  <input required type="tel" autoComplete="tel" placeholder="07700 900000" value={formData.phone} onChange={(e) => set("phone", e.target.value)} className={field} />
                </label>
                <label className="block">
                  Organisation <Required />
                  <input required autoComplete="organization" placeholder="e.g. Sunrise Care Home" value={formData.orgName} onChange={(e) => set("orgName", e.target.value)} className={field} />
                </label>
              </div>
              <label className="block">
                Your role
                <select value={formData.role} onChange={(e) => set("role", e.target.value)} className={field}>
                  {ROLES.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>
            </>
          )}

          {step === 2 && (
            <>
              <fieldset>
                <legend className="text-[13px] font-medium leading-[19.5px]">Team size</legend>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {STAFF_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={formData.staffCount === size}
                      onClick={() => set("staffCount", size)}
                      className={`border px-3 py-2.5 text-sm transition-colors ${formData.staffCount === size ? selected : unselected}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-[13px] font-medium leading-[19.5px]">What would you like to explore?</legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {DEMO_MODULES.map((module) => {
                    const checked = formData.modules.includes(module.id)
                    return (
                      <button
                        key={module.id}
                        type="button"
                        role="checkbox"
                        aria-checked={checked}
                        onClick={() => toggleModule(module.id)}
                        className={`flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors ${checked ? selected : unselected}`}
                      >
                        <span className={`flex size-4 shrink-0 items-center justify-center rounded border ${checked ? "border-[var(--recruit-brand)] bg-[var(--recruit-brand)] text-white" : "border-black/15"}`}>
                          {checked && <Check className="size-3" strokeWidth={3} />}
                        </span>
                        {module.label}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            </>
          )}

          {step === 3 && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  Preferred date <Required />
                  <input required type="date" min={new Date().toISOString().split("T")[0]} value={formData.preferredDate} onChange={(e) => set("preferredDate", e.target.value)} className={field} />
                </label>
                <label className="block">
                  Preferred time (UK)
                  <select value={formData.preferredTime} onChange={(e) => set("preferredTime", e.target.value)} className={field}>
                    {TIMES.map((time) => (
                      <option key={time}>{time}</option>
                    ))}
                  </select>
                </label>
              </div>
              <p className="rounded-xl bg-[var(--recruit-tint)] p-4 text-sm leading-6 text-[var(--recruit-ink)]">
                No hard sell. We tailor every walkthrough to your team’s everyday workflows.
              </p>
            </>
          )}

          <div className="flex items-center gap-3 pt-1">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1 px-2 py-3 text-sm text-[#6a7282] hover:text-[var(--recruit-brand)]"
              >
                <ChevronLeft className="size-4" /> Back
              </button>
            )}
            <button
              key={step === STEPS.length ? "demo-prepare" : "demo-continue"}
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 bg-[var(--recruit-brand)] px-5 py-3 text-white"
            >
              {step === STEPS.length ? "Prepare demo request" : "Continue"}
              {step === STEPS.length ? <Check className="size-4" /> : <ChevronRight className="size-4" />}
            </button>
          </div>
        </form>
      )}
    </RecruitmentDialog>
  )
}
