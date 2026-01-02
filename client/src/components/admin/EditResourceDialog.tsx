import { useState, useEffect } from "react";
import { X, FileText } from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  updateResource,
  type Resource,
  type UpdateResourceData,
} from "@/store/resourceSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";


interface EditResourceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  resource: Resource | null;
}

export const EditResourceDialog = ({
  isOpen,
  onClose,
  resource,
}: EditResourceDialogProps) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.resource);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "patients" as "patients" | "clinicians",
    isPublished: false,
  });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Populate form when resource changes
  useEffect(() => {
    if (resource) {
      setFormData({
        title: resource.title,
        description: resource.description,
        category: resource.category,
        isPublished: resource.isPublished,
      });
    }
  }, [resource]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resource) return;

    const updateData: UpdateResourceData = {
      id: resource._id,
      ...formData,
    };

    try {
      await dispatch(updateResource(updateData)).unwrap();
      handleClose();
    } catch (err) {
      // Error is handled by Redux and shown via toast
    }
  };

  if (!isOpen || !resource || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" style={{ isolation: 'isolate' }}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Resource</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            disabled={loading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Current File Info */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Current File</p>
                <p className="text-xs text-muted-foreground">
                  {resource.fileType.toUpperCase()} •{" "}
                  {resource.fileSize ? `${(resource.fileSize / 1024).toFixed(1)} KB` : "N/A"}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Note: File cannot be changed. To upload a new file, delete this resource and create
              a new one.
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Chronic Illness Self-Care Checklist"
              disabled={loading}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              placeholder="Brief description of the resource..."
              disabled={loading}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Target Audience <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                  formData.category === "patients"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <input
                  type="radio"
                  name="category"
                  value="patients"
                  checked={formData.category === "patients"}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as "patients" })
                  }
                  disabled={loading}
                  className="text-primary"
                />
                <span className="font-medium">Patients</span>
              </label>
              <label
                className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                  formData.category === "clinicians"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <input
                  type="radio"
                  name="category"
                  value="clinicians"
                  checked={formData.category === "clinicians"}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as "clinicians" })
                  }
                  disabled={loading}
                  className="text-primary"
                />
                <span className="font-medium">Clinicians</span>
              </label>
            </div>
          </div>

          {/* Publish Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
              disabled={loading}
            />
            <label htmlFor="isPublished" className="text-sm font-medium">
              Published (visible to users)
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};