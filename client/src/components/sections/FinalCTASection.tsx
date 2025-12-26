import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Mic } from "lucide-react";
import { useAppSelector } from '../../store/store';

const myCta = {
  title : "Ready to Go Beyond?",
  description: "Whether you're a patient seeking answers, a clinician refining your practice,or an organization looking for a compelling speaker let's connect.",
  primaryCtaText: "Buy the Book",
  primaryCtaLink: "#",
  secondaryCtaText: "Invite Henry to Speak",
  secondaryCtaLink: "#",
  footerNote : ""

}

const FinalCTASection = () => {

   const homeContent = useAppSelector(state => state.homeContent.homeContent);
   const finalCTA = homeContent?.finalCta ?? myCta;

  return (
    <section className="section-padding bg-gradient-to-b from-background via-muted/20 to-muted/40 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="section-container relative">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-foreground mb-4">
              {finalCTA.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
             {finalCTA.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group" onClick={()=>
                window.location.href = finalCTA.primaryCtaLink
              }>
                <ShoppingCart className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                {finalCTA.primaryCtaText}
              </Button>
              <Button variant="hero-secondary" size="xl" className="group" onClick={()=>
                window.location.href = finalCTA.secondaryCtaLink
              }>
                <Mic className="mr-2 h-5 w-5" />
                {finalCTA.secondaryCtaText}
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-sm text-muted-foreground mt-8">
              For press inquiries, bulk orders, or speaking engagements, 
              <a href="mailto:hello@beyondthecure.com" className="text-primary hover:underline ml-1">
                contact us directly
              </a>.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
