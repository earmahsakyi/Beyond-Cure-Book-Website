import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";


const PrivacyPolicy = () => {
  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Effective date: January 01, 2026
          </p>
        </header>

        {/* Content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground">
          {/* Intro */}
          <p className="text-muted-foreground leading-relaxed">
            This Privacy Policy explains how BeyondTheCurebook.com (the "Site") collects, uses, and shares 
            information about you. This Site is operated by Sporelight Press / Henry Anyimadu ("we," "us," or "our").
          </p>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
              Information We Collect
            </h2>
            
            <h3 className="text-lg font-medium text-foreground mt-6 mb-3">
              Information you provide
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li><strong>Email list / newsletter:</strong> name and email address (and any preferences you choose to share).</li>
              <li><strong>Contact requests:</strong> name, email, and the content of your message.</li>
              <li><strong>Orders:</strong> If you purchase through third-party retailers, your payment information is handled by that retailer, not by us.</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground mt-6 mb-3">
              Information collected automatically
            </h3>
            <p className="text-muted-foreground mb-3">
              When you visit the Site, we (and our service providers) may automatically collect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>IP address, device type, browser type, operating system</li>
              <li>Pages viewed, time spent, referring page, links clicked</li>
              <li>Approximate location derived from IP address</li>
              <li>Cookies or similar technologies (see "Cookies" below)</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
              How We Use Your Information
            </h2>
            <p className="text-muted-foreground mb-3">We use information to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Provide and maintain the Site</li>
              <li>Respond to messages and requests</li>
              <li>Send newsletters or updates you opted into (you can unsubscribe anytime)</li>
              <li>Improve Site performance, content, and user experience</li>
              <li>Detect, prevent, and address security or technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Cookies and Analytics */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
              Cookies and Analytics
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may use cookies and similar technologies for essential site functionality and to understand how the Site is used.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              You can control cookies through your browser settings. If we use non-essential cookies (for example, for advertising), 
              we will provide appropriate notice and choices where required.
            </p>
          </section>

          {/* How We Share Information */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
              How We Share Information
            </h2>
            <p className="text-muted-foreground mb-3">We may share your information with:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li><strong>Service providers</strong> that help operate the Site (hosting, analytics, email delivery, customer support tools)</li>
              <li><strong>Legal and safety:</strong> if required by law or to protect rights, safety, and security</li>
              <li><strong>Business transfers:</strong> if we are involved in a merger, sale, or similar transaction</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We do not sell your personal information in the ordinary sense of "selling for money." If we ever engage in practices 
              regulated as "sale" or "sharing" under certain state laws, we will provide required disclosures and opt-out options.
            </p>
          </section>

          {/* Email Communications */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
              Email Communications
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you sign up for the newsletter, you may receive emails about the book, events, and updates. 
              You can unsubscribe at any time using the link in the email. We may still send non-marketing emails 
              (for example, to respond to a request you made).
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
              Data Retention
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We keep personal information only as long as reasonably necessary for the purposes described in this Policy, 
              unless a longer retention period is required by law.
            </p>
          </section>

          {/* Your Privacy Rights */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
              Your Privacy Rights
            </h2>
            <p className="text-muted-foreground mb-3">Depending on where you live, you may have rights to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>Request access to or deletion of personal information</li>
              <li>Correct inaccurate information</li>
              <li>Opt out of certain processing (such as targeted advertising), where applicable</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>Connecticut residents:</strong> Connecticut provides privacy rights for residents under the Connecticut 
              Data Privacy Act, and covered businesses must honor universal opt-out preference signals as of January 1, 2025.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              If you wish to make a request, contact us:{" "}
              <a 
                href="/contact" 
                className="text-primary hover:underline"
              >
                here
              </a>
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
              Children's Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The Site is not intended for children under 13, and we do not knowingly collect personal information from children under 13.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
              Third-Party Links
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The Site may link to third-party websites (such as retailers). We are not responsible for the privacy practices of those third parties.
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
              Security
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use reasonable safeguards designed to protect information. No method of transmission or storage is 100% secure.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
              Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. The "Effective date" above indicates when it was last revised.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
              Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions? Contact:{" "}
              <a 
                href="/contact" 
                className="text-primary hover:underline"
              >
                Us here
              </a>
            </p>
          </section>
        </article>

        {/* Footer Note */}
        <footer className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BeyondTheCurebook.com. All rights reserved.
          </p>
        </footer>
      </div>
      <div className="mb-8 flex justify-center ">
          <Button asChild variant="outline" size="sm">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
    </main>
  );
};

export default PrivacyPolicy;
