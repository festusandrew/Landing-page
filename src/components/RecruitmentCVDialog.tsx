import { useState } from 'react';
import { Check, FileText, Upload } from 'lucide-react';
import { RecruitmentDialog } from './RecruitmentDialog';

export function RecruitmentCVDialog({ onClose }: { onClose: () => void }) {
  const [ready, setReady] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState({ name: '', email: '', profession: '', region: 'Ireland' });
  function selectFile(candidate?: File) {
    if (!candidate) return;
    if (!/\.(pdf|doc|docx)$/i.test(candidate.name) || candidate.size > 5 * 1024 * 1024) {
      setError('Choose a PDF or Word document no larger than 5 MB.');
      setFile(null);
      return;
    }
    setFile(candidate);
    setError('');
  }
  return <RecruitmentDialog onClose={onClose} title={ready ? 'Your next chapter starts here.' : 'Tell us a little about you.'} description={ready ? 'Your profile is prepared locally, ready for your next step.' : 'Bring your experience. We’ll help you explore what comes next.'} headline={'Your experience.\nNew possibilities.'} eyebrow="Candidate profile" steps={['Your details & CV', 'Profile preview']} currentStep={ready ? 1 : 0}>
    {ready ? <div className="space-y-6 py-4 text-center">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[var(--recruit-tint)] text-[var(--recruit-brand)]"><Check className="size-7" /></span>
      <h2 className="text-2xl">Your profile preview is ready.</h2>
      <p className="text-sm leading-6 text-[var(--recruit-muted)]">{profile.name} · {profile.profession}<br />{profile.region} · {profile.email}</p>
      <div className="flex items-center gap-3 rounded-xl bg-[var(--recruit-paper)] p-4 text-left"><FileText className="size-5 shrink-0 text-[var(--recruit-brand)]" /><p className="break-all text-sm">{file?.name}</p></div>
      <p className="text-sm leading-7 text-[var(--recruit-muted)]">Your CV has not been uploaded or sent. This preview only selects a file on your device; a live submission service needs to be connected.</p>
      <div className="flex gap-3"><button onClick={() => setReady(false)} className="flex-1 rounded-full border border-black/5 px-4 py-3 text-sm">Edit profile</button><button onClick={onClose} className="flex-1 bg-[var(--recruit-brand)] px-4 py-3 text-white">Done</button></div>
    </div> : <form onSubmit={event => { event.preventDefault(); if (file) setReady(true); else setError('Please choose your CV to continue.'); }} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-medium">Full name <span className="text-[var(--recruit-brand)]">*</span><input required name="name" autoComplete="name" value={profile.name} onChange={event => setProfile({ ...profile, name: event.target.value })} placeholder="Your full name" className="mt-2 block w-full px-4 py-3 text-sm" /></label><label className="text-xs font-medium">Email address <span className="text-[var(--recruit-brand)]">*</span><input required type="email" name="email" autoComplete="email" value={profile.email} onChange={event => setProfile({ ...profile, email: event.target.value })} placeholder="you@example.com" className="mt-2 block w-full px-4 py-3 text-sm" /></label></div>
      <label className="block text-xs font-medium">Profession / job title <input required name="profession" value={profile.profession} onChange={event => setProfile({ ...profile, profession: event.target.value })} placeholder="e.g. Staff nurse" className="mt-2 block w-full px-4 py-3 text-sm" /></label>
      <label className="block text-xs font-medium">Where are you looking to work?<select name="region" value={profile.region} onChange={event => setProfile({ ...profile, region: event.target.value })} className="mt-2 block w-full px-4 py-3 text-sm">{['Ireland', 'Northern Ireland', 'England', 'Wales', 'Scotland', 'Multiple regions'].map(region => <option key={region}>{region}</option>)}</select></label>
      <label className="recruit-dialog-upload" onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); selectFile(event.dataTransfer.files[0]); }}>
        <Upload className="size-6" /><span className="text-sm font-medium">{file ? file.name : 'Choose a CV or drop it here'}</span><small>PDF or Word document · up to 5 MB</small>
        <input type="file" accept=".pdf,.doc,.docx" aria-label="Choose your CV" className="max-w-full text-xs" onChange={event => selectFile(event.target.files?.[0])} />
      </label>
      {error && <p role="alert" className="text-xs text-[var(--recruit-brand)]">{error}</p>}
      <p className="text-xs leading-6 text-[var(--recruit-muted)]">Preview only. No file or personal details will be sent.</p>
      <button type="submit" className="flex w-full items-center justify-center gap-2 bg-[var(--recruit-brand)] px-5 py-3 text-white">Prepare profile <Upload className="size-4" /></button>
    </form>}
  </RecruitmentDialog>;
}
