import { Plus, Trash2, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ChapterItem {
  number: string;
  title: string;
  description: string;
}

interface ChaptersEditorProps {
  content: ChapterItem[];
  onChange: (content: ChapterItem[]) => void;
}

export const ChaptersEditor = ({ content, onChange }: ChaptersEditorProps) => {
  const handleChange = (index: number, field: keyof ChapterItem, value: string) => {
    const newContent = [...content];
    newContent[index] = { ...newContent[index], [field]: value };
    onChange(newContent);
  };

  const addItem = () => {
    const nextNumber = (content.length + 1).toString();
    onChange([...content, { number: nextNumber, title: "", description: "" }]);
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
          Add chapters with descriptions to give readers a preview
        </p>
        <Button type="button" variant="outline" size="sm" onClick={addItem} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Chapter
        </Button>
      </div>

      <div className="space-y-4">
        {content.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 rounded-lg border border-border bg-card/50 p-4"
          >
            <div className="flex shrink-0 items-center text-muted-foreground/50">
              <GripVertical className="h-5 w-5" />
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid gap-4 sm:grid-cols-[100px_1fr]">
                <div>
                  <label className="admin-label">Number</label>
                  <Input
                    value={item.number}
                    onChange={(e) => handleChange(index, "number", e.target.value)}
                    placeholder="1"
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="admin-label">Chapter Title</label>
                  <Input
                    value={item.title}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    placeholder="Understanding Chronic Illness"
                    className="admin-input"
                  />
                </div>
              </div>
              <div>
                <label className="admin-label">Description</label>
                <Textarea
                  value={item.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  rows={2}
                  placeholder="A brief overview of what this chapter covers..."
                  className="admin-input resize-none"
                />
              </div>
            </div>

            {content.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(index)}
                className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
