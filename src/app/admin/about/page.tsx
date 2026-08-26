import { getAboutPrinciples, getAchievements, getFounder, getAboutStory } from "@/actions/about";
import AboutEditor from "@/components/admin/about/AboutEditor";
import { type FounderData } from "@/components/admin/about/FounderForm";
import { type StoryData } from "@/components/admin/about/StoryForm";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const [whyChooseUs, workPrinciples, achievements, founder, story] = await Promise.all([
    getAboutPrinciples("why_choose_us"),
    getAboutPrinciples("work_principles"),
    getAchievements(),
    getFounder(),
    getAboutStory(),
  ]);

  return (
    <AboutEditor
      initialWhyChooseUs={whyChooseUs}
      initialWorkPrinciples={workPrinciples}
      initialAchievements={achievements}
      initialFounder={founder as FounderData | null}
      initialStory={story as StoryData | null}
    />
  );
}
