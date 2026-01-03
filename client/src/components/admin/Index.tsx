import { Home, User, BookOpen, Mic2, Mail } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DashboardCard } from "@/components/admin/DashboardCard";
import { useEffect } from "react";
import { useAppSelector,useAppDispatch } from "@/store/store";
import { getAllContactMessages } from "@/store/contactMessageSlice";
import { getAllResources } from "@/store/resourceSlice";

const sections = [
  {
    title: "Home Page Content",
    description: "Edit hero text, book description, and call-to-action buttons",
    href: "/home-content",
    icon: Home,
  },
  {
    title: "About the Author",
    description: "Update your bio, profile image, and author information",
    href: "/about",
    icon: User,
  },
  {
    title: "Resources",
    description: "Manage downloadable resources for patients and clinicians",
    href: "/resources",
    icon: BookOpen,
    // stats: "12 resources",
  },
  // {
  //   title: "Media & Speaking",
  //   description: "Edit speaking topics, media kit, and contact information",
  //   href: "/media",
  //   icon: Mic2,
  // },
  {
    title: "Contact Messages",
    description: "View and manage messages from website visitors",
    href: "/messages",
    icon: Mail,
    // stats: "3 unread",
  },
];

const Index = () => {
  const dispatch = useAppDispatch()
  const unreadCount = useAppSelector(state => state.contactMessage.unreadCount);
  const resources = useAppSelector(state => state.resource.resources);

  useEffect(()=> {
    dispatch(getAllContactMessages())
  },[dispatch])

  useEffect(()=> {
    dispatch(getAllResources())
  },[dispatch])


  return (
    <AdminLayout
      title="Dashboard"
      description="Manage your Beyond the Cure website content"
    >
      {/* Quick Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="admin-card">
          <p className="text-sm font-medium text-muted-foreground">Total Resources</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{resources?.length}</p>
        </div>
        <div className="admin-card">
          <p className="text-sm font-medium text-muted-foreground">Unread Messages</p>
          <p className="mt-1 text-2xl font-bold text-primary">{unreadCount || 0}</p>
        </div>
        <div className="admin-card">
          <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
          <p className="mt-1 text-2xl font-bold text-foreground">Today</p>
        </div>
      </div>

      {/* Section Cards */}
      <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Website Sections
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <DashboardCard key={section.title} {...section} />
        ))}
      </div>
    </AdminLayout>
  );
};

export default Index;
