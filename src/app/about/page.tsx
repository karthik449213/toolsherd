import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About - Tools Herd AI",
  description: "Learn about the mission, story, and the team behind Tools Herd AI, your trusted directory for the best artificial intelligence tools.",
};

export default function AboutPage() {
  return (
    <main className="bg-slate-950">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-100 tracking-tight font-mono">
            About Tools Herd AI
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300">
            Cutting through the noise to bring you the best tools in the AI landscape.
          </p>
          
          <div className="mt-8 bg-slate-800/40 rounded-xl p-6 border border-cyan-500/20 max-w-3xl mx-auto hover:border-cyan-500/40 shadow-glow-medium">
            <p className="text-base font-semibold text-cyan-300 mb-3">
              Tools Herd AI is a high-authority AI tools discovery, comparison, and decision-making platform built for professionals, founders, and businesses.
            </p>
            <p className="text-slate-300 leading-relaxed">
              It helps users discover, compare, evaluate, and adopt AI tools that deliver real business outcomes, while providing AI founders and brands with high-intent exposure, SEO authority, and qualified leads.
            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-xs sm:text-sm md:text-base lg:text-lg text-slate-300 space-y-6 sm:space-y-8">
          {/* Our Mission Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-4 font-mono">Our Mission</h2>
            <p className="leading-relaxed">
              In the rapidly expanding universe of Artificial Intelligence, finding the right tool can feel like searching for a needle in a haystack. Tools Herd AI was born from a simple mission: to demystify the world of AI and empower creators, developers, and businesses by curating the most innovative and effective tools available. We believe that the right tool can unlock limitless potential, and our goal is to help you find it.
            </p>
          </div>

          {/* Our Story Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-4 font-mono">Our Story</h2>
            <p className="leading-relaxed">
              As AI enthusiasts and developers ourselves, we spent countless hours sifting through forums, blogs, and product launches, trying to keep up with the latest advancements. We knew there had to be a better way. We envisioned a central hub—a well-organized, expertly vetted directory that saves you time and helps you discover tools you can truly trust. That vision became Tools Herd AI, a platform built by the community, for the community.
            </p>
          </div>

          
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-4 font-mono">Our Approach to Curation</h2>
            <p className="leading-relaxed">
              Quality over quantity is our mantra. Every tool listed in our directory undergoes a rigorous evaluation process. We focus on several key factors:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 pl-2 sm:pl-4 text-slate-400 text-sm sm:text-base">
              <li><span className="font-semibold text-cyan-400">Functionality:</span> Does the tool deliver on its promises effectively?</li>
              <li><span className="font-semibold text-cyan-400">User Experience:</span> Is it intuitive, well-designed, and easy to use?</li>
              <li><span className="font-semibold text-cyan-400">Innovation:</span> Does it bring something new and valuable to the table?</li>
              <li><span className="font-semibold text-cyan-400">Community Feedback:</span> What are real users saying about the tool?</li>
            </ul>
          </div>
          
   

          {/* Join Our Community Section */}
          <div className="text-center pt-8 sm:pt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 font-mono">Join Our Community</h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300">
              Tools Herd AI is more than just a directory; it&#39;s a community of innovators. Explore our collection, subscribe to our newsletter for the latest updates, and help us grow.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link href="/tools" className="inline-block bg-cyan-500 text-gray-950 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-cyan-400 transition-colors shadow-glow-medium text-center text-sm sm:text-base">
                Explore Tools
              </Link>
              <Link href="/list-a-website" className="inline-block bg-slate-800/50 text-cyan-300 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-slate-700/50 border border-cyan-500/30 transition-colors text-center text-sm sm:text-base">
                Submit a Tool
              </Link>
            </div>
          </div>
        </div>

      </div>

    </main>
  );
}
