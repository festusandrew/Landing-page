import { useRef, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
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
export function RecruitmentDialog({ onClose, title, description, eyebrow, steps = [], currentStep = 0, children }: Props) {
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
            <Dialog.Close aria-label={`Close ${eyebrow.toLowerCase()}`} className="recruit-dialog-close"><X size={18} /></Dialog.Close>
            <header className="recruit-dialog-header">
              <Dialog.Title className="recruit-dialog-title">{title}</Dialog.Title>
              <Dialog.Description className="recruit-dialog-description">{description}</Dialog.Description>
              {steps.length > 0 && <div className="recruit-dialog-progress" aria-label="Your progress">
                <p>{currentStep >= steps.length ? 'Preview ready' : `Step ${currentStep + 1} of ${steps.length}`}<span>{steps[Math.min(currentStep, steps.length - 1)]}</span></p>
                <div aria-hidden="true">{steps.map((step, index) => <span key={step} data-active={index <= currentStep} />)}</div>
              </div>}
            </header>
            <div className="recruit-dialog-body">{children}</div>
            <footer className="recruit-dialog-footer">Preview only · No live submissions.</footer>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
