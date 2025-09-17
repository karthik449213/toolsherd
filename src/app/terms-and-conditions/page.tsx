// This is the content for your page.tsx file.

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions - Tools Herd AI",
  description: "Terms and Conditions for using Tools Herd AI.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Last updated: September 17, 2025
          </p>
        </div>

        <div className="mt-12 text-slate-700 space-y-8 prose prose-lg max-w-none">
          
          <h2>1. Agreement to Terms</h2>
          <p>
            By using our website, Tools Herd AI (the "Site"), you agree to be bound by these Terms and Conditions. If you do not agree, you are prohibited from using the Site. We reserve the right to make changes to these Terms and Conditions at any time.
          </p>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the Site is our proprietary property. All source code, databases, functionality, software, website designs, text, and graphics on the Site (collectively, the "Content") and the trademarks and logos contained therein (the "Marks") are owned or controlled by us. The content and marks related to third-party tools listed on our directory are the property of their respective owners.
          </p>

          <h2>3. User Representations</h2>
          <p>
            By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms and Conditions; (2) you will not use the Site for any illegal or unauthorized purpose; and (3) your use of the Site will not violate any applicable law or regulation.
          </p>

          <h2>4. User Submissions</h2>
          <p>
            When you submit a tool or any other information to the Site ("Submissions"), you grant us a non-exclusive, worldwide, royalty-free, perpetual license to use, display, and distribute your Submission on our Site. You warrant that you have the right to grant us these rights and that your Submissions are accurate and do not violate any third-party rights. We reserve the right to remove or edit any Submission at our sole discretion.
          </p>

          <h2>5. Third-Party Websites and Content</h2>
          <p>
            The Site contains links to other websites ("Third-Party Websites") as well as articles, text, graphics, and other content belonging to or originating from third parties ("Third-Party Content"). Such Third-Party Websites and Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us. We are not responsible for any Third-Party Websites accessed through the Site or any Third-Party Content posted on, available through, or installed from the Site. Inclusion of, linking to, or permitting the use of any Third-Party Websites or Content does not imply approval or endorsement by us. If you decide to leave the Site and access Third-Party Websites, you do so at your own risk.
          </p>

          <h2>6. Disclaimer</h2>
          <p>
            THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms and Conditions and your use of the Site are governed by and construed in accordance with the laws of [Your Country/State] applicable to agreements made and to be entirely performed within [Your Country/State], without regard to its conflict of law principles.
          </p>
          
          <h2>9. Contact Us</h2>
          <p>
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            <br />
            <Link href="mailto:[your-email@example.com]" className="text-blue-600 hover:underline">[your-email@example.com]</Link>
          </p>
        </div>
      </div>
    </main>
  );
}