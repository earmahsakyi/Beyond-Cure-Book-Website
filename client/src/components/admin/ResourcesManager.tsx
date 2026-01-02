import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2, FileText, Users, Stethoscope } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  getAllResources,
  clearError,
  clearUploadSuccess,
  setCurrentResource,
  deleteResource,
  type Resource,
} from "@/store/resourceSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { AddResourceDialog } from "@/components/admin/AddResourceDialog";
import { EditResourceDialog } from "@/components/admin/EditResourceDialog";

const ResourcesManager = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  // Get data from Redux store
  const { resources, loading, error, uploadSuccess, currentResource } = useAppSelector(
    (state) => state.resource
  );

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Fetch resources on component mount
  useEffect(() => {
    dispatch(getAllResources());
  }, [dispatch]);

  // Handle upload success
  useEffect(() => {
    if (uploadSuccess) {
      toast({
        title: "Success",
        description: "Resource uploaded successfully",
      });
      dispatch(clearUploadSuccess());
    }
  }, [uploadSuccess, dispatch, toast]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
      dispatch(clearError());
    }
  }, [error, dispatch, toast]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        await dispatch(deleteResource(id)).unwrap();
        toast({
          title: "Resource deleted",
          description: "The resource has been removed.",
        });
      } catch (err) {
        // Error is handled by useEffect above
      }
    }
  };

  const handleEdit = (resource: Resource) => {
    dispatch(setCurrentResource(resource));
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    dispatch(setCurrentResource(null));
  };

  // Filter resources by category
  const patientResources = resources.filter((r) => r.category === "patients");
  const clinicianResources = resources.filter((r) => r.category === "clinicians");

  return (
    <AdminLayout
      title="Resources Manager"
      description="Manage downloadable resources for patients and clinicians"
    >
      <Link
        to="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Add Resource Button */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {resources.length} resources total
        </p>
        <Button onClick={() => setIsAddDialogOpen(true)} disabled={loading}>
          <Plus className="h-4 w-4" />
          Add Resource
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mb-6 text-center text-muted-foreground">
          Loading resources...
        </div>
      )}

      {/* Patient Resources */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">For Patients</h2>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
            {patientResources.length}
          </span>
        </div>
        <div className="admin-card p-0 overflow-hidden">
          {patientResources.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No patient resources yet
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Resource</th>
                  <th>Status</th>
                  <th>Added</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patientResources.map((resource) => (
                  <tr key={resource._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {resource.fileType.toUpperCase()} • {resource.fileSize ? `${(resource.fileSize / 1024).toFixed(1)} KB` : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          resource.isPublished
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {resource.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="text-muted-foreground">
                      {new Date(resource.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(resource)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(resource._id)}
                          className="text-destructive hover:text-destructive"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Clinician Resources */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">For Clinicians</h2>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
            {clinicianResources.length}
          </span>
        </div>
        <div className="admin-card p-0 overflow-hidden">
          {clinicianResources.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No clinician resources yet
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Resource</th>
                  <th>Status</th>
                  <th>Added</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clinicianResources.map((resource) => (
                  <tr key={resource._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {resource.fileType.toUpperCase()} • {resource.fileSize ? `${(resource.fileSize / 1024).toFixed(1)} KB` : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          resource.isPublished
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {resource.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="text-muted-foreground">
                      {new Date(resource.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(resource)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(resource._id)}
                          className="text-destructive hover:text-destructive"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <AddResourceDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)} 
      />
      <EditResourceDialog 
        isOpen={isEditDialogOpen} 
        onClose={handleCloseEditDialog}
        resource={currentResource}
      />
    </AdminLayout>
  );
};

export default ResourcesManager;