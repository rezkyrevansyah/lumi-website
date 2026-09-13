import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";
import { Pricing } from "@/components/sections/Pricing";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

type Props = PageProps<"/[locale]">;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <TechStack />
      <Pricing />
      <Portfolio />
      <Testimonials />
      <FinalCta />
    </>
  );
}
