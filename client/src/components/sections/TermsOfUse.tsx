import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TermsOfUse = () => {
  return (
    <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Terms of Use</h1>
          <p className="text-muted-foreground">Effective date: January 01, 2026</p>
        </header>

        {/* Important Notice */}
        <section className="mb-10 p-4 bg-muted/50 border border-border rounded-lg">
          <p className="text-foreground font-medium">
            This website is strictly for Education only. Not medical advice.
          </p>
        </section>

        {/* Intro */}
        <section className="mb-10">
          <p className="text-foreground leading-relaxed">
            These Terms of Use govern your access to and use of BeyondTheCurebook.com (the "Site"). By using the Site, you agree to these Terms.
          </p>
        </section>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">1) Educational Content and Medical Disclaimer</h2>
          <p className="text-foreground leading-relaxed">
            The Site provides general educational information about antibiotics and related topics. It is not medical advice, and it does not create a physician–patient relationship. Do not use this Site to diagnose or treat any condition. If you have a medical concern, contact a qualified clinician. If you think you may have an emergency, call emergency services immediately.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">2) Intellectual Property</h2>
          <p className="text-foreground leading-relaxed">
            All content on the Site (text, images, graphics, logos, and design) is owned by us or our licensors and is protected by intellectual property laws. You may view and share links to the Site for personal, non-commercial use. You may not copy, reproduce, distribute, or create derivative works from Site content without written permission.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">3) Acceptable Use</h2>
          <p className="text-foreground leading-relaxed mb-4">You agree not to:</p>
          <ul className="list-disc list-inside text-foreground space-y-2 ml-4">
            <li>Use the Site for unlawful, harmful, or abusive purposes</li>
            <li>Attempt to interfere with Site operation or security</li>
            <li>Introduce malware or attempt unauthorized access</li>
            <li>Misrepresent your identity or affiliation</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">4) Third-Party Links and Purchases</h2>
          <p className="text-foreground leading-relaxed">
            The Site may link to third-party websites (including retailers). We do not control those sites and are not responsible for their content, policies, or practices. Purchases are governed by the retailer's terms.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">5) Endorsements and Disclosures</h2>
          <p className="text-foreground leading-relaxed">
            Endorsements reflect the honest opinions of the endorsers. If we use affiliate links or receive compensation for certain links, we will disclose that relationship clearly and conspicuously in line with FTC guidance.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">6) No Warranties</h2>
          <p className="text-foreground leading-relaxed">
            The Site is provided "as is" and "as available." We make no warranties, express or implied, regarding the Site's accuracy, reliability, or availability.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">7) Limitation of Liability</h2>
          <p className="text-foreground leading-relaxed">
            To the fullest extent permitted by law, we will not be liable for any indirect, incidental, consequential, or special damages arising from or related to your use of the Site.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">8) Indemnification</h2>
          <p className="text-foreground leading-relaxed">
            You agree to indemnify and hold us harmless from claims arising out of your misuse of the Site or violation of these Terms.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">9) Changes</h2>
          <p className="text-foreground leading-relaxed">
            We may update these Terms at any time. Continued use of the Site after changes means you accept the updated Terms.
          </p>
        </section>

        {/* Section 10 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">10) Governing Law</h2>
          <p className="text-foreground leading-relaxed">
            These Terms are governed by the laws of the State of Connecticut, without regard to conflict of laws principles.
          </p>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-6">
            Thank you for visiting BeyondTheCurebook.com.
          </p>
          <Button asChild variant="outline">
            <Link to="/">Return to Home</Link>
          </Button>
        </footer>
      </div>
    </main>
  );
};

export default TermsOfUse;