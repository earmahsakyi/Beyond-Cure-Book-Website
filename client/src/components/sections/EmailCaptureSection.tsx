import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileCheck, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from '../../store/store';

const allEmail = {
  title: "Free Antibiotic Safety Checklist",
  description: "A practical guide to the questions you should ask before starting or stopping any antibiotic. Designed for patients and caregivers",
  privacyNote: "We respect your privacy. Occasional updates about the book and antibiotic stewardship unsubscribe anytime."
}
const EmailCaptureSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const homeContent = useAppSelector(state => state.homeContent.homeContent);
  const emailCapture = homeContent?.emailCapture ?? allEmail

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      toast({
        title: "You're on the list!",
        description: "Check your inbox for the Antibiotic Safety Checklist.",
      });
    }
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background panel */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/8 to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.1),_transparent_50%)]" />
      
      <div className="section-container relative">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <FileCheck className="w-8 h-8 text-primary" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-foreground mb-4">
              {emailCapture.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
             {emailCapture.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 bg-background border-border/60 focus:border-primary"
                />
                <Button type="submit" variant="cta" size="lg" className="group">
                  Send me the checklist
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/10 text-primary">
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">Check your inbox! Your checklist is on its way.</span>
              </div>
            )}
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-xs text-muted-foreground mt-4">
            {emailCapture.privacyNote}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default EmailCaptureSection;
