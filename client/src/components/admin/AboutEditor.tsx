import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Save, X, ArrowLeft, Upload, User, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getHomeContent, updateHomeContentWithPhoto } from "@/store/homeContentSlice";
import { useAppDispatch, useAppSelector } from '../../store/store';

interface AboutContent {
  name: string;
  shortBio: string;
  longBio: string;
  authorImage: string;
  readMoreLink: string;
  photoUrl?: string;
  photoKey?: string;
}

const initialContent: AboutContent = {
  name: "Dr. Sarah Mitchell, MD",
  shortBio: "Board-certified physician and chronic illness advocate with over 20 years of experience in patient care and wellness education.",
  longBio: `Dr. Sarah Mitchell is a board-certified internal medicine physician who has dedicated her career to helping patients navigate the complex journey of chronic illness management.

After her own experience with a chronic health condition, she gained unique insight into the challenges patients face daily. This personal journey inspired her to write "Beyond the Cure" — a comprehensive guide that bridges the gap between medical treatment and holistic wellness.

Dr. Mitchell currently practices at Wellness Medical Center and regularly speaks at conferences about patient-centered care. She lives in Boston with her family and enjoys hiking, reading, and cooking healthy meals.`,
  authorImage: "",
  readMoreLink: "",
};

const AboutEditor = () => {
  const homeContent = useAppSelector(state => state.homeContent.homeContent);
  const dispatch = useAppDispatch();
  const [content, setContent] = useState<AboutContent>(initialContent);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (homeContent === null) {
      dispatch(getHomeContent());
    }
  }, [dispatch]);

  useEffect(() => {
    if (homeContent?.aboutAuthor) {
      setContent(homeContent.aboutAuthor);
      if (homeContent.aboutAuthor.photoUrl) {
        setPreviewUrl(homeContent.aboutAuthor.photoUrl);
      }
    }
  }, [homeContent]);

  const handleChange = (field: keyof AboutContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!homeContent) {
      toast({
        title: "Error",
        description: "Content not loaded yet",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      await dispatch(updateHomeContentWithPhoto({
        contentData: {
          ...homeContent,
          aboutAuthor: content
        },
        photoFile: selectedFile || undefined
      })).unwrap();

      toast({
        title: "Success!",
        description: "Author bio has been updated.",
      });

      // Clear selected file after successful save
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err as string,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <AdminLayout
      title="About the Author"
      description="Update your bio and profile information"
    >
      <Link
        to="/dashboard"
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
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
                {previewUrl ? (
                  <>
                    <img
                      src={previewUrl}
                      alt="Author"
                      className="h-full w-full rounded-full object-cover"
                    />
                    <button
                      onClick={handleRemovePhoto}
                      className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </>
                ) : (
                  <User className="h-10 w-10" />
                )}
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="photo-upload"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  Recommended: 400x400px, JPG or PNG, Max 5MB
                </p>
                {selectedFile && (
                  <p className="mt-1 text-xs text-green-600">
                    New photo selected: {selectedFile.name}
                  </p>
                )}
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
              value={content.name}
              onChange={(e) => handleChange("name", e.target.value)}
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