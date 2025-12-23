import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const chapters = [
  {
    number: "01",
    title: "Poor Liver",
    description: "When the body's filter fails, every antibiotic choice becomes a calculation of risk.",
  },
  {
    number: "02",
    title: "The Resistance",
    description: "How bacteria evolve faster than we can develop new weapons against them.",
  },
  {
    number: "03",
    title: "Gut Feelings",
    description: "The microbiome revolution and why our internal ecosystem matters more than we thought.",
  },
  {
    number: "04",
    title: "Time & Temperature",
    description: "The critical hours when antibiotic timing can mean the difference between life and death.",
  },
  {
    number: "05",
    title: "The Stewards",
    description: "Inside the hospitals working to preserve antibiotics for future generations.",
  },
  {
    number: "06",
    title: "Beyond the Pill",
    description: "New frontiers in fighting infection—from phages to immunotherapy.",
  },
];

const ChaptersSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-accent-light text-accent text-sm font-medium mb-4">
              Inside the Book
            </span>
            <h2 className="text-foreground">Chapter Highlights</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter, index) => (
            <ScrollReveal key={chapter.number} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative p-6 rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-soft transition-all duration-300"
              >
                <span className="text-5xl font-bold text-primary/10 absolute top-4 right-4 group-hover:text-primary/20 transition-colors">
                  {chapter.number}
                </span>
                <div className="relative">
                  <h3 className="text-xl font-semibold text-foreground mb-3 pr-12">
                    {chapter.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {chapter.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChaptersSection;
