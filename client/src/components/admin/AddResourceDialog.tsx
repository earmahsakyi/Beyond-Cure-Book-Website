import { useState,useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Upload, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  uploadResource,
  type UploadResourceData,
} from "@/store/resourceSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";


interface AddResourceDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddResourceDialog = ({ isOpen, onClose }: AddResourceDialogProps) => {
  const dispatch = useAppDispatch();
  const { loading, uploadProgress } = useAppSelector((state) => state.resource);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "patients" as "patients" | "clinicians",
    isPublished: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "patients",
      isPublished: false,
    });
    setFile(null);
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        return;
      }
      // Validate file size (10MB max)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      setFile(selectedFile);
      setError("");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      if (droppedFile.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        return;
      }
      if (droppedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      setFile(droppedFile);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file");
      return;
    }

    if (!formData.title.trim()) {
      setError("Please enter a title");
      return;
    }

    const uploadData: UploadResourceData = {
      ...formData,
      document: file,
    };

    try {
      await dispatch(uploadResource(uploadData)).unwrap();
      handleClose();
    } catch (err) {
      // Error is handled by Redux and shown via toast
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" style={{ isolation: 'isolate' }}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add New Resource</h2>
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
          {/* Error Alert */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

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

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              PDF File <span className="text-red-500">*</span>
            </label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:border-gray-400"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={loading}
              />
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm font-medium mb-1">
                    Drop your PDF here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">Maximum file size: 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Progress */}
          {loading && uploadProgress > 0 && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

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
              Publish immediately (make visible to users)
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !file}>
              {loading ? "Uploading..." : "Add Resource"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};