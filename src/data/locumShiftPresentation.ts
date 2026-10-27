/** Public shift metadata must not contain hourly rates or derived pay totals. */
export type PublicLocumShift = {
  facility: string
  location: string
  date: string
  time: string
  urgent: boolean
  specialisation: string
  description: string
  requirements: string[]
  dispensingSystem?: string
  availability?: string
}

const MONTHS: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
}

/** The town or district without its country code, e.g. "Dublin 2, IE" becomes "Dublin 2". */
export function getShiftArea(location: string) {
  return location.replace(/,\s*(IE|UK|NI)$/, "")
}

export function getPublicShiftDate(date: string) {
  const [, day, month] = date.split(" ")
  const monthNumber = MONTHS[month]
  if (!day || !monthNumber)
    return { iso: "", long: `${date} 2026`, short: `${date} 2026` }
  const iso = `2026-${monthNumber}-${day.padStart(2, "0")}`
  const parsed = new Date(`${iso}T12:00:00Z`)
  if (Number.isNaN(parsed.getTime()))
    return {
      iso: "",
      long: "Date to be confirmed",
      short: "Date to be confirmed",
    }
  return {
    iso,
    long: new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(parsed).replace(",", ""),
    short: new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    }).format(parsed),
  }
}

/** Area centres, not verified workplace coordinates. */
const AREA_CENTRES: [string, number, number][] = [
  ["Dublin 24", 53.291, -6.432],
  ["Dublin", 53.3498, -6.2603],
  ["Cork", 51.8985, -8.4756],
  ["Galway", 53.2707, -9.0568],
  ["Limerick", 52.6638, -8.6267],
  ["Waterford", 52.2593, -7.1101],
  ["London W2", 51.515, -0.183],
  ["London", 51.515, -0.143],
  ["Manchester", 53.4808, -2.2426],
  ["Birmingham", 52.4862, -1.8904],
  ["Belfast", 54.5973, -5.9301],
  ["Glasgow", 55.8642, -4.2518],
  ["Cardiff", 51.4816, -3.1791],
  // The reference shows the Barrow-in-Furness area of Cumbria.
  ["Cumbria", 54.1109, -3.2261],
]

export function getShiftAreaMap(location: string) {
  const area = AREA_CENTRES.find(([name]) =>
    location.toLowerCase().includes(name.toLowerCase()),
  )
  if (!area) return null
  const [, latitude, longitude] = area
  const bbox = [
    longitude - 0.07,
    latitude - 0.04,
    longitude + 0.07,
    latitude + 0.04,
  ].join(",")
  const url = new URL("https://www.openstreetmap.org/export/embed.html")
  url.searchParams.set("bbox", bbox)
  url.searchParams.set("layer", "mapnik")
  return {
    embed: url.href,
    external: `https://www.openstreetmap.org/#map=13/${latitude}/${longitude}`,
  }
}
