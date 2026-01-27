import { Download, FileText, Users, Stethoscope, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getPublicResources, type Resource } from "@/store/resourceSlice";

const Resources = () => {
  const dispatch = useAppDispatch();
  const { publicResources, loading, error } = useAppSelector(state => state.resource);
  
  
  //  Fetch resources on mount
  useEffect(() => {
    dispatch(getPublicResources());
  }, [dispatch]); 

  // Filter by category
  const patientResources = publicResources.filter((r) => r.category === "patients");
  const clinicianResources = publicResources.filter((r) => r.category === "clinicians");

  //  Loading state
  if (loading) {
    return (
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          Loading Resources...
        </div>
      </section>
    );
  }

  //  Error state
  if (error) {
    return (
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            <p>Failed to load resources: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-secondary/30">
        
      <div className="container mx-auto px-4">
        {/* Section Header */} 
        <div className="text-center mb-14">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Free Resources
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Helpful Downloads
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Free resources to support your health journey, whether you're a patient navigating care or a clinician seeking better tools.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Patient Resources */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">For Patients</h3>
            </div>
            <div className="space-y-4">
              {patientResources.length > 0 ? (
                patientResources.map((resource) => (
                  <ResourceCard key={resource._id} resource={resource} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No patient resources available yet.</p>
              )}
            </div>
          </div>

          {/* Clinician Resources */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Stethoscope className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">For Clinicians</h3>
            </div>
            <div className="space-y-4">
              {clinicianResources.length > 0 ? (
                clinicianResources.map((resource) => (
                  <ResourceCard key={resource._id} resource={resource} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No clinician resources available yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-16">
        <a href="/" className="font-sans font-medium hover:border-b-2 border-primary">Back to Home</a>
      </div>
      
    </section>
  );
};

//  Typed component
interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/20 transition-all duration-200">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileText className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground mb-1">{resource.title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="gap-2"
          >
            <a href={resource.fileUrl} download >
                
              <Download className="h-4 w-4" />
              Download PDF
            </a>
            
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Resources;