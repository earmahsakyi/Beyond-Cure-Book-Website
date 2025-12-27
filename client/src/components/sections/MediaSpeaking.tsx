import { Mail, Download, Mic, Heart, Brain, Users, Stethoscope, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookCover from '@/assets/bookcover.png';
import authorPhoto from "@/assets/Profile.jpeg";

const speakingTopics = [
  {
    icon: Stethoscope,
    title: "Antibiotic Safety & Awareness",
    description: "Understanding the real risks of antibiotic side effects and how patients can protect themselves.",
  },
  {
    icon: BookOpen,
    title: "Storytelling in Medicine",
    description: "Using personal narrative to bridge the gap between clinical data and human experience.",
  },
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "Why listening to patients leads to better outcomes and how healthcare can evolve.",
  },
  {
    icon: Brain,
    title: "Living with Chronic Illness",
    description: "Practical strategies for navigating life when health challenges become a daily reality.",
  },
  {
    icon: Users,
    title: "Advocacy & Empowerment",
    description: "How patients can become their own best advocates within the healthcare system.",
  },
];

const mediaKitItems = [
  {
    title: "Author Headshot",
    description: "High-resolution professional photo for press and promotional use.",
    format: "JPG, 300 DPI",
    downloadUrl: authorPhoto,
  },
  {
    title: "Author Bio",
    description: "Short and long versions of Henry's biography for event programs and articles.",
    format: "PDF",
    downloadUrl: "#",
  },
  {
    title: "Book Cover",
    description: "High-resolution cover image of Beyond the Cure for promotional materials.",
    format: "JPG, 300 DPI",
    downloadUrl: BookCover,
  },
];

const MediaSpeaking = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 lg:py-32">
         <div className="mb-3 flex justify-center items-center">
        <a href="/" className="text-center px-2 py-1 hover:border-b-2 border-primary">Home</a>
        </div>  
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Mic className="h-4 w-4" />
              Available for Speaking Engagements
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Speaking & Media
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Invite Henry to speak about antibiotic safety, storytelling in medicine, 
              and patient-centered care. Available for conferences, podcasts, and media appearances.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <a href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Request Henry for an Event
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#media-kit">
                  <Download className="mr-2 h-5 w-5" />
                  Download Media Kit
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Topics Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Speaking Topics
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Henry speaks on topics drawn from his personal journey and research, 
              tailored to resonate with healthcare professionals, patients, and general audiences.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {speakingTopics.map((topic, index) => (
              <div
                key={index}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <topic.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {topic.title}
                </h3>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <section id="media-kit" className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Media Kit
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Download press-ready materials for articles, podcasts, and event promotions.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {mediaKitItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Download className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                <p className="mb-2 flex-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <p className="mb-4 text-xs text-muted-foreground/70">{item.format}</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={item.downloadUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaSpeaking;