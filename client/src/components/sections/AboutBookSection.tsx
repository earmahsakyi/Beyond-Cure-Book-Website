import ScrollReveal from "@/components/ScrollReveal";
import { useAppSelector } from '../../store/store';

const AboutBook = {
    badgeText: "About the Book",
    heading: "What is Beyond the Cure?",
    paragraphs: [
      "Antibiotics have saved countless lives since their discovery yet today, we face a crisis of antimicrobial resistance that threatens to unravel decades of medical progress. Beyond the Cure is not just about the science; it's about the people behind the prescriptions",
      "Through compelling patient stories and rigorous evidence, this book explores how we got here, what we can do differently, and why every antibiotic decision matters. From the ICU to the outpatient clinic, from policy debates to bedside conversations, you'll discover how medicine's most powerful tools require our most thoughtful stewardship",
      "Written for anyone who has ever taken or prescribed an antibiotic, Beyond the Cure bridges the gap between academic medicine and the real world where healing happens"
    ]
  }


const AboutBookSection = () => {
  const homeContent = useAppSelector(state => state.homeContent.homeContent);
  const aboutBook = homeContent?.aboutBook ?? AboutBook
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="inline-block px-3 py-1 rounded-full bg-accent-light text-accent text-sm font-medium mb-4">
             {aboutBook.badgeText}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-foreground mb-8">
              What is <span className="text-gradient">{aboutBook.heading.split(' ').slice(2).join(' ')}</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {aboutBook.paragraphs.map(
              (paragraph, index)=> (
                <ScrollReveal key={index} delay={0.2}>
              <p className="text-lg text-foreground/85 leading-relaxed">
               {paragraph}
              </p>
            </ScrollReveal>
              ))}
          </div>

          {/* Decorative divider */}
          <ScrollReveal delay={0.5}>
            <div className="flex items-center justify-center mt-12 gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/30" />
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/30" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutBookSection;
