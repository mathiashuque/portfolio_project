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
    <div key={activeKey} className="animate-[fadeSlide_1000ms_ease-out] mt-8">
      {tab.kind === "bio" ? (
        <AboutBio tab={tab} />
      ) : tab.kind === "services" ? (
        <AboutServices tab={tab} />
      ) : (
        <AboutImpact tab={tab} />
      )}
    </div>
  );
}
