import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Save, X, ArrowLeft, Plus, Trash2, Download, Image, FileText, BookOpen } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MediaContent {
  speakingTopics: string[];
  mediaKitHeadshot: string;
  mediaKitBio: string;
  mediaKitBookCover: string;
  contactEmail: string;
}

const initialContent: MediaContent = {
  speakingTopics: [
    "Living Well with Chronic Illness",
    "Patient-Centered Care in Modern Medicine",
    "The Mind-Body Connection in Healing",
    "Building Resilience Through Chronic Health Challenges",
  ],
  mediaKitHeadshot: "/media/headshot.jpg",
  mediaKitBio: "/media/author-bio.pdf",
  mediaKitBookCover: "/media/book-cover.jpg",
  contactEmail: "speaking@beyondthecure.com",
};

const MediaSpeakingEditor = () => {
  const [content, setContent] = useState<MediaContent>(initialContent);
  const [newTopic, setNewTopic] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      setContent((prev) => ({
        ...prev,
        speakingTopics: [...prev.speakingTopics, newTopic.trim()],
      }));
      setNewTopic("");
    }
  };

  const handleRemoveTopic = (index: number) => {
    setContent((prev) => ({
      ...prev,
      speakingTopics: prev.speakingTopics.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Content updated successfully",
      description: "Media & speaking information has been saved.",
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <AdminLayout
      title="Media & Speaking"
      description="Manage speaking topics, media kit, and contact information"
    >
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="space-y-6">
        {/* Speaking Topics */}
        <div className="admin-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Speaking Topics</h2>
          
          <div className="space-y-3 mb-4">
            {content.speakingTopics.map((topic, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3"
              >
                <span className="text-sm">{topic}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveTopic(index)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Add a new speaking topic..."
              className="admin-input flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleAddTopic()}
            />
            <Button onClick={handleAddTopic} variant="secondary">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>

        {/* Media Kit Downloads */}
        <div className="admin-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Media Kit Downloads</h2>
          
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                <Image className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-foreground">Headshot</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-3">High-resolution author photo</p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4" />
                Replace
              </Button>
            </div>

            <div className="rounded-lg border border-border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-foreground">Bio PDF</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-3">Formatted author biography</p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4" />
                Replace
              </Button>
            </div>

            <div className="rounded-lg border border-border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-foreground">Book Cover</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-3">High-resolution cover image</p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4" />
                Replace
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Email */}
        <div className="admin-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Speaking Inquiries</h2>
          
          <div>
            <label htmlFor="contactEmail" className="admin-label">
              Contact Email
            </label>
            <input
              id="contactEmail"
              type="email"
              value={content.contactEmail}
              onChange={(e) =>
                setContent((prev) => ({ ...prev, contactEmail: e.target.value }))
              }
              className="admin-input max-w-md"
              placeholder="speaking@example.com"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              This email will be displayed for speaking and media inquiries
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
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

export default MediaSpeakingEditor;
