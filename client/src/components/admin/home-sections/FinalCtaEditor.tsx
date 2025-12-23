import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FinalCtaContent {
  title: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  footerNote: string;
}

interface FinalCtaEditorProps {
  content: FinalCtaContent;
  onChange: (content: FinalCtaContent) => void;
}

export const FinalCtaEditor = ({ content, onChange }: FinalCtaEditorProps) => {
  const handleChange = (field: keyof FinalCtaContent, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Configure the final call-to-action section at the bottom of your page
      </p>

      {/* Title */}
      <div>
        <label htmlFor="finalTitle" className="admin-label">
          Section Title
        </label>
        <Input
          id="finalTitle"
          value={content.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Ready to Start Your Journey?"
          className="admin-input"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="finalDescription" className="admin-label">
          Description
        </label>
        <Textarea
          id="finalDescription"
          value={content.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
          placeholder="Take the first step towards a better understanding..."
          className="admin-input resize-none"
        />
      </div>

      {/* Primary CTA */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="finalPrimaryCtaText" className="admin-label">
            Primary CTA Text
          </label>
          <Input
            id="finalPrimaryCtaText"
            value={content.primaryCtaText}
            onChange={(e) => handleChange("primaryCtaText", e.target.value)}
            placeholder="Get Your Copy"
            className="admin-input"
          />
        </div>
        <div>
          <label htmlFor="finalPrimaryCtaLink" className="admin-label">
            Primary CTA Link
          </label>
          <Input
            id="finalPrimaryCtaLink"
            value={content.primaryCtaLink}
            onChange={(e) => handleChange("primaryCtaLink", e.target.value)}
            placeholder="https://amazon.com/..."
            className="admin-input"
          />
        </div>
      </div>

      {/* Secondary CTA */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="finalSecondaryCtaText" className="admin-label">
            Secondary CTA Text
          </label>
          <Input
            id="finalSecondaryCtaText"
            value={content.secondaryCtaText}
            onChange={(e) => handleChange("secondaryCtaText", e.target.value)}
            placeholder="Learn More"
            className="admin-input"
          />
        </div>
        <div>
          <label htmlFor="finalSecondaryCtaLink" className="admin-label">
            Secondary CTA Link
          </label>
          <Input
            id="finalSecondaryCtaLink"
            value={content.secondaryCtaLink}
            onChange={(e) => handleChange("secondaryCtaLink", e.target.value)}
            placeholder="/about"
            className="admin-input"
          />
        </div>
      </div>

      {/* Footer Note */}
      <div>
        <label htmlFor="footerNote" className="admin-label">
          Footer Note
        </label>
        <Input
          id="footerNote"
          value={content.footerNote}
          onChange={(e) => handleChange("footerNote", e.target.value)}
          placeholder="Available in paperback and e-book formats"
          className="admin-input"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Small text displayed below the CTA buttons
        </p>
      </div>
    </div>
  );
};
