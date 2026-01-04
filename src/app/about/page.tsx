import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About - Tools Herd AI",
  description: "Learn about the mission, story, and the team behind Tools Herd AI, your trusted directory for the best artificial intelligence tools.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            About Tools Herd AI
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Cutting through the noise to bring you the best tools in the AI landscape.
          </p>
          
          <div className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200 max-w-3xl mx-auto">
            <p className="text-base font-semibold text-slate-800 mb-3">
              Tools Herd AI is a high-authority AI tools discovery, comparison, and decision-making platform built for professionals, founders, and businesses.
            </p>
            <p className="text-slate-700 leading-relaxed">
              It helps users discover, compare, evaluate, and adopt AI tools that deliver real business outcomes, while providing AI founders and brands with high-intent exposure, SEO authority, and qualified leads.
            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="mt-16 text-lg text-slate-700 space-y-8">

          {/* Our Mission Section */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="leading-relaxed">
              In the rapidly expanding universe of Artificial Intelligence, finding the right tool can feel like searching for a needle in a haystack. Tools Herd AI was born from a simple mission: to demystify the world of AI and empower creators, developers, and businesses by curating the most innovative and effective tools available. We believe that the right tool can unlock limitless potential, and our goal is to help you find it.
            </p>
          </div>

          {/* Our Story Section */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Story</h2>
            <p className="leading-relaxed">
              As AI enthusiasts and developers ourselves, we spent countless hours sifting through forums, blogs, and product launches, trying to keep up with the latest advancements. We knew there had to be a better way. We envisioned a central hub—a well-organized, expertly vetted directory that saves you time and helps you discover tools you can truly trust. That vision became Tools Herd AI, a platform built by the community, for the community.
            </p>
          </div>

          
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Approach to Curation</h2>
            <p className="leading-relaxed">
              Quality over quantity is our mantra. Every tool listed in our directory undergoes a rigorous evaluation process. We focus on several key factors:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 pl-4 text-slate-600">
              <li><span className="font-semibold text-slate-700">Functionality:</span> Does the tool deliver on its promises effectively?</li>
              <li><span className="font-semibold text-slate-700">User Experience:</span> Is it intuitive, well-designed, and easy to use?</li>
              <li><span className="font-semibold text-slate-700">Innovation:</span> Does it bring something new and valuable to the table?</li>
              <li><span className="font-semibold text-slate-700">Community Feedback:</span> What are real users saying about the tool?</li>
            </ul>
          </div>
          
          {/* Meet the Founder Section - Customize this! */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Meet the Founder</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-50 rounded-lg">
              {/* TODO: Replace this div with an <Image> component of your photo */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-slate-200 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">KARTHIKEYA</h3>
                <p className="text-md text-blue-600 font-semibold">FOUNDER</p>
                <p className="mt-2 text-slate-600">
                       AI is evolving day by day .so ,to educate the students to know more about ai tools <br></br>we invented this ai tool directory webiste
                </p>
              </div>
            </div>
          </div>

          {/* Join Our Community Section */}
          <div className="text-center pt-12">
            <h2 className="text-3xl font-bold text-slate-900">Join Our Community</h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
              Tools Herd AI is more than just a directory; it&#39;s a community of innovators. Explore our collection, subscribe to our newsletter for the latest updates, and help us grow.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/tools" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                Explore Tools
              </Link>
              <Link href="/list-a-website" className="inline-block bg-slate-100 text-slate-800 font-semibold px-6 py-3 rounded-md hover:bg-slate-200 transition-colors">
                Submit a Tool
              </Link>
            </div>
          </div>
        </div>

      </div>

    </main>
  );
}
