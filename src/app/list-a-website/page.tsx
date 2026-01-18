



import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Submit a Tool - Tools Herd AI",
  description: "Add your AI tool to our directory. Help the community discover the next great innovation in AI.",
};

export default function SubmitToolPage() {
  return (
    <main className="bg-slate-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">


        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-100 tracking-tight font-mono">
            Submit an AI Tool
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-slate-300">
            Help the community discover the next great AI tool. All submissions are reviewed by our team before being listed.
          </p>
        </div>

        {/* Submission Form */}
        <div className="bg-slate-800/40 p-8 rounded-2xl border border-cyan-500/20 shadow-glow-medium">
          <form
            action="https://formspree.io/f/xkoogvyv" // <-- PASTE YOUR NEW URL HERE
            method="POST"
          >
            <div className="space-y-6">

              {/* Tool Name */}
              <div>
                <label htmlFor="tool-name" className="block text-sm font-medium text-slate-300">
                  Tool Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="tool-name"
                    id="tool-name"
                    required
                    placeholder="e.g., SuperAI Writer"
                    className="block w-full px-3 py-2 border border-cyan-500/30 bg-slate-900/50 text-slate-100 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:shadow-glow-medium sm:text-sm"
                  />
                </div>
              </div>

              {/* Tool Website URL */}
              <div>
                <label htmlFor="tool-url" className="block text-sm font-medium text-slate-300">
                  Tool Website URL <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="tool-url"
                    id="tool-url"
                    required
                    placeholder="https://example.com"
                    className="block w-full px-3 py-2 border border-cyan-500/30 bg-slate-900/50 text-slate-100 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:shadow-glow-medium sm:text-sm"
                  />
                </div>
              </div>

              {/* Tool Description */}
              <div>
                <label htmlFor="tool-description" className="block text-sm font-medium text-slate-300">
                  Tool Description <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="tool-description"
                    name="tool-description"
                    rows={3}
                    required
                    placeholder="A short, catchy description of what this tool does."
                    className="block w-full px-3 py-2 border border-cyan-500/30 bg-slate-900/50 text-slate-100 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:shadow-glow-medium sm:text-sm"
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500">This will be the main description on the tools listing page.</p>
              </div>

              {/* Tool Category */}
              <div>
                <label htmlFor="tool-category" className="block text-sm font-medium text-slate-300">
                  Tool Category/Categories
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="tool-category"
                    id="tool-category"
                    placeholder="e.g., Copywriting, Image Generation, SEO"
                    className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500">Separate multiple categories with a comma.</p>
              </div>

              {/* Pricing Model */}
              <div>
                <label htmlFor="pricing-model" className="block text-sm font-medium text-slate-700">
                  Pricing Model
                </label>
                <select
                  id="pricing-model"
                  name="pricing-model"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  defaultValue="Freemium"
                >
                  <option>Freemium</option>
                  <option>Free</option>
                  <option>Free Trial</option>
                  <option>Paid (One-time)</option>
                  <option>Subscription</option>
                  <option>Contact for Pricing</option>
                </select>
              </div>
              
              {/* Your Email */}
              <div>
                <label htmlFor="submitter-email" className="block text-sm font-medium text-slate-700">
                  Your Email Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="submitter-email"
                    id="submitter-email"
                    required
                    placeholder="you@example.com"
                    className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                 <p className="mt-2 text-sm text-slate-500">We&#39;ll use this to contact you with any questions about your submission.</p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Submit for Review
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>

    </main>
  );
}