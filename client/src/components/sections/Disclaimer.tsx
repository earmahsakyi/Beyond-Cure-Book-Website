import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Disclaimer = () => {
  return (
    <section className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Disclaimer
        </h2>
        
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            In respect for the privacy of the individuals whose stories appear in this book, 
            and in accordance with the Health Insurance Portability and Accountability Act (HIPAA), 
            names, settings, and identifying details have been altered to protect the individuals' 
            confidentiality. Some clinical scenarios are composites, and timelines have been 
            condensed to preserve anonymity without altering clinical meaning.
          </p>
          
          <p>
            The views, opinions, and interpretations in <em>Beyond the Cure: The Untold Stories 
            of Antibiotics</em> are solely those of the author. They do not represent the policies, 
            positions, or endorsements of Hartford HealthCare, the University of Connecticut, or 
            any affiliated institutions. Any endorsements included are from individuals in their 
            personal capacity, not on behalf of their institutions.
          </p>
          
          <p>
            This book is intended for educational and reflective purposes. It is not medical advice, 
            does not replace consultation with a qualified clinician, and does not establish a 
            physician–patient relationship.
          </p>
        </div>

        <div className="mt-8">
          <Button asChild variant="outline" size="sm">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Disclaimer;