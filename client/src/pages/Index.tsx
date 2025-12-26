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
import { getHomeContent } from "@/store/homeContentSlice";
import { useAppDispatch,useAppSelector } from '../store/store';
import { useEffect } from "react";

const Index = () => {
  const dispatch = useAppDispatch()
  const homeContent = useAppSelector(state => state.homeContent.homeContent);

  useEffect(()=> {
    if(homeContent === null){
      dispatch(getHomeContent())
    }
  },[dispatch]);

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
