import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface AboutBookContent {
  badgeText: string;
  heading: string;
  paragraphs: string[];
}

interface AboutBookEditorProps {
  content: AboutBookContent;
  onChange: (content: AboutBookContent) => void;
}

export const AboutBookEditor = ({ content, onChange }: AboutBookEditorProps) => {
  const handleChange = (field: keyof Omit<AboutBookContent, "paragraphs">, value: string) => {
    onChange({ ...content, [field]: value });
  };

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...content.paragraphs];
    newParagraphs[index] = value;
    onChange({ ...content, paragraphs: newParagraphs });
  };

  const addParagraph = () => {
    if (content.paragraphs.length < 4) {
      onChange({ ...content, paragraphs: [...content.paragraphs, ""] });
    }
  };

  const removeParagraph = (index: number) => {
    if (content.paragraphs.length > 1) {
      const newParagraphs = content.paragraphs.filter((_, i) => i !== index);
      onChange({ ...content, paragraphs: newParagraphs });
    }
  };

  return (
    <div className="space-y-6">
      {/* Badge */}
      <div>
        <label htmlFor="aboutBadgeText" className="admin-label">
          Badge Text
        </label>
        <Input
          id="aboutBadgeText"
          value={content.badgeText}
          onChange={(e) => handleChange("badgeText", e.target.value)}
          placeholder="e.g., About the Book"
          className="admin-input"
        />
      </div>

      {/* Heading */}
      <div>
        <label htmlFor="aboutHeading" className="admin-label">
          Section Heading
        </label>
        <Input
          id="aboutHeading"
          value={content.heading}
          onChange={(e) => handleChange("heading", e.target.value)}
          placeholder="What This Book Offers"
          className="admin-input"
        />
      </div>

      {/* Paragraphs */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="admin-label mb-0">Paragraphs</label>
          {content.paragraphs.length < 4 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addParagraph}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Paragraph
            </Button>
          )}
        </div>
        <div className="space-y-4">
          {content.paragraphs.map((paragraph, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={paragraph}
                onChange={(e) => handleParagraphChange(index, e.target.value)}
                rows={3}
                placeholder={`Paragraph ${index + 1}`}
                className="admin-input flex-1 resize-none"
              />
              {content.paragraphs.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeParagraph(index)}
                  className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {content.paragraphs.length}/4 paragraphs
        </p>
      </div>
    </div>
  );
};
