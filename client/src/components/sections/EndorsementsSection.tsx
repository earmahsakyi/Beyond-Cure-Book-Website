import ScrollReveal from "@/components/ScrollReveal";
import { Quote } from "lucide-react";
import { useAppSelector } from '../../store/store';

const endorsements = [
  {
    quote: "A masterful blend of storytelling and science. Beyond the Cure is the book I wish I had when I started my career in infectious disease.",
    author: "Brad Spellberg, MD",
    title: "Chief Medical Officer, LA County + USC Medical Center",
    featured: true,
  },
  {
    quote: "Henry makes the invisible crisis of antimicrobial resistance visible and visceral. This book will change how you think about every prescription.",
    author: "Sarah Chen, MD, MPH",
    title: "Director of Antimicrobial Stewardship, Stanford Health",
    featured: false,
  },
  {
    quote: "Finally, a book that bridges the gap between clinical complexity and human understanding. Essential reading for our times.",
    author: "Michael Roberts, PhD",
    title: "Professor of Microbiology, Johns Hopkins",
    featured: false,
  },
];

const EndorsementsSection = () => {
  const homeContent = useAppSelector(state => state.homeContent.homeContent);
  const allEndorsement = homeContent?.endorsements ?? endorsements;
  return (
    <section className="section-padding bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Decorative aurora element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-full blur-3xl" />
      
      <div className="section-container relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
              Praise
            </span>
            <h2 className="text-foreground">What Experts Are Saying</h2>
          </div>
        </ScrollReveal>

        {/* Featured quote */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative p-8 md:p-12 rounded-2xl bg-card shadow-card border border-border/40">
              <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/20" />
              <blockquote className="relative">
                <p className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed mb-6 pl-8">
                  "{allEndorsement[0].quote}"
                </p>
                <footer className="pl-8">
                  <cite className="not-italic">
                    <span className="block text-lg font-semibold text-foreground">
                      {allEndorsement[0].author}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {allEndorsement[0].title}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </ScrollReveal>

        {/* Secondary quotes */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {allEndorsement.slice(1).map((endorsement, index) => (
            <ScrollReveal key={endorsement.author} delay={0.2 + index * 0.1}>
              <div className="p-6 rounded-xl bg-card/50 border border-border/30">
                <p className="text-foreground/90 font-serif italic mb-4 leading-relaxed">
                  "{endorsement.quote}"
                </p>
                <footer>
                  <span className="block font-medium text-foreground text-sm">
                    {endorsement.author}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {endorsement.title}
                  </span>
                </footer>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EndorsementsSection;
