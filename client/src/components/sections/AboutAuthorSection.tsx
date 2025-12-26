import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import authorPhoto from "@/assets/Profile.jpeg";
import { useAppSelector } from '../../store/store';

const Author = {
  name: "Dr. Henry",
  shortBio: "A sought-after speaker on antibiotic resistance and medical decision-making, Henry brings both clinical expertise and a gift for storytelling to one of medicine's most pressing challenges.",
  longBio : "Henry is an infectious disease physician and antimicrobial stewardship leader with over fifteen years of experience at the intersection of clinical care, research, and education. His work has been published in leading medical journals, and he has consulted for hospitals and health systems across the country.",
  authorImage: "",
  readMoreLink: "",
}

const AboutAuthorSection = () => {
  const homeContent = useAppSelector(state => state.homeContent.homeContent);
  const author = homeContent?.aboutAuthor ?? Author;
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[200px,1fr] gap-8 md:gap-12 items-start">
            {/* Author photo */}
            <ScrollReveal>
              <div className="mx-auto md:mx-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-card">
                  <img 
                    src={authorPhoto} 
                    alt="Henry - Author of Beyond the Cure"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Bio content */}
            <div>
              <ScrollReveal delay={0.1}>
                <span className="inline-block px-3 py-1 rounded-full bg-accent-light text-accent text-sm font-medium mb-4">
                  About the Author
                </span>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <h2 className="text-foreground text-3xl mb-6">{author.name}</h2>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-foreground/85 leading-relaxed mb-4">
                 {author.longBio}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <p className="text-foreground/85 leading-relaxed mb-6">
                 {author.shortBio}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <Button variant="subtle" className="group">
                  Read full bio
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAuthorSection;
