import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, X, ArrowLeft } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import {
  HeroEditor,
  AboutBookEditor,
  AudienceEditor,
  ChaptersEditor,
  EndorsementsEditor,
  EmailCaptureEditor,
  FinalCtaEditor,
} from "@/components/admin/home-sections";

interface HomeContent {
  hero: {
    badgeText: string;
    title: string;
    subtitle: string;
    description: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    availabilityText: string;
    bookCoverImage: string;
  };
  aboutBook: {
    badgeText: string;
    heading: string;
    paragraphs: string[];
  };
  audiences: {
    title: string;
    description: string;
    icon: string;
  }[];
  chapters: {
    number: string;
    title: string;
    description: string;
  }[];
  endorsements: {
    quote: string;
    author: string;
    title: string;
    featured: boolean;
  }[];
  emailCapture: {
    title: string;
    description: string;
    privacyNote: string;
  };
  finalCta: {
    title: string;
    description: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    footerNote: string;
  };
}

const initialContent: HomeContent = {
  hero: {
    badgeText: "New Release",
    title: "Beyond the Cure",
    subtitle: "A New Approach to Living with Chronic Illness",
    description: "Discover evidence-based strategies for managing chronic conditions and reclaiming your quality of life.",
    primaryCtaText: "Buy the Book",
    primaryCtaLink: "#",
    secondaryCtaText: "Get Free Guide",
    secondaryCtaLink: "#",
    availabilityText: "Available now in paperback and e-book formats",
    bookCoverImage: "",
  },
  aboutBook: {
    badgeText: "About the Book",
    heading: "What This Book Offers",
    paragraphs: [
      "A comprehensive guide to understanding and managing chronic illness.",
      "Written by a physician who understands both sides of the exam room.",
    ],
  },
  audiences: [
    {
      title: "Patients",
      description: "For those living with chronic conditions seeking practical guidance.",
      icon: "Users",
    },
    {
      title: "Clinicians",
      description: "For healthcare providers looking for patient-centered approaches.",
      icon: "Stethoscope",
    },
  ],
  chapters: [
    {
      number: "1",
      title: "Understanding Chronic Illness",
      description: "A foundational look at what chronic illness means and how it affects daily life.",
    },
  ],
  endorsements: [
    {
      quote: "This book changed how I approach patient care.",
      author: "Dr. Jane Smith",
      title: "Chief of Medicine",
      featured: true,
    },
  ],
  emailCapture: {
    title: "Stay Updated",
    description: "Join our community for exclusive content, updates, and resources.",
    privacyNote: "We respect your privacy. Unsubscribe anytime.",
  },
  finalCta: {
    title: "Ready to Start Your Journey?",
    description: "Take the first step towards a better understanding of chronic illness.",
    primaryCtaText: "Get Your Copy",
    primaryCtaLink: "#",
    secondaryCtaText: "Learn More",
    secondaryCtaLink: "#",
    footerNote: "Available in paperback and e-book formats",
  },
};

const HomeContentEditor = () => {
  const [content, setContent] = useState<HomeContent>(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Content updated successfully",
      description: "Your home page changes have been saved.",
    });
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <AdminLayout
      title="Home Page Content"
      description="Edit all sections of your home page"
    >
      {/* Back Link */}
      <Link
        to="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="admin-card">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="mb-6 flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
            <TabsTrigger
              value="hero"
              className="rounded-lg border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10"
            >
              Hero
            </TabsTrigger>
            <TabsTrigger
              value="aboutBook"
              className="rounded-lg border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10"
            >
              About Book
            </TabsTrigger>
            <TabsTrigger
              value="audiences"
              className="rounded-lg border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10"
            >
              Audiences
            </TabsTrigger>
            <TabsTrigger
              value="chapters"
              className="rounded-lg border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10"
            >
              Chapters
            </TabsTrigger>
            <TabsTrigger
              value="endorsements"
              className="rounded-lg border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10"
            >
              Endorsements
            </TabsTrigger>
            <TabsTrigger
              value="emailCapture"
              className="rounded-lg border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10"
            >
              Email Capture
            </TabsTrigger>
            <TabsTrigger
              value="finalCta"
              className="rounded-lg border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10"
            >
              Final CTA
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <HeroEditor
              content={content.hero}
              onChange={(hero) => setContent((prev) => ({ ...prev, hero }))}
            />
          </TabsContent>

          <TabsContent value="aboutBook">
            <AboutBookEditor
              content={content.aboutBook}
              onChange={(aboutBook) => setContent((prev) => ({ ...prev, aboutBook }))}
            />
          </TabsContent>

          <TabsContent value="audiences">
            <AudienceEditor
              content={content.audiences}
              onChange={(audiences) => setContent((prev) => ({ ...prev, audiences }))}
            />
          </TabsContent>

          <TabsContent value="chapters">
            <ChaptersEditor
              content={content.chapters}
              onChange={(chapters) => setContent((prev) => ({ ...prev, chapters }))}
            />
          </TabsContent>

          <TabsContent value="endorsements">
            <EndorsementsEditor
              content={content.endorsements}
              onChange={(endorsements) => setContent((prev) => ({ ...prev, endorsements }))}
            />
          </TabsContent>

          <TabsContent value="emailCapture">
            <EmailCaptureEditor
              content={content.emailCapture}
              onChange={(emailCapture) => setContent((prev) => ({ ...prev, emailCapture }))}
            />
          </TabsContent>

          <TabsContent value="finalCta">
            <FinalCtaEditor
              content={content.finalCta}
              onChange={(finalCta) => setContent((prev) => ({ ...prev, finalCta }))}
            />
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-end gap-3 border-t border-border pt-6">
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HomeContentEditor;
