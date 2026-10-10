import { useRef, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, Check, Sparkles, X } from 'lucide-react';
import './recruitment-dialog.css';

type Props = {
  onClose: () => void;
  title: string;
  description: string;
  headline: string;
  eyebrow: string;
  steps?: readonly string[];
  currentStep?: number;
  children: ReactNode;
};

/** Recruitment-only shell; Radix owns focus, dismissal and scroll locking. */
export function RecruitmentDialog({ onClose, title, description, headline, eyebrow, steps = [], currentStep = 0, children }: Props) {
  const returnFocus = useRef(document.activeElement as HTMLElement | null);
  return (
    <Dialog.Root open onOpenChange={open => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="recruit-dialog-overlay" />
        <Dialog.Content className="recruit-dialog" onCloseAutoFocus={event => {
          event.preventDefault();
          if (returnFocus.current?.isConnected) returnFocus.current.focus();
        }}>
          <aside className="recruit-dialog-story">
            <div className="recruit-dialog-wordmark">mployus<span>recruit.</span></div>
            <div className="recruit-dialog-orbit" aria-hidden="true"><span /><span /><ArrowUpRight /></div>
            <div className="recruit-dialog-pitch"><p>{eyebrow}</p><div>{headline}</div></div>
            {steps.length > 0 ? <ol className="recruit-dialog-steps" aria-label="Your progress">{steps.map((step, index) => <li key={step} aria-current={index === currentStep ? 'step' : undefined} data-active={index <= currentStep}><span>{index < currentStep ? <Check size={14} /> : `0${index + 1}`}</span><div>{step}</div></li>)}</ol> : <div className="recruit-dialog-promise"><Sparkles size={16} /><span>Good people.<br />Great potential.</span></div>}
            <div className="recruit-dialog-note"><span>Ireland & UK</span><p>Design preview. Accounts and submissions are not connected.</p></div>
          </aside>
          <div className="recruit-dialog-main">
            <header className="recruit-dialog-header">
              <div className="recruit-dialog-topline"><span>{eyebrow}</span><Dialog.Close aria-label={`Close ${eyebrow.toLowerCase()}`} className="recruit-dialog-close"><X size={18} /></Dialog.Close></div>
              <Dialog.Title className="recruit-dialog-title">{title}</Dialog.Title>
              <Dialog.Description className="recruit-dialog-description">{description}</Dialog.Description>
              {steps.length > 0 && <div className="recruit-dialog-progress"><div><span>{currentStep >= steps.length ? 'Ready to review' : `Step ${currentStep + 1} of ${steps.length}`}</span><span>{steps[Math.min(currentStep, steps.length - 1)]}</span></div><div aria-hidden="true">{steps.map((step, index) => <span key={step} data-active={index <= currentStep} />)}</div></div>}
            </header>
            <div className="recruit-dialog-body">{children}</div>
            <footer className="recruit-dialog-footer">Your next chapter. Our shared ambition.</footer>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
