import {   Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/40 bg-background">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between  items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Beyond the Cure. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
            <a href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</a>
            <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
        <div className="flex justify-center md:justify-start gap-6  items-center mt-5   text-sm text-muted-foreground">
    
        <a href="https://www.linkedin.com/in/beyond-the-cure-book-78a7983a2/" className="hover:text-primary transition-colors">
          <Linkedin/>
        </a>
        <a href="https://www.instagram.com/beyondthecurebook/" className="hover:text-primary transition-colors">
          <Instagram/>
        </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
