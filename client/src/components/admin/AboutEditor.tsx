import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Save, X, ArrowLeft, Upload, User } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AboutContent {
  authorName: string;
  shortBio: string;
  longBio: string;
  imageUrl: string;
}

const initialContent: AboutContent = {
  authorName: "Dr. Sarah Mitchell, MD",
  shortBio: "Board-certified physician and chronic illness advocate with over 20 years of experience in patient care and wellness education.",
  longBio: `Dr. Sarah Mitchell is a board-certified internal medicine physician who has dedicated her career to helping patients navigate the complex journey of chronic illness management.

After her own experience with a chronic health condition, she gained unique insight into the challenges patients face daily. This personal journey inspired her to write "Beyond the Cure" – a comprehensive guide that bridges the gap between medical treatment and holistic wellness.

Dr. Mitchell currently practices at Wellness Medical Center and regularly speaks at conferences about patient-centered care. She lives in Boston with her family and enjoys hiking, reading, and cooking healthy meals.`,
  imageUrl: "",
};

const AboutEditor = () => {
  const [content, setContent] = useState<AboutContent>(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (field: keyof AboutContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Content updated successfully",
      description: "Your author bio has been saved.",
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <AdminLayout
      title="About the Author"
      description="Update your bio and profile information"
    >
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="admin-card">
        <div className="space-y-6">
          {/* Author Image */}
          <div>
            <label className="admin-label">Author Photo</label>
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
                {content.imageUrl ? (
                  <img
                    src={content.imageUrl}
                    alt="Author"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User className="h-10 w-10" />
                )}
              </div>
              <div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  Recommended: 400x400px, JPG or PNG
                </p>
              </div>
            </div>
          </div>

          {/* Author Name */}
          <div>
            <label htmlFor="authorName" className="admin-label">
              Author Name
            </label>
            <input
              id="authorName"
              type="text"
              value={content.authorName}
              onChange={(e) => handleChange("authorName", e.target.value)}
              className="admin-input"
              placeholder="Enter author name"
            />
          </div>

          {/* Short Bio */}
          <div>
            <label htmlFor="shortBio" className="admin-label">
              Short Bio
              <span className="ml-2 font-normal text-muted-foreground">
                (Used in previews and cards)
              </span>
            </label>
            <textarea
              id="shortBio"
              value={content.shortBio}
              onChange={(e) => handleChange("shortBio", e.target.value)}
              rows={3}
              className="admin-input resize-none"
              placeholder="Brief bio for previews..."
            />
          </div>

          {/* Long Bio */}
          <div>
            <label htmlFor="longBio" className="admin-label">
              Full Bio
              <span className="ml-2 font-normal text-muted-foreground">
                (Displayed on About page)
              </span>
            </label>
            <textarea
              id="longBio"
              value={content.longBio}
              onChange={(e) => handleChange("longBio", e.target.value)}
              rows={10}
              className="admin-input resize-none"
              placeholder="Complete author biography..."
            />
          </div>
        </div>

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

export default AboutEditor;
