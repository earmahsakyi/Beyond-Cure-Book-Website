import { useState, useEffect } from "react";
import { Mail, Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { getEmails, clearError } from "@/store/emailSubscribeSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAppDispatch, useAppSelector } from "../../store/store";

const ITEMS_PER_PAGE = 10;

const EmailSubscribers = () => {
  const dispatch = useAppDispatch();
  const { loading, emails, error } = useAppSelector(state => state.email);
  const [currentPage, setCurrentPage] = useState(1);

  const subscriberList = emails || [];
  const totalPages = Math.ceil(subscriberList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSubscribers = subscriberList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  //  Fetch emails on mount
  useEffect(() => {
    if (emails === null) {
      dispatch(getEmails());
    }
  }, [dispatch, emails]); 

  // Clear errors on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  //  Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  //  Loading state
  if (loading) {
    return (
      <AdminLayout
        title="Email Subscribers"
        description="View and manage email subscribers"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading emails...</p>
        </div>
      </AdminLayout>
    );
  }

  //  Error state
  if (error) {
    return (
      <AdminLayout
        title="Email Subscribers"
        description="View and manage email subscribers"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-destructive">{error}</p>
          <Button 
            onClick={() => dispatch(getEmails())} 
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </AdminLayout>
    );
  }

  //  Empty state
  if (subscriberList.length === 0) {
    return (
      <AdminLayout
        title="Email Subscribers"
        description="View and manage email subscribers"
      >
        <div className="bg-card rounded-xl border border-border shadow-soft p-12 text-center">
          <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No subscribers yet</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Email Subscribers"
      description="View and manage email subscribers"
    >
      <div className="bg-card rounded-xl border border-border shadow-soft">
        <div className="p-6 border-b border-border">
          <p className="text-sm text-muted-foreground">
            {subscriberList.length} total subscriber{subscriberList.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead className="w-32">Date</TableHead>
              <TableHead className="w-24 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSubscribers.map((subscriber) => (
              <TableRow key={subscriber._id}>
                <TableCell className="font-medium">{subscriber.email}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(subscriber.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-primary hover:text-primary/80"
                  >
                    <a href={`mailto:${subscriber.email}`}>
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="p-4 border-t border-border">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {getVisiblePages().map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default EmailSubscribers;