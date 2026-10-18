import React, { useState } from "react"
import { ArrowRight, Check, ChevronLeft } from "lucide-react"
import type { ModalTone } from "../../data/modalTones"
import { RecruitmentDialog } from "../RecruitmentDialog"

interface FreeTrialModalProps {
  isOpen: boolean
  onClose: () => void
  tone?: ModalTone
}

const STEPS = ["Your account", "Your workspace"] as const
const MODULES = [
  { id: "care-management", name: "Care Management & eMAR", desc: "Digital care plans, medication safety and inspection reports" },
  { id: "recruitment", name: "Recruitment & ATS", desc: "Multi-board job posting and hiring pipeline" },
  { id: "locums-staffing", name: "Locums & Staffing", desc: "Shift posting and locum matching" },
  { id: "facility-management", name: "Facility Operations", desc: "Check-ins, attendance and billing dashboard" },
] as const
const EMPTY = { email: "", password: "", companyName: "", primaryModule: "care-management" }
const field = "mt-2 block w-full"
const Required = () => <span className="text-[var(--recruit-brand)]">*</span>

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({ isOpen, onClose, tone = "navy" }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(EMPTY)
  const [isPrepared, setIsPrepared] = useState(false)

  if (!isOpen) return null

  const set = (key: keyof typeof EMPTY, value: string) =>
    setFormData((previous) => ({ ...previous, [key]: value }))

  const handleClose = () => {
    setStep(1)
    setIsPrepared(false)
    setFormData(EMPTY)
    onClose()
  }

  const moduleName = MODULES.find((m) => m.id === formData.primaryModule)?.name

  return (
    <RecruitmentDialog
      onClose={handleClose}
      tone={tone}
      eyebrow="Free trial"
      title={isPrepared ? "Your trial details are ready." : "Start your free trial."}
      description={
        isPrepared
          ? "Prepared locally, ready for when accounts go live."
          : "14 days of full access. No credit card required."
      }
      steps={STEPS}
      currentStep={isPrepared ? STEPS.length : step - 1}
      completeLabel="Trial request ready"
    >
      {isPrepared ? (
        <div className="space-y-6 py-4 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[var(--recruit-tint)] text-[var(--recruit-brand)]">
            <Check className="size-7" />
          </span>
          <h2 className="text-2xl">{formData.companyName || "Your workspace"}</h2>
          <p className="text-sm text-[#6a7282]">{moduleName} · {formData.email}</p>
          <p role="status" className="text-sm leading-7 text-[var(--recruit-muted)]">
            No account or workspace has been created, and nothing has been submitted. A live account
            service needs to be connected.
          </p>
          <button type="button" onClick={handleClose} className="flex w-full items-center justify-center gap-2 bg-[var(--recruit-brand)] px-5 py-3 text-white">
            Done <ArrowRight className="size-4" />
          </button>
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (step === 1) return setStep(2)
            setFormData((previous) => ({ ...previous, password: "" }))
            setIsPrepared(true)
          }}
          className="space-y-5"
        >
          {step === 1 ? (
            <>
              <label className="block">
                Work email <Required />
                <input required type="email" autoComplete="email" placeholder="you@organisation.com" value={formData.email} onChange={(e) => set("email", e.target.value)} className={field} />
              </label>
              <label className="block">
                Create a password <Required />
                <input required type="password" minLength={8} autoComplete="new-password" placeholder="At least 8 characters" value={formData.password} onChange={(e) => set("password", e.target.value)} className={field} />
              </label>
              <label className="block">
                Care home / agency name <Required />
                <input required autoComplete="organization" placeholder="e.g. Oakwood Care Home" value={formData.companyName} onChange={(e) => set("companyName", e.target.value)} className={field} />
              </label>
            </>
          ) : (
            <fieldset>
              <legend className="text-[13px] font-medium leading-[19.5px]">Which workspace would you like to start with?</legend>
              <div role="radiogroup" className="mt-2 space-y-2">
                {MODULES.map((m) => {
                  const checked = formData.primaryModule === m.id
                  return (
                    <button
                      key={m.id}
                      type="button"
                      role="radio"
                      aria-checked={checked}
                      onClick={() => set("primaryModule", m.id)}
                      className={`flex w-full items-start gap-3 rounded-lg border p-3.5 text-left transition-colors ${checked ? "border-[var(--recruit-brand)] bg-[var(--recruit-tint)]" : "border-black/5 bg-white hover:bg-[var(--recruit-paper)]"}`}
                    >
                      <span className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border ${checked ? "border-[var(--recruit-brand)]" : "border-black/15"}`}>
                        {checked && <span className="size-2 rounded-full bg-[var(--recruit-brand)]" />}
                      </span>
                      <span>
                        <span className={`block text-sm font-medium ${checked ? "text-[var(--recruit-brand)]" : ""}`}>{m.name}</span>
                        <span className="block text-xs text-[#6a7282]">{m.desc}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}
          <div className="flex items-center gap-3 pt-1">
            {step === 2 && (
              <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1 px-2 py-3 text-sm text-[#6a7282] hover:text-[var(--recruit-brand)]">
                <ChevronLeft className="size-4" /> Back
              </button>
            )}
            <button key={`trial-${step}`} type="submit" className="flex flex-1 items-center justify-center gap-2 bg-[var(--recruit-brand)] px-5 py-3 text-white">
              {step === 1 ? "Continue" : "Prepare trial request"} <ArrowRight className="size-4" />
            </button>
          </div>
        </form>
      )}
    </RecruitmentDialog>
  )
}
