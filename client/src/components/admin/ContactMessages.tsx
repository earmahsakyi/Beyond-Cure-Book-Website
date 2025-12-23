import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MailOpen, Eye } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

const initialMessages: Message[] = [
  {
    id: "1",
    name: "Jennifer Adams",
    email: "jennifer.adams@email.com",
    subject: "Speaking Request - Healthcare Conference 2024",
    message: "Dear Dr. Mitchell,\n\nI am the program coordinator for the Annual Healthcare Innovation Conference taking place in Boston this September. We would be honored to have you as our keynote speaker to discuss patient-centered approaches to chronic illness management.\n\nPlease let me know your availability and speaking fee.\n\nBest regards,\nJennifer Adams",
    date: "2024-01-18",
    read: false,
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@hospital.org",
    subject: "Book Bulk Order Inquiry",
    message: "Hello,\n\nOur hospital system is interested in ordering copies of 'Beyond the Cure' for our patient education library. Could you provide information about bulk pricing?\n\nThank you,\nMichael Chen",
    date: "2024-01-17",
    read: false,
  },
  {
    id: "3",
    name: "Sarah Thompson",
    email: "sarah.t@gmail.com",
    subject: "Thank you for your book",
    message: "Dr. Mitchell,\n\nI just finished reading your book and wanted to thank you. As someone living with fibromyalgia, your words resonated deeply with me. The chapter on energy management has already made a difference in my daily life.\n\nGratefully,\nSarah",
    date: "2024-01-15",
    read: false,
  },
  {
    id: "4",
    name: "Robert Williams",
    email: "rwilliams@clinic.com",
    subject: "Collaboration Opportunity",
    message: "Dear Dr. Mitchell,\n\nI'm a physician at Wellness Integrative Clinic and would love to discuss potential collaboration on a wellness program for chronic illness patients.\n\nWould you be available for a call?\n\nBest,\nDr. Robert Williams",
    date: "2024-01-12",
    read: true,
  },
  {
    id: "5",
    name: "Emily Foster",
    email: "emily.foster@magazine.com",
    subject: "Interview Request - Health Magazine",
    message: "Hello Dr. Mitchell,\n\nI'm a health writer for Wellness Today magazine. We're preparing a feature on chronic illness management and would love to interview you for the piece.\n\nPlease let me know if you're interested.\n\nEmily Foster\nSenior Health Writer",
    date: "2024-01-10",
    read: true,
  },
];

const ContactMessages = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleMarkAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      handleMarkAsRead(message.id);
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <AdminLayout
      title="Contact Messages"
      description="View and manage messages from website visitors"
    >
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Stats */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {messages.length} messages total
        </span>
        {unreadCount > 0 && (
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            {unreadCount} unread
          </span>
        )}
      </div>

      {/* Messages Table */}
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
              <tr key={message.id} className={!message.read ? "bg-primary/5" : ""}>
                <td>
                  {message.read ? (
                    <MailOpen className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Mail className="h-4 w-4 text-primary" />
                  )}
                </td>
                <td>
                  <div>
                    <p className={`font-medium ${!message.read ? "text-foreground" : "text-muted-foreground"}`}>
                      {message.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{message.email}</p>
                  </div>
                </td>
                <td>
                  <p className={`truncate max-w-xs ${!message.read ? "font-medium" : ""}`}>
                    {message.subject}
                  </p>
                </td>
                <td className="text-muted-foreground">
                  {new Date(message.date).toLocaleDateString()}
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
                    {!message.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(message.id)}
                      >
                        Mark Read
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Message Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-foreground">{selectedMessage.name}</p>
                  <p className="text-muted-foreground">{selectedMessage.email}</p>
                </div>
                <p className="text-muted-foreground">
                  {new Date(selectedMessage.date).toLocaleDateString()}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="whitespace-pre-wrap text-sm">{selectedMessage.message}</p>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" asChild>
                  <a href={`mailto:${selectedMessage.email}`}>Reply via Email</a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ContactMessages;
