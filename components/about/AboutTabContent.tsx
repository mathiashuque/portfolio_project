import AboutBio from "./AboutBio";
import AboutServices from "./AboutServices";
import AboutImpact from "./AboutImpact";
import type { AboutTab } from "./types";

export default function AboutTabContent({
  tab,
  activeKey,
}: {
  tab: AboutTab;
  activeKey: string;
}) {
  return (
    <div
      className="
        mt-5
        min-h-75 sm:min-h-90 lg:min-h-100
        flex items-start
      "
    >
      <div key={activeKey} className="w-full animate-[fadeSlide_1000ms_ease-out]">
        {tab.kind === "bio" ? (
          <AboutBio tab={tab} />
        ) : tab.kind === "services" ? (
          <AboutServices tab={tab} />
        ) : (
          <AboutImpact tab={tab} />
        )}
      </div>
    </div>
  );
}
