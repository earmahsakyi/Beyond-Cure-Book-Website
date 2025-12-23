import { Link } from "react-router-dom";
import { ChevronRight, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  stats?: string;
}

export function DashboardCard({ title, description, href, icon: Icon, stats }: DashboardCardProps) {
  return (
    <div className="admin-card group">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
          <Icon className="h-6 w-6" />
        </div>
        {stats && (
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {stats}
          </span>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="mt-5">
        <Button asChild variant="secondary" size="sm" className="group/btn">
          <Link to={href}>
            Edit Content
            <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
