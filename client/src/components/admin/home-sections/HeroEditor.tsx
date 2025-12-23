import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface HeroContent {
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
}

interface HeroEditorProps {
  content: HeroContent;
  onChange: (content: HeroContent) => void;
}

export const HeroEditor = ({ content, onChange }: HeroEditorProps) => {
  const handleChange = (field: keyof HeroContent, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Badge */}
      <div>
        <label htmlFor="badgeText" className="admin-label">
          Badge Text
        </label>
        <Input
          id="badgeText"
          value={content.badgeText}
          onChange={(e) => handleChange("badgeText", e.target.value)}
          placeholder="e.g., New Release"
          className="admin-input"
        />
      </div>

      {/* Title & Subtitle */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="admin-label">
            Hero Title
          </label>
          <Input
            id="title"
            value={content.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Beyond the Cure"
            className="admin-input"
          />
        </div>
        <div>
          <label htmlFor="subtitle" className="admin-label">
            Hero Subtitle
          </label>
          <Input
            id="subtitle"
            value={content.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            placeholder="A New Approach..."
            className="admin-input"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="admin-label">
          Hero Description
        </label>
        <Textarea
          id="description"
          value={content.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
          placeholder="Discover evidence-based strategies..."
          className="admin-input resize-none"
        />
      </div>

      {/* Primary CTA */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="primaryCtaText" className="admin-label">
            Primary CTA Text
          </label>
          <Input
            id="primaryCtaText"
            value={content.primaryCtaText}
            onChange={(e) => handleChange("primaryCtaText", e.target.value)}
            placeholder="Buy the Book"
            className="admin-input"
          />
        </div>
        <div>
          <label htmlFor="primaryCtaLink" className="admin-label">
            Primary CTA Link
          </label>
          <Input
            id="primaryCtaLink"
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
          <label htmlFor="secondaryCtaText" className="admin-label">
            Secondary CTA Text
          </label>
          <Input
            id="secondaryCtaText"
            value={content.secondaryCtaText}
            onChange={(e) => handleChange("secondaryCtaText", e.target.value)}
            placeholder="Get Free Guide"
            className="admin-input"
          />
        </div>
        <div>
          <label htmlFor="secondaryCtaLink" className="admin-label">
            Secondary CTA Link
          </label>
          <Input
            id="secondaryCtaLink"
            value={content.secondaryCtaLink}
            onChange={(e) => handleChange("secondaryCtaLink", e.target.value)}
            placeholder="/free-guide"
            className="admin-input"
          />
        </div>
      </div>

      {/* Availability & Book Cover */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="availabilityText" className="admin-label">
            Availability Text
          </label>
          <Input
            id="availabilityText"
            value={content.availabilityText}
            onChange={(e) => handleChange("availabilityText", e.target.value)}
            placeholder="Available now in paperback..."
            className="admin-input"
          />
        </div>
        <div>
          <label htmlFor="bookCoverImage" className="admin-label">
            Book Cover Image URL
          </label>
          <Input
            id="bookCoverImage"
            value={content.bookCoverImage}
            onChange={(e) => handleChange("bookCoverImage", e.target.value)}
            placeholder="/images/book-cover.jpg"
            className="admin-input"
          />
        </div>
      </div>
    </div>
  );
};
