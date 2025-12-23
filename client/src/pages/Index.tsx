import HeroSection from "@/components/sections/HeroSection";
import Navbar from "@/components/sections/Navbar";
import AboutBookSection from "@/components/sections/AboutBookSection";
import AudienceSection from "@/components/sections/AudienceSection";
import ChaptersSection from "@/components/sections/ChaptersSection";
import EndorsementsSection from "@/components/sections/EndorsementsSection";
import EmailCaptureSection from "@/components/sections/EmailCaptureSection";
import AboutAuthorSection from "@/components/sections/AboutAuthorSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
    <Navbar />
    <main className="min-h-screen">
      <HeroSection />
      <AboutBookSection />
      <AudienceSection />
      <ChaptersSection />
      <EndorsementsSection />
      <EmailCaptureSection />
      <AboutAuthorSection />
      <FinalCTASection />
      <Footer />
    </main>
    </>
  );
};

export default Index;
