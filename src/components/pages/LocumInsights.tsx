import { LOCUM_VISUALS } from "../../data/locumVisuals"
import { ArrowDown, ArrowUpRight, BookOpen, MapPin } from "lucide-react"

type Insight = {
  title: string
  subtitle: string
  tag: string
  read: string
  date: string
  img: string
  audience: string[]
  featured: boolean
}

interface LocumInsightsProps {
  articles: Insight[]
  audience: "all" | "IE" | "UK"
  category: string
  onAudience: (audience: "all" | "IE" | "UK") => void
  onCategory: (category: string) => void
  onRead: (article: Insight) => void
  onFindShifts: () => void
}

export function LocumInsights({
  articles,
  audience,
  category,
  onAudience,
  onCategory,
  onRead,
  onFindShifts,
}: LocumInsightsProps) {
  const lead = articles.find((article) => article.featured) ?? articles[0]
  const remaining = articles.filter((article) => article !== lead)
  const countryLabel = (article: Insight) =>
    article.audience.length > 1
      ? "Ireland & UK"
      : article.audience[0] === "IE"
        ? "Ireland"
        : "United Kingdom"

  return (
    <div className="locum-journal locum-surface min-h-screen bg-[#fafbf8] pt-[70px] font-sans text-[#20382c]">
      <header className="site-container pb-12 pt-12 md:pb-16 md:pt-20">
        <div className="grid gap-8 pt-9 md:grid-cols-[1.5fr_1fr] md:items-end md:gap-16">
          <h1 className="text-hero font-normal font-display">
            A fresh perspective
            <br />
            on{" "}
            <span className="font-display text-[#368B62]">
              life in locum.
            </span>
          </h1>
          <div className="max-w-sm pb-1">
            <p className="text-body text-[#53685b]">
              The people, practical guides and local knowledge behind a more
              rewarding healthcare career. For professionals and employers
              across Ireland and the UK.
            </p>
          </div>
        </div>
      </header>

      <section
        id="locum-journal-stories"
        aria-label="Browse insights"
        className="scroll-mt-24 bg-white"
      >
        <div className="site-container py-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div
              aria-label="Filter insights by country"
              className="grid w-full grid-cols-3 gap-1 rounded-full bg-[#f2f5ef] p-1.5 sm:flex sm:w-auto sm:flex-wrap sm:gap-2"
            >
              {([
                { id: "all", label: "All insights", short: "All" },
                { id: "IE", label: "Insights for Ireland", short: "Ireland" },
                { id: "UK", label: "Insights for UK", short: "UK" },
              ] as const).map((option) => (
                <button
                  key={option.id}
                  onClick={() => onAudience(option.id)}
                  aria-pressed={audience === option.id}
                  aria-label={option.label}
                  className={`rounded-full px-4 py-2.5 text-control font-medium transition-colors ${
                    audience === option.id
                      ? "bg-[#368B62] text-white"
                      : "text-[#53685b] hover:bg-[#e6ede3]"
                  }`}
                >
                  {/* Short labels keep the three options on one row on phones. */}
                  <span className="sm:hidden">{option.short}</span>
                  <span className="hidden sm:inline">{option.label}</span>
                </button>
              ))}
            </div>
            <p aria-live="polite" className="text-caption text-[#53685b]">
              {articles.length} {articles.length === 1 ? "story" : "stories"} ·{" "}
              {audience === "all"
                ? "Ireland & UK"
                : audience === "IE"
                  ? "Ireland"
                  : "United Kingdom"}
            </p>
          </div>
          <div
            aria-label="Filter insights by topic"
            className="mt-6 flex flex-wrap gap-x-7 gap-y-3 border-b border-black/5 pb-5"
          >
            {[
              "All",
              "Salary Guide",
              "Compliance",
              "Market Report",
              "Career",
            ].map((topic) => (
              <button
                key={topic}
                aria-pressed={category === topic}
                onClick={() => onCategory(topic)}
                className={`text-control transition-colors ${
                  category === topic
                    ? "font-semibold text-[#368B62] underline decoration-[#368B62] underline-offset-8"
                    : "text-[#53685b] hover:text-[#368B62]"
                }`}
              >
                {topic === "All" ? "Every perspective" : topic}
              </button>
            ))}
          </div>

          {lead ? (
            <button
              onClick={() => onRead(lead)}
              className="group my-9 grid w-full overflow-hidden rounded-[24px] bg-[#edf2e9] text-left md:my-12 md:grid-cols-[1.2fr_1fr]"
            >
              <div className="relative min-h-64 overflow-hidden md:min-h-[420px]">
                <img
                  src={lead.img}
                  alt=""
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
                />
                <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-caption font-semibold uppercase tracking-widest">
                  The lead story
                </span>
              </div>
              <div className="flex flex-col justify-center p-7 md:p-10">
                <p className="mb-5 flex items-center gap-2 text-eyebrow font-semibold uppercase text-[#368B62]">
                  {lead.tag}
                  <span className="text-[#8c9d90]">/</span>
                  {countryLabel(lead)}
                </p>
                <h2 className="font-display text-section font-normal">
                  {lead.title}
                </h2>
                <p className="mt-5 text-body text-[#53685b]">
                  {lead.subtitle}
                </p>
                <div className="mt-8 flex items-center justify-between gap-3 border-t border-black/5 pt-5">
                  <span className="text-caption text-[#53685b]">
                    {lead.date} · {lead.read} read
                  </span>
                  <span className="flex size-11 items-center justify-center rounded-full bg-[#368B62] text-white transition-transform motion-safe:group-hover:rotate-45">
                    <img
                      src={LOCUM_VISUALS.journal.leadArrow[0]}
                      alt=""
                      className="locum-reference-icon"
                    />
                  </span>
                </div>
              </div>
            </button>
          ) : (
            <div className="py-16 text-center">
              <h2 className="text-title font-sans font-semibold">A new perspective is on its way.</h2>
              <p className="mt-3 text-body text-[#53685b]">
                No stories match this country and topic yet.
              </p>
              <button
                onClick={() => {
                  onAudience("all")
                  onCategory("All")
                }}
                className="mt-6 rounded-full bg-[#368B62] px-6 py-3 text-control text-white"
              >
                Show all insights
              </button>
            </div>
          )}

          {remaining.length > 0 && (
            <div className="pb-12">
              <div className="mb-7 flex items-baseline justify-between">
                <h2 className="text-title font-semibold font-sans">More worth reading</h2>
                <span className="text-caption uppercase tracking-widest text-[#53685b]">
                  The reading list
                </span>
              </div>
              <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
                {remaining.map((article, index) => (
                  <button
                    key={article.title}
                    onClick={() => onRead(article)}
                    className="group grid grid-cols-[100px_1fr] gap-5 border-t border-black/5 pt-6 text-left sm:grid-cols-[145px_1fr]"
                  >
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#edf2e9]">
                      <img
                        loading="lazy"
                        src={article.img}
                        alt=""
                        className="size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-eyebrow font-semibold uppercase text-[#368B62]">
                        {article.tag} · {countryLabel(article)}
                      </p>
                      <h3 className="mt-3 text-title font-semibold transition-colors group-hover:text-[#368B62] font-sans">
                        {article.title}
                      </h3>
                      <p className="mt-2 hidden text-body text-[#53685b] sm:line-clamp-2">
                        {article.subtitle}
                      </p>
                      <div className="mt-auto flex items-center justify-between gap-2 pt-4 text-caption text-[#53685b]">
                        <span>
                          {article.date} · {article.read} read
                        </span>
                        <img
                          src={
                            LOCUM_VISUALS.journal.storyArrows[
                              index % LOCUM_VISUALS.journal.storyArrows.length
                            ]
                          }
                          alt=""
                          className="locum-reference-icon"
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <p className="border-t border-black/5 py-6 text-caption text-[#53685b]">
            Salary figures are indicative. Confirm current requirements with the
            relevant regulator. Guides covering both
            countries appear in both filters.
          </p>
        </div>
      </section>
      <aside className="site-container grid gap-6 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-20">
        <div>
          <p className="mb-4 flex items-center gap-2 text-eyebrow font-semibold uppercase text-[#368B62]">
            <img
              src={LOCUM_VISUALS.journal.location[0]}
              alt=""
              className="locum-reference-icon"
            />{" "}
            Local knowledge. Real opportunities.
          </p>
          <h2 className="font-display text-section font-normal">
            Your next chapter starts with a shift.
          </h2>
          <p className="mt-3 text-body text-[#53685b]">
            Put your perspective into practice. Explore opportunities across
            Ireland and the UK.
          </p>
        </div>
        <button
          onClick={onFindShifts}
          className="inline-flex w-fit items-center gap-5 rounded-full bg-[#368B62] px-7 py-4 text-control font-medium text-white transition-colors hover:bg-[#276647]"
        >
          Explore available shifts{" "}
          <img
            src={LOCUM_VISUALS.journal.ctaArrow[0]}
            alt=""
            className="locum-reference-icon"
          />
        </button>
      </aside>
    </div>
  )
}
