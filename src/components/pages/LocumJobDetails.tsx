import { ArrowRight, Building2, FileText, ShieldCheck, Wallet } from "lucide-react";
import { Link } from "react-router";

type LocumJobDetailsProps = {
  reference: string;
  region: string;
  date: string;
  hours: number;
  totalPay: string;
  onEnquire: () => void;
};

export function LocumJobDetails({ reference, region, date, hours, totalPay, onEnquire }: LocumJobDetailsProps) {
  const groups = [
    {
      title: "Booking & contract", icon: FileText,
      fields: [
        ["Listing reference", reference],
        ["Country / region", region],
        ["Profession", "Locum Pharmacist"],
        ["Engagement", "Temporary locum cover; employment status to be agreed in writing"],
        ["Shift date", `${date} 2026 (sample date)`],
        ["Application deadline", "Not provided — confirm availability with the facility"],
        ["Number of vacancies", "Not provided by the facility"],
        ["Cancellation & notice", "To be confirmed in the booking agreement"],
      ],
    },
    {
      title: "Pay, hours & benefits", icon: Wallet,
      fields: [
        ["Estimated paid hours", `${hours} hours, assuming a 30-minute unpaid break`],
        ["Estimated gross shift pay", totalPay],
        ["Payment frequency & method", "Not provided — agree before accepting the shift"],
        ["Tax & deductions", "Depend on your engagement status and jurisdiction; estimate is before deductions"],
        ["Overtime & premiums", "Not provided — confirm any additional hours or weekend premiums"],
        ["Travel, accommodation & expenses", "Not specified; do not assume reimbursement"],
        ["Platform or booking fees", "Confirm the applicable written agreement"],
        ["Additional benefits", "Not specified by the facility"],
      ],
    },
    {
      title: "Workplace & practical details", icon: Building2,
      fields: [
        ["Exact address & arrival contact", "Not published in this preview — request before booking"],
        ["On-site team & reporting line", "Confirm staffing levels and the supervising contact"],
        ["Dispensing / clinical systems", "Confirm the PMR system and any training required"],
        ["Induction, handover & dress code", "Confirm with the facility before your first shift"],
        ["Parking & public transport", "Not provided — check the confirmed site address"],
        ["Access & reasonable adjustments", "Discuss any adjustments with the facility before booking"],
      ],
    },
    {
      title: "Eligibility & application", icon: ShieldCheck,
      fields: [
        ["Professional registration", region === "Republic of Ireland" ? "Active PSI registration" : region === "Northern Ireland" ? "Active PSNI registration" : "Active GPhC registration"],
        ["Background checks", region === "Republic of Ireland" ? "Role-appropriate Garda vetting" : region === "Scotland" ? "Role-appropriate Disclosure Scotland / PVG checks" : region === "Northern Ireland" ? "Role-appropriate AccessNI checks" : "Role-appropriate DBS checks"],
        ["Right to work & identity", "Evidence appropriate to the country and engagement"],
        ["Professional indemnity", "Confirm cover appropriate to the role and booking"],
        ["Experience & qualifications", "See the employer requirements above; clarify any unstated minimum"],
        ["Application process", "Complete the application, provide relevant compliance information and await review"],
        ["Confirmation", "An application is not a confirmed booking; agree the full brief and terms first"],
      ],
    },
  ];

  return (
    <div className="space-y-3 border-t border-black/5 pt-5">
      <h3 className="text-lg font-medium text-[#24332d]">The complete shift brief</h3>
      <p className="text-xs leading-6 text-slate-500">These are demonstration listings, not verified vacancies. The pay estimate uses the advertised hourly rate and an assumed 30-minute unpaid break. Missing employer details are marked below rather than inferred.</p>
      {groups.map(group => (
        <details key={group.title} open className="group rounded-2xl bg-[#f7f9f8] p-5">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-[#24332d]"><group.icon className="h-4 w-4 text-[#368B62]" />{group.title}<span className="ml-auto text-lg font-normal group-open:rotate-45 transition-transform">+</span></summary>
          <dl className="mt-5 grid gap-5 sm:grid-cols-2">
            {group.fields.map(([label, value]) => <div key={label}><dt className="text-[11px] font-medium text-slate-500">{label}</dt><dd className="mt-1 text-sm leading-6 text-[#24332d]">{value}</dd></div>)}
          </dl>
        </details>
      ))}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3"><button onClick={onEnquire} className="inline-flex items-center gap-2 text-xs font-semibold text-[#368B62]">Ask about this shift<ArrowRight className="h-3.5 w-3.5" /></button><div className="flex gap-4 text-xs text-slate-500"><Link to="/policies/terms" className="hover:text-[#368B62]">Booking terms</Link><Link to="/policies/privacy" className="hover:text-[#368B62]">Your privacy</Link></div></div>
    </div>
  );
}
