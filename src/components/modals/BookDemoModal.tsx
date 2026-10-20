import React, { useRef, useState, useEffect } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { DEMO_MODULES, getDemoModuleSelection, type DemoModuleId } from "../../data/demoRequests"
import {
  X,
  Check,
  Calendar,
  Clock,
  Building,
  Users,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Shield,
} from "lucide-react"

interface BookDemoModalProps {
  isOpen: boolean
  onClose: () => void
  initialRole?: string
  initialModule?: string
}

const P = "#810161"
const BD = "rgb(0 0 0 / 5%)"
const STEPS = ["Your details", "Operations & scope", "Schedule demo"]

export const BookDemoModal: React.FC<BookDemoModalProps> = ({
  isOpen,
  onClose,
  initialRole = "Care Home Manager",
  initialModule = "All Modules",
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
    preferredTime: "10:00 AM",
  })
  const [prepared, setPrepared] = useState(false)
  const returnFocus = useRef<HTMLElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setPrepared(false)
      setFormData((prev) => ({
        ...prev,
        role: initialRole,
        modules: getDemoModuleSelection(initialModule),
      }))
    }
  }, [isOpen, initialRole, initialModule])

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.scrollTop = 0
    }
  }, [step, prepared])

  if (!isOpen) return null

  const handleModuleToggle = (modId: DemoModuleId) => {
    setFormData((prev) => {
      const exists = prev.modules.includes(modId)
      return {
        ...prev,
        modules: exists ? prev.modules.filter((m) => m !== modId) : [...prev.modules, modId],
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPrepared(true)
  }

  const resetForm = () => {
    setStep(1)
    setPrepared(false)
    onClose()
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) resetForm()
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
            aria-labelledby="book-demo-title"
          >
            <div className="recruit-dialog-main">
              <Dialog.Close
                aria-label="Close demo request"
                onClick={resetForm}
                className="recruit-dialog-close"
              >
                <X size={18} />
              </Dialog.Close>

              <header className="recruit-dialog-header">
                <Dialog.Title id="book-demo-title" className="recruit-dialog-title">
                  {prepared ? "Your demo preview is ready." : "Book your platform demo."}
                </Dialog.Title>
                <Dialog.Description className="recruit-dialog-description">
                  {prepared
                    ? "Your details are prepared locally. No request has been submitted."
                    : "A few details to understand your team and tailor your walkthrough."}
                </Dialog.Description>

                {!prepared && (
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
                {prepared ? (
                  <div className="space-y-6 py-4 text-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto text-white"
                      style={{ backgroundColor: P }}
                    >
                      <Check className="w-10 h-10" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        Your demo request is ready.
                      </h2>
                      <p role="status" className="text-slate-500 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                        Thank you{" "}
                        <span className="font-semibold text-slate-900">
                          {formData.fullName || "there"}
                        </span>
                        . Your details are prepared locally. No request, calendar invitation or meeting link has been sent, and no appointment is confirmed.
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-5 border border-black/5 text-left text-sm max-w-md mx-auto space-y-3">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Request summary
                      </p>
                      <div className="space-y-2 text-slate-700">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Contact:</span>
                          <span className="font-semibold text-slate-900">{formData.fullName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Work email:</span>
                          <span className="font-semibold text-slate-900">{formData.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Organization:</span>
                          <span className="font-semibold text-slate-900">
                            {formData.orgName || "Care Organization"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Primary role:</span>
                          <span className="font-semibold text-slate-900">{formData.role}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Facility size:</span>
                          <span className="font-semibold text-slate-900">{formData.staffCount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Preferred schedule:</span>
                          <span className="font-semibold text-slate-900">
                            {formData.preferredDate} at {formData.preferredTime}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Modules ({formData.modules.length}):</span>
                          <span className="font-semibold text-slate-900 truncate max-w-[200px]">
                            {formData.modules.join(", ")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-black/5">
                          <span className="text-slate-500">Booking status:</span>
                          <span className="font-semibold" style={{ color: P }}>
                            Not booked (preview)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="w-full py-3 text-white font-bold rounded-xl transition-opacity hover:opacity-90"
                        style={{ backgroundColor: P }}
                      >
                        Return to platform
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* ── STEP 1: Your Details ── */}
                    {step === 1 && (
                      <div className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Your details</h2>
                          <p className="text-sm text-slate-500 mt-1">
                            We’ll use these to connect you with the right product specialist.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">
                              Full name <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Sarah Mitchell"
                              value={formData.fullName}
                              aria-label="Full name"
                              onChange={(e) =>
                                setFormData({ ...formData, fullName: e.target.value })
                              }
                              className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">
                              Work email <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="sarah@caregroup.co.uk"
                              value={formData.email}
                              aria-label="Work email"
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">
                              Phone number <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="07700 900000"
                              value={formData.phone}
                              aria-label="Phone number"
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                              className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700">
                              Organization name <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Sunrise Care Home"
                              value={formData.orgName}
                              aria-label="Organisation"
                              onChange={(e) =>
                                setFormData({ ...formData, orgName: e.target.value })
                              }
                              className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">
                            Your primary role
                          </label>
                          <div className="relative">
                            <select
                              value={formData.role}
                              aria-label="Your primary role"
                              onChange={(e) =>
                                setFormData({ ...formData, role: e.target.value })
                              }
                              className="appearance-none w-full px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50 cursor-pointer"
                            >
                              <option value="Care Home Manager">Care Home Manager / Director</option>
                              <option value="Recruitment Agency">
                                Healthcare Recruitment Agency
                              </option>
                              <option value="Locum Healthcare Worker">
                                Locum Nurse / Healthcare Worker
                              </option>
                              <option value="Operations / HR Director">
                                Operations / HR Director
                              </option>
                              <option value="Finance / Compliance Officer">
                                Finance / Compliance Officer
                              </option>
                            </select>
                            <ChevronRight className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                          </div>
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
                            Continue <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ── STEP 2: Operations & Scope ── */}
                    {step === 2 && (
                      <div className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Operations &amp; scope</h2>
                          <p className="text-sm text-slate-500 mt-1">
                            Help us tailor the demonstration to your organisation’s size and requirements.
                          </p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">
                            Facility size / active staff
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {["1-20 Staff", "20-50 Staff", "50-200 Staff", "200+ Staff"].map((s) => (
                              <button
                                key={s}
                                type="button"
                                aria-pressed={formData.staffCount === s}
                                onClick={() => setFormData({ ...formData, staffCount: s })}
                                className="py-2.5 rounded-xl border border-black/5 text-sm font-semibold transition-all"
                                style={{
                                  borderColor: BD,
                                  backgroundColor:
                                    formData.staffCount === s ? "rgba(129,1,97,0.06)" : "var(--recruit-paper)",
                                  color: formData.staffCount === s ? P : "var(--recruit-ink)",
                                }}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-700">
                            Modules you want to explore
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {DEMO_MODULES.map((m) => {
                              const checked = formData.modules.includes(m.id)
                              return (
                                <button
                                  type="button"
                                  role="checkbox"
                                  aria-checked={checked}
                                  key={m.id}
                                  onClick={() => handleModuleToggle(m.id)}
                                  className="flex items-center gap-3 p-3.5 rounded-xl border border-black/5 text-left transition-all"
                                  style={{
                                    borderColor: BD,
                                    backgroundColor: checked ? "rgba(129,1,97,0.06)" : "var(--recruit-paper)",
                                  }}
                                >
                                  <div
                                    className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors"
                                    style={{
                                      backgroundColor: checked ? P : "white",
                                      borderColor: checked ? P : "rgba(0, 0, 0, 0.15)",
                                    }}
                                  >
                                    {checked && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                                  </div>
                                  <span
                                    className="text-xs font-semibold"
                                    style={{ color: checked ? P : "var(--recruit-ink)" }}
                                  >
                                    {m.label}
                                  </span>
                                </button>
                              )
                            })}
                          </div>
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
                            type="button"
                            onClick={() => setStep(3)}
                            disabled={formData.modules.length === 0}
                            className="flex-1 py-3 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
                            style={{ backgroundColor: P }}
                          >
                            Continue <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ── STEP 3: Schedule Demo ── */}
                    {step === 3 && (
                      <div className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">Schedule your demo</h2>
                          <p className="text-sm text-slate-500 mt-1">
                            Choose your preferred date and time for a 1-on-1 walkthrough.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" style={{ color: P }} /> Select date <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="date"
                              required
                              value={formData.preferredDate}
                              aria-label="Preferred date"
                              onChange={(e) =>
                                setFormData({ ...formData, preferredDate: e.target.value })
                              }
                              className="px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" style={{ color: P }} /> Preferred time (UK)
                            </label>
                            <div className="relative">
                              <select
                                value={formData.preferredTime}
                                aria-label="Preferred time"
                                onChange={(e) =>
                                  setFormData({ ...formData, preferredTime: e.target.value })
                                }
                                className="appearance-none w-full px-3.5 py-2.5 rounded-xl border border-black/5 text-sm outline-none bg-slate-50 cursor-pointer"
                              >
                                <option value="09:00 AM">09:00 AM BST</option>
                                <option value="10:30 AM">10:30 AM BST</option>
                                <option value="01:30 PM">01:30 PM BST</option>
                                <option value="03:00 PM">03:00 PM BST</option>
                                <option value="04:30 PM">04:30 PM BST</option>
                              </select>
                              <ChevronRight className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                            </div>
                          </div>
                        </div>

                        <div
                          className="p-4 rounded-xl border border-black/5 text-xs text-slate-700 flex items-start gap-3"
                          style={{ backgroundColor: "var(--recruit-tint)" }}
                        >
                          <Shield className="w-4 h-4 mt-0.5 shrink-0" style={{ color: P }} />
                          <p className="leading-relaxed">
                            <strong>Guaranteed:</strong> No hard sell. Our healthcare solution engineers will tailor the demonstration specifically to your team’s workflows.
                          </p>
                        </div>

                        {/* Request Summary */}
                        <div className="bg-slate-50 border border-black/5 rounded-xl p-4 space-y-3">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Walkthrough brief
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                            <div>
                              <span className="text-slate-400">Contact</span>
                              <p className="font-semibold text-slate-900 mt-0.5">
                                {formData.fullName || "—"}
                              </p>
                            </div>
                            <div>
                              <span className="text-slate-400">Email</span>
                              <p className="font-semibold text-slate-900 mt-0.5 break-all">
                                {formData.email || "—"}
                              </p>
                            </div>
                            <div>
                              <span className="text-slate-400">Organization</span>
                              <p className="font-semibold text-slate-900 mt-0.5">
                                {formData.orgName || "—"}
                              </p>
                            </div>
                            <div>
                              <span className="text-slate-400">Staff size</span>
                              <p className="font-semibold text-slate-900 mt-0.5">
                                {formData.staffCount}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="px-5 py-3 rounded-xl border border-black/5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            ← Back
                          </button>
                          <button
                            type="submit"
                            className="flex-1 py-3 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                            style={{ backgroundColor: P }}
                          >
                            Prepare demo request <Check className="w-4 h-4" />
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

export default BookDemoModal
