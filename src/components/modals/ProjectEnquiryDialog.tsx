import { useState, type FormEvent } from "react"
import { ArrowLeft, ArrowRight, Check, FileText } from "lucide-react"
import { Input } from "../../app/components/ui/input"
import { RecruitmentDialog } from "../RecruitmentDialog"
import { STUDIO_VISUALS } from "../../data/studioVisuals"
import "./project-enquiry-reference.css"

export function ProjectEnquiryDialog({
  projectName,
  discipline,
  onClose,
}: {
  projectName: string
  discipline: "design" | "development"
  onClose: () => void
}) {
  const design = discipline === "design"
  const [step, setStep] = useState(0)
  const [prepared, setPrepared] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    role: "",
    service:
      discipline === "design"
        ? "Product design & UX"
        : "Full-stack web development",
    brief: "",
    timeline: "Still exploring",
    date: "",
    time: "No preference",
  })
  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step < 2) setStep(step + 1)
    else setPrepared(true)
  }
  const summary = [
    ["Inspired by", projectName],
    ["Service", form.service],
    ["Contact", form.name],
    ["Email", form.email],
    ["Organisation", form.organisation],
    ["Timeline", form.timeline],
    ["Phone", form.phone || "Not supplied"],
    ["Your role", form.role || "Not supplied"],
    [
      "Preferred call",
      form.date
        ? `${form.date} · ${form.time} (UK local time)`
        : "To be agreed",
    ],
  ]
  return (
    <RecruitmentDialog
      className={design ? "project-enquiry" : undefined}
      footer={design ? null : undefined}
      completeLabel={design ? "Brief ready" : undefined}
      closeIcon={
        design ? (
          <img
            src={
              prepared
                ? STUDIO_VISUALS.ready.close[0]
                : step === 0
                  ? STUDIO_VISUALS.details.close[0]
                  : step === 1
                    ? STUDIO_VISUALS.project.close[0]
                    : STUDIO_VISUALS.review.close[0]
            }
            alt=""
            className="studio-reference-icon"
          />
        ) : undefined
      }
      onClose={onClose}
      eyebrow="Project enquiry"
      title={
        prepared
          ? "Your project brief is ready."
          : "Let’s talk about your project."
      }
      description={
        prepared
          ? "A considered starting point for your next conversation."
          : "Tell us what you have in mind. We’ll help you define the next step."
      }
      headline="A clear brief. A better beginning."
      steps={["Your details", "Your project", "Review your brief"]}
      currentStep={prepared ? 3 : step}
    >
      {prepared ? (
        <div className="project-enquiry-ready space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--recruit-tint)] text-[var(--recruit-brand)]">
              {design ? (
                <img
                  src={STUDIO_VISUALS.ready.check[0]}
                  alt=""
                  className="studio-reference-icon"
                />
              ) : (
                <Check size={22} />
              )}
            </span>
            <h2 className="text-xl">Prepared, not submitted.</h2>
          </div>
          <p
            role="status"
            className="text-sm leading-7 text-[var(--recruit-muted)]"
          >
            Your brief stays in this browser session. No enquiry, booking or
            email has been sent.
          </p>
          <Summary entries={summary} />
          <div className="rounded-lg bg-[var(--recruit-paper)] p-4">
            <p className="mb-2 text-xs font-medium">Your project</p>
            <p className="whitespace-pre-wrap break-words text-sm leading-6">
              {form.brief}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setPrepared(false)}
              className="flex-1 rounded-lg border border-black/5 px-4 py-3 text-sm"
            >
              Edit brief
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-[var(--recruit-brand)] px-4 py-3 text-white"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={next}
          className="project-enquiry-form space-y-5"
          data-step={step}
        >
          {step === 0 && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  Full name{" "}
                  <span className="text-[var(--recruit-brand)]">*</span>
                  <Input
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    placeholder="Your full name"
                    className="mt-2"
                  />
                </label>
                <label>
                  Work email{" "}
                  <span className="text-[var(--recruit-brand)]">*</span>
                  <Input
                    required
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm({ ...form, email: event.target.value })
                    }
                    placeholder="you@company.co.uk"
                    className="mt-2"
                  />
                </label>
              </div>
              <label className="block">
                Organisation{" "}
                <span className="text-[var(--recruit-brand)]">*</span>
                <Input
                  required
                  autoComplete="organization"
                  value={form.organisation}
                  onChange={(event) =>
                    setForm({ ...form, organisation: event.target.value })
                  }
                  placeholder="Your organisation or business"
                  className="mt-2"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  Phone{" "}
                  <span className="text-xs text-[var(--recruit-muted)]">
                    (optional)
                  </span>
                  <Input
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(event) =>
                      setForm({ ...form, phone: event.target.value })
                    }
                    placeholder="+44 or +353"
                    className="mt-2"
                  />
                </label>
                <label>
                  Your role{" "}
                  <span className="text-xs text-[var(--recruit-muted)]">
                    (optional)
                  </span>
                  <Input
                    autoComplete="organization-title"
                    value={form.role}
                    onChange={(event) =>
                      setForm({ ...form, role: event.target.value })
                    }
                    placeholder="e.g. Founder or product lead"
                    className="mt-2"
                  />
                </label>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="flex items-start gap-3 rounded-lg bg-[var(--recruit-paper)] p-4">
                {design ? (
                  <img
                    src={STUDIO_VISUALS.project.file[0]}
                    alt=""
                    className="studio-reference-icon self-start mt-1"
                  />
                ) : (
                  <FileText
                    size={18}
                    className="mt-1 shrink-0 text-[var(--recruit-brand)]"
                  />
                )}
                <div>
                  <p className="text-xs text-[var(--recruit-muted)]">
                    Inspired by this project
                  </p>
                  <p className="mt-1 text-sm">{projectName}</p>
                </div>
              </div>
              <label className="block">
                What do you need?
                <span className="project-enquiry-select">
                  <select
                    aria-label="What do you need?"
                    value={form.service}
                    onChange={(event) =>
                      setForm({ ...form, service: event.target.value })
                    }
                    className="mt-2 block w-full"
                  >
                    {[
                      "Product design & UX",
                      "Full-stack web development",
                      "Design & development",
                      "APIs & integrations",
                      "Not sure yet",
                    ].map((service) => (
                      <option key={service}>{service}</option>
                    ))}
                  </select>
                  {design && (
                    <img
                      src={STUDIO_VISUALS.project.serviceCaret[0]}
                      alt=""
                      className="studio-reference-icon"
                    />
                  )}
                </span>
              </label>
              <label className="block">
                Tell us about your project{" "}
                <span className="text-[var(--recruit-brand)]">*</span>
                <textarea
                  required
                  rows={4}
                  maxLength={3000}
                  value={form.brief}
                  onChange={(event) =>
                    setForm({ ...form, brief: event.target.value })
                  }
                  placeholder="What would you like to build or improve? Who is it for?"
                  className="mt-2 block w-full resize-y px-4 py-3"
                />
              </label>
              <label className="block">
                Your ideal timeline
                <span className="project-enquiry-select">
                  <select
                    aria-label="Your ideal timeline"
                    value={form.timeline}
                    onChange={(event) =>
                      setForm({ ...form, timeline: event.target.value })
                    }
                    className="mt-2 block w-full"
                  >
                    {[
                      "Still exploring",
                      "Within 1–3 months",
                      "Within 3–6 months",
                      "More than 6 months",
                    ].map((timeline) => (
                      <option key={timeline}>{timeline}</option>
                    ))}
                  </select>
                  {design && (
                    <img
                      src={STUDIO_VISUALS.project.timelineCaret[0]}
                      alt=""
                      className="studio-reference-icon"
                    />
                  )}
                </span>
              </label>
            </>
          )}
          {step === 2 && (
            <>
              <Summary entries={summary} />
              <div className="rounded-lg bg-[var(--recruit-paper)] p-4">
                <p className="mb-2 text-xs font-medium">Your project</p>
                <p className="whitespace-pre-wrap break-words text-sm leading-6">
                  {form.brief}
                </p>
              </div>
              <p className="text-sm leading-6 text-[var(--recruit-muted)]">
                Have a preferred time for a conversation? These are preferences
                only, not a confirmed booking.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  Preferred date{" "}
                  <Input
                    type="date"
                    value={form.date}
                    onChange={(event) =>
                      setForm({ ...form, date: event.target.value })
                    }
                    className="mt-2"
                  />
                </label>
                <label>
                  Preferred time
                  <span className="project-enquiry-select">
                    <select
                      aria-label="Preferred time"
                      value={form.time}
                      onChange={(event) =>
                        setForm({ ...form, time: event.target.value })
                      }
                      className="mt-2 block w-full"
                    >
                      {[
                        "No preference",
                        "09:00",
                        "10:30",
                        "13:30",
                        "15:00",
                        "16:30",
                      ].map((time) => (
                        <option key={time}>{time}</option>
                      ))}
                    </select>
                    {design && (
                      <img
                        src={STUDIO_VISUALS.review.timeCaret[0]}
                        alt=""
                        className="studio-reference-icon"
                      />
                    )}
                  </span>
                </label>
              </div>
              <p className="text-xs leading-6 text-[var(--recruit-muted)]">
                Times are UK local time (GMT or BST, depending on the date).
                Choosing a time does not reserve a meeting.
              </p>
            </>
          )}
          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-2 rounded-lg border border-black/5 px-4 py-3 text-sm"
              >
                {design ? (
                  <img
                    src={
                      step === 2
                        ? STUDIO_VISUALS.review.back[0]
                        : STUDIO_VISUALS.project.back[0]
                    }
                    alt=""
                    className="studio-reference-icon"
                  />
                ) : (
                  <ArrowLeft size={14} />
                )}
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 bg-[var(--recruit-brand)] px-5 py-3 text-white"
            >
              {step < 2 ? "Continue" : "Prepare project brief"}
              {design ? (
                <img
                  src={
                    step === 0
                      ? STUDIO_VISUALS.details.continue[0]
                      : step === 1
                        ? STUDIO_VISUALS.project.continue[0]
                        : STUDIO_VISUALS.review.prepare[0]
                  }
                  alt=""
                  className="studio-reference-icon"
                />
              ) : (
                <ArrowRight size={16} />
              )}
            </button>
          </div>
        </form>
      )}
    </RecruitmentDialog>
  )
}

function Summary({ entries }: { entries: string[][] }) {
  return (
    <dl className="project-enquiry-summary grid gap-4 rounded-lg bg-[var(--recruit-paper)] p-4 sm:grid-cols-2">
      {entries.map(([label, value]) => (
        <div
          key={label}
          className={label === "Preferred call" ? "sm:col-span-2" : ""}
        >
          <dt className="text-xs text-[var(--recruit-muted)]">{label}</dt>
          <dd className="mt-1 break-words text-sm leading-6">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
