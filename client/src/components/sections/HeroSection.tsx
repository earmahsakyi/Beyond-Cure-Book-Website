import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ParticlesBackground from "@/components/ParticlesBackground";
import TypewriterText from "@/components/TypewriterText";
import { ShoppingCart, FileText } from "lucide-react";
import bookcover from "../../assets/bookcover.png";
import {useAppSelector } from '../../store/store';

const DEFAULT_HERO = {
availabilityText:"Available on Amazon, Barnes & Noble, and independent bookstores",
badgeText: "A New Medical Nonfiction ",
bookCoverImage: "/bookcover.png",
description: "A deeply human exploration of antimicrobial resistance where science meets story, and each patient reminds us why medicine is both art and evidence.",
primaryCtaLink: "#",
primaryCtaText: "Buy the Book",
secondaryCtaLink: "#",
secondaryCtaText:"Get Free Safety Guide",
subtitle:"What Antibiotics Teach Us About Medicine, Mortality, and What It Means to Heal",
title: "Beyond the Cure",
};

const HeroSection = () => {
  const homeContent = useAppSelector(state => state.homeContent.homeContent)
  const hero = homeContent?.hero ?? DEFAULT_HERO;
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Aurora gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-aurora-start via-aurora-mid to-aurora-end" />
      
      {/* Subtle radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.08),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--accent)/0.06),_transparent_50%)]" />
      
      {/* Particles */}
      <ParticlesBackground />

      <div className="section-container relative z-10 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-2xl text-center md:text-left bg-primary/10 text-primary text-lg font-medium mb-6 shadow-lg">
                {/* {hero.badgeText} */}
                 Edited by Michael McConnell,<span className="italic"> New York Times</span> bestselling editor and Joseph Garner, MD, Emeritus Professor of Medicine.
              </span>
            </motion.div>

            <h1 className="text-foreground mb-6">
              <TypewriterText 
                text={hero.title} 
                className="block"
                delay={200}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-xl md:text-2xl text-muted-foreground font-serif italic mb-6"
            >
              {hero.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-lg text-foreground/80 mb-8 max-w-xl"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="hero" size="xl" className="group" onClick={() => {
                window.location.href = hero.primaryCtaLink}}>
                <ShoppingCart className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                {hero.primaryCtaText}
              </Button>
              <Button variant="hero-secondary" size="xl" onClick={()=>{
                window.location.href = "#check-list"}}>
                <FileText className="mr-2 h-5 w-5" />
                {hero.secondaryCtaText}
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="text-sm text-muted-foreground mt-6"
            >
             {hero.availabilityText}
            </motion.p>
          </div>

          {/* Book Cover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow effect behind book */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-primary-glow/10 to-accent/20 rounded-3xl blur-2xl animate-pulse-soft" />
              
              {/* Book cover with actual image */}
              <div className="relative w-[280px] sm:w-[320px] md:w-[380px] aspect-[3/4] rounded-lg shadow-elevated overflow-hidden animate-float">
                <img 
                  src={bookcover} 
                  alt="Beyond the Cure book cover - A medical nonfiction about antibiotics"
                  className="w-full h-full transition duration-200 transform hover:scale-105 hover:cursor-pointer"
                />
                {/* Title overlay */}
                {/* <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white bg-gradient-to-b from-transparent via-transparent to-black/30">
                  <div className="relative z-10 text-center mt-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight drop-shadow-lg">Beyond</h2>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight drop-shadow-lg">the Cure</h2>
                    <div className="w-16 h-0.5 bg-white/60 mx-auto mb-4" />
                    <p className="text-sm opacity-90 font-serif italic mb-6 drop-shadow-md">
                      What Antibiotics Teach Us<br />About Medicine & Healing
                    </p>
                    <p className="text-lg font-semibold tracking-widest drop-shadow-md">HENRY</p>
                  </div>
                </div> */}

                {/* Book spine effect */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/30 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
