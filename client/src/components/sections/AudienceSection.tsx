import ScrollReveal from "@/components/ScrollReveal";
import { Users, Stethoscope, Building2, Mic, HeartPulse, GraduationCap, LucideIcon } from "lucide-react";
import { useAppSelector } from '../../store/store';

//  Create an icon mapping
const iconMap: Record<string, LucideIcon> = {
  Users,
  Stethoscope,
  Building2,
  Mic,
  HeartPulse,
  GraduationCap,
};

//  Helper to get icon component from string
const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Users; 
};

const defaultAudiences = [
  {
    icon: "Users", 
    title: "Patients & Families",
    description: "Understand what questions to ask and why your antibiotic choices matter for you—and for everyone.",
  },
  {
    icon: "Stethoscope", 
    title: "Clinicians & Trainees",
    description: "Real cases and evidence-based frameworks to sharpen your antimicrobial decision-making.",
  },
  {
    icon: "Building2", 
    title: "Hospitals & Stewardship Teams",
    description: "Practical insights to strengthen antimicrobial stewardship programs and improve patient outcomes.",
  },
  {
    icon: "Mic", 
    title: "Media & Podcast Hosts",
    description: "A compelling story angle on one of medicine's most urgent yet underreported challenges.",
  },
];

const AudienceSection = () => {
  const homeContent = useAppSelector(state => state.homeContent.homeContent);
  const audiences = homeContent?.audiences ?? defaultAudiences;

  return (
    <section className="section-padding bg-muted/50 relative" id="audience">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.03),_transparent_70%)]" />
      
      <div className="section-container relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
              Who It's For
            </span>
            <h2 className="text-foreground">Written for Those Who Care</h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {audiences.map((aud, index) => {
            const IconComponent = getIcon(aud.icon);
            
            return (
              <ScrollReveal key={aud.title} delay={index * 0.1}>
                <div className="card-elevated card-hover p-6 lg:p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {aud.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {aud.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;