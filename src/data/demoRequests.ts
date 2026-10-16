export const DEMO_MODULES = [
  { id: "recruitment", label: "Recruitment Software (ATS)" },
  { id: "care-management", label: "Care Management & eMAR" },
  { id: "locums-staffing", label: "Locums & Staffing App" },
  { id: "facility-management", label: "Facility Operations Portal" },
] as const

export type DemoModuleId = (typeof DEMO_MODULES)[number]["id"]

const MODULE_ALIASES: Record<string, DemoModuleId> = {
  recruitment: "recruitment",
  "recruitment-software": "recruitment",
  "recruitment software": "recruitment",
  "care-management": "care-management",
  "care management software": "care-management",
  "locums-staffing": "locums-staffing",
  "locum-provision": "locums-staffing",
  "locum provision": "locums-staffing",
  "facility-management": "facility-management",
  "facility operations": "facility-management",
}

export function getDemoModuleSelection(context: string): DemoModuleId[] {
  const key = context.trim().toLowerCase()
  const module = Object.prototype.hasOwnProperty.call(MODULE_ALIASES, key)
    ? MODULE_ALIASES[key]
    : undefined
  return module ? [module] : DEMO_MODULES.map((item) => item.id)
}
