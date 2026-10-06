import { useState } from "react";
import { Pause, Play, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee-03-utils/marquee";

export type Review = {
  name: string;
  username: string;
  body: string;
  profile?: string;
};

const reviews: Review[] = [
  {
    name: "Ken Masters",
    username: "@kmasters",
    body: "“Our productivity has nearly doubled since onboarding. Automation features removed repetitive tasks, allowing our team to focus on building instead of managing operations.”",
    profile: "https://cdn.21st.dev/assets/localized/b539abc60701ab9cbcd73f9241d13a14a09582a4fd06c65784cb5567d77a2e0e.webp",
  },
  {
    name: "Kira Athrun",
    username: "@kathrun",
    body: "“What surprised us most was how quickly our team adapted. Minimal learning curve, excellent documentation, and powerful features make it a must-have for modern SaaS companies.”",
    profile: "https://cdn.21st.dev/assets/localized/2bc5f22fa3400c61a2161d14e3dce5a0804badebfc1b3d9cbe844feaa3b72180.webp",
  },
  {
    name: "Lirael Nassun",
    username: "@lnassun",
    body: "“This is easily one of the most reliable SaaS tools we’ve adopted. The UI is intuitive, integrations are seamless, and it saves us countless hours every week.”",
    profile: "https://cdn.21st.dev/assets/localized/e1e172821860559f890ef5ef7c14cc66a6c1ec001f3bbeb6dddd349c0081dd6b.webp",
  },
  {
    name: "Jessica",
    username: "@jessica",
    body: "Switching to this platform streamlined our entire workflow. Setup was effortless, performance improved instantly, and our team now ships features faster without worrying about infrastructure.",
    profile: "https://cdn.21st.dev/assets/localized/61fda783ca2662349458bad61a434038016f05d6a14bd7c5a314f48c8ee8be03.webp",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "“We evaluated multiple solutions, but this stood out immediately. It’s fast, scalable, and thoughtfully designed for growing teams that need stability without added complexity.”",
    profile: "https://cdn.21st.dev/assets/localized/c5ee2e124ea7334450d30a46607f793534f567e97d4b708cda110a06aeed4953.webp",
  },
];

const sampleReviews = [...reviews, reviews[1], reviews[0]];

function ReviewCard({ profile, name, username, body }: Review) {
  return (
    <Card className="relative w-full overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-none">
      <CardContent className="flex flex-col gap-4 p-0 [&:last-child]:pb-0">
        <div className="flex items-center gap-3">
          {profile ? (
            <img className="h-10 w-10 rounded-full object-cover" width="40" height="40" alt="" src={profile} loading="lazy" />
          ) : (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary" aria-hidden="true">{name[0]}</span>
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{username}</p>
          </div>
          <Quote className="ml-auto h-5 w-5 shrink-0 text-primary/40" aria-hidden="true" />
        </div>
        <blockquote className="text-sm leading-relaxed text-foreground">{body}</blockquote>
      </CardContent>
    </Card>
  );
}

export default function VerticalMarqueeDemo({ reviews: items = sampleReviews }: { reviews?: Review[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <div>
      <div role="region" aria-label="Community testimonials" tabIndex={0} className="mployus-testimonial-marquee relative flex h-125 w-full overflow-hidden rounded-3xl bg-primary/5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-black/5">
        <div className="flex h-full w-full gap-4 px-4 sm:px-6">
          {[2, 3].map(columnCount => (
            <div key={columnCount} className={`h-full w-full gap-4 ${columnCount === 2 ? "hidden sm:flex lg:hidden" : "hidden lg:flex"}`}>
              {Array.from({ length: columnCount }, (_, column) => (
                <Marquee key={column} reverse={column === 1} pauseOnHover vertical paused={paused} className="h-full flex-1 [--duration:28s]">
                  {items.filter((_, index) => index % columnCount === column).map((review, index) => <ReviewCard key={`${review.name}-${index}`} {...review} />)}
                </Marquee>
              ))}
            </div>
          ))}
          <Marquee pauseOnHover vertical paused={paused} className="flex h-full flex-1 sm:hidden [--duration:28s]">
            {items.map((review, index) => <ReviewCard key={`${review.name}-${index}`} {...review} />)}
          </Marquee>
        </div>
        <div aria-hidden="true" className="mployus-marquee-fade pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-background to-transparent" />
        <div aria-hidden="true" className="mployus-marquee-fade pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background to-transparent" />
      </div>
      <div className="mployus-marquee-controls mt-4 flex justify-center">
        <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Resume testimonial animation" : "Pause testimonial animation"} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-black/5">
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          {paused ? "Resume animation" : "Pause animation"}
        </button>
      </div>
    </div>
  );
}
