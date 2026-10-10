import { useRef, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Check, X } from 'lucide-react';
import { recruitmentAssets as assets } from './RecruitmentReferenceAssets';
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
          <div className="recruit-dialog-main">
            <header className="recruit-dialog-header">
              <div className="recruit-dialog-topline"><img className="recruit-dialog-logo" src={assets.logo} alt="MployUs Ireland" /><Dialog.Close aria-label={`Close ${eyebrow.toLowerCase()}`} className="recruit-dialog-close"><X size={18} /></Dialog.Close></div>
              <div className="recruit-dialog-eyebrow"><span>{eyebrow}</span><span>Ireland & UK</span></div>
              <div className="recruit-dialog-intro">
                <div>
                  <Dialog.Title className="recruit-dialog-title">{title}</Dialog.Title>
                  <Dialog.Description className="recruit-dialog-description">{description}</Dialog.Description>
                </div>
              </div>
              {steps.length > 0 && <ol className="recruit-dialog-steps" aria-label="Your progress">{steps.map((step, index) => <li key={step} aria-current={index === currentStep ? 'step' : undefined} data-active={index <= currentStep}><span>{index < currentStep ? <Check size={12} /> : index + 1}</span><div>{step}</div></li>)}</ol>}
            </header>
            <div className="recruit-dialog-body">{children}</div>
            <footer className="recruit-dialog-footer"><span>{headline.replace(/\n/g, ' ')}</span><p>Preview only · Accounts and submissions are not connected.</p></footer>
          </div>
          <aside className="recruit-dialog-aside">
            <div className="recruit-dialog-aside-content">
              <div className="recruit-dialog-feature-icon"><img src={assets.register} alt="" /></div>
              <h2>{headline}</h2>
              <p>A clear next step for your career or your team, across Ireland and the UK.</p>
              {steps.length > 0 && <ol aria-label="Your journey">{steps.map((step, index) => <li key={step} aria-current={index === currentStep ? 'step' : undefined} data-active={index <= currentStep}><span>{index < currentStep ? <img src={assets.check} alt="" /> : index + 1}</span>{step}</li>)}</ol>}
              <div className="recruit-dialog-aside-note">Your details stay in this preview.<br />Nothing is submitted to a live service.</div>
            </div>
          </aside>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
