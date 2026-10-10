import { useRef, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Check, X } from 'lucide-react';
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
              <div className="recruit-dialog-topline"><div className="recruit-dialog-wordmark">mployus<span>recruit.</span></div><Dialog.Close aria-label={`Close ${eyebrow.toLowerCase()}`} className="recruit-dialog-close"><X size={18} /></Dialog.Close></div>
              <div className="recruit-dialog-eyebrow"><span>{eyebrow}</span><span>Ireland & UK</span></div>
              <Dialog.Title className="recruit-dialog-title">{title}</Dialog.Title>
              <Dialog.Description className="recruit-dialog-description">{description}</Dialog.Description>
              {steps.length > 0 && <ol className="recruit-dialog-steps" aria-label="Your progress">{steps.map((step, index) => <li key={step} aria-current={index === currentStep ? 'step' : undefined} data-active={index <= currentStep}><span>{index < currentStep ? <Check size={12} /> : index + 1}</span><div>{step}</div></li>)}</ol>}
            </header>
            <div className="recruit-dialog-body">{children}</div>
            <footer className="recruit-dialog-footer"><span>{headline.replace(/\n/g, ' ')}</span><p>Preview only · Accounts and submissions are not connected.</p></footer>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
