import { Plus, Trash2, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface EndorsementItem {
  quote: string;
  author: string;
  title: string;
  featured: boolean;
}

interface EndorsementsEditorProps {
  content: EndorsementItem[];
  onChange: (content: EndorsementItem[]) => void;
}

export const EndorsementsEditor = ({ content, onChange }: EndorsementsEditorProps) => {
  const handleChange = (index: number, field: keyof EndorsementItem, value: string | boolean) => {
    const newContent = [...content];
    newContent[index] = { ...newContent[index], [field]: value };
    onChange(newContent);
  };

  const addItem = () => {
    onChange([...content, { quote: "", author: "", title: "", featured: false }]);
  };

  const removeItem = (index: number) => {
    if (content.length > 1) {
      onChange(content.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Add testimonials and endorsements from readers or experts
        </p>
        <Button type="button" variant="outline" size="sm" onClick={addItem} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Endorsement
        </Button>
      </div>

      <div className="space-y-6">
        {content.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg border p-4 ${
              item.featured
                ? "border-primary/30 bg-primary/5"
                : "border-border bg-card/50"
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.featured && <Star className="h-4 w-4 fill-primary text-primary" />}
                <span className="text-sm font-medium text-muted-foreground">
                  Endorsement {index + 1}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={item.featured}
                    onCheckedChange={(checked) => handleChange(index, "featured", checked)}
                  />
                  <span className="text-sm text-muted-foreground">Featured</span>
                </div>
                {content.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(index)}
                    className="gap-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="admin-label">Quote</label>
                <Textarea
                  value={item.quote}
                  onChange={(e) => handleChange(index, "quote", e.target.value)}
                  rows={3}
                  placeholder="This book changed how I think about..."
                  className="admin-input resize-none"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="admin-label">Author Name</label>
                  <Input
                    value={item.author}
                    onChange={(e) => handleChange(index, "author", e.target.value)}
                    placeholder="Dr. Jane Smith"
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="admin-label">Author Title</label>
                  <Input
                    value={item.title}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    placeholder="Chief of Medicine, City Hospital"
                    className="admin-input"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
