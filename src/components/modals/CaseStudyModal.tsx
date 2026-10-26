import React from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import type { ModalTone } from "../../data/modalTones"
import { RecruitmentDialog } from "../RecruitmentDialog"

interface CaseStudyModalProps {
  isOpen: boolean
  onClose: () => void
  onBookDemo: () => void
  tone?: ModalTone
}

const OUTCOMES = [
  ["18 hrs/wk", "Admin reclaimed"],
  ["99.8%", "eMAR accuracy"],
  ["14 mins", "Average locum fill"],
] as const
const SOLUTION = [
  "Unified applicant tracking with automated DBS verification reduced hiring time from 24 days to 7 days.",
  "Replaced paper MAR charts with the MployUs eMAR app, eliminating medication record omissions.",
  "Integrated rotas with one-tap locum broadcast, filling emergency night shifts in under 15 minutes.",
] as const

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose, onBookDemo, tone = "navy" }) => {
  if (!isOpen) return null

  return (
    <RecruitmentDialog
      onClose={onClose}
      tone={tone}
      eyebrow="Case study"
      title="Meadowview Care Group."
      description="How a 120-bed residential group reduced admin by 18 hours a week."
      footer={null}
    >
      <div className="space-y-6">
        <dl className="grid grid-cols-3 gap-2.5">
          {OUTCOMES.map(([value, label]) => (
            <div key={label} className="flex flex-col-reverse rounded-lg border border-black/5 p-3.5 text-center">
              <dt className="mt-1 text-xs text-[#6a7282]">{label}</dt>
              <dd className="text-xl text-[var(--recruit-brand)]">{value}</dd>
            </div>
          ))}
        </dl>
        <section>
          <h3 className="text-lg">The challenge</h3>
          <p className="mt-2 text-sm leading-6 text-[#6a7282]">
            Meadowview operated three sites with disconnected systems for hiring, paper care plans,
            messaging-app shift requests and spreadsheet rotas. Staff spent 2.5 hours a day on
            repetitive admin.
          </p>
        </section>
        <section>
          <h3 className="text-lg">The MployUs solution</h3>
          <ul className="mt-3 space-y-2.5">
            {SOLUTION.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-[var(--recruit-brand)]" />
                {item}
              </li>
            ))}
          </ul>
        </section>
        <blockquote className="rounded-xl bg-[var(--recruit-tint)] p-4 text-sm leading-6">
          “MployUs completely transformed our operations. Inspectors called our digital care records a
          gold standard for residential care.”
          <footer className="mt-2 text-xs text-[var(--recruit-brand)]">Eleanor Vance, Operations Director</footer>
        </blockquote>
        <button
          type="button"
          onClick={() => {
            onClose()
            onBookDemo()
          }}
          className="flex w-full items-center justify-center gap-2 bg-[var(--recruit-brand)] px-5 py-3 text-white"
        >
          Book a demo <ArrowRight className="size-4" />
        </button>
      </div>
    </RecruitmentDialog>
  )
}
