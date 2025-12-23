import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2, FileText, Users, Stethoscope } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  id: string;
  title: string;
  audience: "Patients" | "Clinicians";
  downloadUrl: string;
  createdAt: string;
}

const initialResources: Resource[] = [
  {
    id: "1",
    title: "Chronic Illness Self-Care Checklist",
    audience: "Patients",
    downloadUrl: "/downloads/self-care-checklist.pdf",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Symptom Tracking Journal Template",
    audience: "Patients",
    downloadUrl: "/downloads/symptom-journal.pdf",
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Patient Communication Best Practices",
    audience: "Clinicians",
    downloadUrl: "/downloads/communication-guide.pdf",
    createdAt: "2024-01-08",
  },
  {
    id: "4",
    title: "Integrative Care Framework",
    audience: "Clinicians",
    downloadUrl: "/downloads/care-framework.pdf",
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    title: "Meal Planning for Energy Management",
    audience: "Patients",
    downloadUrl: "/downloads/meal-planning.pdf",
    createdAt: "2024-01-01",
  },
];

const ResourcesManager = () => {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    toast({
      title: "Resource deleted",
      description: "The resource has been removed.",
    });
  };

  const patientResources = resources.filter((r) => r.audience === "Patients");
  const clinicianResources = resources.filter((r) => r.audience === "Clinicians");

  return (
    <AdminLayout
      title="Resources Manager"
      description="Manage downloadable resources for patients and clinicians"
    >
      <Link
        to="/"
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
        <Button>
          <Plus className="h-4 w-4" />
          Add Resource
        </Button>
      </div>

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
          <table className="admin-table">
            <thead>
              <tr>
                <th>Resource</th>
                <th>Added</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patientResources.map((resource) => (
                <tr key={resource.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{resource.title}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">
                    {new Date(resource.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(resource.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <table className="admin-table">
            <thead>
              <tr>
                <th>Resource</th>
                <th>Added</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clinicianResources.map((resource) => (
                <tr key={resource.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{resource.title}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">
                    {new Date(resource.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(resource.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ResourcesManager;
