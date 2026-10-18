import React from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import type { ModalTone } from "../../data/modalTones"
import { ProductModule } from "../../types"
import { RecruitmentDialog } from "../RecruitmentDialog"

interface ModuleDetailModalProps {
  module: ProductModule | null
  isOpen: boolean
  onClose: () => void
  onBookDemo: (moduleTitle: string) => void
  tone?: ModalTone
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({
  module,
  isOpen,
  onClose,
  onBookDemo,
  tone = "navy",
}) => {
  if (!isOpen || !module) return null

  return (
    <RecruitmentDialog
      onClose={onClose}
      tone={tone}
      eyebrow={`${module.title} details`}
      title={module.title}
      description={module.tagline}
      footer={null}
    >
      <div className="space-y-6">
        <section>
          <h3 className="text-xs text-[#6a7282]">What it does</h3>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {module.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 rounded-lg border border-black/5 p-3.5 text-sm leading-6">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--recruit-brand)]" />
                {feature}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl bg-[var(--recruit-tint)] p-4">
          <h3 className="text-xs text-[var(--recruit-brand)]">Built for</h3>
          <p className="mt-1 text-sm leading-6">{module.useCase}</p>
        </section>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[var(--recruit-paper)] p-4 text-sm">
          <span className="text-[#6a7282]">Connected with every MployUs module</span>
          <span className="font-medium text-[var(--recruit-brand)]">{module.metrics}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            onClose()
            onBookDemo(module.title)
          }}
          className="flex w-full items-center justify-center gap-2 bg-[var(--recruit-brand)] px-5 py-3 text-white"
        >
          Book a demo for {module.title} <ArrowRight className="size-4" />
        </button>
      </div>
    </RecruitmentDialog>
  )
}
