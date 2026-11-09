import { About } from "@/components/About";
import { Certifications } from "@/components/Certifications";
import { CommandPalette } from "@/components/CommandPalette";
import { ExperienceSection } from "@/components/ExperienceCard";
import { Footer } from "@/components/Footer";
import { Projects } from "@/components/Projects";
import { Sidebar } from "@/components/Sidebar";
import { Skills } from "@/components/Skills";
import { SkipLink } from "@/components/SkipLink";
import { Spotlight } from "@/components/Spotlight";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.headline.en,
  email: `mailto:${profile.email}`,
  url: profile.siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Depok",
    addressRegion: "West Java",
    addressCountry: "ID",
  },
  worksFor: { "@type": "Organization", name: "PT Ciptadra Softindo" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Universitas Bina Sarana Informatika" },
    { "@type": "EducationalOrganization", name: "SMK Taruna Bhakti" },
  ],
  knowsAbout: skills.flatMap((g) => g.items),
  sameAs: [profile.linkedin, profile.github].filter(Boolean),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SkipLink />
      <Spotlight />
      <div className="relative z-10 mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-8">
          <Sidebar />
          <main id="content" tabIndex={-1} className="pt-20 outline-none lg:w-[52%] lg:py-24">
            <About />
            <ExperienceSection />
            <Projects />
            <Skills />
            <Certifications />
            <Footer />
          </main>
        </div>
      </div>
      <CommandPalette />
    </>
  );
}
