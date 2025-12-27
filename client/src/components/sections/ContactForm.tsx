import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { submitContactMessage, clearSubmitSuccess, clearError } from '../../store/contactMessageSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { FaSpinner, FaEnvelope, FaUser, FaPaperPlane, FaEdit } from "react-icons/fa";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loading, error, submitSuccess } = useAppSelector(state => state.contactMessage);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Typed change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    try {
      await dispatch(submitContactMessage(formData)).unwrap();
      
      // Success handled in useEffect
    } catch (err) {
      toast({
        title: "Error!",
        description: err as string,
        variant: "destructive"
      });
    }
  };

  // Handle success
  useEffect(() => {
    if (submitSuccess) {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon."
      });
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Clear success flag
      dispatch(clearSubmitSuccess());
      setTimeout(()=> navigate('/'),1000)
    }
  }, [submitSuccess, toast, dispatch,navigate]);

  // Clear error on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearSubmitSuccess());
    };
  }, [dispatch]);

  return (
    <main className="container flex min-h-[80vh] items-center justify-center py-12">
    

      <section className="w-full max-w-md rounded-xl border bg-card p-8 shadow">

        <h1 className="text-center text-2xl font-bold font-heading">Get in Touch</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Have questions? We'd love to hear from you.
        </p>

        {error && (
          <div className="text-center p-2 border-2 border-red-300 text-red-600 bg-red-200 mt-4 rounded-2xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <FaUser className="absolute inset-y-0 left-4 top-2 pr-3 text-2xl flex items-center text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10 pr-10"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <FaEnvelope className="absolute inset-y-0 left-4 top-2 pr-3 text-2xl flex items-center text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 pr-10"
                required
              />
            </div>
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <Label htmlFor="subject">
              Subject
              <span className="ml-1 text-xs text-muted-foreground">(Optional)</span>
            </Label>
            <div className="relative">
              <FaEdit className="absolute inset-y-0 left-4 top-2 pr-3 text-2xl flex items-center text-muted-foreground" />
              <Input
                id="subject"
                type="text"
                placeholder="How can we help?"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="pl-10 pr-10"
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you're thinking..."
              className="min-h-[120px] resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" />
                Sending...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <FaPaperPlane className="mr-2" />
                Send Message
              </div>
            )}
          </Button>
        </form>

        <p className="mt-4 text-sm text-muted-foreground text-center">
          We typically respond within 24 hours
        </p>
      </section>
    </main>
  );
};

export default ContactForm;