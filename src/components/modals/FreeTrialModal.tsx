import React, { useRef, useState, useEffect } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X, Check, ShieldCheck, ArrowRight, ChevronRight, Rocket, Building2, Mail, Layers } from "lucide-react"

interface FreeTrialModalProps {
  isOpen: boolean
  onClose: () => void
}

const P = "#810161"
const BD = "rgb(0 0 0 / 5%)"
const STEPS = ["Account details", "Choose primary module"]

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
    primaryModule: "care-management",
  })
  const [isPrepared, setIsPrepared] = useState(false)
  const returnFocus = useRef<HTMLElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.scrollTop = 0
    }
  }, [step, isPrepared])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormData((previous) => ({ ...previous, password: "" }))
    setIsPrepared(true)
  }

  const handleClose = () => {
    setStep(1)
    setIsPrepared(false)
    setFormData({ email: "", password: "", companyName: "", primaryModule: "care-management" })
    onClose()
  }

  const MODULE_OPTIONS = [
    {
      id: "care-management",
      name: "Care Management & eMAR",
      desc: "Digital care plans, medication safety & CQC reports",
    },
    {
      id: "recruitment",
      name: "Recruitment & ATS",
      desc: "Multi-board job posting & hiring pipeline",
    },
    {
      id: "locums-staffing",
      name: "Locums & Staffing App",
      desc: "Shift posting & instant locum matching",
    },
    {
      id: "facility-management",
      name: "Facility Operations",
      desc: "Live check-ins, attendance & billing dashboard",
    },
  ]

  const selectedModuleObj = MODULE_OPTIONS.find((m) => m.id === formData.primaryModule)

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose()
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="recruit-dialog-overlay" />
        <Dialog.Content
          asChild
          onOpenAutoFocus={() => {
            returnFocus.current = document.activeElement as HTMLElement
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            if (returnFocus.current?.isConnected) returnFocus.current.focus()
          }}
        >
          <div
            ref={dialogRef}
            className="recruit-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="free-trial-title"
          >
            <div className="recruit-dialog-main">
              <Dialog.Close
                aria-label="Close free trial"
                onClick={handleClose}
                className="recruit-dialog-close"
              >
                <X size={18} />
              </Dialog.Close>

              <header className="recruit-dialog-header">
                <Dialog.Title id="free-trial-title" className="recruit-dialog-title">
                  {isPrepared ? "Your trial preview is ready." : "Start Your Free MployUS Trial"}
                </Dialog.Title>
                <Dialog.Description className="recruit-dialog-description">
                  {isPrepared
                    ? "Your trial environment is prepared locally. No charges apply."
                    : "14-Day full access trial · No credit card required. Cancel anytime with 1-click."}
                </Dialog.Description>

                {!isPrepared && (
                  <div className="recruit-dialog-progress" aria-label="Your progress">
                    <p>
                      {`Step ${step} of ${STEPS.length}`}
                      <span>{STEPS[step - 1]}</span>
                    </p>
                    <div aria-hidden="true">
                      {STEPS.map((s, index) => (
                        <span key={s} data-active={index < step} />
                      ))}
                    </div>
                  </div>
                )}
              </header>

              <div className="recruit-dialog-body">
                {isPrepared ? (
                  <div className="space-y-6 py-4 text-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto text-white"
                      style={{ backgroundColor: P }}
                    >
                      <Check className="w-10 h-10" strokeWidth={2.5} />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        Your trial details are ready.
                      </h2>
                      <p role="status" className="text-slate-500 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
                        Your request for{" "}
                        <strong className="text-slate-900">
                          {formData.companyName || "Your Facility"}
                        </strong>{" "}
                        is prepared locally. No account or workspace has been created, and nothing has been submitted.
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-5 border border-black/5 text-left text-sm max-w-md mx-auto space-y-3">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Trial configuration
                      </p>
                      <div className="space-y-2 text-slate-700">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Organization:</span>
                          <span className="font-semibold text-slate-900">
                            {formData.companyName || "Your Facility"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Work email:</span>
                          <span className="font-semibold text-slate-900">{formData.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Primary module:</span>
                          <span className="font-semibold text-slate-900">
                            {selectedModuleObj?.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-black/5">
                          <span className="text-slate-500">Trial status:</span>
                          <span className="font-semibold" style={{ color: P }}>
                            14-Day preview (local)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="w-full py-3 text-white font-bold rounded-xl transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                        style={{ backgroundColor: P }}
                      >
                        Done <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* ── STEP 1: Account Details ── */}
                    {step === 1 && (
                      <div className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Account details</h2>
                          <p className="text-sm text-slate-500 mt-1">
                            Create your login credentials for your 14-day full access workspace.
                          </p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">
                            Work email <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="manager@carehome.co.uk"
                            value={formData.email}
                            aria-label="Work email"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">
                            Create secure password <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="password"
                            required
                            minLength={8}
                            placeholder="••••••••"
                            value={formData.password}
                            aria-label="Create secure password"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">
                            Care home / agency name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Oakwood Care Home"
                            value={formData.companyName}
                            aria-label="Organisation"
                            onChange={(e) =>
                              setFormData({ ...formData, companyName: e.target.value })
                            }
                            className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50"
                          />
                        </div>

                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.preventDefault()
                              if (!event.currentTarget.form?.reportValidity()) return
                              setStep(2)
                            }}
                            className="w-full py-3 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                            style={{ backgroundColor: P }}
                          >
                            Next: Choose primary module <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ── STEP 2: Choose Primary Module ── */}
                    {step === 2 && (
                      <div className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Select primary module</h2>
                          <p className="text-sm text-slate-500 mt-1">
                            Choose the workspace you want pre-configured for your team.
                          </p>
                        </div>

                        <div className="space-y-2.5">
                          {MODULE_OPTIONS.map((m) => {
                            const isSelected = formData.primaryModule === m.id
                            return (
                              <button
                                key={m.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, primaryModule: m.id })}
                                className="w-full flex items-start gap-3.5 p-4 rounded-xl border border-black/5 text-left transition-all"
                                style={{
                                  borderColor: BD,
                                  backgroundColor: isSelected
                                    ? "rgba(129,1,97,0.06)"
                                    : "var(--recruit-paper)",
                                }}
                              >
                                <div
                                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border transition-colors"
                                  style={{
                                    borderColor: isSelected ? P : "rgba(0,0,0,0.2)",
                                    backgroundColor: isSelected ? P : "white",
                                  }}
                                >
                                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                                <div>
                                  <div
                                    className="text-sm font-semibold"
                                    style={{ color: isSelected ? P : "var(--recruit-ink)" }}
                                  >
                                    {m.name}
                                  </div>
                                  <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                    {m.desc}
                                  </div>
                                </div>
                              </button>
                            )
                          })}
                        </div>

                        <div
                          className="p-3.5 rounded-xl border border-black/5 text-xs text-slate-700 flex items-start gap-2.5"
                          style={{ backgroundColor: "var(--recruit-tint)" }}
                        >
                          <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" style={{ color: P }} />
                          <span className="leading-relaxed">
                            Choose the workspace you want to explore. Your account requires activation before use.
                          </span>
                        </div>

                        <div className="flex gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="px-5 py-3 rounded-xl border border-black/5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            ← Back
                          </button>
                          <button
                            type="submit"
                            className="flex-1 py-3 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                            style={{ backgroundColor: P }}
                          >
                            Prepare trial request <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>

              <footer className="recruit-dialog-footer">
                Preview only · No live submissions.
              </footer>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default FreeTrialModal
