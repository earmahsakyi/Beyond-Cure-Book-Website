import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AUDIENCE_ICONS } from "./AudienceIcons";



interface AudienceItem {
  title: string;
  description: string;
  icon: string;
}

interface AudienceEditorProps {
  content: AudienceItem[];
  onChange: (content: AudienceItem[]) => void;
}

export const AudienceEditor = ({ content, onChange }: AudienceEditorProps) => {
  const handleChange = (index: number, field: keyof AudienceItem, value: string) => {
    const newContent = [...content];
    newContent[index] = { ...newContent[index], [field]: value };
    onChange(newContent);
  };

  const addItem = () => {
    onChange([...content, { title: "", description: "", icon: "Users" }]);
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
          Define different audience segments for your book
        </p>
        <Button type="button" variant="outline" size="sm" onClick={addItem} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Audience
        </Button>
      </div>

      <div className="space-y-6">
        {content.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-border bg-card/50 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Audience {index + 1}
              </span>
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

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="admin-label">Title</label>
                  <Input
                    value={item.title}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    placeholder="e.g., Patients"
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="admin-label">Audience Type</label>
                  <select
                      value={item.icon}
                      onChange={(e) => handleChange(index, "icon", e.target.value)}
                      className="admin-input"
                    >
                      {Object.entries(AUDIENCE_ICONS).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value.label}
                        </option>
                      ))}
                    </select>
                    
                </div>
              </div>
              <div>
                <label className="admin-label">Description</label>
                <Textarea
                  value={item.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  rows={2}
                  placeholder="Who is this for and how it helps them..."
                  className="admin-input resize-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
