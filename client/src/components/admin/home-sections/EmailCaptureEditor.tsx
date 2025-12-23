import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EmailCaptureContent {
  title: string;
  description: string;
  privacyNote: string;
}

interface EmailCaptureEditorProps {
  content: EmailCaptureContent;
  onChange: (content: EmailCaptureContent) => void;
}

export const EmailCaptureEditor = ({ content, onChange }: EmailCaptureEditorProps) => {
  const handleChange = (field: keyof EmailCaptureContent, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Configure the email signup section for your newsletter or updates
      </p>

      {/* Title */}
      <div>
        <label htmlFor="emailTitle" className="admin-label">
          Section Title
        </label>
        <Input
          id="emailTitle"
          value={content.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Stay Updated"
          className="admin-input"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="emailDescription" className="admin-label">
          Description
        </label>
        <Textarea
          id="emailDescription"
          value={content.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
          placeholder="Join our community and get exclusive content, updates, and resources..."
          className="admin-input resize-none"
        />
      </div>

      {/* Privacy Note */}
      <div>
        <label htmlFor="privacyNote" className="admin-label">
          Privacy Note
        </label>
        <Input
          id="privacyNote"
          value={content.privacyNote}
          onChange={(e) => handleChange("privacyNote", e.target.value)}
          placeholder="We respect your privacy. Unsubscribe anytime."
          className="admin-input"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Small text displayed below the signup form
        </p>
      </div>
    </div>
  );
};
