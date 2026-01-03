import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MailOpen, Eye, Trash2, Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  getAllContactMessages,
  markAsRead,
  deleteContactMessage,
  setCurrentMessage,
  ContactMessage,
} from "@/store/contactMessageSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const ContactMessages = () => {
  const dispatch = useAppDispatch();
  const { messages, loading, error, unreadCount, pagination } = useAppSelector(
    (state) => state.contactMessage
  );

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

  // Fetch messages on component mount
  useEffect(() => {
    dispatch(getAllContactMessages());
  }, [dispatch]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await dispatch(markAsRead({ id, isRead: true })).unwrap();
    } catch (err) {
      console.error("Failed to mark message as read:", err);
    }
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    dispatch(setCurrentMessage(message));
    
    // Mark as read if unread
    if (!message.isRead) {
      handleMarkAsRead(message._id);
    }
  };

  const handleDeleteClick = (id: string) => {
    setMessageToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (messageToDelete) {
      try {
        await dispatch(deleteContactMessage(messageToDelete)).unwrap();
        setDeleteDialogOpen(false);
        setMessageToDelete(null);
        
        // Close message dialog if the deleted message was open
        if (selectedMessage?._id === messageToDelete) {
          setSelectedMessage(null);
        }
      } catch (err) {
        console.error("Failed to delete message:", err);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AdminLayout
      title="Contact Messages"
      description="View and manage messages from website visitors"
    >
      <Link
        to="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Error Display */}
      {error && (
        <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Stats */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {pagination?.total || messages.length} messages total
        </span>
        {unreadCount > 0 && (
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            {unreadCount} unread
          </span>
        )}
      </div>

      {/* Loading State */}
      {loading && messages.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : messages.length === 0 ? (
        <div className="admin-card py-12 text-center">
          <Mail className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No messages yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Messages from your contact form will appear here
          </p>
        </div>
      ) : (
        /* Messages Table */
        <div className="admin-card p-0 overflow-hidden">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-12"></th>
                <th>From</th>
                <th>Subject</th>
                <th>Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr
                  key={message._id}
                  className={!message.isRead ? "bg-primary/5" : ""}
                >
                  <td>
                    {message.isRead ? (
                      <MailOpen className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Mail className="h-4 w-4 text-primary" />
                    )}
                  </td>
                  <td>
                    <div>
                      <p
                        className={`font-medium ${
                          !message.isRead
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {message.email}
                      </p>
                    </div>
                  </td>
                  <td>
                    <p
                      className={`truncate max-w-xs ${
                        !message.isRead ? "font-medium" : ""
                      }`}
                    >
                      {message.subject || "No subject"}
                    </p>
                  </td>
                  <td className="text-muted-foreground">
                    {formatDate(message.createdAt)}
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewMessage(message)}
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      {!message.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(message._id)}
                          disabled={loading}
                        >
                          Mark Read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(message._id)}
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Message Dialog */}
      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedMessage?.subject || "No subject"}
            </DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-foreground">
                    {selectedMessage.name}
                  </p>
                  <p className="text-muted-foreground">
                    {selectedMessage.email}
                  </p>
                </div>
                <p className="text-muted-foreground">
                  {formatDate(selectedMessage.createdAt)}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="whitespace-pre-wrap text-sm">
                  {selectedMessage.message}
                </p>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => handleDeleteClick(selectedMessage._id)}
                  disabled={loading}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button variant="outline" asChild>
                  <a href={`mailto:${selectedMessage.email}`}>
                    Reply via Email
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={loading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default ContactMessages;